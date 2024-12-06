import React, { useState } from "react";
import { X } from "lucide-react";

const SpeakerForm = ({ speaker, index, updateSpeaker, removeSpeaker }) => (
  <div className="space-y-2 p-3 border rounded-lg">
    <div className="flex justify-between items-center">
      <span className="font-medium">Speaker {index + 1}</span>
      {index > 0 && (
        <button
          type="button"
          onClick={() => removeSpeaker(index)}
          className="text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    <input
      type="text"
      placeholder="Full Name"
      required
      className="w-full p-2 border rounded-lg"
      value={speaker.name}
      onChange={(e) => updateSpeaker(index, "name", e.target.value)}
    />
    <input
      type="text"
      placeholder="Role"
      required
      className="w-full p-2 border rounded-lg"
      value={speaker.role}
      onChange={(e) => updateSpeaker(index, "role", e.target.value)}
    />
    <input
      type="url"
      placeholder="LinkedIn URL"
      className="w-full p-2 border rounded-lg"
      value={speaker.linkedInUrl}
      onChange={(e) => updateSpeaker(index, "linkedInUrl", e.target.value)}
    />
  </div>
);

const CreateEventModal = ({ isVisible, onClose, onSubmit, newEvent, setNewEvent, fileInputRef }) => {
  const [speakers, setSpeakers] = useState(newEvent.speakers || []);

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      { name: "", role: "", linkedInUrl: "" },
    ]);
  };

  const updateSpeaker = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewEvent({ ...newEvent, speakers });
    onSubmit(e);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create a New Event</h2>
          <button
            className="p-2 hover:bg-gray-200 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              required
              placeholder="E.g.: Yoga Workshop"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              required
            >
              <option value="" disabled>Select type</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="competition">Competition</option>
            </select>
          </div>

          {/* Date */}
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

          {/* Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <div className="flex items-center">
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={newEvent.online}
                  onChange={() => setNewEvent({ ...newEvent, online: !newEvent.online })}
                />
                Online Event
              </label>
            </div>
            {!newEvent.online && (
              <>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="E.g.: Conference Hall"
                />
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded p-2"
                  value={newEvent.googleMapsUrl}
                  onChange={(e) => setNewEvent({ ...newEvent, googleMapsUrl: e.target.value })}
                  placeholder="Google Maps URL"
                />
              </>
            )}
          </div>

          {/* Speakers */}
          <div>
            <label className="block text-sm font-medium mb-1">Speakers</label>
            <div>
              <button
                type="button"
                onClick={addSpeaker}
                className="text-blue-600 hover:text-blue-700"
              >
                + Add Speaker
              </button>
            </div>
            {speakers.map((speaker, index) => (
              <SpeakerForm
                key={index}
                index={index}
                speaker={speaker}
                updateSpeaker={updateSpeaker}
                removeSpeaker={removeSpeaker}
              />
            ))}
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-sm font-medium mb-1">Organizer</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.organizer}
              onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
              required
              placeholder="E.g.: John Doe"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              required
              placeholder="E.g.: A detailed description of the event..."
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
