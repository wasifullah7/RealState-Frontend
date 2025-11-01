// src/services/authApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI Auth Backend URL
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
