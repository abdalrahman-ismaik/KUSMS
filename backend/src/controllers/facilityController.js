import prisma from '../utils/prisma.js';
import { NotFoundError } from '../utils/errors.js';
import { getBookingsForDate } from '../utils/bookingConflicts.js';

/**
 * Get all facilities
 */
async function getFacilities(req, res, next) {
  try {
    const { type, search } = req.query;

    const where = {};

    if (type) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const facilities = await prisma.facility.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    res.json({ facilities });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single facility by ID
 */
async function getFacilityById(req, res, next) {
  try {
    const { id } = req.params;

    const facility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!facility) {
      throw new NotFoundError('Facility not found');
    }

    res.json({ facility });
  } catch (error) {
    next(error);
  }
}

/**
 * Check facility availability for a specific date
 */
async function checkAvailability(req, res, next) {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const facility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!facility) {
      throw new NotFoundError('Facility not found');
    }

    // Get all bookings for the specified date
    const bookings = await getBookingsForDate(id, new Date(date));

    // Generate availability slots (8 AM to 8 PM)
    const availabilitySlots = [];
    const checkDate = new Date(date);
    
    for (let hour = 8; hour < 20; hour++) {
      const slotStart = new Date(checkDate);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(checkDate);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      // Check if this slot conflicts with any booking
      const isBooked = bookings.some((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);
        return (
          (bookingStart < slotEnd && bookingEnd > slotStart)
        );
      });

      availabilitySlots.push({
        startTime: slotStart,
        endTime: slotEnd,
        available: !isBooked,
      });
    }

    res.json({
      facility,
      date: checkDate,
      bookings: bookings.map(b => ({
        id: b.id,
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
        user: b.user,
      })),
      availabilitySlots,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new facility (Admin only)
 */
async function createFacility(req, res, next) {
  try {
    const { name, type, capacity, location, description } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    const facility = await prisma.facility.create({
      data: {
        name,
        type,
        capacity: capacity || null,
        location: location || '',
        description: description || '',
      },
    });

    res.status(201).json({ facility });
  } catch (error) {
    next(error);
  }
}

/**
 * Update a facility (Admin only)
 */
async function updateFacility(req, res, next) {
  try {
    const { id } = req.params;
    const { name, type, capacity, location, description } = req.body;

    const facility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!facility) {
      throw new NotFoundError('Facility not found');
    }

    const updatedFacility = await prisma.facility.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(capacity !== undefined && { capacity }),
        ...(location !== undefined && { location }),
        ...(description !== undefined && { description }),
      },
    });

    res.json({ facility: updatedFacility });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a facility (Admin only)
 */
async function deleteFacility(req, res, next) {
  try {
    const { id } = req.params;

    const facility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!facility) {
      throw new NotFoundError('Facility not found');
    }

    // Check if there are any future bookings
    const futureBookings = await prisma.booking.count({
      where: {
        facilityId: id,
        startTime: { gte: new Date() },
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    if (futureBookings > 0) {
      return res.status(400).json({
        error: `Cannot delete facility with ${futureBookings} active/future bookings`,
      });
    }

    await prisma.facility.delete({
      where: { id },
    });

    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export {
  getFacilities,
  getFacilityById,
  checkAvailability,
  createFacility,
  updateFacility,
  deleteFacility,
};
