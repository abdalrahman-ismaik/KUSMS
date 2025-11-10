import prisma from './prisma.js';

/**
 * Check if a booking conflicts with existing approved bookings
 * @param {string} facilityId - Facility ID
 * @param {Date} startTime - Booking start time
 * @param {Date} endTime - Booking end time
 * @param {string} excludeBookingId - Optional booking ID to exclude from check (for updates)
 * @returns {Promise<boolean>} True if conflict exists
 */
async function hasConflict(facilityId, startTime, endTime, excludeBookingId = null) {
  const conflicts = await prisma.booking.findMany({
    where: {
      facilityId,
      status: {
        in: ['PENDING', 'APPROVED'], // Check both pending and approved bookings
      },
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } },
      ],
      ...(excludeBookingId && { id: { not: excludeBookingId } }),
    },
  });

  return conflicts.length > 0;
}

/**
 * Find alternative available time slots for a facility
 * @param {string} facilityId - Facility ID
 * @param {Date} requestedStartTime - Original requested start time
 * @param {number} durationMinutes - Duration in minutes
 * @param {number} maxSuggestions - Maximum number of suggestions (default 3)
 * @returns {Promise<Array>} Array of alternative time slots
 */
async function findAlternativeSlots(
  facilityId,
  requestedStartTime,
  durationMinutes,
  maxSuggestions = 3
) {
  const alternatives = [];
  const startDate = new Date(requestedStartTime);
  startDate.setHours(0, 0, 0, 0); // Start from beginning of day

  // Get all bookings for the facility for the next 7 days
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const existingBookings = await prisma.booking.findMany({
    where: {
      facilityId,
      status: { in: ['PENDING', 'APPROVED'] },
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { startTime: 'asc' },
  });

  // Define working hours (8 AM to 8 PM)
  const workingHoursStart = 8;
  const workingHoursEnd = 20;

  // Check each day
  for (let dayOffset = 0; dayOffset < 7 && alternatives.length < maxSuggestions; dayOffset++) {
    const checkDate = new Date(startDate);
    checkDate.setDate(checkDate.getDate() + dayOffset);

    // Check each hour slot
    for (let hour = workingHoursStart; hour < workingHoursEnd && alternatives.length < maxSuggestions; hour++) {
      const slotStart = new Date(checkDate);
      slotStart.setHours(hour, 0, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes);

      // Skip if slot ends after working hours
      if (slotEnd.getHours() >= workingHoursEnd) continue;

      // Check if slot conflicts with existing bookings
      const hasSlotConflict = existingBookings.some((booking) => {
        return (
          new Date(booking.startTime) < slotEnd &&
          new Date(booking.endTime) > slotStart
        );
      });

      if (!hasSlotConflict) {
        alternatives.push({
          startTime: slotStart,
          endTime: slotEnd,
        });
      }
    }
  }

  return alternatives;
}

/**
 * Get all bookings for a facility on a specific date
 * @param {string} facilityId - Facility ID
 * @param {Date} date - Date to check
 * @returns {Promise<Array>} Array of bookings
 */
async function getBookingsForDate(facilityId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.booking.findMany({
    where: {
      facilityId,
      status: { in: ['PENDING', 'APPROVED'] },
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { startTime: 'asc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export {
  hasConflict,
  findAlternativeSlots,
  getBookingsForDate,
};
