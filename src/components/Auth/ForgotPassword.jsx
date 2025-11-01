// src/components/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { requestOtp, resetPassword } from "../../services/authApi";
import { Mail, MessageSquare } from "lucide-react";

const ForgotPassword = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sendViaSms, setSendViaSms] = useState(false); // NEW: OTP delivery method
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // Pass the email and send_via_sms flag to the API
      const response = await requestOtp({ email, send_via_sms: sendViaSms }); 
      setMessage({ type: "success", text: response.data?.msg || "OTP request sent." });
      setStep(2);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.detail || "Error requesting OTP." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await resetPassword({ email, otp, new_password: newPassword });
      setMessage({ type: "success", text: "Password successfully reset. Redirecting to login..." });
      setTimeout(() => onNavigate("login"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.detail || "Reset failed. Check OTP/Password." });
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
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Forgot Password - Step {step}</h2>

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            
            <div className="pt-2">
                <p className="text-sm font-medium mb-2 text-gray-700">Send OTP via:</p>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => setSendViaSms(false)}
                        className={`flex items-center justify-center flex-1 py-2 rounded-lg transition ${
                            !sendViaSms ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <Mail className="w-4 h-4 mr-2" /> Email
                    </button>
                    <button
                        type="button"
                        onClick={() => setSendViaSms(true)}
                        className={`flex items-center justify-center flex-1 py-2 rounded-lg transition ${
                            sendViaSms ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" /> SMS
                    </button>
                </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </motion.button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-600">Enter the OTP sent to: <span className="font-medium">{email}</span></p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>
        )}
        
        {message && (
          <p className={`mt-4 text-center text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
        <p className="mt-6 text-center text-sm">
          <button onClick={() => onNavigate("login")} className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;