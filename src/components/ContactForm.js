import React from "react";

const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white py-16 px-8 mt-[120px] md:px-16 lg:px-24">
      {/* Left Section */}
      <div className="md:w-1/2 text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Contact form
        </h1>
        <p className="text-gray-700 leading-relaxed mr-8">
          The following form demonstrates form validation in action. Contact
          form component reduces the amount of time it is being re-rendered by
          the user as it embraces uncontrolled form validation to reduce any
          unnecessary performance penalty.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2">
        <form
          className="bg-gray-50 shadow-md rounded-lg px-8 py-6"
          onSubmit={(e) => e.preventDefault()} // Prevent default for now
        >
          {/* Name Field */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="w-full h-24 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;