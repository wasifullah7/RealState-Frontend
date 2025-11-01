// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../services/authApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt_token"));
  const [role, setRole] = useState(localStorage.getItem("user_role"));

  useEffect(() => {
    if (token && role) {
      // In a real app, validate the token's expiry time here
      setUser({ role, token });
    }
  }, [token, role]);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { access_token, role: userRole } = response.data;

      localStorage.setItem("jwt_token", access_token);
      localStorage.setItem("user_role", userRole);
      setToken(access_token);
      setRole(userRole);
      setUser({ role: userRole, token: access_token });
      return { success: true, role: userRole };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.detail || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_role");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const isAdmin = role === "admin";
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};