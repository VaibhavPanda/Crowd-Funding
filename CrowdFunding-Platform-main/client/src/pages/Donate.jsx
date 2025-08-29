import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListCardCampaignDonate from "../components/ListCardCampaignDonate";
import axios from "axios";
import { Link } from "react-router-dom";

const Donate = () => {
  const [campaign, setCampaign] = useState([]);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const user_id = localStorage.getItem("user_id") || null;
  const [user, setUser] = useState();

  useEffect(() => {
    const getCampaign = async () => {
      try {
        const res = await axios.get(`${Base_Url}/campaign/campaigns`);
        const camp = res.data.filter((item)=>item.amountRaised<item.goal).sort((a,b)=>b.amountRaised-a.amountRaised);
        const compCamps = res.data.filter((item)=>item.amountRaised>=item.goal);
        const camps = [...camp,...compCamps];
        setCampaign(camps);
      } catch (error) {
        console.error(error);
      }
    };
    getCampaign();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user_id) {
          const response = await axios.get(`${Base_Url}/user/getuserbyid`, {
            params: { _id: user_id },
          });
          setUser(response.data.user[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      {/* Table Header (only for md+ screens) */}
      <div className="w-full bg-white dark:bg-gray-800  z-40 backdrop-blur-md box-border shadow-md top-[64px] hidden fixed rounded-lg p-4 sm:p-6 md:flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 hover:shadow-lg transition">
      <div className="hidden md:flex justify-between text-center items-center w-full text-base dark:text-gray-100 text-gray-700">
          <h2 className="w-2/12">Name</h2>
          <h2 className="w-2/12">Category</h2>
          <h2 className="w-1/12">Goal</h2>
          <h2 className="w-2/12">Raised</h2>
          <h2 className="w-2/12">Deadline</h2>
          <h2 className="w-2/12">Creator</h2>
        </div>
      </div>


      {/* Main Content */}
      <div className="w-full mt-[130px] md:mt-[150px] flex flex-col gap-6 pb-20">
        {campaign.map((campaign) => (
          <Link to={`/campaign?id=${campaign._id}`} key={campaign._id}>
            <ListCardCampaignDonate campaign={campaign} />
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Donate;
