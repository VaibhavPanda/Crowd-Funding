import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get(`${Base_Url}/campaign/campaigns`);
        const camps = res.data.filter((item)=>item.amountRaised<item.goal).sort((a,b)=>(b.amountRaised/b.goal)-(a.amountRaised/a.goal)).slice(0,6);
        setCampaigns(camps);
      } catch (error) {
        console.log(error);
      }
    };
    getCampaigns();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 py-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8">
        Thousands are Fund Raising Online on Crowd-Fund
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
        {campaigns.map((item) => (
          <Cards item={item} key={item._id} />
        ))}
      </div>
      <button
        onClick={() => navigate('/donate')}
        className="px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-700 hover:scale-105 hover:-translate-y-0.5 cursor-pointer ease-in-out transition"
      >
        View More
      </button>
    </div>
  );
};

export default Campaigns;
