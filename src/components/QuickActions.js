import React from "react";
import { Plus } from "lucide-react";

const QuickActions = ({ onCreateEvent }) => (
  <div className="flex gap-2 mb-4">
    <button
      onClick={onCreateEvent}
      className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      <Plus className="w-4 h-4" />
      New Event 
    </button>
  </div>
);

export default QuickActions;
