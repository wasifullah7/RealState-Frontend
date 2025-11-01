// src/App.jsx (FINAL AND CORRECTED CODE)
import React, { useState, useEffect, useCallback } from "react";
// Import all necessary layout and component files
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Hero from "./components/Home/Hero";
import Features from "./components/Home/Features";
import SearchInterface from "./components/Search/SearchInterface"; // Existing
import ResultsDashboard from "./components/Results/ResultsDashboard"; // Existing
import PropertyComparison from "./components/Comparison/PropertyComparison"; // Existing

// NEW AUTH PAGES
import Login from "./components/Auth/Login"; 
import Signup from "./components/Auth/Signup"; 
import ForgotPassword from "./components/Auth/ForgotPassword"; 
import AdminDashboard from "./components/Admin/AdminDashboard"; 

import { useAuth } from "./context/AuthContext"; 

function App() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState("home");
  
  // States for the original app functionality
  const [searchData, setSearchData] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Navigate handler for general use
  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
  }, []);

  // Protected route logic: Redirect if user tries to access a protected page without rights
  useEffect(() => {
    // Redirect non-admins from the admin page
    if (currentView === "admin" && !isAdmin) {
        handleNavigate("home"); 
    }
    // Redirect authenticated users from login/signup/forgot to home
    if (isAuthenticated && (currentView === "login" || currentView === "signup" || currentView === "forgot-password")) {
        handleNavigate("home");
    }
  }, [currentView, isAdmin, isAuthenticated, handleNavigate]);
  
  // Handlers for existing app structure
  const handleSearch = (url) => {
    setSearchData({ url, timestamp: Date.now() });
    handleNavigate("results");
  };
  const handleCompareProperty = (property) => {
    setSelectedProperty(property);
    handleNavigate("comparison");
  };

  const renderContent = () => {
    switch (currentView) {
      // --- NEW AUTH PAGES ---
      case "login":
        // Only show if NOT authenticated
        return <Login onLoginSuccess={() => handleNavigate("home")} onNavigate={handleNavigate} />;
      case "signup":
        return <Signup onNavigate={handleNavigate} />;
      case "forgot-password":
        return <ForgotPassword onNavigate={handleNavigate} />;
      case "admin":
        // Renders if isAdmin is true (protected by useEffect check above too)
        return <AdminDashboard onNavigate={handleNavigate} />;
        
      // --- ORIGINAL APP PAGES ---
      case "search":
        return <SearchInterface onSearch={handleSearch} />;
      case "results":
        return searchData ? (
          <ResultsDashboard
            searchData={searchData}
            onCompare={handleCompareProperty}
          />
        ) : (
          <div className="max-w-7xl mx-auto py-20 text-center">No search data. Start a <button className="text-blue-600" onClick={() => handleNavigate("search")}>Search</button> first.</div>
        );
      case "comparison":
        return selectedProperty ? (
          <PropertyComparison
            property={selectedProperty}
            onBack={() => handleNavigate("results")}
          />
        ) : (
          <div className="max-w-7xl mx-auto py-20 text-center">No property selected for comparison.</div>
        );

      case "home":
      default:
        // Default home view
        return (
          <>
            <Hero onSearch={handleSearch} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main>{renderContent()}</main>

      <Footer />
    </div>
  );
}

export default App;