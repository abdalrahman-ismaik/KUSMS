import api from './api';

export const authService = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Logout current user
   */
  async logout() {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};
