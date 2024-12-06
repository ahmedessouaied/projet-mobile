import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import HeroSection from "../components/HeroSection";
import AboutEvent from "../components/AboutEvent";
import SpeakersList from "../components/SpeakersList";
import LocationMap from "../components/LocationMap";
import EventPriceCard from "../components/EventPriceCard";
import EventDetailsCard from "../components/EventDetailsCard";
import ActionButtons from "../components/ActionButtons";
import Navbar from "../components/Navbar";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = doc(db, "events", eventId); // Reference to the event document
        const eventSnapshot = await getDoc(eventDoc);

        if (eventSnapshot.exists()) {
          const eventData = eventSnapshot.data();

          // Convert Firestore Timestamp to a JavaScript Date object
          const eventDate = eventData.date ? eventData.date.toDate().toLocaleDateString() : null;
          const eventTime = eventData.time ? eventData.time.toDate().toLocaleTimeString() : null;

          setEvent({ ...eventData, date: eventDate, time:eventTime }); // Add the forma
          
        } else {
          console.log("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchEventDetails();
  }, [eventId]); // Fetch data when eventId changes

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  if (!event) {
    return <div>Event not found</div>; // Handle case when event is not found
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <HeroSection
            title={event.name}
            date={event.date}
            locationName={event.location}
            image={event.thumbnail}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <AboutEvent description={event.description} />
              {/* <SpeakersList speakers={event.speakers} /> */}
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
