
import axios from 'axios';
import { API_CONFIG } from '@/services/api/config';

/**
 * httpClient
 * Centralized axios instance with default configuration.
 * Adheres to the principle of single source of truth for API interactions.
 */
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging or auth tokens
httpClient.interceptors.request.use(
  (config) => {
    // Add logic here if needed (e.g., Auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error treatment
    const message = error.response?.data?.message || error.message || 'Error de conexión';
    console.error('[API Error]:', message);
    return Promise.reject(new Error(message));
  }
);

export default httpClient;
