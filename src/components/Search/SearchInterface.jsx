import React, { useState, useRef, useCallback } from 'react';
import {
  Search,
  Upload,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

const SearchInterface = ({ onSearch }) => {
  const [url, setUrl] = useState('');
  const [uploadedData, setUploadedData] = useState(null);
  const fileInputRef = useRef(null);

  // Simplified handler that just updates the URL state
  const handleUrlChange = useCallback((value) => {
    setUrl(value);
  }, []);

  // Simplified submission handler that sends any non-empty URL
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (url.trim()) {
        onSearch(url);
      }
    },
    [url, onSearch]
  );

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      if (file.type === 'application/json') {
        setUploadedData(JSON.parse(text));
      } else if (file.type === 'text/csv') {
        setUploadedData(text.split('\n').map((row) => row.split(',')));
      } else if (file.type.startsWith('image/')) {
        setUploadedData({ imageUrl: URL.createObjectURL(file) });
      } else {
        alert('Unsupported file type');
      }
    } catch (error) {
      alert('Invalid file format');
    }
  }, []);

  const testUrls = [
    {
      name: 'James Edition',
      url: 'https://www.jamesedition.com/real_estate/montepulciano-italy/charming-tuscany-villa-in-montepulciano-12966847'
    },
    {
      name: 'Idealista',
      url: 'https://www.idealista.com/inmueble/95847362/'
    },
    {
      name: 'Immobiliare',
      url: 'https://www.immobiliare.it/en/annunci/124171137/'
    }
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Find Similar Rental Properties
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Enter any property-for-sale URL to discover similar vacation rentals from our database.
          </p>
        </motion.div>

        {/* Main Search Form */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 mb-10 border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property For-Sale URL
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="Paste any property URL (Zillow, Redfin, etc.)"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-base sm:text-lg transition-all"
                  required
                />
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!url.trim()} // Button is only disabled if the input is empty
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5 mr-2 inline-block" />
              Start AI Matching Process
            </motion.button>
          </form>

          {/* Upload Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,.csv,image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Don't have a URL? Upload property details manually
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              onClick={() => fileInputRef.current.click()}
            >
              Upload CSV / JSON / Images
            </motion.button>

            {/* Preview Uploaded Data */}
            {uploadedData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-left text-sm overflow-x-auto">
                <strong>Uploaded Data Preview:</strong>
                <pre className="whitespace-pre-wrap mt-2 text-gray-700 text-xs sm:text-sm">
                  {JSON.stringify(uploadedData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </motion.div>

        {/* Test URLs Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Try These Example URLs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testUrls.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setUrl(item.url);
                }}
                className="p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
              >
                <p className="font-semibold text-blue-600 mb-2">{item.name}</p>
                <p className="text-xs text-gray-600 line-clamp-2 break-all">{item.url}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchInterface;