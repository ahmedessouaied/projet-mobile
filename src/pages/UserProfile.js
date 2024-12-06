import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Clock,
  Ticket,
  Tag,
  Users,
  AlertCircle,
} from 'lucide-react';
import { auth, db } from '../firebase/firebase';
import { getAuthStateChanged, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [registeredEvents, setRegisteredEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-12-15",
      time: "09:00",
      type: "Conference",
      status: "Upcoming",
      isCompetition: false,
      ticketCount: 2,
      price: 50
    },
    {
      id: 2,
      name: "Hackathon 2024",
      date: "2024-11-20",
      time: "10:00",
      type: "Competition",
      status: "Upcoming",
      isCompetition: true,
      teamName: "Code Warriors",
      teamSize: 4,
      price: 100
    },
    {
      id: 3,
      name: "Web Dev Workshop",
      date: "2024-10-05",
      time: "14:00",
      type: "Workshop",
      status: "Past",
      isCompetition: false,
      ticketCount: 1,
      price: 0
    }
  ]);
  const [savedEvents, setSavedEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-12-15",
      time: "09:00",
      type: "Conference",
      status: "Upcoming",
      isCompetition: false,
    },
    {
      id: 2,
      name: "Hackathon 2024",
      date: "2024-11-20",
      time: "10:00",
      type: "Competition",
      status: "Upcoming",
      isCompetition: true,
    },
    {
      id: 3,
      name: "Web Dev Workshop",
      date: "2024-10-05",
      time: "14:00",
      type: "Workshop",
      status: "Past",
      isCompetition: false,
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  if (isLoading) return <div className="flex flex-row justify-center items-center min-h-screen">Loading...</div>;

  if (!userData) {
    return <div>No user data available</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      navigate('/signin');
    } catch (error) {
      console.log('Error logging out: ', error.message);
    }
  };



  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const getEventStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Avatar and Bio Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-100"
              />
              {isEditing ? (
                <textarea
                  value={editedData.bio}
                  onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-600 text-center">{userData.bio || 'this is a small bio'}</p>
              )}
            </div>
          </div>

          {/* User Details Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.fullName}
                    onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{userData.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{userData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{userData.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.address}
                    onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{userData.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Registered Events Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">My Events</h2>

        <div className="space-y-4">
          {registeredEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getEventStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  {event.status === "Upcoming" && event.price !== 0 && (
                    <button
                      className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"

                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>


              <div className="mt-4 flex gap-4 text-sm text-gray-600">
                {event.isCompetition ? (
                  <>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Team: {event.teamName} ({event.teamSize} members)
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-1">
                    <Ticket className="w-4 h-4" />
                    {event.ticketCount} {event.ticketCount === 1 ? 'ticket' : 'tickets'}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {event.price === 0 ? 'Free' : `${event.price} DT`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Events Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Saved Events</h2>

        <div className="space-y-4">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 flex-col items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${getEventStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <button
                    className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"

                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
