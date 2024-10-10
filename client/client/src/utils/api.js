import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // Backend API URL
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    }
});

// Intercept requests or responses (e.g., to add authorization headers)
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error) // Handle request errors
);

// Handling response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;