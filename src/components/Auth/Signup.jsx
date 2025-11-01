// src/components/Auth/Signup.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../../services/authApi";

const Signup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", phone_number: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await registerUser(formData);
      setMessage({ type: "success", text: "Registration successful! You can now log in." });
      setTimeout(() => onNavigate("login"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.detail || "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
          />
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
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number (e.g. +14155552671)"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <button onClick={() => onNavigate("login")} className="text-blue-600 hover:text-blue-700 font-medium">
            Log In
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;