import React from "react";
import { Image, Calendar, Clock, MapPin, Users } from "lucide-react";

const EventCard = ({ event }) => {
    // Function to truncate description to a specific length
    const truncateDescription = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength).trim() + '...';
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            {/* Image Section */}
            <div className="relative h-48 bg-gray-100">
                {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-400">
                            <Image className="mx-auto mb-2" size={32} />
                            <span className="text-sm">Event Image</span>
                        </div>
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                </div>
            </div>

            {/* Header */}
            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-gray-600">{event.organizer}</p>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <p className="text-gray-600 mb-4 h-[60px] line-clamp-3">
                        {truncateDescription(event.description)}
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <Clock size={16} className="ml-4 mr-2" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Users size={16} className="mr-2" />
                            <span>Capacity: {event.capacity}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-semibold">{event.price === 0 ? 'Free' : `${event.price} DT`}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;