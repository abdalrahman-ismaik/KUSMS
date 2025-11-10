const prisma = require('../utils/prisma');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');
const { hasConflict, findAlternativeSlots } = require('../utils/bookingConflicts');
const { sendBookingNotification } = require('../utils/notifications');

/**
 * Create a new booking
 */
async function createBooking(req, res, next) {
  try {
    const { facilityId, startTime, endTime, purpose } = req.body;
    const userId = req.user.id;

    // Validation
    if (!facilityId || !startTime || !endTime) {
      throw new ValidationError('facilityId, startTime, and endTime are required');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new ValidationError('End time must be after start time');
    }

    if (start < new Date()) {
      throw new ValidationError('Cannot book in the past');
    }

    // Check if facility exists
    const facility = await prisma.facility.findUnique({
      where: { id: facilityId },
    });

    if (!facility) {
      throw new NotFoundError('Facility not found');
    }

    // Check for conflicts
    const conflict = await hasConflict(facilityId, start, end);
    
    if (conflict) {
      // Find alternative slots
      const durationMinutes = Math.floor((end - start) / (1000 * 60));
      const alternatives = await findAlternativeSlots(facilityId, start, durationMinutes);

      throw new ConflictError('Time slot not available', { alternatives });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        facilityId,
        startTime: start,
        endTime: end,
        purpose: purpose || '',
        status: 'PENDING',
      },
      include: {
        facility: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Send notification
    sendBookingNotification(booking, 'created');

    res.status(201).json({ booking });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all bookings (with filtering)
 */
async function getBookings(req, res, next) {
  try {
    const { status, facilityId, userId, startDate, endDate } = req.query;
    const currentUser = req.user;

    // Build filter
    const where = {};

    // Non-admin users can only see their own bookings
    if (currentUser.role !== 'ADMIN') {
      where.userId = currentUser.id;
    } else if (userId) {
      where.userId = userId;
    }

    if (status) {
      where.status = status;
    }

    if (facilityId) {
      where.facilityId = facilityId;
    }

    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) {
        where.startTime.gte = new Date(startDate);
      }
      if (endDate) {
        where.startTime.lte = new Date(endDate);
      }
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        facility: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { startTime: 'desc' },
    });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single booking by ID
 */
async function getBookingById(req, res, next) {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        facility: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Non-admin users can only view their own bookings
    if (currentUser.role !== 'ADMIN' && booking.userId !== currentUser.id) {
      throw new NotFoundError('Booking not found');
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
}

/**
 * Approve a booking (Admin only)
 */
async function approveBooking(req, res, next) {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        facility: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (booking.status !== 'PENDING') {
      throw new ValidationError('Only pending bookings can be approved');
    }

    // Double-check for conflicts before approving
    const conflict = await hasConflict(
      booking.facilityId,
      booking.startTime,
      booking.endTime,
      booking.id
    );

    if (conflict) {
      throw new ConflictError('Cannot approve: time slot is no longer available');
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: {
        facility: true,
        user: true,
      },
    });

    // Send notification
    sendBookingNotification(updatedBooking, 'approved');

    res.json({ booking: updatedBooking });
  } catch (error) {
    next(error);
  }
}

/**
 * Reject a booking (Admin only)
 */
async function rejectBooking(req, res, next) {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        facility: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (booking.status !== 'PENDING') {
      throw new ValidationError('Only pending bookings can be rejected');
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'REJECTED' },
      include: {
        facility: true,
        user: true,
      },
    });

    // Send notification with reason
    sendBookingNotification(updatedBooking, 'rejected', reason);

    res.json({ booking: updatedBooking });
  } catch (error) {
    next(error);
  }
}

/**
 * Cancel a booking (User can cancel their own)
 */
async function cancelBooking(req, res, next) {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        facility: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Only booking owner or admin can cancel
    if (booking.userId !== currentUser.id && currentUser.role !== 'ADMIN') {
      throw new ValidationError('You can only cancel your own bookings');
    }

    if (booking.status === 'CANCELLED') {
      throw new ValidationError('Booking is already cancelled');
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        facility: true,
        user: true,
      },
    });

    res.json({ booking: updatedBooking });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  cancelBooking,
};
