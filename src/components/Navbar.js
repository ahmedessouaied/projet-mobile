import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleEvents = () => {
        navigate('/events');
    }
    const handleSignIn = () => {
        navigate('/signin');
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                        <div className="relative group">
                            <button
                                className="text-gray-700 hover:scale-110 transition duration-300 flex items-center"
                                onClick={handleEvents}
                            >
                                Events

                            </button>
                        </div>

                        <a href="/calendar" className="text-gray-700 hover:scale-110 transition duration-300">
                            Calendar
                        </a>

                        <a href="/about" className="text-gray-700 hover:scale-110 transition duration-300">
                            About
                        </a>

                        <a href="/faq" className="text-gray-700 hover:scale-110 transition duration-300">
                            FAQ
                        </a>
                        <a href="/admin" className="text-gray-700 hover:scale-110 transition duration-300">
                            Admin Dashboard
                        </a>
                    </div>

                    {/* Desktop Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Inline Search Section */}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`
                  w-48 lg:w-64 
                  px-4 py-2 
                  rounded-md 
                  border 
                  transition-all 
                  duration-300
                  ${isSearchFocused
                                        ? 'border-blue-500 ring-1 ring-blue-500'
                                        : 'border-gray-300'
                                    }
                `}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            <Search
                                size={20}
                                className="absolute right-3 text-gray-400"
                            />
                        </div>

                        <button className="bg-blue-600 text-white 
              text-sm lg:text-base
              px-3 lg:px-6
              py-1.5 lg:py-2.5
              rounded
              hover:bg-blue-600 
              transition-colors
              font-medium lg:font-semibold"
                            onClick={handleSignIn}>
                            Sign In / Log In
                        </button>
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
            <div className={`
        z-50
        md:hidden 
        absolute 
        top-full 
        left-0 
        right-0 
        bg-white 
        shadow-lg 
        transition-all 
        duration-300 
        ease-in-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
                <div className="px-4 py-3 space-y-3">
                    <a href="/events" className="block text-gray-700 hover:text-blue-600 py-2 text-base">
                        Events
                    </a>
                    <a href="/calendar" className="block text-gray-700 hover:text-blue-600 py-2 text-base">
                        Calendar
                    </a>
                    <a href="/about" className="block text-gray-700 hover:text-blue-600 py-2 text-base">
                        About
                    </a>
                    <a href="/faq" className="block text-gray-700 hover:text-blue-600 py-2 text-base">
                        FAQ
                    </a>
                    <a href="/admin" className="block text-gray-700 hover:text-blue-600 py-2 text-base">
                        Admin Dashboard
                    </a>
                    
                    <div className="pt-2">
                        {/* Mobile Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <button
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={handleSignIn}
                    >
                        Sign In / Log In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;