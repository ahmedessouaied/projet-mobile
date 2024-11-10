import React from "react";
import { Linkedin } from 'lucide-react';

const SpeakersList = ({ speakers }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Featured Speakers</h2>
    <div className="grid gap-4">
      {speakers.map((speaker, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div>
            <h3 className="font-semibold">{speaker.name}</h3>
            <p className="text-sm text-gray-600">{speaker.role}</p>
          </div>
          <a 
            href={`${speaker.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default SpeakersList;
