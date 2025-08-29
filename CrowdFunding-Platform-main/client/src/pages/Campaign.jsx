import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CampaignPageCard from "../components/CampaignPageCard";
import PaymentCard from "../components/PaymentCard";

const Campaign = () => {
  const [searchParams] = useSearchParams();
  const [campaign, setCampaign] = useState(null);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getCampaign = async () => {
      const id = searchParams.get("id");
      try {
        const { data } = await axios.get(`${Base_Url}/campaign/campaignfindbyid`, {
          params: { _id: id },
        });
        setCampaign(data.camp);
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      }
    };
    getCampaign();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10 items-center justify-center">
          <CampaignPageCard campaign={campaign} />
          <PaymentCard campaign={campaign} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Campaign;
