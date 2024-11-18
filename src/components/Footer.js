import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <p>Tell Us Everything</p>
                    <p>Do you have any questions? Feel free to reach out.</p>
                    <a href="/contact" className="text-blue-400 hover:text-blue-500 transition-colors">
                        Let's Chat
                    </a>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Policy</h3>
                    <ul className="space-y-2">
                        <li>Application Security</li>
                        <li>Software Principles</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li>About</li>
                        <li>Blog</li>
                        <li>Press</li>
                        <li>Careers & Culture</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Language</h3>
                    <div className="flex items-center space-x-2">
                        <img src="/usa.png" alt="English" className="h-6 w-6" />
                        <img src="/france.png" alt="French" className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href="/">
                        <img src="/unihub.png" alt="UniHub" className="h-8" />
                    </a>
                    <div className="flex space-x-4">
                        <a href="/">
                            <img src="/facebook.png" alt="Facebook" className="h-6" />
                        </a>
                        <a href="/">
                            <img src="/twitter.png" alt="Twitter" className="h-6" />
                        </a>
                        <a href="/">
                            <img src="/linkedin.png" alt="LinkedIn" className="h-6" />
                        </a>
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Sign in
                </button>
            </div>
        </footer>
    );
};

export default Footer;