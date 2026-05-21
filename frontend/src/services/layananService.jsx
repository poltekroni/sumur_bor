import api from './api';

export const layananService = {
  getAll: () => api.get('/layanan'),
  getById: (id) => api.get(`/layanan/${id}`),
  create: (payload) =>
    api.post('/layanan', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, payload) => {
    payload.append('_method', 'PUT');

    return api.post(`/layanan/${id}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove: (id) => api.delete(`/layanan/${id}`),
};
