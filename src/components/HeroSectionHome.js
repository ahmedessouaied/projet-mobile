import React, { useEffect, useRef } from 'react';

const HeroSectionHome = () => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const parallaxEffect = () => {
            if (window.innerWidth < 768) {
                const scrolled = window.scrollY;
                const parallax = parallaxRef.current;
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            }
        };

        window.addEventListener('scroll', parallaxEffect);
        return () => window.removeEventListener('scroll', parallaxEffect);
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            {/* Background Image for Mobile */}
            <div
                ref={parallaxRef}
                className="absolute top-0 left-0 w-full h-full md:hidden"
            >
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay Blur*/}
                <img
                    src="/HerosectionHomeimage.png"
                    alt="Home page Image"
                    className="w-full h-full object-cover blur-[8px] scale-110"
                />
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 lg:py-24 relative z-20">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white md:text-blue-600 mb-4">
                            Discover a unique selection of university events
                        </h1>
                        <p className="text-gray-100 md:text-gray-600 text-base sm:text-lg mb-6 md:mb-8 max-w-lg">
                            Your central hub for all events hosted by university clubs, bringing students together in one convenient place to stay connected with every activity on campus.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-blue-600 z-20 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base">
                                Explore
                            </button>
                            <button className="border border-white md:border-gray-300 text-white md:text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-white/10 md:hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base">
                                Learn more
                            </button>
                        </div>
                    </div>

                    {/* Main Image (Hidden on mobile, shown on desktop) */}
                    <div className="hidden md:block w-full md:w-1/2 flex justify-center md:justify-end">
                        <img
                            src="/HerosectionHomeimage.png"
                            alt="Home page image"
                            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionHome;