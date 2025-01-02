import React from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-lg shadow-xl p-8 md:p-12"
        >
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg">
              Have questions or suggestions? We'd love to hear from you. Fill
              out the form and our team will get back to you as soon as
              possible.
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2">
            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()} // Prevent default for now
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="mt-1 w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="mt-1 w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  className="mt-1 w-full h-32 px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center md:text-right">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;