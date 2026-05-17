/**
 * apiService.js
 * Axios instance that automatically attaches the Cognito JWT token
 * to every request and handles 401 / token-expired situations.
 */

import axios from 'axios';
import awsConfig from '../config/aws-config';
import { getIdToken, signOut } from './cognitoService';

const api = axios.create({
  baseURL: awsConfig.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor ─────────────────────────────────────
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // Not authenticated; request will proceed without a token
      // (public endpoints will still work)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired / invalid – force logout
      signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Typed API helpers ───────────────────────────────────────

// Auth / User Management (Admin only)
export const authApi = {
  getPendingUsers:  ()            => api.get('/auth/pending-users'),
  approveUser:      (userId, role) => api.post('/auth/approve-user', { userId, role }),
  rejectUser:       (userId)      => api.post('/auth/reject-user', { userId }),
  getAllUsers:       ()            => api.get('/auth/users'),
  deleteUser:       (userId)      => api.delete(`/auth/users/${userId}`),
};

// Classes (Scheduler)
export const classApi = {
  create:      (payload) => api.post('/classes', payload),
  list:        ()        => api.get('/classes'),
  getById:     (id)      => api.get(`/classes/${id}`),
  update:      (id, p)   => api.put(`/classes/${id}`, p),
  delete:      (id)      => api.delete(`/classes/${id}`),
};

// QR Attendance (Teacher)
export const qrApi = {
  generateSession: (payload) => api.post('/qr/generate', payload),
  getActiveSessions: ()      => api.get('/qr/active'),
  closeSession:    (id)      => api.post(`/qr/close/${id}`),
};

// Attendance (Student)
export const attendanceApi = {
  markAttendance:  (payload) => api.post('/attendance/mark', payload),
  getMyHistory:    (studentId) => api.get(`/attendance/student/${studentId}`),
  getByClass:      (classId)   => api.get(`/attendance/class/${classId}`),
  getPercentage:   (studentId) => api.get(`/attendance/percentage/${studentId}`),
};

// Teachers (Admin)
export const teacherApi = {
  list:    ()      => api.get('/teachers'),
  getById: (id)    => api.get(`/teachers/${id}`),
  create:  (p)     => api.post('/teachers', p),
  update:  (id, p) => api.put(`/teachers/${id}`, p),
  delete:  (id)    => api.delete(`/teachers/${id}`),
};

// Reports (Admin)
export const reportApi = {
  summary:      () => api.get('/reports/summary'),
  byDepartment: () => api.get('/reports/by-department'),
  byClass:      (classId) => api.get(`/reports/class/${classId}`),
};
