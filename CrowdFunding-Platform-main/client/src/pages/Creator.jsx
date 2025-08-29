import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { FaUser, FaIndianRupeeSign, FaHourglassEnd } from 'react-icons/fa6';
import { LuActivity } from 'react-icons/lu';
import axios from 'axios';
import ListCardCampaign from '../components/ListCardCampaign';

const Creator = ({ user }) => {
  const [campaignList, setCampaignList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaigns = [];
        for (const campaign_id of user.campaignCreated) {
          const res = await axios.get(`${Base_Url}/campaign/campaignfindbyid`, {
            params: { _id: campaign_id },
          });
          campaigns.push(res.data.camp);
        }
        setCampaignList(campaigns);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaigns();
  }, [user]);

  const paginatedCampaigns = campaignList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(campaignList.length / itemsPerPage);

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Campaigns Created" value={user.campaignCreated.length} icon={FaUser} />
        <DashboardCard title="Active Campaigns" value={campaignList.length} icon={LuActivity} textColor="text-blue-600" />
        <DashboardCard title="Pending Campaigns" value="-" icon={FaHourglassEnd} textColor="text-yellow-500" />
        <DashboardCard title="Funds Raised" value={user.fundRaised} icon={FaIndianRupeeSign} textColor="text-green-600" />
      </div>

      {/* Campaign List */}
      <section className="bg-white dark:bg-gray-800 text-center rounded-xl p-5 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Your Campaigns</h2>

        {/* Header Row */}
        <div className="hidden md:flex bg-gray-200 dark:bg-gray-700 rounded-lg py-2 text-center font-semibold text-sm text-gray-700 dark:text-gray-200">
          <h2 className="w-2/12">Name</h2>
          <h2 className="w-2/12">Category</h2>
          <h2 className="w-1/12">Goal</h2>
          <h2 className="w-2/12">Raised</h2>
          <h2 className="w-2/12">Deadline</h2>
          <h2 className="w-2/12">Creator</h2>
          <h2 className="w-1/12">Action</h2>
        </div>

        {/* Campaign Cards */}
        <div className="flex flex-col gap-4 mt-2">
          {paginatedCampaigns.map(camp => (
            <ListCardCampaign key={camp._id} campaign={camp} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          {/* First Page */}
          {currentPage > 3 && (
            <>
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
                }`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <span className="text-gray-500 dark:text-gray-300">...</span>
            </>
          )}

          {/* Pages around current */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              page =>
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1
            )
            .map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          {/* Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-500 dark:text-gray-300">...</span>
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
                }`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Creator;
