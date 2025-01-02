import React, { useState } from 'react';
import { BookOpen, PlayCircle, Filter, Star, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const coursesData = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    theme: 'Technology',
    description: 'Comprehensive course covering modern web development techniques with hands-on projects and real-world applications.',
    instructor: 'Prof. Emily Chen',
    documentationUrl: '/docs/web-dev-fundamentals',
    videoUrl: 'https://example.com/web-dev-intro-video',
    image: '/images/web.jpg',
    duration: '8 weeks',
    rating: 4.7
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    theme: 'Data Science',
    description: 'Advanced data analysis and machine learning course with Python, focusing on practical industry applications.',
    instructor: 'Dr. Michael Rodriguez',
    documentationUrl: '/docs/data-science-essentials',
    videoUrl: 'https://example.com/data-science-intro-video',
    image: '/images/data science.jpg',
    duration: '10 weeks',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Digital Marketing Strategies',
    theme: 'Business',
    description: 'Cutting-edge digital marketing techniques, SEO, social media marketing, and brand development strategies.',
    instructor: 'Sarah Johnson',
    documentationUrl: '/docs/digital-marketing',
    videoUrl: 'https://example.com/digital-marketing-intro',
    image: '/images/digital marketing.webp',
    duration: '6 weeks',
    rating: 4.5
  },
  {
    id: 4,
    title: 'Artificial Intelligence Basics',
    theme: 'Technology',
    description: 'Foundational course in AI and machine learning, covering neural networks, deep learning, and practical implementations.',
    instructor: 'Prof. Alex Kim',
    documentationUrl: '/docs/ai-basics',
    videoUrl: 'https://example.com/ai-intro-video',
    image: '/images/AI.jpg',
    duration: '12 weeks',
    rating: 4.8
  },
  {
    id: 5,
    title: 'Entrepreneurship and Startup Culture',
    theme: 'Business',
    description: 'Comprehensive program on startup ecosystem, business planning, funding strategies, and innovative entrepreneurship.',
    instructor: 'Mark Thompson',
    documentationUrl: '/docs/entrepreneurship',
    videoUrl: 'https://example.com/entrepreneurship-video',
    image: '/images/Entrepreneurship.webp',
    duration: '9 weeks',
    rating: 4.6
  }
];

const Courses = () => {
  const [selectedTheme, setSelectedTheme] = useState('All');
  const themes = ['All', ...new Set(coursesData.map(course => course.theme))];
  const filteredCourses = selectedTheme === 'All' 
    ? coursesData 
    : coursesData.filter(course => course.theme === selectedTheme);

  const StarRating = ({ rating }) => (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <Star 
          key={index} 
          className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-current' : 'stroke-current'}`}
        />
      ))}
      <span className="text-gray-600 ml-2 text-sm">({rating})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div className="flex items-center">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={'UniHub.png'} 
              alt="UniHub Logo" 
              className="h-12 md:h-16 object-contain mb-4 md:mb-0"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text ml-4" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}>
              Courses
            </h1>
          </div>
          
          <div className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4">
            <Filter className="text-gray-600 mr-2 hidden md:block" />
            {themes.map(theme => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`
                  px-4 py-2 rounded-full transition-all duration-300 
                  text-sm font-medium flex items-center shadow-md
                  ${selectedTheme === theme 
                    ? 'text-white' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'}
                `}
                style={selectedTheme === theme ? { backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' } : {}}
              >
                {theme}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCourses.map(course => (
              <motion.div 
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                          border border-gray-100 hover:border-blue-200"
              >
                <div className="relative h-48 overflow-hidden group">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-800">{course.duration}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}>
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4 h-20 overflow-hidden text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                      Instructor: <span className="font-medium text-gray-700">{course.instructor}</span>
                    </div>
                    <StarRating rating={course.rating} />
                  </div>
                  
                  <div className="text-sm font-medium text-blue-600 mb-4">
                    Theme: {course.theme}
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={course.documentationUrl}
                      className="flex-1 flex items-center justify-center px-4 py-2 
                                text-white 
                                rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Documentation
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={course.videoUrl}
                      className="flex-1 flex items-center justify-center px-4 py-2 
                                text-white 
                                rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Preview
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-500 mt-16 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md"
          >
            <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-xl">No courses found in this theme.</p>
            <p className="text-sm text-gray-400 mt-2">Try selecting a different theme or reset the filter.</p>
          </motion.div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Courses;