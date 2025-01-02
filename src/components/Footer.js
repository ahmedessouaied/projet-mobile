import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="/">
            <img src="/unihub.png" alt="UniHub Logo" className="h-10 mb-4" />
          </a>
          <p className="text-gray-400 mb-4">
            UniHub is your central platform for discovering and engaging with university events.
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>SUP'COM </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span>+216 20 200 200</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <a href="mailto:info@unihub.com" className="hover:text-blue-400 transition-colors">info@unihub.com</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-blue-400 transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:text-blue-400 transition-colors">
                Courses
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-400 transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-3">
            <li>
              <a href="/faq" className="hover:text-blue-400 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Subscribe to Our Newsletter
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 border-t border-gray-700 pt-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} UniHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;