import React, { useState } from "react";
import { Share2, Heart } from "lucide-react";

const ActionButtons = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="flex space-x-2">
      <button
        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>
      <button
        onClick={() => setIsSaved(!isSaved)}
        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
      >
        <Heart
          className={`w-4 h-4 mr-2 ${
            isSaved ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default ActionButtons;
