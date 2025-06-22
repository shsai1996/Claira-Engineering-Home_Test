import axios from 'axios';
import { Transaction, Category, DashboardSummary, CopilotResponse } from '../types';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout for production
  timeout: 10000,
});

// Add request interceptor for logging in development
if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use(
    (config) => {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.log('Unauthorized access');
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.log('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
  // File upload
  uploadCSV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/api/transactions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Transactions
  getTransactions: async (params?: { skip?: number; limit?: number; category_id?: number }) => {
    const response = await apiClient.get('/api/transactions', { params });
    return response.data;
  },

  updateTransaction: async (id: number, data: { category_id: number }) => {
    const response = await apiClient.put(`/api/transactions/${id}`, data);
    return response.data;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },

  // Dashboard
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get('/api/dashboard/summary');
    return response.data;
  },

  // Copilot
  queryCopilot: async (question: string): Promise<CopilotResponse> => {
    const response = await apiClient.post('/api/copilot/query', { question });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },
}; 