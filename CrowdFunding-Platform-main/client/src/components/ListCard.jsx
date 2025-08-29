import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const ListCard = ({ user }) => {
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const handleClick = async () => {
    const res = await axios.delete(`${Base_Url}/user/deleteuser/${user._id}`, {
      params: { id: user._id },
    });
    toast.success(res.data.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow flex flex-col md:flex-row justify-between items-center text-sm text-gray-800 dark:text-white">
      <Toaster />
      
      {/* Desktop View */}
      <div className="hidden md:flex w-full items-center text-center">
        <div className="w-1/12 flex justify-center">
          <img src={user?.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
        </div>
        <div className="w-4/12">{user?.name}</div>
        <div className="w-4/12">{user?.email}</div>
        <div className="w-2/12">
          ₹{user?.role === 'Creator' ? user?.fundRaised : user?.fundDonated}
        </div>
        <div className="w-1/12">
          <button onClick={handleClick} className="text-red-600 hover:text-red-800">
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full space-y-1">
        <div className="flex items-center gap-2">
          <img src={user?.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold">{user?.name}</span>
        </div>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>₹ {user?.role === 'Creator' ? user?.fundRaised : user?.fundDonated}</strong></p>
        <div className="text-right">
          <button onClick={handleClick} className="text-red-600 hover:text-red-800">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
