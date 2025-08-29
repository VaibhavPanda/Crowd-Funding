import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { FaUser, FaIndianRupeeSign, FaHourglassEnd } from 'react-icons/fa6';
import { LuActivity } from 'react-icons/lu';
import axios from 'axios';
import ListCard from '../components/ListCard';
import ListCardCampaign from '../components/ListCardCampaign';

const Admin = ({ user }) => {
  const [userList, setUserList] = useState([]);
  const [backerList, setBackerList] = useState([]);
  const [creatorList, setCreatorList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${Base_Url}/user/getalluser`);
        const allUsers = res.data.users;
        setUserList(allUsers);
        setCreatorList(allUsers.filter(u => u.role === 'Creator'));
        setBackerList(allUsers.filter(u => u.role === 'Backer'));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${Base_Url}/campaign/campaigns`);
        setCampaignList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
    fetchCampaigns();
  }, []);

  const fundraised = () =>
    userList.reduce((acc, u) => acc + (u.fundDonated || 0), 0);

  const totalGoal = () =>
    campaignList.reduce((acc, c) => acc + (c.goal || 0), 0);

  const paginatedCampaigns = campaignList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [creatorPage, setCreatorPage] = useState(1);
    const [backerPage, setBackerPage] = useState(1);

    const usersPerPage = 5;
    const totalCreatorPages = Math.ceil(creatorList.length / usersPerPage);
    const totalBackerPages = Math.ceil(backerList.length / usersPerPage);

    const paginatedCreators = creatorList.slice(
    (creatorPage - 1) * usersPerPage,
    creatorPage * usersPerPage
    );

    const paginatedBackers = backerList.slice(
    (backerPage - 1) * usersPerPage,
    backerPage * usersPerPage
    );
    const totalPages = Math.ceil(campaignList.length / itemsPerPage);

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Users" value={userList.length - 1} icon={FaUser} />
        <DashboardCard title="Funds Raised" value={fundraised()} icon={FaIndianRupeeSign} textColor="text-green-600" />
        <DashboardCard title="Total Goals" value={totalGoal()} icon={FaHourglassEnd} textColor="text-yellow-500" />
        <DashboardCard title="Active Campaigns" value={campaignList.length} icon={LuActivity} textColor="text-blue-600" />
      </div>

    <section className="bg-white dark:bg-gray-800 text-center rounded-xl p-5 shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Creators</h2>

        {/* Headers */}
        <div className="hidden md:flex bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-3 text-center font-semibold text-sm text-gray-700 dark:text-gray-200">
            <h2 className="w-1/12">Profile</h2>
            <h2 className="w-4/12">Name</h2>
            <h2 className="w-4/12">Email</h2>
            <h2 className="w-2/12">Amount Raised</h2>
            <h2 className="w-1/12">Action</h2>
        </div>

        {/* Paginated Creator Cards */}
        <div className="flex flex-col gap-4 mt-4">
            {paginatedCreators.map(c => (
            <ListCard key={c._id} user={c} />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center gap-2">
            <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={creatorPage === 1}
            onClick={() => setCreatorPage(prev => Math.max(prev - 1, 1))}
            >
            Previous
            </button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-md">{creatorPage}</span>
            <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={creatorPage === totalCreatorPages}
            onClick={() => setCreatorPage(prev => Math.min(prev + 1, totalCreatorPages))}
            >
            Next
            </button>
        </div>
        </section>

        <section className="bg-white dark:bg-gray-800 text-center rounded-xl p-5 shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Backers</h2>

        {/* Headers */}
        <div className="hidden md:flex bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-3 text-center font-semibold text-sm text-gray-700 dark:text-gray-200">
            <h2 className="w-1/12">Profile</h2>
            <h2 className="w-4/12">Name</h2>
            <h2 className="w-4/12">Email</h2>
            <h2 className="w-2/12">Amount Donated</h2>
            <h2 className="w-1/12">Action</h2>
        </div>

        {/* Paginated Backer Cards */}
        <div className="flex flex-col gap-4 mt-4">
            {paginatedBackers.map(b => (
            <ListCard key={b._id} user={b} />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center gap-2">
            <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={backerPage === 1}
            onClick={() => setBackerPage(prev => Math.max(prev - 1, 1))}
            >
            Previous
            </button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-md">{backerPage}</span>
            <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            disabled={backerPage === totalBackerPages}
            onClick={() => setBackerPage(prev => Math.min(prev + 1, totalBackerPages))}
            >
            Next
            </button>
        </div>
        </section>


      {/* Campaigns */}
      <section className="bg-white dark:bg-gray-800 text-center rounded-xl p-5 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Campaigns</h2>
        <div className="hidden md:flex bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-2 text-center font-semibold text-sm text-gray-700 dark:text-gray-200">
            <div className="w-2/12">Name</div>
            <div className="w-2/12">Category</div>
            <div className="w-1/12">Goal</div>
            <div className="w-2/12">Raised</div>
            <div className="w-2/12">Deadline</div>
            <div className="w-2/12">Creator</div>
            <div className="w-1/12">Action</div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {paginatedCampaigns.map(camp => (
            <ListCardCampaign key={camp._id} campaign={camp} />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {/* Previous Button */}
            <button
                className="px-3 py-1 rounded-md bg-gray-300 hover:scale-110 hover:-translate-y-0.5 cursor-pointer dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
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
                    currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
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
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
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
                    currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
                    }`}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </button>
                </>
            )}

            {/* Next Button */}
            <button
                className="px-3 py-1 rounded-md hover:scale-110 hover:-translate-y-0.5 cursor-pointer bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
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

export default Admin;
