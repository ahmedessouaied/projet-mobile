import React from 'react'
import Navbar from '../components/Navbar'
import HeroSectionHome from '../components/HeroSectionHome'
import EventSlider from '../components/EventSlider'
import OrganizationsSection from '../components/OrganizationsSection'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <HeroSectionHome />
            <EventSlider />
            <OrganizationsSection />
            <ContactForm />
            <Footer />
        </div>
    )
}

export default HomePage