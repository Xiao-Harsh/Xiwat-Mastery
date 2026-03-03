import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10s timeout as per security checklist
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Production-grade JWT interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('xiwat_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global 401 handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('xiwat_token');
            // Avoid infinite loops if already on login
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
