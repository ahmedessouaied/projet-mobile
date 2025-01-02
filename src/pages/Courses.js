import React, { useState } from 'react';
import { BookOpen, PlayCircle, Filter, Star, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const coursesData = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    theme: 'Technology',
    description: 'Comprehensive course covering modern web development techniques with hands-on projects and real-world applications.',
    instructor: 'Prof. Emily Chen',
    documentationUrl: '/docs/web-dev-fundamentals',
    videoUrl: 'https://example.com/web-dev-intro-video',
    image: '/images/course.png',
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
    image: '/images/course.png',
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
    image: '/images/course.png',
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
    image: '/images/course.png',
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
    image: '/images/course.png',
    duration: '9 weeks',
    rating: 4.6
  }
];

const Courses = () => {
  const [selectedTheme, setSelectedTheme] = useState('All');

  // Get unique themes
  const themes = ['All', ...new Set(coursesData.map(course => course.theme))];

  // Filter courses based on selected theme
  const filteredCourses = selectedTheme === 'All' 
    ? coursesData 
    : coursesData.filter(course => course.theme === selectedTheme);

  // Star rating component
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
    <>
      <div className="bg-gray-50 min-h-screen">
          <Navbar/>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header with Logo and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center">
              <img 
                src={'UniHub.png'} 
                alt="UniHub Logo" 
                className="h-12 md:h-16 object-contain mb-4 md:mb-0"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-4">Courses</h1>
            </div>
            
            {/* Theme Filter */}
            <div className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4">
              <Filter className="text-gray-600 mr-2 hidden md:block" />
              {themes.map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`
                    px-4 py-2 rounded-full transition-all duration-300 
                    text-sm font-medium flex items-center
                    ${selectedTheme === theme 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'}
                  `}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden 
                          transition-all duration-300 hover:shadow-xl 
                          border border-gray-100 hover:border-blue-100"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover 
                              transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-800">{course.duration}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h2>
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
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <a 
                      href={course.documentationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center 
                                px-4 py-2 bg-green-500 text-white 
                                rounded-lg hover:bg-green-600 
                                transition-colors text-sm font-medium"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Documentation
                    </a>
                    <a 
                      href={course.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center 
                                px-4 py-2 bg-red-500 text-white 
                                rounded-lg hover:bg-red-600 
                                transition-colors text-sm font-medium"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Courses Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center text-gray-500 mt-16 bg-white p-8 rounded-lg shadow-md">
              <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-xl">No courses found in this theme.</p>
              <p className="text-sm text-gray-400 mt-2">Try selecting a different theme or reset the filter.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Courses;