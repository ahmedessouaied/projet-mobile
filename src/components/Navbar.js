import React, { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/UniHub.png"
                alt="UniHub Logo"
                className="h-8 md:h-12 lg:h-24 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/events"
              className="text-gray-700 hover:scale-110 transition duration-300"
            >
              Events
            </a>
            <a
              href="/Courses"
              className="text-gray-700 hover:scale-110 transition duration-300"
            >
              Courses
            </a>
            <a
              href="/calendar"
              className="text-gray-700 hover:scale-110 transition duration-300"
            >
              Calendar
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:scale-110 transition duration-300"
            >
              About
            </a>
            <a
              href="/faq"
              className="text-gray-700 hover:scale-110 transition duration-300"
            >
              FAQ
            </a>
            {user && userRole === 'admin' && (
              <a
                href="/admin"
                className="text-gray-700 hover:scale-110 transition duration-300"
              >
                Admin Dashboard
              </a>
            )}
            {user && userRole === 'normal' && (
              <a
                href="/profile"
                className="text-gray-700 hover:scale-110 transition duration-300"
              >
                Profile
              </a>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className={`w-48 lg:w-64 px-4 py-2 rounded-md border transition-all duration-300 ${
                  isSearchFocused
                    ? 'border-blue-500 ring-1 ring-blue-500'
                    : 'border-gray-300'
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search size={20} className="absolute right-3 text-gray-400" />
            </div>
            {user ? (
              <button
                className="bg-blue-600 text-white text-sm lg:text-base px-3 lg:px-6 py-1.5 lg:py-2.5 rounded hover:bg-blue-700 transition-colors font-medium lg:font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white text-sm lg:text-base px-3 lg:px-6 py-1.5 lg:py-2.5 rounded hover:bg-blue-700 transition-colors font-medium lg:font-semibold"
                onClick={() => navigate('/signin')}
              >
                Sign In / Log In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-20">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`z-50 md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          <a
            href="/events"
            className="block text-gray-700 hover:text-blue-600 py-2 text-base"
          >
            Events
          </a>
          <a
            href="/courses"
            className="block text-gray-700 hover:text-blue-600 py-2 text-base"
          >
            Courses
          </a>
          <a
            href="/calendar"
            className="block text-gray-700 hover:text-blue-600 py-2 text-base"
          >
            Calendar
          </a>
          <a
            href="/about"
            className="block text-gray-700 hover:text-blue-600 py-2 text-base"
          >
            About
          </a>
          <a
            href="/faq"
            className="block text-gray-700 hover:text-blue-600 py-2 text-base"
          >
            FAQ
          </a>
          {user && userRole === 'admin' && (
            <a
              href="/admin"
              className="block text-gray-700 hover:text-blue-600 py-2 text-base"
            >
              Admin Dashboard
            </a>
          )}
          {user && userRole === 'normal' && (
            <a
              href="/profile"
              className="block text-gray-700 hover:text-blue-600 py-2 text-base"
            >
              Profile
            </a>
          )}
          {user ? (
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/signin')}
            >
              Sign In / Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
