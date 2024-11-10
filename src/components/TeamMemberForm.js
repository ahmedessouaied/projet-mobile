import React from "react";
import { X } from "lucide-react";

const TeamMemberForm = ({ member, index, updateTeamMember, removeMember }) => (
    <div className="space-y-2 p-3 border rounded-lg">
        <div className="flex justify-between items-center">
            <span className="font-medium">Member {index + 1}</span>
            {index > 0 && (
                <button
                    type="button"
                    onClick={() => removeMember(index)}
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
            value={member.name}
            onChange={(e) => updateTeamMember(index, "name", e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded-lg"
            value={member.email}
            onChange={(e) => updateTeamMember(index, "email", e.target.value)}
        />
    </div>
);

export default TeamMemberForm;
