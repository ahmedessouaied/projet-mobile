import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import QuickActions from './components/QuickActions';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event-details" element={<EventDetailsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
