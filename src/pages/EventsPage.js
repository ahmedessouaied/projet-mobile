import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import SearchAndFilter from "../components/SearchAndFilter";
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from 'framer-motion';

const EventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [events, setEvents] = useState([]);

    const categories = [
        { id: 'all', name: 'All Events' },
        { id: 'conference', name: 'Conferences' },
        { id: 'competition', name: 'Competitions' },
        { id: 'workshop', name: 'Workshops' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.name,
                        description: data.description,
                        category: data.type,
                        date: data.date?.toDate().toLocaleDateString(), // Format date if necessary
                        time: data.date?.toDate().toLocaleTimeString(), // Format time if necessary
                        location: data.location,
                        price: data.price || 0,
                        capacity: data.capacity || 0,
                        organizer: data.organizer || "Unknown",
                        image: data.thumbnail,
                    };
                });
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Header />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <SearchAndFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                    />
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <motion.div key={event.id} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                                <EventCard event={event} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div variants={itemVariants}>
                            <EmptyState />
                        </motion.div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default EventsPage;