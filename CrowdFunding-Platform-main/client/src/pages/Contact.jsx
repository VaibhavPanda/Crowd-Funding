import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Contact Me
          </h1>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600" />
              <span>Email: hrshitsrivastava0@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600" />
              <span>Phone: +91 70509 75641</span>
            </div>

            <div className="flex items-center gap-4">
              <FaLinkedin className="text-blue-700" />
              <a
                href="https://www.linkedin.com/in/hrshitsrivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn: linkedin.com/in/hrshitsrivastava
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FaGithub className="text-black dark:text-white" />
              <a
                href="https://github.com/Shrivastava-04"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub: github.com/Shrivastava-04
              </a>
            </div>

            {/* <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-500" />
              <span>Location: Kashipur, Samastipur, Bihar, India – 848101</span>
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
