import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Wifi,
  Car,
  Utensils,
  Waves,
  Star,
  Calendar,
  BarChart3,
  Download,
  Share2,
} from "lucide-react";

const PropertyComparison = React.memo(({ property, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ✅ Memoized original property (avoids recreating object every render)
  const originalProperty = useMemo(
    () => ({
      title: "Luxury Tuscan Estate - For Sale",
      price: "$2,450,000",
      location: "Tuscany, Italy",
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      sqft: "4,200",
      images: [
        "https://images.pexels.com/photos/1129413/pexels-photo-1129413.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      amenities: [
        "pool",
        "wifi",
        "kitchen",
        "parking",
        "spa",
        "gym",
        "wine-cellar",
        "garden",
      ],
      description:
        "Magnificent restored villa in the heart of Tuscany featuring panoramic views, infinity pool, wine cellar, and beautifully landscaped gardens. This historic property combines traditional Tuscan architecture with modern luxury amenities.",
      features: {
        "Property Type": "Villa",
        "Year Built": "1650 (Restored 2020)",
        "Lot Size": "5.2 acres",
        Pool: "Infinity Pool",
        Parking: "4-car garage",
        View: "Panoramic countryside",
      },
    }),
    []
  );

  // ✅ Memoized rental images so they don’t recreate every render
  const rentalImages = useMemo(
    () => [
      property.image,
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    [property.image]
  );

  // ✅ Memoized comparison data
  const comparisonData = useMemo(
    () => [
      { category: "Image Similarity", score: property.similarity, color: "bg-blue-500" },
      { category: "Location Match", score: 89, color: "bg-green-500" },
      { category: "Amenity Overlap", score: 76, color: "bg-purple-500" },
      { category: "Size Compatibility", score: 82, color: "bg-orange-500" },
      { category: "Style Match", score: 91, color: "bg-teal-500" },
    ],
    [property.similarity]
  );

  // ✅ Memoized amenities comparison
  const { sharedAmenities, uniqueToOriginal, uniqueToRental } = useMemo(() => {
    return {
      sharedAmenities: originalProperty.amenities.filter((a) => property.amenities.includes(a)),
      uniqueToOriginal: originalProperty.amenities.filter((a) => !property.amenities.includes(a)),
      uniqueToRental: property.amenities.filter((a) => !originalProperty.amenities.includes(a)),
    };
  }, [property.amenities, originalProperty.amenities]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <button
            onClick={onBack}
            className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Results</span>
          </button>

          <div className="flex items-center justify-center sm:justify-end space-x-3">
            <button className="bg-white/95 backdrop-blur-md text-gray-700 px-4 py-2 rounded-xl shadow-lg border border-white/20 hover:bg-gray-50 transition-colors flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="relative w-full max-h-[400px] overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              src={rentalImages[activeImageIndex]}
              alt="property"
              loading="lazy" // ✅ Lazy loading for better performance
              className="w-full h-[300px] sm:h-[400px] object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Image controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {rentalImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  activeImageIndex === index ? "bg-blue-600" : "bg-gray-300"
                } transition-colors`}
              />
            ))}
          </div>
        </div>

        {/* Comparison Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {comparisonData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col"
            >
              <span className="font-semibold">{item.category}</span>
              <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                <motion.div
                  className={`h-3 rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-1">{item.score}% Match</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PropertyComparison;
