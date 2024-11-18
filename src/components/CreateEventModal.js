import React from "react";
import { X } from "lucide-react"; // Keep the icon import if you're using it

const CreateEventModal = ({ isVisible, onClose, onSubmit, newEvent, setNewEvent }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create a New Event</h2>
          <button
            className="p-2 hover:bg-gray-200 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.nom}
              onChange={(e) => setNewEvent({ ...newEvent, nom: e.target.value })}
              required
              placeholder="E.g.: Yoga Workshop"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Maximum Capacity</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.capacite}
              onChange={(e) => setNewEvent({ ...newEvent, capacite: e.target.value })}
              required
              placeholder="E.g.: 30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
