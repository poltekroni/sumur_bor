import api from './api';

export const authService = {
  register: (payload) => api.post('/register', payload),
  login: (payload) => api.post('/login', payload),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
};
