import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyAuth, getNotifications);
router.post('/mark-read', verifyAuth, markAsRead);

export default router;
