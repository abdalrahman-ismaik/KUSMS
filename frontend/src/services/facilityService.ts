import api from './api';

export interface Facility {
  id: string;
  name: string;
  type: 'CLASSROOM' | 'LAB' | 'SPORTS' | 'AUDITORIUM' | 'MEETING_ROOM' | 'OTHER';
  capacity: number | null;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface AvailabilityResponse {
  facility: Facility;
  date: string;
  bookings: Array<{
    id: string;
    startTime: string;
    endTime: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  availabilitySlots: AvailabilitySlot[];
}

export interface FacilityFilters {
  type?: string;
  search?: string;
}

export interface CreateFacilityData {
  name: string;
  type: string;
  capacity?: number;
  location?: string;
  description?: string;
}

const facilityService = {
  /**
   * Get all facilities with optional filters
   */
  async getFacilities(filters?: FacilityFilters): Promise<{ facilities: Facility[] }> {
    const response = await api.get('/facilities', { params: filters });
    return response.data;
  },

  /**
   * Get a single facility by ID
   */
  async getFacilityById(id: string): Promise<{ facility: Facility }> {
    const response = await api.get(`/facilities/${id}`);
    return response.data;
  },

  /**
   * Check facility availability for a specific date
   */
  async checkAvailability(id: string, date: string): Promise<AvailabilityResponse> {
    const response = await api.get(`/facilities/${id}/availability`, {
      params: { date },
    });
    return response.data;
  },

  /**
   * Create a new facility (Admin only)
   */
  async createFacility(data: CreateFacilityData): Promise<{ facility: Facility }> {
    const response = await api.post('/facilities', data);
    return response.data;
  },

  /**
   * Update a facility (Admin only)
   */
  async updateFacility(id: string, data: Partial<CreateFacilityData>): Promise<{ facility: Facility }> {
    const response = await api.patch(`/facilities/${id}`, data);
    return response.data;
  },

  /**
   * Delete a facility (Admin only)
   */
  async deleteFacility(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/facilities/${id}`);
    return response.data;
  },
};

export default facilityService;
