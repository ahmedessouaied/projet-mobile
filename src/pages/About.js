import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-8 md:py-16 lg:py-8 relative z-20"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Text Content */}
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-1/2 p-5"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4"
            >
              Know more about us
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8 max-w-lg"
            >
              This website was created as part of an academic project at the Higher Institute of Communication in Tunis, under the supervision of Mrs. Maroua Nouioua. Its main goal is to promote events organized by various clubs at our university and other universities. Additionally, it aims to facilitate the registration and payment processes.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800 z-20 text-white sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-blue-950 transition-colors font-semibold text-sm sm:text-base"
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-1/2 p-5"
          >
            <motion.img
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              src="/UniHub.png"
              alt="UniHub Logo"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-center text-4xl md:text-6xl text-gray-700 mb-6'
        >
          We had organized a great number of events
        </motion.h2>
        
        <motion.div 
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className='bg-blue-800 hover:bg-blue-950 rounded-lg mx-10 mb-10 mt-4 text-white flex flex-col-reverse md:flex-row items-center justify-center'
        >
          {[
            { label: 'Workshops', count: '+100' },
            { label: 'Keynotes', count: '+50' },
            { label: 'Conferences', count: '+30' }
          ].map((stat, index) => (
            <React.Fragment key={stat.label}>
              <motion.div 
                variants={statsVariants}
                className='p-3 text-2xl md:text-3xl text-center'
              >
                {stat.count} {stat.label}
              </motion.div>
              {index < 2 && (
                <div className='p-3 text-3xl text-white/50'>|</div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      <div>
        <div>
            <div>
                MEET OUR TEAM
            </div>
        </div>
      </div>
    
      <Footer />
    </>
  );
};

export default About;