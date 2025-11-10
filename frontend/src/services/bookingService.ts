import api from './api';

export interface Booking {
  id: string;
  userId: string;
  facilityId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  facility?: {
    id: string;
    name: string;
    type: string;
    location: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface CreateBookingData {
  facilityId: string;
  startTime: string;
  endTime: string;
  purpose?: string;
}

export interface BookingFilters {
  status?: string;
  facilityId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

const bookingService = {
  /**
   * Create a new booking
   */
  async createBooking(data: CreateBookingData): Promise<{ booking: Booking }> {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  /**
   * Get all bookings with optional filters
   */
  async getBookings(filters?: BookingFilters): Promise<{ bookings: Booking[] }> {
    const response = await api.get('/bookings', { params: filters });
    return response.data;
  },

  /**
   * Get a single booking by ID
   */
  async getBookingById(id: string): Promise<{ booking: Booking }> {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  /**
   * Approve a booking (Admin only)
   */
  async approveBooking(id: string): Promise<{ booking: Booking }> {
    const response = await api.patch(`/bookings/${id}/approve`);
    return response.data;
  },

  /**
   * Reject a booking (Admin only)
   */
  async rejectBooking(id: string, reason?: string): Promise<{ booking: Booking }> {
    const response = await api.patch(`/bookings/${id}/reject`, { reason });
    return response.data;
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(id: string): Promise<{ booking: Booking }> {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export default bookingService;
