import api from "./api";

export interface MaintenanceRequest {
  id: string;
  facilityId: string;
  facility: {
    id: string;
    name: string;
    location: string;
  };
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  assignedTo?: string;
  assignedStaff?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  warning?: string;
}

export interface CreateMaintenanceRequestData {
  facilityId: string;
  description: string;
}

export interface UpdateMaintenanceStatusData {
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  assignedToId?: string;
}

// Get all maintenance requests (filtered by role)
export const getMaintenanceRequests = async (params?: {
  status?: string;
  facilityId?: string;
  priority?: string;
}): Promise<MaintenanceRequest[]> => {
  const response = await api.get("/maintenance", { params });
  return response.data;
};

// Get a single maintenance request
export const getMaintenanceRequestById = async (
  id: string
): Promise<MaintenanceRequest> => {
  const response = await api.get(`/maintenance/${id}`);
  return response.data;
};

// Create a maintenance request
export const createMaintenanceRequest = async (
  data: CreateMaintenanceRequestData
): Promise<MaintenanceRequest> => {
  const response = await api.post("/maintenance", data);
  return response.data;
};

// Update maintenance request status (maintenance staff only)
export const updateMaintenanceStatus = async (
  id: string,
  data: UpdateMaintenanceStatusData
): Promise<MaintenanceRequest> => {
  const response = await api.patch(`/maintenance/${id}/status`, data);
  return response.data;
};

// Delete maintenance request (admin only)
export const deleteMaintenanceRequest = async (id: string): Promise<void> => {
  await api.delete(`/maintenance/${id}`);
};

// Get AI summary for the week's maintenance requests
export const getAiSummary = async (): Promise<{ aiSummary: string }> => {
  const response = await api.get("/maintenance/summary");
  return response.data;
};
