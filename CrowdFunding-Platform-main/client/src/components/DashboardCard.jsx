import React from 'react';

const DashboardCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="p-5 rounded-xl shadow-md bg-white dark:bg-gray-800 flex items-center justify-between hover:shadow-lg transition-all duration-200">
      <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">{title}</h4>
        <h2 className="text-2xl font-bold text-black dark:text-white">{value}</h2>
      </div>
      <div className="text-gray-400 dark:text-gray-300">
        <Icon size={32} />
      </div>
    </div>
  );
};

export default DashboardCard;
