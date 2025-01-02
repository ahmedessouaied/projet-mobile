import React from 'react';
import Navbar from '../components/Navbar';
import HeroSectionHome from '../components/HeroSectionHome';
import EventSlider from '../components/EventSlider';
import OrganizationsSection from '../components/OrganizationsSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <HeroSectionHome />
      <EventSlider />
      <div className='mb-44'><OrganizationsSection /></div>
      <ContactForm />
      <Footer />
    </motion.div>
  );
};

export default HomePage;