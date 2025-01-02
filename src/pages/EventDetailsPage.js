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
import { motion } from "framer-motion";
import { Clock, CalendarCheck, MapPin } from 'lucide-react';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = doc(db, "events", eventId);
        const eventSnapshot = await getDoc(eventDoc);

        if (eventSnapshot.exists()) {
          const eventData = eventSnapshot.data();
          const eventDate = eventData.date ? eventData.date.toDate().toLocaleDateString() : null;
          const eventTime = eventData.time ? eventData.time.toDate().toLocaleTimeString() : null;

          setEvent({ ...eventData, date: eventDate, time: eventTime });
        } else {
          console.log("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 text-lg"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Event Not Found State
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-lg"
        >
          Event not found
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <HeroSection
            title={event.name}
            date={event.date}
            locationName={event.location}
            image={event.thumbnail}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <AboutEvent description={event.description} />
            {/* <SpeakersList speakers={event.speakers} /> */}
            <LocationMap locationUrl={event.locationUrl} locationName={event.locationName} />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <EventPriceCard price={event.price} eventName={event.title} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarCheck className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <ActionButtons />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailsPage;