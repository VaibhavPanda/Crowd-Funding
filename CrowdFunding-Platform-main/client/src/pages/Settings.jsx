import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import EditProfile from '../components/EditProfile';
import { FaUserCircle } from 'react-icons/fa';

const Settings = () => {
  const user_id = localStorage.getItem("user_id") || null;
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState(false);
  const [loading, setLoading] = useState(true);
  const Base_Url = import.meta.env.VITE_BASE_URL;

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
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user_id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white flex justify-center items-center gap-2">
            <FaUserCircle className="text-blue-600 dark:text-blue-400" size={32} />
            Account Settings
          </h1>

          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-300">Loading your profile...</div>
          ) : user ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-200">
              <EditProfile user={user} />
            </div>
          ) : (
            <div className="text-center text-red-500 font-medium text-lg mt-6">
              Please Login or Sign Up first to access your profile settings.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
