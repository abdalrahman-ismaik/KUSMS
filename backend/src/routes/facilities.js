const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const { verifyAuth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');

// Public routes (all authenticated users)
router.get('/', verifyAuth, facilityController.getFacilities);
router.get('/:id', verifyAuth, facilityController.getFacilityById);
router.get('/:id/availability', verifyAuth, facilityController.checkAvailability);

// Admin-only routes
router.post('/', verifyAuth, requireAdmin, facilityController.createFacility);
router.patch('/:id', verifyAuth, requireAdmin, facilityController.updateFacility);
router.delete('/:id', verifyAuth, requireAdmin, facilityController.deleteFacility);

module.exports = router;
