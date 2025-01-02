import './App.css';
import { Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EventCalendar from './pages/EventCalendar';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Courses from './pages/Courses';
import About from './pages/About';

function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/signin"
      element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      }
    />
    <Route path="/courses" element={<Courses />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/event-details/:eventId" element={<EventDetailsPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute requiredRole="normal">
          <UserProfile />
        </ProtectedRoute>
      }
    />
    <Route path="/About" element={<About/>}/>
    <Route path="/calendar" element={<EventCalendar />} />
  </Routes>
  
  );
}

export default App;
