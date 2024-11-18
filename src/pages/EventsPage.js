import { React, useState } from "react";
import Header from '../components/Header'; 
import SearchAndFilter from "../components/SearchAndFilter";
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import Navbar from "../components/Navbar";

const EventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const events = [
        {
            id: 1,
            title: "Tech Innovation Conference",
            description: "Join us for a day of technological innovation and networking with industry experts.",
            category: "conference",
            date: "2024-12-15",
            time: "09:00",
            location: "Main Auditorium",
            price: 50,
            capacity: 200,
            organizer: "Computer Science Club",
            image: "https://www.supcom.tn/storage/app/public/evenements/October2023/Jhm90kQjo2d83ynNQGhw.jpg",
        },
        {
            id: 2,
            title: "Robotics Competition",
            description: "Annual robotics competition showcasing student projects and innovations.",
            category: "competition",
            date: "2024-12-20",
            time: "14:00",
            location: "Engineering Lab",
            price: 25,
            capacity: 100,
            organizer: "Robotics Club",
            image: "https://ras-supcom.ieee.tn/img/rascolor.png",
        },
        {
            id: 3,
            title: "IndabaX Tunisia 2024",
            description: "Join us for a day of technological innovation and networking with industry experts.",
            category: "competition",
            date: "2024-12-20",
            time: "14:00",
            location: "Higher School of Communication of Tunis",
            price: 0,
            capacity: 100,
            organizer: "IEEE SUP'COM SB",
            image: "https://indabaxtunisia.com/2024/assets/images/white_logo.png",
        },
    ];

    const categories = [
        { id: 'all', name: 'All Events' },
        { id: 'conference', name: 'Conferences' },
        { id: 'competition', name: 'Competitions' },
        { id: 'workshop', name: 'Workshops' },
    ];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
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
        </>
    );
};

export default EventsPage;
