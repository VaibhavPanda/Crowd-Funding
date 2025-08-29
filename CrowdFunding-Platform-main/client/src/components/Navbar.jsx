import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user_id = localStorage.getItem("user_id") || null;
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const Base_Url = import.meta.env.VITE_BASE_URL;
  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user_id) {
          const response = await axios.get(`${Base_Url}/user/getuserbyid`, {
            params: { _id: user_id },
          });
          setUser(response.data.user[0]);
          setUserState(true);
        } else {
          setUserState(false);
        }
      } catch (error) {
        console.log(error);
        setUserState(false);
      }
    };
    fetchUser();
  }, [user_id]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full z-50 shadow-sm">
        <Toaster />
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            CrowdFund
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 dark:text-white">
            <a href="/" className="hover:text-blue-600 transition">Home</a>
            <a href="/donate" className="hover:text-blue-600 transition">Donate</a>
            <a href="/lend" className="hover:text-blue-600 transition">Lend</a>
            <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
          </div>

          {/* Theme Toggle & Profile */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <div className="relative">
              {userState ? (
                <div ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center cursor-pointer bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 transition-all duration-200 ${
                      dropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="px-4 py-3 text-sm">
                      <p className="text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-gray-500 truncate dark:text-gray-300">{user?.email}</p>
                    </div>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</a>
                      </li>
                      <li>
                        <a href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("user_id");
                            toast.success("Sign Out Successful");
                            setTimeout(() => navigate("/", { replace: true }), 2000);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <a href="/signup">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition">
                    Sign Up
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden w-full bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex justify-center items-center gap-6 px-4 py-2">
          <a href="/" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Home</a>
          <a href="/donate" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Donate</a>
          <a href="/lend" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Lend</a>
          <a href="/contact" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Contact</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
