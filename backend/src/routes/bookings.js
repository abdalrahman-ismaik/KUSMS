import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { verifyAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

const router = express.Router();

// All booking routes require authentication
router.use(verifyAuth);

// Get all bookings (filtered based on user role)
router.get('/', bookingController.getBookings);

// Create a new booking
router.post('/', bookingController.createBooking);

// Get a specific booking
router.get('/:id', bookingController.getBookingById);

// Approve a booking (Admin only)
router.patch('/:id/approve', requireAdmin, bookingController.approveBooking);

// Reject a booking (Admin only)
router.patch('/:id/reject', requireAdmin, bookingController.rejectBooking);

// Cancel a booking (User or Admin)
router.patch('/:id/cancel', bookingController.cancelBooking);

export default router;
