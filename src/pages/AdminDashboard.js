import React, { useState } from "react";
import QuickActions from "../components/QuickActions";
import StatsCard from "../components/StatsCard";
import Chart from "../components/Chart";
import EventTable from "../components/EventTable";
import CreateEventModal from "../components/CreateEventModal";
import { Users, CreditCard, Calendar, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
    // State and Handlers
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [newEvent, setNewEvent] = useState({ nom: "", date: "", capacite: "" });

    const handleCreateEvent = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
        setNewEvent({ nom: "", date: "", capacite: "" });
    };

    return (
        <>
        <Navbar />
        <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
            <QuickActions onCreateEvent={() => setShowCreateModal(true)} />

            {/* Success Alert */}
            {showSuccessAlert && (
                <div className="p-4 bg-green-100 border border-green-200 text-green-800 rounded">
                    Event created successfully!
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    icon={Users}
                    label="Total Registrations"
                    value="417"
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatsCard
                    icon={CreditCard}
                    label="Total Revenue"
                    value="41,700 €"
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatsCard
                    icon={Calendar}
                    label="Active Events"
                    value="3"
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

            <EventTable events={evenements} />

            <CreateEventModal
                isVisible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateEvent}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
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

const evenements = [
    { id: 1, name: "Yoga Workshop", date: "2024-06-15", participants: 25, capacity: 30 },
    { id: 2, name: "Meditation Class", date: "2024-06-20", participants: 18, capacity: 20 },
    { id: 3, name: "Wellness Retreat", date: "2024-07-01", participants: 12, capacity: 15 },
];

export default AdminDashboard;
