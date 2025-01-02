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
  Bookmark,
  LogOut,
  Trash2,
  Award, // New icon for achievements
  Star, // New icon for interests
} from 'lucide-react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([
    {
      id: 1,
      name: "AI and Machine Learning Summit",
      date: "2024-07-15",
      time: "09:00",
      type: "Conference",
      status: "Upcoming",
      isCompetition: false,
      ticketCount: 2,
      price: 50
    },
    {
      id: 2,
      name: "National Robotics Challenge",
      date: "2024-08-22",
      time: "10:00",
      type: "Competition",
      status: "Upcoming",
      isCompetition: true,
      teamName: "Robo Warriors",
      teamSize: 4,
      price: 100
    },
    {
      id: 3,
      name: "Full Stack Development Bootcamp",
      date: "2024-09-10",
      time: "14:00",
      type: "Workshop",
      status: "Past",
      isCompetition: false,
      ticketCount: 1,
      price: 0
    },
    {
      id: 4,
      name: "Cybersecurity Essentials Workshop",
      date: "2024-10-05",
      time: "13:00",
      type: "Workshop",
      status: "Upcoming",
      isCompetition: false,
      ticketCount: 3,
      price: 25
    },
    {
      id: 5,
      name: "Data Science for Beginners",
      date: "2024-11-12",
      time: "11:00",
      type: "Workshop",
      status: "Upcoming",
      isCompetition: false,
      ticketCount: 1,
      price: 40
    }
  ]);
  const [savedEvents, setSavedEvents] = useState([
    {
      id: 1,
      name: "International Tech Expo 2024",
      date: "2024-12-01",
      time: "08:30",
      type: "Conference",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Global AI and Robotics Forum",
      date: "2024-06-18",
      time: "09:00",
      type: "Conference",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Annual Fintech Symposium",
      date: "2024-07-29",
      time: "10:00",
      type: "Conference",
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Advanced Python Programming",
      date: "2024-08-14",
      time: "14:00",
      type: "Workshop",
      status: "Upcoming",
    },
    {
      id: 5,
      name: "Digital Marketing Strategies",
      date: "2024-09-25",
      time: "12:00",
      type: "Workshop",
      status: "Upcoming",
    }
  ]);
  const [userInterests, setUserInterests] = useState([
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "UI/UX Design"
  ]);
  const [achievements, setAchievements] = useState([
    { name: "First Place in Hackathon", date: "2023-05-15" },
    { name: "Published Research Paper", date: "2023-08-20" },
    { name: "Completed Advanced Java Course", date: "2024-01-30" },
    { name: "Volunteer of the Year", date: "2024-03-10" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const fetchedUserData = docSnap.data();
          setUserData(fetchedUserData);
          setEditedData(fetchedUserData); // Initialize editedData
        } else {
          console.log("No such document!");
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    setEditedData(userData); // Initialize editedData with current userData when editing starts
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, editedData);
        setUserData(editedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      // Optionally, you can display an error message to the user here
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

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

  const handleRemoveEvent = (eventId) => {
    // Update local state immediately for better UX
    setRegisteredEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));

    // Then, update Firestore
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      // Assuming you have a 'registeredEvents' field in your user document
      // that is an array of event IDs. You need to remove the eventId from this array.
      // This is a placeholder - you need to implement the actual Firestore update logic.
      // updateDoc(userRef, {
      //   registeredEvents: arrayRemove(eventId)
      // });
      console.log("remove functionality not implemented yet!")
    }
  }

  const handleUnsaveEvent = (eventId) => {
    // Update local state immediately for better UX
    setSavedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));

    // Then, update Firestore
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      // Assuming you have a 'savedEvents' field in your user document
      // that is an array of event IDs. You need to remove the eventId from this array.
      // This is a placeholder - you need to implement the actual Firestore update logic.
      // updateDoc(userRef, {
      //   savedEvents: arrayRemove(eventId)
      // });
      console.log("unsave functionality not implemented yet!")
    }
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No user data available
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={'../Habib.jpg'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-200"
                />
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.bio || 'No bio available'}</p>
                </div>
              </div>
              {!isEditing ? (
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* User Details Section */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setEditedData({ ...editedData, email: e.target.value })
                      }
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
                      onChange={(e) =>
                        setEditedData({ ...editedData, phone: e.target.value })
                      }
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
                      onChange={(e) =>
                        setEditedData({ ...editedData, address: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="font-medium">{userData.address}</p>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedData.bio}
                      onChange={(e) =>
                        setEditedData({ ...editedData, bio: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg min-h-[150px]"
                      rows="4"
                      placeholder="Tell us about yourself"
                    />
                  ) : (
                    <p className="text-gray-600">{userData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Interests and Achievements Section */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {/* Interests */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {userInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Achievements
              </h2>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">{achievement.name}</span> -{" "}
                    <span className="text-sm">{achievement.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Registered Events Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">My Events</h2>
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                    <div className="flex flex-col items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getEventStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                      {event.status === "Upcoming" && event.price !== 0 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Pay
                        </motion.button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex gap-4">
                      {event.isCompetition ? (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Team: {event.teamName} ({event.teamSize} members)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Ticket className="w-4 h-4" />
                          {event.ticketCount}{" "}
                          {event.ticketCount === 1 ? "ticket" : "tickets"}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {event.price === 0 ? "Free" : `${event.price} DT`}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemoveEvent(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Saved Events Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Saved Events</h2>
            <div className="space-y-4">
              {savedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                    <div className="flex flex-col items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getEventStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        View
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUnsaveEvent(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Bookmark className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;