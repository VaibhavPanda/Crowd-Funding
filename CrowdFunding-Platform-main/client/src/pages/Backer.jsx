import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { FaHourglassEnd, FaIndianRupeeSign, FaUser } from 'react-icons/fa6';
import { LuActivity } from 'react-icons/lu';
import axios from 'axios';

const Backer = ({ user }) => {
  const [campaignsList, setCampaignList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getCampaign = async () => {
      const camps = [];
      for (const campaign of user.campaignDonated) {
        const res = await axios.get(`${Base_Url}/campaign/campaignfindbyid`, {
          params: { _id: campaign.campaignId },
        });
        camps.push({
          camps: res.data.camp,
          amountDonated: campaign.amountDonated,
        });
      }
      setCampaignList(camps);
    };
    getCampaign();
  }, []);

  const paginatedCampaigns = campaignsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(campaignsList.length / itemsPerPage);

  const formatDateToDDMMYY = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <DashboardCard title="Total Campaigns Donated" value={user.campaignDonated.length} icon={FaUser} />
        <DashboardCard title="Active Campaigns" value={user.campaignDonated.length} icon={LuActivity} textColor="text-blue-600" />
        <DashboardCard title="Completed Campaigns" value="7" icon={FaHourglassEnd} textColor="text-yellow-500" />
        <DashboardCard title="Funds Donated" value={user.fundDonated} icon={FaIndianRupeeSign} textColor="text-green-600" />
      </div>

      {/* Campaign list */}
      <div className="flex flex-col items-center justify-center w-full gap-5 p-5 rounded-xl shadow-md bg-white dark:bg-gray-800 transition-all duration-200">
        <h4 className="text-xl font-medium text-gray-700 dark:text-white">Campaigns You Donated</h4>

        {/* Headers */}
        <div className="hidden md:flex justify-evenly items-center w-full pr-10 pl-5 text-center bg-gray-300 dark:bg-gray-700 rounded-xl py-2 font-semibold text-sm text-gray-800 dark:text-gray-200">
          <h2 className="w-1/6">Name</h2>
          <h2 className="w-1/6">Category</h2>
          <h2 className="w-1/6">Goal</h2>
          <h2 className="w-1/6">Raised</h2>
          <h2 className="w-1/6">Deadline</h2>
          <h2 className="w-1/6">You Donated</h2>
        </div>

        {/* Campaigns */}
        <div className="w-full flex flex-col gap-4">
          {paginatedCampaigns.map((campaignObj) => (
            <div
              key={campaignObj.camps._id}
              className="hidden md:flex bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm text-sm text-gray-800 dark:text-white justify-evenly"
            >
              <div className="w-1/6 text-center">{campaignObj.camps.title}</div>
              <div className="w-1/6 text-center">{campaignObj.camps.category}</div>
              <div className="w-1/6 text-center">₹{campaignObj.camps.goal}</div>
              <div className="w-1/6 text-center">₹{campaignObj.camps.amountRaised}</div>
              <div className="w-1/6 text-center">{formatDateToDDMMYY(campaignObj.camps.deadline)}</div>
              <div className="w-1/6 text-center">₹{campaignObj.amountDonated}</div>
            </div>
          ))}

          {/* Mobile View */}
          {paginatedCampaigns.map((campaignObj) => (
            <div
              key={`mobile-${campaignObj.camps._id}`}
              className="md:hidden bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm text-sm text-gray-800 dark:text-white"
            >
              <p><strong>Name:</strong> {campaignObj.camps.title}</p>
              <p><strong>Category:</strong> {campaignObj.camps.category}</p>
              <p><strong>Goal:</strong> ₹{campaignObj.camps.goal}</p>
              <p><strong>Raised:</strong> ₹{campaignObj.camps.amountRaised}</p>
              <p><strong>Deadline:</strong> {formatDateToDDMMYY(campaignObj.camps.deadline)}</p>
              <p><strong>You Donated:</strong> ₹{campaignObj.amountDonated}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          {currentPage > 3 && (
            <>
              <button
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <span className="text-gray-500 dark:text-gray-300">...</span>
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page =>
              page === currentPage ||
              page === currentPage - 1 ||
              page === currentPage + 1
            )
            .map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-500 dark:text-gray-300">...</span>
              <button
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backer;
