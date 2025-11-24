import api from './api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },

  markAsRead: async () => {
    const response = await api.post('/notifications/mark-read');
    return response.data;
  },
};
