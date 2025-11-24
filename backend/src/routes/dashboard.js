import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(verifyAuth);

router.get('/stats', getDashboardStats);

export default router;
