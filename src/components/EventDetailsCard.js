import React from "react";
import { Clock, Users, Info } from "lucide-react";

const EventDetailsCard = ({ time, capacity, format }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Event Details</h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-3 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Time</p>
          <p className="text-gray-600">{time}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-3 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Capacity</p>
          <p className="text-gray-600">{capacity} attendees</p>
        </div>
      </div>
      <div className="flex items-center">
        <Info className="w-4 h-4 mr-3 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Format</p>
          <p className="text-gray-600">{format}</p>
        </div>
      </div>
    </div>
  </div>
);

export default EventDetailsCard;
