import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Image,
  Search,
  BarChart3,
  Download,
  Zap,
  Globe,
  Shield,
} from "lucide-react";

// ✅ Move static data outside the component to avoid re-creation
const stats = [
  { number: "95%", label: "Matching Accuracy" },
  { number: "50K+", label: "Properties Analyzed" },
  { number: "8", label: "Rental Platforms" },
  { number: "30s", label: "Average Search Time" },
];

// ✅ Memoized Feature Card (prevents unnecessary re-renders)
const FeatureCard = memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.05 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03 }}
    className="group relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    {/* Icon */}
    <motion.div
      whileHover={{ rotate: 5, scale: 1.1 }}
      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}
    >
      <feature.icon className="w-6 h-6 text-white" />
    </motion.div>

    {/* Content */}
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
      {feature.title}
    </h3>
    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
      {feature.description}
    </p>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
  </motion.div>
));

const Features = () => {
  // ✅ Memoize features so they are created only once
  const features = useMemo(
    () => [
      {
        icon: Brain,
        title: "AI-Powered Matching",
        description:
          "Advanced deep learning models analyze photos, descriptions, and amenities to find perfect rental matches with 95% accuracy.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        icon: Image,
        title: "Visual Similarity",
        description:
          "CLIP and ResNet models compare property photos to identify visually similar rentals across all platforms.",
        color: "from-blue-500 to-teal-600",
      },
      {
        icon: Search,
        title: "Multi-Platform Search",
        description:
          "Search across Airbnb, Booking, Vrbo, EmmaVillas, PosarelliVillas, and Tuscany Now & More simultaneously.",
        color: "from-emerald-500 to-green-600",
      },
      {
        icon: BarChart3,
        title: "Similarity Scoring",
        description:
          "Get detailed similarity percentages based on location, amenities, photos, and property features.",
        color: "from-orange-500 to-red-500",
      },
      {
        icon: Download,
        title: "Export Results",
        description:
          "Download your property matches as CSV or PDF reports for easy sharing and analysis.",
        color: "from-pink-500 to-rose-600",
      },
      {
        icon: Zap,
        title: "Instant Results",
        description:
          "Get comprehensive matching results in under 30 seconds using our optimized AI pipeline.",
        color: "from-yellow-500 to-amber-600",
      },
      {
        icon: Globe,
        title: "Global Coverage",
        description:
          "Search properties worldwide with support for major real estate platforms in Europe and beyond.",
        color: "from-cyan-500 to-blue-600",
      },
      {
        icon: Shield,
        title: "Data Privacy",
        description:
          "Your searches are private and secure. We don't store personal data or property information.",
        color: "from-indigo-500 to-purple-600",
      },
    ],
    []
  );

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why PropertyMatch AI is Different
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Combining cutting-edge AI technology with comprehensive data coverage
            to deliver the most accurate property matching results in the
            industry.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
