import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Users,
  CalendarDays,
  CheckCircle,
  GraduationCap,
  Monitor,
} from 'lucide-react';

const About = () => {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const teamVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="bg-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4"
              >
                Empowering Students Through Engaging Events
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8"
              >
                UniHub is more than just a platform; it's a community. We're dedicated to enriching the student experience by providing a central hub for discovering, organizing, and participating in a wide range of events.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors font-semibold text-base"
                >
                  Explore Events
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <motion.img
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                src="/UniHub.png"
                alt="UniHub Logo"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Our Mission Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8"
        >
          Our Mission
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-lg text-center max-w-3xl mx-auto"
        >
          At UniHub, our mission is to connect students with opportunities that enhance their academic and social lives. We strive to create a vibrant campus culture by making it easy to find and participate in events that foster learning, collaboration, and personal growth.
        </motion.p>
      </motion.div>

      {/* Key Features Section */}
      <div className="bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-white mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <CalendarDays className="text-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Event Discovery
              </h3>
              <p className="text-gray-600 text-center">
                Easily find events that match your interests and schedule.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <Users className="text-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community Building
              </h3>
              <p className="text-gray-600 text-center">
                Connect with other students and build a strong campus community.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <CheckCircle className="text-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Seamless Registration
              </h3>
              <p className="text-gray-600 text-center">
                Register for events quickly and securely with our streamlined process.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Our Impact
        </motion.h2>

        <motion.div
          variants={statsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg mx-auto max-w-4xl py-8 px-6 shadow-md flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { label: 'Students Engaged', count: '5,000+', icon: <GraduationCap className="text-blue-600" /> },
            { label: 'Events Hosted', count: '500+', icon: <Monitor className="text-blue-600" /> },
            { label: 'Universities', count: '5', icon: <Users className="text-blue-600" /> }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-12 h-12">{stat.icon}</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{stat.count}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Our Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div
              variants={teamVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <img
                src="..\Ahmed.jpg"
                alt="Ahmed Essoauied"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Ahmed Essouaied
              </h3>
              <p className="text-gray-600">Co-founder & CEO</p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              variants={teamVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <img
                src="..\Habib.jpg"
                alt="Habib Bekir"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Habib Bekir
              </h3>
              <p className="text-gray-600">Co-founder & CTO</p>
            </motion.div>

            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;