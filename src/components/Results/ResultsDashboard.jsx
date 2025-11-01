

import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Star, Home, Users, TrendingUp, ExternalLink, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { findMatchesForUrl } from "../../services/api";

const platformColors = {
  airbnb: "bg-red-100 text-red-700",
  vrbo: "bg-blue-100 text-blue-700",
  "booking.com": "bg-indigo-100 text-indigo-700",
};

const MatchCard = ({ property, index, onCompare }) => {
  const [expanded, setExpanded] = useState(false);
  
  const title = property.title || "Untitled";
  const image = property.image || "https://via.placeholder.com/400x250";
  const platform = property.platform || "N/A";
  const score = property.final_score || 0;
  const url = property.url || "#";

  const platformColors = {
    "booking.com": { bg: "bg-indigo-100", text: "text-indigo-700", badge: "bg-indigo-500" },
    "airbnb": { bg: "bg-red-100", text: "text-red-700", badge: "bg-red-500" },
    "vrbo": { bg: "bg-blue-100", text: "text-blue-700", badge: "bg-blue-500" },
  };

  const colors = platformColors[platform.toLowerCase()] || platformColors["booking.com"];
  
  const getScoreColor = (score) => {
    if (score >= 40) return "from-green-400 to-emerald-500";
    if (score >= 30) return "from-yellow-400 to-orange-500";
    return "from-orange-400 to-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
    >
      {/* Image Container with Score Badge */}
      <div className="relative overflow-hidden h-56 bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          loading="lazy" 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        
        {/* Score Badge */}
        <div className={`absolute top-4 right-4 bg-gradient-to-br ${getScoreColor(score)} rounded-full w-16 h-16 shadow-xl flex items-center justify-center border-4 border-white`}>
          <div className="text-white text-center">
            <div className="text-3xl font-black">{score.toFixed(0)}</div>
            <div className="text-xs font-bold">%</div>
          </div>
        </div>

        {/* Platform Badge */}
        <div className={`absolute top-4 left-4 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-semibold`}>
          {platform}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">
          {title}
        </h3>

        {/* Score Details */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-600 font-medium">Description</div>
            <div className="font-bold text-blue-600 text-lg">{property.text_similarity?.toFixed(0) || 0}%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-600 font-medium">Features</div>
            <div className="font-bold text-purple-600 text-lg">{property.structured_similarity?.toFixed(0) || 0}%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-600 font-medium">Visual</div>
            <div className="font-bold text-gray-600 text-lg">{property.image_similarity?.toFixed(0) || 0}%</div>
          </div>
        </div>
        
        {/* Match Description */}
        <div className="mb-3 p-2 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-100">
          <p className="text-xs text-gray-700 font-medium">
            {score >= 40 
              ? " Excellent match! This property closely matches your criteria."
              : score >= 30
              ? " Good match! Similar features and location."
              : " Fair match. Worth exploring for alternatives."}
          </p>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 font-medium mb-3 transition"
        >
          <span>{expanded ? "Show Less" : "View Details"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expandable Details */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 pb-3 border-t border-gray-200 pt-3 text-sm text-gray-700"
          >
            <p className="mb-2"><strong>Index:</strong> {property.rental_index}</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 flex items-center gap-1 break-all text-xs"
            >
              <ExternalLink className="w-3 h-3" />
              View Listing
            </a>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-3">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Listing
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard Component ---
const ResultsDashboard = ({ searchData, onCompare }) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [originalProperty, setOriginalProperty] = useState(null);

  useEffect(() => {
    if (!searchData?.url) return;
    
    let isMounted = true; 
    
    const loadResults = async () => {
      setLoading(true);
      try {
        const response = await findMatchesForUrl(searchData.url);
        
        if (!isMounted) return;
        
        setResults(response.matches || []);
        setOriginalProperty(response.sale_listing || null); 
      } catch (err) {
        console.error("Failed to load results:", err.response?.data?.detail || err.message);
        setResults([]);
        setOriginalProperty(null);
      } finally {
        if (isMounted) {
            setLoading(false);
        }
      }
    };
    
    loadResults();
    
    return () => {
        isMounted = false;
    }
    
  }, [searchData]);
  
  // Custom function to handle bad scraped titles
  const getSaleListingDisplayText = (originalProperty, searchData) => {
    if (originalProperty?.title && (
        originalProperty.title.toLowerCase().includes('javascript') || 
        originalProperty.title.toLowerCase().includes('unknown property')
    )) {
        return searchData.url; 
    }
    return originalProperty?.title || searchData.url;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sale Listing Header and Summary */}
        <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-l-4 border-blue-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-2">
            Found {results.length} Similar Rental Properties
          </h1>
          <p className="text-gray-600 break-words mb-4">
            For Sale Listing: <span className="text-blue-600 font-medium">
                {getSaleListingDisplayText(originalProperty, searchData)}
            </span>
          </p>

          {/* SALE LISTING DETAILS */}
          {originalProperty && (
            <div className="flex flex-col sm:flex-row gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="sm:w-1/3 flex-shrink-0">
                    <img 
                        src={originalProperty.images?.[0] || "https://via.placeholder.com/400x250?text=Sale+Image"} 
                        alt={originalProperty.title || "Sale Property"} 
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                </div>
                <div className="sm:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{originalProperty.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Price:</span> ${originalProperty.price.toLocaleString()} | 
                        <span className="font-medium"> Rooms:</span> {originalProperty.rooms} | 
                        <span className="font-medium"> Location:</span> {originalProperty.location}
                    </p>
                    <p className="text-gray-600 text-sm overflow-hidden text-ellipsis max-h-24">
                        {originalProperty.desc ? originalProperty.desc.substring(0, 200) + '...' : 'No description available.'}
                    </p>
                    <a href={originalProperty.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm mt-1 inline-block font-medium">
                        View Original Listing →
                    </a>
                </div>
            </div>
          )}
          {/* --------------------------- */}
          
        </motion.div>

        {results.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
               Top Matching Rentals
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {results.map((result, index) => (
                <MatchCard
                  key={result.rental_index || index}
                  property={result}
                  index={index}
                  onCompare={onCompare}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-lg mx-auto text-center"
          >
            <Home className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">No Matches Found</h2>
            <p className="text-gray-700">The AI could not find matches for this property. Try another URL.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;