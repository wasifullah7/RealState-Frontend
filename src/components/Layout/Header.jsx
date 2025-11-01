import React, { useState, useCallback, memo } from "react";
import { Search, BarChart3, Home, Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

// Reusable Nav Button Component
const NavButton = memo(({ label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
));

const Header = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Use AuthContext to get current auth state
  const { isAuthenticated, isAdmin, logout } = useAuth(); 

  // Memoized navigation function
  const handleNavigate = useCallback(
    (view) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
    },
    [onNavigate]
  );
  
  const handleLogout = useCallback(() => {
    logout();
    handleNavigate("home");
  }, [logout, handleNavigate]);

  // Define static navigation items
  const navItems = [
    { label: "Home", view: "home", icon: Home, show: true },
    { label: "Search", view: "search", icon: Search, show: true },
  ];
  
  // Conditional authentication links
  const authItems = isAuthenticated 
    ? [
        // Show Admin link only if user is an admin
        ...(isAdmin ? [{ label: "Admin", view: "admin", icon: Shield, onClick: () => handleNavigate("admin") }] : []),
        // Logout link
        { label: "Logout", view: "logout", icon: LogOut, onClick: handleLogout }
      ]
    : [
        // Login link
        { label: "Login", view: "login", icon: LogIn, onClick: () => handleNavigate("login") }
      ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home Link */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigate("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                PropertyMatch
              </h1>
              <p className="text-xs text-gray-500">AI-Powered</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-8" role="navigation">
            {[...navItems.filter(i => i.show), ...authItems].map((item) => (
                <NavButton
                    key={item.view}
                    label={item.label}
                    icon={item.icon}
                    isActive={currentView === item.view}
                    onClick={item.onClick || (() => handleNavigate(item.view))}
                />
            ))}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <button
              onClick={() => handleNavigate("search")}
              className="hidden sm:inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Matching
            </button>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-gray-200 rounded-lg shadow-md mt-2 p-4 space-y-3"
            >
              {[...navItems.filter(i => i.show), ...authItems].map((item) => (
                <button
                    key={item.view}
                    onClick={item.onClick || (() => handleNavigate(item.view))}
                    className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                    {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate("search")}
                className="block w-full text-left bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-2 rounded-lg font-medium"
              >
                Start Matching
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default memo(Header);