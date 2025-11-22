import prisma from '../utils/prisma.js';
import { ValidationError, AuthError, NotFoundError } from '../utils/errors.js';
import { sendEventNotification } from '../utils/notifications.js';
import logger from '../utils/logger.js';

/**
 * Get all events (with optional filters)
 */
export async function getEvents(req, res, next) {
  try {
    const { status, startDate, endDate } = req.query;
    
    const where = {};
    
    // Filter by status (only show published events to non-admins)
    if (req.user?.role !== 'ADMIN') {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }
    
    // Filter by date range
    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) {
        where.startTime.gte = new Date(startDate);
      }
      if (endDate) {
        where.startTime.lte = new Date(endDate);
      }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    res.json(events);
  } catch (error) {
    next(error);
  }
}

/**
 * Get pending events (admin only)
 */
export async function getPendingEvents(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can view pending events');
    }

    const events = await prisma.event.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(events);
  } catch (error) {
    next(error);
  }
}

/**
 * Propose an event (student/faculty)
 */
export async function proposeEvent(req, res, next) {
  try {
    const { title, description, startTime, endTime, location, facilityId } = req.body;

    // Validation
    if (!title || !startTime || !endTime) {
      throw new ValidationError('Title, start time, and end time are required');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new ValidationError('End time must be after start time');
    }

    if (start < new Date()) {
      throw new ValidationError('Event cannot be scheduled in the past');
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: start,
        endTime: end,
        location,
        facilityId: facilityId || null,
        creatorId: req.user.id,
        status: 'PENDING',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    logger.success(`Event proposed: ${event.title} by ${req.user.email}`);
    
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
}

/**
 * Create an event directly (admin only)
 */
export async function createEvent(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can create events directly');
    }

    const { title, description, startTime, endTime, location, facilityId } = req.body;

    if (!title || !startTime || !endTime) {
      throw new ValidationError('Title, start time, and end time are required');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new ValidationError('End time must be after start time');
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: start,
        endTime: end,
        location,
        facilityId: facilityId || null,
        creatorId: req.user.id,
        status: 'PUBLISHED',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    sendEventNotification('created', event);
    logger.success(`Event created: ${event.title} by ${req.user.email}`);
    
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
}

/**
 * Update an event (admin only)
 */
export async function updateEvent(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can update events');
    }

    const { id } = req.params;
    const { title, description, startTime, endTime, location, facilityId, status } = req.body;

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw new NotFoundError('Event not found');
    }

    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;
    if (facilityId !== undefined) updateData.facilityId = facilityId || null;
    if (status !== undefined) updateData.status = status;
    
    if (startTime !== undefined) {
      updateData.startTime = new Date(startTime);
    }
    if (endTime !== undefined) {
      updateData.endTime = new Date(endTime);
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    sendEventNotification('updated', event);
    logger.success(`Event updated: ${event.title}`);
    
    res.json(event);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete an event (admin only)
 */
export async function deleteEvent(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can delete events');
    }

    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    await prisma.event.delete({
      where: { id },
    });

    sendEventNotification('deleted', event);
    logger.success(`Event deleted: ${event.title}`);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
}

/**
 * Approve an event proposal (admin only)
 */
export async function approveEvent(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can approve events');
    }

    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.status !== 'PENDING') {
      throw new ValidationError('Only pending events can be approved');
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    sendEventNotification('approved', updatedEvent);
    logger.success(`Event approved: ${updatedEvent.title}`);
    
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
}

/**
 * Reject an event proposal (admin only)
 */
export async function rejectEvent(req, res, next) {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new AuthError('Only admins can reject events');
    }

    const { id } = req.params;
    const { reason } = req.body;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.status !== 'PENDING') {
      throw new ValidationError('Only pending events can be rejected');
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    sendEventNotification('rejected', updatedEvent, reason);
    logger.success(`Event rejected: ${updatedEvent.title}`);
    
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
}
