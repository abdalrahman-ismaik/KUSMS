import api from './api';

export const eventService = {
  /**
   * Get all events (with optional filters)
   */
  async getEvents(params?: { status?: string; startDate?: string; endDate?: string }) {
    const response = await api.get('/events', { params });
    return response.data;
  },

  /**
   * Get pending event proposals (admin only)
   */
  async getPendingEvents() {
    const response = await api.get('/events/pending');
    return response.data;
  },

  /**
   * Propose an event
   */
  async proposeEvent(eventData: {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    location?: string;
    facilityId?: string;
  }) {
    const response = await api.post('/events/propose', eventData);
    return response.data;
  },

  /**
   * Create an event directly (admin only)
   */
  async createEvent(eventData: {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    location?: string;
    facilityId?: string;
  }) {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  /**
   * Update an event (admin only)
   */
  async updateEvent(
    id: string,
    eventData: {
      title?: string;
      description?: string;
      startTime?: string;
      endTime?: string;
      location?: string;
      facilityId?: string;
      status?: string;
    }
  ) {
    const response = await api.patch(`/events/${id}`, eventData);
    return response.data;
  },

  /**
   * Delete an event (admin only)
   */
  async deleteEvent(id: string) {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  /**
   * Approve an event proposal (admin only)
   */
  async approveEvent(id: string) {
    const response = await api.patch(`/events/${id}/approve`);
    return response.data;
  },

  /**
   * Reject an event proposal (admin only)
   */
  async rejectEvent(id: string, reason?: string) {
    const response = await api.patch(`/events/${id}/reject`, { reason });
    return response.data;
  },
};
