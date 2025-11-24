import prisma from '../utils/prisma.js';
import logger from '../utils/logger.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20, // Limit to last 20 notifications
    });
    res.json(notifications);
  } catch (error) {
    logger.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { 
        userId: req.user.id,
        read: false 
      },
      data: { read: true },
    });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    logger.error('Error marking notifications as read:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};
