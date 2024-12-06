import React, { useState, useEffect, useRef } from "react";
import QuickActions from "../components/QuickActions";
import StatsCard from "../components/StatsCard";
import Chart from "../components/Chart";
import EventTable from "../components/EventTable";
import CreateEventModal from "../components/CreateEventModal";
import { Users, CreditCard, Calendar, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import { collection, addDoc, serverTimestamp, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AdminDashboard = () => {
    // State and Handlers
    const fileInputRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        type: "",
        location: "",
        date: "",
        time: "",
        capacity: "",
        price: "",
        minParticipants: null,
        maxParticipants: null,
        thumbnail: null,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        if (!newEvent.name || !newEvent.type || !newEvent.date || !newEvent.location) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!newEvent.thumbnail) {
            alert("Please upload a thumbnail image.");
            return;
        }

        if (newEvent.type === "competition") {
            const { minParticipants, maxParticipants } = newEvent;

            if (!minParticipants || !maxParticipants || minParticipants >= maxParticipants) {
                alert("Please ensure minimum and maximum participants are valid and that min < max.");
                return;
            }
        }

        try {

            let eventDate = new Date(newEvent.date);

            if (newEvent.time) {
                const [hours, minutes] = newEvent.time.split(":");
                eventDate.setHours(hours, minutes, 0, 0);
            }

            const eventData = {
                name: newEvent.name,
                type: newEvent.type,
                location: newEvent.location,
                date: Timestamp.fromDate(eventDate),
                capacity: newEvent.capacity || null,
                price: newEvent.price === "" ? 0 : newEvent.price || 0,
                createdAt: serverTimestamp(),
                thumbnail: newEvent.thumbnail,
            };

            if (newEvent.type === "competition") {
                eventData.minParticipants = newEvent.minParticipants;
                eventData.maxParticipants = newEvent.maxParticipants;
            }

            const eventsCollection = collection(db, "events");
            await addDoc(eventsCollection, eventData);

            setShowCreateModal(false);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);

            setNewEvent({
                name: "",
                type: "",
                location: "",
                date: "",
                time: "",
                capacity: "",
                price: "",
                minParticipants: null,
                maxParticipants: null,
                thumbnail: null,
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input field
              }

            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        }
    };

    const fetchEvents = async () => {
        try {
            const eventsCollection = collection(db, "events");
            const querySnapshot = await getDocs(eventsCollection);

            const eventsData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    date: data.date?.toDate ? data.date.toDate().toLocaleString() : data.date,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : data.createdAt,
                };
            });

            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
                <QuickActions onCreateEvent={() => setShowCreateModal(true)} />

                {showSuccessAlert && (
                    <div className="p-4 bg-green-100 border border-green-200 text-green-800 rounded">
                        Event created successfully!
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        icon={Users}
                        label="Total Registrations"
                        value={events.reduce((acc, event) => acc + event.participants || 0, 0)}
                        bgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                    <StatsCard
                        icon={CreditCard}
                        label="Total Revenue"
                        value={`${events.reduce((acc, event) => acc + event.price || 0, 0)} €`}
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                    />
                    <StatsCard
                        icon={Calendar}
                        label="Active Events"
                        value={events.length}
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                    />
                    <StatsCard
                        icon={TrendingUp}
                        label="Fill Rate"
                        value="85%"
                        bgColor="bg-orange-100"
                        iconColor="text-orange-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                    <Chart
                        title="Registration Trends"
                        data={inscriptionsData}
                        dataKey="inscriptions"
                        color="#2563eb"
                    />
                    <Chart
                        title="Payment Trends"
                        data={paiementsData}
                        dataKey="montant"
                        color="#16a34a"
                    />
                </div>

                <EventTable events={events} />

                <CreateEventModal
                    isVisible={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateEvent}
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    fileInputRef={fileInputRef}
                />
            </div>
        </>
    );
};

// Mock Data
const inscriptionsData = [
    { mois: "Jan", inscriptions: 45 },
    { mois: "Fév", inscriptions: 52 },
    { mois: "Mar", inscriptions: 68 },
    { mois: "Avr", inscriptions: 75 },
    { mois: "Mai", inscriptions: 85 },
    { mois: "Juin", inscriptions: 92 },
];

const paiementsData = [
    { mois: "Jan", montant: 4500 },
    { mois: "Fév", montant: 5200 },
    { mois: "Mar", montant: 6800 },
    { mois: "Avr", montant: 7500 },
    { mois: "Mai", montant: 8500 },
    { mois: "Juin", montant: 9200 },
];



export default AdminDashboard;
