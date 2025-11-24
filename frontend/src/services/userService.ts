import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'MAINTENANCE';
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'MAINTENANCE';
  department?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
  role?: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'MAINTENANCE';
  department?: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  createUser: async (data: CreateUserData): Promise<User> => {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  }
};
