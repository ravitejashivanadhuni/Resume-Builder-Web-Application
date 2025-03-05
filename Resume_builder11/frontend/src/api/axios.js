import axios from "axios";

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:9000',
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log the request for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
      });
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Log the response for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }

    if (error.response) {
      // Handle 401 (Unauthorized) errors
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(new Error('Your session has expired. Please log in again.'));
      }
      // Handle 404 (Not Found) errors
      else if (error.response.status === 404) {
        return Promise.reject(new Error(error.response.data?.message || 'Email not found. Please check your email address.'));
      }
      // Handle 429 (Too Many Requests) errors
      else if (error.response.status === 429) {
        return Promise.reject(new Error(error.response.data?.message || 'Too many attempts. Please try again later.'));
      }
      // Handle other errors
      else {
        return Promise.reject(new Error(error.response.data?.message || 'An error occurred'));
      }
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response received from server. Please check your connection.'));
    } else {
      // Something happened in setting up the request
      return Promise.reject(new Error('Error setting up request. Please try again.'));
    }
  }
);

export const endPoints = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    loginWithGoogle: "/api/v1/auth/login-with-google",
    resetPassword: "/api/v1/auth/resetpassword",
    verify: "/api/v1/auth/verify",
    sendOtp: "/api/v1/auth/sendotp",
    sendCode: "/api/v1/auth/send-code",
    verifyCode: "/api/v1/auth/verify-code",
    logout: "/api/v1/auth/logout",
    getProfile: "/api/v1/auth/profile",
    updateProfile: "/api/v1/auth/profile/update",
    uploadProfilePhoto: "/api/v1/auth/profile/upload-photo",
    deleteProfilePhoto: "/api/v1/auth/profile/photo",
    getAllUsers: "/api/v1/auth/getalluser",
  },
  resume: {
    getResume: '/api/v2/resume/get',
    getUserResumes: '/api/v2/resume/user-resumes',
    downloadPdf: '/api/v2/resume/download-pdf',
    downloadDoc: '/api/v2/resume/download-doc',
    save: '/api/v2/resume/save'
  }
};
