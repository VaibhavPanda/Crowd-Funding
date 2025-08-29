import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import Admin from './Admin';
import Creator from './Creator';
import Backer from './Backer';

const Dashboard = () => {
  const user_id = localStorage.getItem("user_id") || null;
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState(false);
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
        console.error("Error fetching user:", error);
        setUserState(false);
      }
    };

    fetchUser();
  }, [user_id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl">
          {!userState && (
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
                You are not logged in
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Please <a href="/login" className="text-blue-500 underline hover:text-blue-600">login</a> or <a href="/signup" className="text-blue-500 underline hover:text-blue-600">sign up</a> to access your dashboard.
              </p>
            </div>
          )}

          {user && user.role === "Admin" && (
            <Admin user={user} />
          )}
          {user && user.role === "Creator" && (
            <Creator user={user} />
          )}
          {user && user.role === "Backer" && (
            <Backer user={user} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
