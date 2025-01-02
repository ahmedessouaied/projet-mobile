import { React, useState, useEffect } from "react";
import Header from '../components/Header';
import SearchAndFilter from "../components/SearchAndFilter";
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Assuming you have configured Firebase

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
        const matchesCategory = selectedCategory === 'all' || event.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 mb-8">
                <Header />
                <SearchAndFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => <EventCard key={event.id} event={event} />)
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default EventsPage;
