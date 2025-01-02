import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

// Mock events data (unchanged)
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
    }
];

const EventCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);

        // Adjust to start of week (Sunday)
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        // Adjust to end of week (Saturday)
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

    // Find events for a specific date
    const getEventsForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return initialEvents.filter(event => event.date === formattedDate);
    };

    // Change month
    const changeMonth = (increment) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
    };

    // Format date helper
    const formatDate = (date, type = 'day') => {
        if (type === 'day') return date.getDate();
        if (type === 'month-year') return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (type === 'full') return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calendarDays = generateCalendarDays();

    // New method to handle view event
    const handleViewEvent = (event) => {
        // In a real app, this would likely navigate to a detailed event page
        console.log('Viewing event:', event);
        alert(`Viewing Event: ${event.title}\nDate: ${event.date}`);
    };

    return (
        <>
        <Navbar />
        <div className="container mx-auto p-4 mb-8">
            {/* Previous implementation remains the same up to the event detail modal */}
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">
                        {formatDate(currentDate, 'month-year')}
                    </h1>
                </div>
                <div className="space-x-2">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => changeMonth(1)}
                        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-bold text-gray-600 p-2">{day}</div>
                ))}

                {calendarDays.map((day, index) => {
                    const eventsOnDay = getEventsForDate(day);
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                    return (
                        <div
                            key={index}
                            className={`border p-2 min-h-[120px] relative ${isCurrentMonth
                                ? 'bg-white text-black'
                                : 'bg-gray-100 text-gray-400'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{formatDate(day)}</span>
                                {eventsOnDay.length > 0 && (
                                    <span className="bg-blue-500 text-white rounded-full px-2 text-xs">
                                        {eventsOnDay.length}
                                    </span>
                                )}
                            </div>

                            {/* Event Modals */}
                            {eventsOnDay.map((event) => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className="mt-1 bg-blue-100 text-blue-800 rounded px-1 text-xs cursor-pointer truncate"
                                >
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div>
                                <strong>Type:</strong> {selectedEvent.type}
                            </div>
                            <div>
                                <strong>Location:</strong> {selectedEvent.location}
                            </div>
                            <p className="text-gray-600 mb-4">{selectedEvent.description}</p>

                            {/* New View and Close Buttons */}
                            <div className="flex justify-between space-x-2">
                                <button
                                    onClick={() => handleViewEvent(selectedEvent)}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                                >
                                    View Event
                                </button>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default EventCalendar;