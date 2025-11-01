import React, { memo } from "react";
import {
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  ExternalLink,
  Heart,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "How It Works", href: "#" },
    { name: "AI Technology", href: "#" },
    { name: "Supported Platforms", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "API Access", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Property Guides", href: "#" },
    { name: "Market Reports", href: "#" },
    { name: "Best Practices", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Data Processing", href: "#" },
    { name: "Compliance", href: "#" },
  ],
};

const features = [
  { icon: Shield, title: "Data Privacy", description: "Your searches are secure" },
  { icon: Zap, title: "Lightning Fast", description: "Results in under 30 seconds" },
  { icon: Globe, title: "Global Coverage", description: "Properties worldwide" },
];

const stats = [
  { label: "Properties Analyzed", value: "50,000+" },
  { label: "Successful Matches", value: "25,000+" },
  { label: "Platforms Connected", value: "8" },
  { label: "Countries Covered", value: "45" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        {/* Brand & Links */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">PropertyMatch</h3>
                <p className="text-blue-200 text-sm">AI-Powered Property Matching</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              The most advanced AI-powered platform for finding similar vacation rentals
              from any property-for-sale listing.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6 text-gray-300 text-sm">
              <p className="flex items-center justify-center lg:justify-start gap-2">
                <Mail className="w-4 h-4" /> hello@propertymatch.ai
              </p>
              <p className="flex items-center justify-center lg:justify-start gap-2">
                <Phone className="w-4 h-4" /> +1 (555) 123-4567
              </p>
              <p className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4" /> San Francisco, CA
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              {Object.entries(footerLinks).map(([key, links]) => (
                <div key={key}>
                  <h4 className="text-lg font-semibold mb-4 capitalize">{key}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm flex items-center justify-center md:justify-start group"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:scale-105 transition"
            >
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 border-t border-white/10 pt-10 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-5 bg-white/5 rounded-xl border border-white/10 hover:scale-105 transition"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="max-w-md mx-auto text-center border-t border-white/10 pt-10">
          <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
          <p className="text-gray-300 mb-5 text-sm">
            Get the latest updates on new features and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 mt-10 flex flex-col md:flex-row items-center justify-between text-center gap-3 text-sm text-gray-300">
          <div>© {currentYear} PropertyMatch AI. All rights reserved.</div>
          <div className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" /> for the real estate community
          </div>
          <div>Privacy First • Global Coverage</div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
