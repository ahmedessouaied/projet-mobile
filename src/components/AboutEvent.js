import React from "react";

const AboutEvent = ({ description }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4">About the Event</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutEvent;
