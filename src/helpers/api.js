import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL,
});

// Add authentication token to requests if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Authentication
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (credentials) => {
    try {
      const response = await axiosInstance.post('/register', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  profile: async () => {
    try {
      const response = await axiosInstance.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // CRUD Operations
  getShipments: async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/shipments?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getShipment: async (id) => {
    try {
      const response = await axiosInstance.get(`/shipments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createShipment: async (item) => {
    try {
      const response = await axiosInstance.post('/shipments', item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateShipment: async (id, updatedItem) => {
    try {
      const response = await axiosInstance.put(`/shipments/${id}`, updatedItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteShipment: async (id) => {
    try {
      const response = await axiosInstance.delete(`/shipments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
