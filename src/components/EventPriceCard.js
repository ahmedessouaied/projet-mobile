import React, { useState } from "react";
import Modal from "./Modal";
import CompetitionForm from "./CompetitionForm";
import NormalEventForm from "./NormalEventForm";
import Button from "./Button";
import { Ticket } from "lucide-react";

const EventPriceCard = ({ price = 0, eventName = "Event", isCompetition = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    isCompetition
      ? {
          teamName: "",
          captainName: "",
          captainEmail: "",
          captainPhone: "",
          teamMembers: [{ name: "", email: "" }],
          specialRequirements: "",
        }
      : {
          numberOfTickets: 1,
          fullName: "",
          email: "",
          phone: "",
          specialRequirements: "",
        }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isCompetition ? "Competition" : "Normal event" + " registration:", formData);
    setIsOpen(false);
  };

  const addTeamMember = () => {
    if (isCompetition) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, { name: "", email: "" }],
      });
    }
  };

  const removeTeamMember = (index) => {
    if (isCompetition) {
      const newMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData({ ...formData, teamMembers: newMembers });
    }
  };

  const updateTeamMember = (index, field, value) => {
    if (isCompetition) {
      const newMembers = [...formData.teamMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      setFormData({ ...formData, teamMembers: newMembers });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-blue-600">
            {price === 0 ? "Free" : `${price} DT`}
          </p>
          <p className="text-sm text-gray-600">
            per {isCompetition ? "team" : "ticket"}
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="w-full">
        <Ticket className="w-4 h-4 mr-2" />
          Register Now
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Register for ${eventName}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isCompetition ? (
            <CompetitionForm
              formData={formData}
              setFormData={setFormData}
              addTeamMember={addTeamMember}
              removeTeamMember={removeTeamMember}
              updateTeamMember={updateTeamMember}
            />
          ) : (
            <NormalEventForm formData={formData} setFormData={setFormData} price={price} />
          )}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)} className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              {price === 0 ? "Confirm Registration" : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EventPriceCard;
