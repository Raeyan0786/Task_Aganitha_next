// /lib/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    const errorStatus = error.response?.status;
    
    // Handle token expiration
    if (errorStatus === 401) {
      // Redirect to login page if token is expired
      window.location.href = '/login';
    }
    
    return Promise.reject({
      message: errorMessage,
      status: errorStatus
    });
  }
);

export default apiClient;