import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const HeroSectionHome = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const parallaxEffect = () => {
      if (window.innerWidth < 768) {
        const scrolled = window.scrollY;
        const parallax = parallaxRef.current;
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', parallaxEffect);
    return () => window.removeEventListener('scroll', parallaxEffect);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 py-12 md:py-16 lg:py-24">
      {/* Background Image for Mobile */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full md:hidden"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="/HerosectionHomeimage.png"
          alt="Home page"
          className="w-full h-full object-cover blur-[2px] scale-110"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Discover & Engage with University Events
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-8">
              Your one-stop destination for all university club events. Stay
              connected, explore new interests, and make the most of your
              campus life.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Explore Events
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-300 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Main Image (Hidden on mobile, shown on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end"
          >
            <img
              src="/HerosectionHomeimage.png"
              alt="Home page"
              className="w-full max-w-lg rounded-lg shadow-xl object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionHome;