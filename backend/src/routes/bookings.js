const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyAuth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');

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

module.exports = router;
