// src/services/authApi.js
import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
// Note: If auth endpoints are on the same backend, use the same URL
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: AUTH_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT to protected requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Public Auth Endpoints ---

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

// MODIFIED: Takes an object { email, send_via_sms }
export const requestOtp = (data) =>
  API.post("/auth/forgot-password/request-otp", data);

export const resetPassword = (data) =>
  API.post("/auth/forgot-password/reset", data);

// --- Admin Endpoints (Protected) ---

export const getUsers = () => API.get("/admin/users");

export const adminResetOtp = (userId) =>
  API.post(`/admin/user/${userId}/reset-otp`);

export const adminSetPassword = (userId, new_password) =>
  API.post(`/admin/user/${userId}/set-password`, { new_password });

export const deleteUser = (userId) => API.delete(`/admin/user/${userId}`);

export default API;
