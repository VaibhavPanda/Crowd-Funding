import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ListCardCampaign = ({ campaign }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${Base_Url}/user/getuserbyid`, {
        params: { _id: campaign.creatorId },
      });
      setUser(res.data.user[0]);
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    const res = await axios.delete(`${Base_Url}/campaign/campaigndelete/${campaign._id}`);
    toast.success(res.data.message);
    setTimeout(() => window.location.reload(), 1000);
  };

  const formatDate = (d) => {
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-3 flex flex-col md:flex-row justify-between items-center md:items-stretch text-sm text-gray-900 dark:text-white">
      {/* Desktop View */}
      <div className="hidden md:flex w-full items-center text-center">
        <div className="w-2/12">{campaign.title}</div>
        <div className="w-2/12">{campaign.category}</div>
        <div className="w-1/12">₹{campaign.goal}</div>
        <div className="w-2/12">₹{campaign.amountRaised}</div>
        <div className="w-2/12">{formatDate(campaign.deadline)}</div>
        <div className="w-2/12">{user?.name}</div>
        <div className="w-1/12 ">
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full space-y-1">
        <p><strong>Name:</strong> {campaign.title}</p>
        <p><strong>Category:</strong> {campaign.category}</p>
        <p><strong>Goal:</strong> ₹{campaign.goal}</p>
        <p><strong>Raised:</strong> ₹{campaign.amountRaised}</p>
        <p><strong>Deadline:</strong> {formatDate(campaign.deadline)}</p>
        <p><strong>Creator:</strong> {user?.name}</p>
        <div className="text-right mt-1">
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCardCampaign;
