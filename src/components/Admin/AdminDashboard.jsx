// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getUsers, adminResetOtp, adminSetPassword, deleteUser } from "../../services/authApi";
import { Trash2, Key, Mail, RefreshCcw } from "lucide-react";

const UserRow = React.memo(({ user, refreshUsers }) => {
  const [resetLoading, setResetLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [setPasswordLoading, setSetPasswordLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleError = (error) => {
    setMessage({ type: "error", text: error.response?.data?.detail || "An error occurred" });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAdminResetOtp = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to send a password reset OTP to ${user.email}?`)) return;
    setResetLoading(true);
    try {
      await adminResetOtp(user.id);
      setMessage({ type: "success", text: `OTP sent to ${user.email}.` });
      refreshUsers();
    } catch (error) {
      handleError(error);
    } finally {
      setResetLoading(false);
    }
  }, [user, refreshUsers]);

  const handleAdminSetPassword = useCallback(async () => {
    const newPassword = prompt("Enter the new password for this user:");
    if (!newPassword) return;
    setSetPasswordLoading(true);
    try {
      await adminSetPassword(user.id, newPassword);
      setMessage({ type: "success", text: `Password for ${user.username} successfully set.` });
    } catch (error) {
      handleError(error);
    } finally {
      setSetPasswordLoading(false);
    }
  }, [user]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to DELETE user ${user.username}? This cannot be undone.`)) return;
    setDeleteLoading(true);
    try {
      await deleteUser(user.id);
      setMessage({ type: "success", text: `User ${user.username} deleted.` });
      refreshUsers();
    } catch (error) {
      handleError(error);
    } finally {
      setDeleteLoading(false);
    }
  }, [user, refreshUsers]);

  return (
    <motion.tr 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className={`border-b ${user.role === 'admin' ? 'bg-red-50' : 'hover:bg-gray-50'}`}
    >
      <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
      <td className="px-6 py-4">{user.username}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.phone_number || 'N/A'}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>
            {user.role.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {user.reset_otp_expires ? new Date(user.reset_otp_expires).toLocaleString() : 'N/A'}
      </td>
      <td className="px-6 py-4 space-x-2 flex items-center">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdminResetOtp}
            disabled={resetLoading || deleteLoading || setPasswordLoading}
            className="p-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition disabled:opacity-50"
            title="Send OTP Reset Email"
        >
            <Mail className="w-4 h-4" />
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdminSetPassword}
            disabled={setPasswordLoading || deleteLoading || resetLoading}
            className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition disabled:opacity-50"
            title="Directly Set New Password"
        >
            <Key className="w-4 h-4" />
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            disabled={deleteLoading || setPasswordLoading || resetLoading}
            className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition disabled:opacity-50"
            title="Delete User"
        >
            <Trash2 className="w-4 h-4" />
        </motion.button>
      </td>
      
      {/* Small message display */}
      {message && (
        <div className={`absolute right-0 top-0 mt-2 mr-2 p-2 text-xs rounded shadow-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
        </div>
      )}
    </motion.tr>
  );
});

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch users. Check JWT/Admin Role.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div className="text-center py-24">Loading User Data...</div>;
  if (error) return <div className="text-center py-24 text-red-600 font-bold">Error: {error}</div>;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-gray-900 mb-8"
        >
            Admin Dashboard: User Management
        </motion.h1>

        <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={fetchUsers}
            className="mb-4 flex items-center space-x-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh User List</span>
        </motion.button>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">OTP Expiry</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user.id} user={user} refreshUsers={fetchUsers} />
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="mt-8 text-sm text-gray-600">Note: Sending OTP allows the user to reset their password via the public 'Forgot Password' page.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;