import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import LendPageCard from "../components/LendPageCard";
import { useNavigate } from "react-router-dom";

const Lend = () => {
  const user_id = localStorage.getItem("user_id") || null;
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user_id) {
          const response = await axios.get(`${Base_Url}/user/getuserbyid`, {
            params: { _id: user_id },
          });
          setUser(response.data.user[0]);
        } else {
          console.log("No user ID");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-800">
      <Navbar />

      {/* Content */}
      <main className="flex-grow w-full flex items-center justify-center px-4 py-8">
        {user && user.role !== "Backer" ? (
          <LendPageCard user={user} />
        ) : (
          <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              You must be a Creator to start a campaign
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please log in with a Creator account to proceed.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Login / Sign Up
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Lend;
