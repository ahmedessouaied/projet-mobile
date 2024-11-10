import React from "react";
import { MapPin } from "lucide-react";

const LocationMap = ({ locationUrl, locationName }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Location</h2>
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        {/*TO BE FIXED I DON'T WANT IFRAME*/}
      <iframe
        className="w-full h-full border-0"
        src={locationUrl}
        allowFullScreen
      />
    </div>
    <a 
      href={locationUrl}
      target="_blank"
      rel="noopener noreferrer" 
      className="mt-4 text-sm text-gray-600 flex items-center hover:text-blue-600"
    >
      <MapPin className="w-4 h-4 inline mr-2" />
      {locationName}
    </a>
  </div>
);

export default LocationMap;
