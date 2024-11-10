import React from "react";
import { Calendar, MapPin } from "lucide-react";

const HeroSection = ({ title, date, locationName, image }) => (
  <div className="relative h-72 rounded-xl overflow-hidden">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
    <div className="absolute bottom-6 left-6 text-white">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {locationName}
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
