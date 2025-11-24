import express from 'express';
import {
  getEvents,
  getPendingEvents,
  proposeEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  approveEvent,
  rejectEvent,
} from '../controllers/eventController.js';
import { verifyAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Get all events (filtered by role)
 * @access  Public (shows only published events to non-admins)
 */
router.get('/', verifyAuth, getEvents);

/**
 * @route   GET /api/events/pending
 * @desc    Get pending event proposals
 * @access  Admin only
 */
router.get('/pending', verifyAuth, requireRole('ADMIN'), getPendingEvents);

/**
 * @route   POST /api/events/propose
 * @desc    Propose an event (student/faculty)
 * @access  Private (authenticated users)
 */
router.post('/propose', verifyAuth, proposeEvent);

/**
 * @route   POST /api/events
 * @desc    Create an event directly (admin)
 * @access  Admin only
 */
router.post('/', verifyAuth, requireRole('ADMIN'), createEvent);

/**
 * @route   PATCH /api/events/:id
 * @desc    Update an event
 * @access  Admin only
 */
router.patch('/:id', verifyAuth, requireRole('ADMIN'), updateEvent);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event
 * @access  Admin only
 */
router.delete('/:id', verifyAuth, requireRole('ADMIN'), deleteEvent);

/**
 * @route   PATCH /api/events/:id/approve
 * @desc    Approve an event proposal
 * @access  Admin only
 */
router.patch('/:id/approve', verifyAuth, requireRole('ADMIN'), approveEvent);

/**
 * @route   PATCH /api/events/:id/reject
 * @desc    Reject an event proposal
 * @access  Admin only
 */
router.patch('/:id/reject', verifyAuth, requireRole('ADMIN'), rejectEvent);

export default router;
