import apiClient from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens and user data
      await AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
        ['user', JSON.stringify(user)],
      ]);

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage even if API call fails
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    try {
      const response = await apiClient.post('/auth/refresh-token', { refreshToken });
      const { accessToken } = response.data.data;
      await AsyncStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post(`/auth/reset-password/${token}`, {
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authApi;
