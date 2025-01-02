import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock, MapPin, Tag, User, AlertCircle } from 'lucide-react';

const EventSlider = () => {
  const events = [
    {
      image: "/HerosectionHomeimage.png",
      title: "TechPoint S24: Future of AI",
      date: "Saturday, 17th January '24",
      location: "NICHES SCHOOL OF COMMUNICATION",
      category: "Tech",
      organizer: "Instaback Team",
      description: "Explore the future of Artificial Intelligence with leading experts and innovators.",
      time: "10:00 AM",
      capacity: 500,
      price: 0,
    },
    {
      image: "/HerosectionHomeimage.png",
      title: "Web Development Workshop",
      date: "Thursday, 25th January '24",
      location: "Online",
      category: "Web Dev",
      organizer: "WebDev Society",
      description: "Hands-on workshop covering the latest trends in web development.",
      time: "2:00 PM",
      capacity: 100,
      price: 20,
    },
    {
      image: "/HerosectionHomeimage.png",
      title: "Data Science Symposium",
      date: "Friday, 9th February '24",
      location: "Convention Center",
      category: "Data Science",
      organizer: "DataX Club",
      description: "Dive deep into the world of data science and its applications.",
      time: "9:00 AM",
      capacity: 300,
      price: 50,
    },
    {
      image: "/HerosectionHomeimage.png",
      title: "UI/UX Design Masterclass",
      date: "Monday, 19th February '24",
      location: "Design Hub",
      category: "Design",
      organizer: "Design Guild",
      description: "Master the art of UI/UX design with industry professionals.",
      time: "1:00 PM",
      capacity: 80,
      price: 35,
    },
    {
      image: "/HerosectionHomeimage.png",
      title: "Cybersecurity Conference",
      date: "Saturday, 2nd March '24",
      location: "Security Hall",
      category: "Cybersecurity",
      organizer: "CyberSec Society",
      description: "Learn about the latest threats and defense mechanisms in cybersecurity.",
      time: "10:00 AM",
      capacity: 200,
      price: 0,
    },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="text-gray-600 mb-4">
                  <p className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                  <span className="text-gray-600">
                    {event.price === 0 ? "Free" : `${event.price} DT`}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSlider;