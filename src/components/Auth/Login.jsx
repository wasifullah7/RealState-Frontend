// src/components/Auth/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onLoginSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </motion.button>
        </form>
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-between text-sm">
          <button onClick={() => onNavigate("forgot-password")} className="text-blue-600 hover:text-blue-700 font-medium">
            Forgot Password?
          </button>
          <button onClick={() => onNavigate("signup")} className="text-blue-600 hover:text-blue-700 font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;