import axios, {
 AxiosError,
 AxiosInstance,
 AxiosResponse,
 InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'react-toastify';

/**
 * API client for communicating with the backend
 * Includes request/response interceptors for authentication and error handling
 */
const axiosInstance: AxiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL,
 headers: {
  'Content-Type': 'application/json',
 },
 timeout: 30000, // 30 seconds
});

// Store for token (will be set by RTK Query)
let currentToken: string | null = null;

// Function to set token (will be called from RTK Query)
export const setAxiosToken = (token: string | null) => {
 currentToken = token;
};

// Request interceptor
axiosInstance.interceptors.request.use(
 async (config: InternalAxiosRequestConfig) => {
  // Try to get token from multiple sources
  let token = currentToken;

  // Fallback to localStorage (for client-side only)
  if (!token && typeof window !== 'undefined') {
   token = localStorage.getItem('accessToken');
  }

  // If token exists, add to headers
  if (token && config.headers) {
   config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
 },
 (error: AxiosError) => {
  return Promise.reject(error);
 }
);

// Response interceptor
axiosInstance.interceptors.response.use(
 (response: AxiosResponse) => {
  // Handle success messages if provided by the API
  const data = response.data as any;
  // if (data?.message && response.config.method !== 'get') {
  //  toast.success(data.message);
  // }
  return response;
 },
 async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { __isRetryRequest?: boolean };

  // Handle unauthorized errors (401)
  if (error.response?.status === 401 && !originalRequest.__isRetryRequest) {
   // Try to refresh token
   try {
    let refreshToken = null;

    // Get refresh token (client-side only)
    if (typeof window !== 'undefined') {
     refreshToken = localStorage.getItem('refreshToken');
    }

    if (!refreshToken) {
     // No refresh token available, redirect to login
     if (typeof window !== 'undefined') {
      // Clear tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      currentToken = null;
      // Redirect to login
      window.location.href = '/auth/login';
     }
     return Promise.reject(error);
    }

    // Retry with refresh token
    const response = await axios.post(
     `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
     { refreshToken }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;

    // Update tokens
    if (typeof window !== 'undefined') {
     localStorage.setItem('accessToken', accessToken);
     localStorage.setItem('refreshToken', newRefreshToken);
    }
    currentToken = accessToken;

    // Update auth header
    if (originalRequest.headers) {
     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    }
    originalRequest.__isRetryRequest = true;

    // Retry original request
    return axiosInstance(originalRequest);
   } catch (refreshError) {
    // Refresh token failed, redirect to login
    if (typeof window !== 'undefined') {
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     currentToken = null;
     window.location.href = '/auth/login';
    }
    return Promise.reject(refreshError);
   }
  }

  // Handle forbidden errors (403)
  if (error.response?.status === 403) {
   toast.error('You do not have permission to perform this action');
  }

  // Handle not found errors (404)
  if (error.response?.status === 404) {
   // Don't show toast for 404s as they might be expected in some cases
  }

  // Handle validation errors (422)
  if (error.response?.status === 422) {
   const data = error.response.data as any;
   if (data.message) {
    toast.error(data.message);
   } else if (data.errors) {
    // Show first validation error
    const firstError = Object.values(data.errors)[0] as string;
    toast.error(firstError);
   }
  }

  // Handle server errors (500)
  if (error.response?.status === 500) {
   toast.error('An unexpected error occurred. Please try again later.');
  }

  return Promise.reject(error);
 }
);

export default axiosInstance;