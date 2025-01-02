import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const initialEvents = [
    {
        id: 1,
        title: "Annual Tech Conference",
        date: "2024-07-15",
        type: "Conference",
        description: "Join us for cutting-edge tech discussions and networking.",
        location: "University Main Hall"
    },
    {
        id: 2,
        title: "Hackathon 2024",
        date: "2024-08-22",
        type: "Hackathon",
        description: "24-hour coding challenge with exciting prizes!",
        location: "Innovation Center"
    },
    {
        id: 3,
        title: "Research Symposium",
        date: "2024-07-10",
        type: "Academic",
        description: "Showcase of latest research by university scholars.",
        location: "Science Building Auditorium"
    },
    { id: 4, title: "Winter Coding Bootcamp", date: "2024-12-10", type: "Workshop", description: "Learn advanced programming skills in this winter bootcamp.", location: "Room 101" },
    { id: 5, title: "Holiday Charity Drive", date: "2024-12-15", type: "Community", description: "Contribute to our holiday charity event.", location: "Student Center" },
    { id: 6, title: "Physics Lecture Series", date: "2024-12-18", type: "Academic", description: "Guest speaker: Dr. Albert Newton.", location: "Physics Lab" },
    { id: 7, title: "New Year Gala", date: "2025-01-05", type: "Social", description: "Celebrate the new year with friends and faculty.", location: "University Banquet Hall" },
    { id: 8, title: "AI and Robotics Meetup", date: "2025-01-12", type: "Meetup", description: "Discuss AI trends and robotics innovations.", location: "Tech Hub" },
    { id: 9, title: "Spring Semester Orientation", date: "2025-01-20", type: "Orientation", description: "Welcome new students to the spring semester.", location: "Auditorium" },
    { id: 10, title: "Mathematics Workshop", date: "2025-01-22", type: "Workshop", description: "Advanced calculus for engineering students.", location: "Room 302" },
    { id: 11, title: "Startup Pitch Event", date: "2025-02-03", type: "Entrepreneurship", description: "Showcase innovative ideas to investors.", location: "Business Center" },
    { id: 12, title: "Cultural Night", date: "2025-02-10", type: "Cultural", description: "Celebrate diversity with performances and food.", location: "Main Hall" },
    { id: 13, title: "Science Fair", date: "2025-02-15", type: "Exhibition", description: "Present your science projects to the university.", location: "Exhibition Hall" },
    { id: 14, title: "Chess Championship", date: "2025-02-18", type: "Competition", description: "Compete against the best chess players.", location: "Recreation Room" },
    { id: 15, title: "Environmental Awareness Talk", date: "2025-02-22", type: "Seminar", description: "Learn how to make the campus greener.", location: "Green Room" },
    { id: 16, title: "Art Exhibition", date: "2025-02-25", type: "Exhibition", description: "Showcase of student artwork.", location: "Art Gallery" },
    { id: 17, title: "Career Fair", date: "2025-02-28", type: "Career", description: "Meet potential employers and plan your future.", location: "Career Center" }
];

const EventCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [direction, setDirection] = useState(0);

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
        const days = [];
        const currentDay = new Date(startDate);
        while (currentDay <= endDate) {
            days.push(new Date(currentDay));
            currentDay.setDate(currentDay.getDate() + 1);
        }
        return days;
    };

    const getEventsForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return initialEvents.filter(event => event.date === formattedDate);
    };

    const changeMonth = (increment) => {
        setDirection(increment);
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
    };

    const formatDate = (date, type = 'day') => {
        if (type === 'day') return date.getDate();
        if (type === 'month-year') return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (type === 'full') return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleViewEvent = (event) => {
        console.log('Viewing event:', event);
        alert(`Viewing Event: ${event.title}\nDate: ${event.date}`);
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />
            <div className="container mx-auto p-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <motion.h1
                            key={currentDate.toString()}
                            initial={{ x: direction * 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-3xl font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                        >
                            {formatDate(currentDate, 'month-year')}
                        </motion.h1>
                        <div className="space-x-2">
                            <button
                                onClick={() => changeMonth(-1)}
                                className="px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => changeMonth(1)}
                                className="px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="font-bold text-gray-600 p-2">{day}</div>
                        ))}

                        {calendarDays.map((day, index) => {
                            const eventsOnDay = getEventsForDate(day);
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.01 }}
                                    key={index}
                                    className={`border rounded-lg p-2 min-h-[120px] relative transition-all duration-300 hover:shadow-md ${
                                        isCurrentMonth
                                            ? 'bg-white/80 backdrop-blur-sm'
                                            : 'bg-gray-100/50 text-gray-400'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{formatDate(day)}</span>
                                        {eventsOnDay.length > 0 && (
                                            <span className="text-white rounded-full px-2 py-0.5 text-xs" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}>
                                                {eventsOnDay.length}
                                            </span>
                                        )}
                                    </div>

                                    {eventsOnDay.map((event) => (
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            key={event.id}
                                            onClick={() => setSelectedEvent(event)}
                                            className="mt-1 text-blue-800 rounded-lg px-2 py-1 text-xs cursor-pointer truncate transition-all duration-300"
                                            style={{ backgroundImage: 'linear-gradient(to right, #e0e7ff, #ede9fe)' }}
                                        >
                                            {event.title}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                <AnimatePresence>
                    {selectedEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white p-6 rounded-xl max-w-md w-full m-4 shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}>
                                        {selectedEvent.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Type:</strong> {selectedEvent.type}
                                    </div>
                                    <div>
                                        <strong>Location:</strong> {selectedEvent.location}
                                    </div>
                                    <p className="text-gray-600">{selectedEvent.description}</p>

                                    <div className="flex justify-between space-x-2 pt-4">
                                        <button
                                            onClick={() => handleViewEvent(selectedEvent)}
                                            className="flex-1 text-white py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                            style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                                        >
                                            View Event
                                        </button>
                                        <button
                                            onClick={() => setSelectedEvent(null)}
                                            className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 py-2 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default EventCalendar;