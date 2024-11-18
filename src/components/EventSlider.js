import React from 'react';
import ReactCardSlider from 'react-card-slider-component';

const EventSlider = () => {
    const events = [
        {
            image: "/HerosectionHomeimage.png",
            title: "TechPoint S24: Future AI",
            date: "Saturday, 17th January '24",
            location: "NICHES SCHOOL OF COMMUNICATION",
            category: "Tech",
            organizer: "Instaback Team",
            description: "event",
            time: "10:00 AM",
            capacity: 500,
            price: 0,
        },
        {
            image: "/HerosectionHomeimage.png",
            title: "TechPoint S24: Future AI",
            date: "Thursday, 25th January '24",
            location: "Body Text",
            category: "AI",
            organizer: "TechPoint",
            description: "event",
            time: "2:00 PM",
            capacity: 300,
            price: 20,
        },
        {
            image: "/HerosectionHomeimage.png",
            title: "TechPoint S24: Future AI",
            date: "Thursday, 25th January '24",
            location: "Body Text",
            category: "AI",
            organizer: "TechPoint",
            description: "event",
            time: "2:00 PM",
            capacity: 300,
            price: 20,
        },
        {
            image: "/HerosectionHomeimage.png",
            title: "TechPoint S24: Future AI",
            date: "Thursday, 25th January '24",
            location: "Body Text",
            category: "AI",
            organizer: "TechPoint",
            description: "event",
            time: "2:00 PM",
            capacity: 300,
            price: 20,
        },
        {
            image: "/HerosectionHomeimage.png",
            title: "TechPoint S24: Future AI",
            date: "Thursday, 25th January '24",
            location: "Body Text",
            category: "AI",
            organizer: "TechPoint",
            description: "event",
            time: "2:00 PM",
            capacity: 300,
            price: 20,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 mb-16">
            <ReactCardSlider
                slides={events}
                slidesToShow={3} // Default number of slides to show
                slidesToScroll={1} // How many slides to scroll at a time
                responsive={[
                    {
                        breakpoint: 1024, // For tablets and large screens
                        settings: {
                            slidesToShow: 2, // Show 2 slides on tablets
                        },
                    },
                    {
                        breakpoint: 640, // For mobile screens
                        settings: {
                            slidesToShow: 1, // Show 1 slide on mobile
                        },
                    },
                ]}
            />
        </div>
    );
};

export default EventSlider;