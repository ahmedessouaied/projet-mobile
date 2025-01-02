import React, { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

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

  // Animation Variants
  const desktopNavVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      className="bg-white shadow-sm relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center">
              <motion.img
                src="/UniHub.png"
                alt="UniHub Logo"
                className="h-8 md:h-12 lg:h-24 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-6"
            variants={desktopNavVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { href: '/events', label: 'Events' },
              { href: '/courses', label: 'Courses' },
              { href: '/calendar', label: 'Calendar' },
              { href: '/about', label: 'About' },
              { href: '/faq', label: 'FAQ' },
              user && userRole === 'admin' && { href: '/admin', label: 'Admin Dashboard' },
              user && userRole === 'normal' && { href: '/profile', label: 'Profile' },
            ]
              .filter(item => item)
              .map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 font-medium"
                  whileHover={{ scale: 1.05, color: '#3b82f6' }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.a>
              ))}
          </motion.div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className="relative flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.input
                type="text"
                placeholder="Search..."
                className={`w-48 lg:w-64 px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ${isSearchFocused
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-300'
                  }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <Search
                size={20}
                className="absolute right-3 text-gray-400"
              />
            </motion.div>
            {user ? (
              <motion.button
                className="px-4 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300"
                onClick={handleLogout}
                style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <motion.button
                className="px-4 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300"
                onClick={() => navigate('/signin')}
                style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In / Log In
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden flex items-center z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="z-50 md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
      >
        <div className="px-4 py-3 space-y-3">
          {[
            { href: '/events', label: 'Events' },
            { href: '/courses', label: 'Courses' },
            { href: '/calendar', label: 'Calendar' },
            { href: '/about', label: 'About' },
            { href: '/faq', label: 'FAQ' },
            user && userRole === 'admin' && { href: '/admin', label: 'Admin Dashboard' },
            user && userRole === 'normal' && { href: '/profile', label: 'Profile' },
          ]
            .filter(item => item)
            .map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block text-gray-700 font-medium py-2 text-base"
                whileHover={{ color: '#3b82f6' }}
                onClick={toggleMenu}
              >
                {item.label}
              </motion.a>
            ))}
          {user ? (
            <motion.button
              className="w-full px-4 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300"
              onClick={handleLogout}
              style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              className="w-full px-4 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300"
              onClick={() => navigate('/signin')}
              style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #6b7280)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In / Log In
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;