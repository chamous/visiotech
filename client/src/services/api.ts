import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token'); // Get token separately

    console.log('Axios Interceptor: Checking token for request to', config.url);
    console.log('Axios Interceptor: user from localStorage:', user);
    console.log('Axios Interceptor: token from localStorage:', token);

    if (user && token) { // Check for both user object and token string
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Axios Interceptor: Authorization header added.');
    } else {
      console.log('Axios Interceptor: No user or token found in localStorage. Authorization header not added.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  getAllUsers: () => api.get('/auth/users'), // New: Get all users
  getUserById: (id: string) => api.get(`/auth/users/${id}`), // New: Get user by ID
  createUser: (userData: any) => api.post('/auth/users', userData), // New: Create user (by admin)
  updateUser: (id: string, userData: any) => api.put(`/auth/users/${id}`, userData), // New: Update user
  deleteUser: (id: string) => api.delete(`/auth/users/${id}`), // New: Delete user
};

export const solutionsApi = {
  getAll: () => api.get('/solutions'),
  getById: (id: string) => api.get(`/solutions/${id}`),
  create: (data: any) => api.post('/solutions', data),
  update: (id: string, data: any) => api.put(`/solutions/${id}`, data),
  remove: (id: string) => api.delete(`/solutions/${id}`),
};

export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  remove: (id: string) => api.delete(`/products/${id}`),
};

export const caseStudiesApi = {
  getAll: () => api.get('/case-studies'),
  getById: (id: string) => api.get(`/case-studies/${id}`),
  create: (data: any) => api.post('/case-studies', data),
  update: (id: string, data: any) => api.put(`/case-studies/${id}`, data),
  remove: (id: string) => api.delete(`/case-studies/${id}`),
};

export const demoRequestsApi = {
  getAll: () => api.get('/demo-requests'),
  getById: (id: string) => api.get(`/demo-requests/${id}`),
  create: (data: any) => api.post('/demo-requests', data),
  remove: (id: string) => api.delete(`/demo-requests/${id}`),
};

export const mediaAssetsApi = {
  getAll: () => api.get('/media-assets'),
  getById: (id: string) => api.get(`/media-assets/${id}`),
  create: (data: any) => api.post('/media-assets', data),
  update: (id: string, data: any) => api.put(`/media-assets/${id}`, data),
  remove: (id: string) => api.delete(`/media-assets/${id}`),
};

// New: Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  remove: (id: string) => api.delete(`/projects/${id}`),
};

export default api;