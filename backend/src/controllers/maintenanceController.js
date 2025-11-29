import prisma from '../utils/prisma.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import { sendMaintenanceNotification } from '../utils/notifications.js';
import logger from '../utils/logger.js';

/**
 * Create a maintenance request
 */
export async function createRequest(req, res, next) {
  try {
    const { facilityId, description, priority, imageUrl } = req.body;
    const userId = req.user.id;

    // Validation
    if (!facilityId || !description) {
      throw new ValidationError('Facility and description are required');
    }

    // Check for potential duplicates (same facility + similar description)
    const recentRequests = await prisma.maintenanceRequest.findMany({
      where: {
        facilityId,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
      select: {
        id: true,
        description: true,
        status: true,
      },
    });

    // Simple duplicate detection (case-insensitive substring match)
    const possibleDuplicate = recentRequests.find((r) =>
      r.description.toLowerCase().includes(description.toLowerCase().substring(0, 20)) ||
      description.toLowerCase().includes(r.description.toLowerCase().substring(0, 20))
    );

    // Create the request
    const maintenanceRequest = await prisma.maintenanceRequest.create({
      data: {
        facilityId,
        description,
        userId,
        status: 'PENDING',
      },
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
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

    // Send notification to maintenance staff
    await sendMaintenanceNotification('created', maintenanceRequest);

    // Return response with duplicate warning if applicable
    res.status(201).json({
      ...maintenanceRequest,
      warning: possibleDuplicate
        ? `Similar request already exists (ID: ${possibleDuplicate.id}) with status: ${possibleDuplicate.status}`
        : null,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get maintenance requests (filtered by role)
 */
export async function getRequests(req, res, next) {
  try {
    const { status, facilityId, priority } = req.query;
    const userId = req.user.id;
    const userRole = req.user.role;

    const where = {};

    // Non-maintenance staff can only see their own requests
    if (userRole !== 'MAINTENANCE' && userRole !== 'ADMIN') {
      where.userId = userId;
    }

    // Apply filters
    if (status) {
      where.status = status;
    }
    if (facilityId) {
      where.facilityId = facilityId;
    }

    const requests = await prisma.maintenanceRequest.findMany({
      where,
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        assignedStaff: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { createdAt: 'desc' },
      ],
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single maintenance request by ID
 */
export async function getRequestById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const request = await prisma.maintenanceRequest.findUnique({
      where: { id },
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        assignedStaff: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundError('Maintenance request not found');
    }

    // Check authorization (users can only view their own requests unless they're maintenance/admin)
    if (
      userRole !== 'MAINTENANCE' &&
      userRole !== 'ADMIN' &&
      request.userId !== userId
    ) {
      throw new ValidationError('You do not have permission to view this request');
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
}

/**
 * Update maintenance request status (maintenance staff only)
 */
export async function updateRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, notes, assignedToId } = req.body;
    const userId = req.user.id;

    // Validation
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD'];
    if (!status || !validStatuses.includes(status)) {
      throw new ValidationError('Valid status is required');
    }

    // Check if request exists
    const existingRequest = await prisma.maintenanceRequest.findUnique({
      where: { id },
      include: {
        facility: true,
        user: true,
      },
    });

    if (!existingRequest) {
      throw new NotFoundError('Maintenance request not found');
    }

    // Build update data
    const updateData = {
      status,
    };

    // Add assignedTo if provided
    if (assignedToId) {
      updateData.assignedTo = assignedToId;
    }

    // If marking as completed, set completion date
    if (status === 'COMPLETED' && existingRequest.status !== 'COMPLETED') {
      updateData.completedAt = new Date();
    }

    // Update the request
    const updatedRequest = await prisma.maintenanceRequest.update({
      where: { id },
      data: updateData,
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        assignedStaff: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Send notification on status change
    await sendMaintenanceNotification('status_updated', updatedRequest);

    // Send completion notification if applicable
    if (status === 'COMPLETED' && existingRequest.status !== 'COMPLETED') {
      await sendMaintenanceNotification('completed', updatedRequest);
    }

    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete maintenance request (admin only)
 */
export async function deleteRequest(req, res, next) {
  try {
    const { id } = req.params;

    const request = await prisma.maintenanceRequest.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundError('Maintenance request not found');
    }

    await prisma.maintenanceRequest.delete({
      where: { id },
    });

    res.json({ message: 'Maintenance request deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export default {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
};
