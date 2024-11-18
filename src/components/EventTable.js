import React from "react";

const EventTable = ({ events }) => (
  <div className="overflow-x-auto py-6">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Date</th>
          <th className="py-2 px-4 text-left">Participants</th>
          <th className="py-2 px-4 text-left">Fill Rate</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-b">
            <td className="py-2 px-4">{event.name}</td>
            <td className="py-2 px-4">{event.date}</td>
            <td className="py-2 px-4">
              {event.participants}/{event.capacity}
            </td>
            <td className="py-2 px-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(event.participants / event.capacity) * 100}%` }}
                ></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventTable;
