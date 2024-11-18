import React, { useState, useEffect } from 'react';

const OrganizationsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const organizations = [
        { id: 1, name: 'IEEE Supcom', logo: 'logos/IEEESUPCOM.png' },
        { id: 2, name: 'Wiempower', logo: 'logos/Wiempower.png' },
        { id: 3, name: 'Junior Enterprises Tunisie', logo: 'logos/JET.png' },
        { id: 4, name: 'Securinets INSAT', logo: 'logos/SecurinetsInsat.png' },
        { id: 5, name: 'Computer society SUPCOM', logo: 'logos/CSSUPCOM.png' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((activeIndex + 1) % organizations.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex, organizations.length]);

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-8">
                    Organizations that entrusted UniHub
                </h2>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl">
                        {organizations.map((org, index) => (
                            <div
                                key={org.id}
                                className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center">
                                    <img
                                        src={org.logo}
                                        alt={org.name}
                                        className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mb-4"
                                    />
                                    <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium text-center">
                                        {org.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationsSection;