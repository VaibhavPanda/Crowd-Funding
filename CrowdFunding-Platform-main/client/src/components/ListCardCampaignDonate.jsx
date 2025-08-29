import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const ListCardCampaign = ({ campaign }) => {
  const location = useLocation();
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${Base_Url}/user/getuserbyid`, {
        params: { _id: campaign.creatorId },
      });
      setUser(res.data.user[0]);
    };
    getUser();
  }, []);

  const handleClick = async () => {
    const res = await axios.delete(`${Base_Url}/campaign/campaigndelete/${campaign._id}`, {
      params: { id: campaign._id },
    });
    toast.success(res.data.message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 hover:shadow-lg transition">
      {/* Mobile View with Labels */}
      <div className="flex flex-col md:hidden w-full text-sm text-gray-700 dark:text-gray-100 gap-1">
        <p><strong>Name:</strong> {campaign?.title}</p>
        <p><strong>Category:</strong> {campaign?.category}</p>
        <p><strong>Goal:</strong> ₹{campaign?.goal}</p>
        <p><strong>Raised:</strong> ₹{campaign?.amountRaised}</p>
        <p><strong>Deadline:</strong> {formatDateToDDMMYY(campaign?.deadline)}</p>
        <p><strong>Creator:</strong> {user?.name}</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:flex justify-between items-center w-full text-base text-gray-800 dark:text-gray-100">
        <h4 className="w-2/12 text-center">{campaign?.title}</h4>
        <h4 className="w-2/12 text-center">{campaign?.category}</h4>
        <h4 className="w-1/12 text-center">₹{campaign?.goal}</h4>
        <h4 className="w-2/12 text-center">₹{campaign?.amountRaised}</h4>
        <h4 className="w-2/12 text-center">{formatDateToDDMMYY(campaign?.deadline)}</h4>
        <h4 className="w-2/12 text-center">{user?.name}</h4>
      </div>
    </div>
  );
};

export default ListCardCampaign;
