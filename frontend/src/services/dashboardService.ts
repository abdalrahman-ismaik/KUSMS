import api from './api';

export interface AdminStats {
  totalUsers: number;
  pendingApprovals: number;
  activeBookings: number;
  totalFacilities: number;
  recentActivity: Array<{
    id: string;
    type: 'BOOKING' | 'EVENT' | 'MAINTENANCE';
    title: string;
    status: string;
    date: string;
  }>;
  utilization: Array<{
    id: string;
    name: string;
    percentage: number;
    insight: string;
  }>;
}

export interface StudentStats {
  activeBookings: number;
  upcomingEvents: number;
  pendingBookings: number;
  suggestion: {
    title: string;
    message: string;
  };
}

export interface MaintenanceStats {
  pendingRequests: number;
  assignedTasks: number;
  predictedRisks: Array<{
    id: string;
    name: string;
    requestCount: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    prediction: string;
  }>;
}

export type DashboardStats = AdminStats | StudentStats | MaintenanceStats;

export const dashboardService = {
  async getStats(): Promise<{ stats: DashboardStats }> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};

export default dashboardService;
