import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} — All rights reserved by{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Harshit Shrivastava
          </span>
        </p>

        {/* Optional Socials / Contact for future scaling */}
        {/* <div className="flex gap-4 mt-2">
          <a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
