import React from "react";
import HeroSection from "../components/HeroSection";
import AboutEvent from "../components/AboutEvent";
import SpeakersList from "../components/SpeakersList";
import LocationMap from "../components/LocationMap";
import EventPriceCard from "../components/EventPriceCard";
import EventDetailsCard from "../components/EventDetailsCard";
import ActionButtons from "../components/ActionButtons";
import Navbar from "../components/Navbar";

const EventDetailsPage = () => {
  const event = {
    image: "https://www.supcom.tn/storage/app/public/evenements/October2023/Jhm90kQjo2d83ynNQGhw.jpg",
    title: "TechConf 2024: Future of AI",
    date: "December 15, 2024",
    time: "9:00 AM - 6:00 PM",
    locationName: "Innovation Center, Silicon Valley",
    locationUrl: "https://maps.app.goo.gl/XYw2mm2jkpsQ6jcT7",
    price: 0,
    description:
      "Join us for the most anticipated tech conference of the year, featuring keynote speakers, workshops, and networking opportunities focused on artificial intelligence and its impact on our future.",
    speakers: [
      { name: "Dr. Sarah Chen", role: "AI Research Director", linkedin: "https://www.linkedin.com/feed/" },
      { name: "James Wilson", role: "Tech Entrepreneur", linkedin: "linkedin.com/in/jameswilson" },
      { name: "Maria Garcia", role: "ML Engineer", linkedin: "linkedin.com/in/mariagarcia" },
    ],
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <HeroSection
          title={event.title}
          date={event.date}
          locationName={event.locationName}
          image={event.image}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <AboutEvent description={event.description} />
            <SpeakersList speakers={event.speakers} />
            <LocationMap locationUrl={event.locationUrl} locationName={event.locationName} />
          </div>
          <div className="space-y-6">
            <EventPriceCard price={event.price} eventName={event.title} isCompetition={true} />
            <EventDetailsCard time={event.time} capacity={500} format="In-person" />
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EventDetailsPage;
