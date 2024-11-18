import React from "react";

const StatsCard = ({ icon: Icon, label, value, bgColor, iconColor }) => (
  <div className="p-6">
    <div className="flex items-center space-x-4">
      <div className={`p-2 ${bgColor} rounded-lg`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default StatsCard;
