import React, { useState, useMemo, useCallback } from "react";
import { Search, Sparkles, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const Hero = React.memo(({ onSearch }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Memoized Example URLs
  const exampleUrls = useMemo(
    () => [
      "idealista.com/inmueble/95847362",
      "jamesedition.com/real_estate/tuscany-italy",
      "immobiliare.it/annunci/123456789",
    ],
    []
  );

  // ✅ Callback to avoid re-creating on every render
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!url.trim()) return;

      setIsLoading(true);
      // Simulate network call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSearch(url);
      setIsLoading(false);
    },
    [url, onSearch]
  );

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-teal-600">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Animated Background Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-spin" />
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
              AI-Powered Property Matching
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Find Perfect
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
              Rental Matches
            </span>
            for Any Property
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Enter any property-for-sale URL and our AI instantly finds similar
            vacation rentals from Airbnb, Booking, Vrbo, and premium villa
            collections with 95% accuracy.
          </motion.p>

          {/* Search Form */}
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste property URL (JamesEdition, Idealista, etc.)"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    required
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Find Matches
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Example URLs */}
              <div className="mt-4 text-left">
                <p className="text-sm text-gray-600 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleUrls.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setUrl(`https://${example}`)}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:scale-105 transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.form>

          {/* Demo Video Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors group">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium">Watch 2-min demo</span>
            </button>
            <div className="text-blue-200 text-sm">
              See how our AI matches properties with 95% accuracy
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
