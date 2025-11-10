import express from 'express';
import * as facilityController from '../controllers/facilityController.js';
import { verifyAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

const router = express.Router();

// Public routes (all authenticated users)
router.get('/', verifyAuth, facilityController.getFacilities);
router.get('/:id', verifyAuth, facilityController.getFacilityById);
router.get('/:id/availability', verifyAuth, facilityController.checkAvailability);

// Admin-only routes
router.post('/', verifyAuth, requireAdmin, facilityController.createFacility);
router.patch('/:id', verifyAuth, requireAdmin, facilityController.updateFacility);
router.delete('/:id', verifyAuth, requireAdmin, facilityController.deleteFacility);

export default router;
