import TeamMemberForm from "./TeamMemberForm";
import Button from "./Button";

const CompetitionForm = ({ formData, setFormData, addTeamMember, removeTeamMember, updateTeamMember }) => (
    <>
        <div>
            <label className="block text-sm font-medium mb-1">Team Name</label>
            <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            />
        </div>

        <div className="space-y-4">
            <h3 className="font-medium">Team Captain Information</h3>
            <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-lg"
                    value={formData.captainName}
                    onChange={(e) =>
                        setFormData({ ...formData, captainName: e.target.value })
                    }
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    required
                    className="w-full p-2 border rounded-lg"
                    value={formData.captainEmail}
                    onChange={(e) =>
                        setFormData({ ...formData, captainEmail: e.target.value })
                    }
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                    type="tel"
                    required
                    className="w-full p-2 border rounded-lg"
                    value={formData.captainPhone}
                    onChange={(e) =>
                        setFormData({ ...formData, captainPhone: e.target.value })
                    }
                />
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-medium">Team Members</h3>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={addTeamMember}
                    className="text-sm"
                >
                    Add Member
                </Button>
            </div>
            {formData.teamMembers.map((member, index) => (
                <TeamMemberForm
                    key={index}
                    member={member}
                    index={index}
                    updateTeamMember={updateTeamMember}
                    removeMember={removeTeamMember}
                />
            ))}
        </div>
    </>
);

export default CompetitionForm;
