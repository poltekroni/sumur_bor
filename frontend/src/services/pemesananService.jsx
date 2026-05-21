import api from './api';

export const pemesananService = {
  create: (payload) =>
    api.post('/pemesanan', payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),
  mine: () => api.get('/pemesanan-saya'),
  adminAll: () => api.get('/admin/pemesanan'),
  updateStatus: (id, status) => api.put(`/admin/pemesanan/${id}/status`, { status }),
  dashboard: () => api.get('/admin/dashboard'),
};
