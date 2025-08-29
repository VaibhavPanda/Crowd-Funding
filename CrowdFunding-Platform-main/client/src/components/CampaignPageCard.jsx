import React from 'react';

const CampaignPageCard = ({ campaign }) => {
  function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 max-w-xl w-full transition-all duration-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
        {campaign?.title}
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6">
        {campaign?.description}
      </p>

      <div className="grid grid-cols-2 gap-6 text-center mb-6">
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Goal</h2>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            ₹ {campaign?.goal}
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Raised</h2>
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ₹ {campaign?.amountRaised}
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Creator</h2>
          <p className="text-md font-semibold text-gray-700 dark:text-white break-all">
            {campaign?.creatorId}
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Deadline</h2>
          <p className="text-md font-semibold text-gray-800 dark:text-white">
            {campaign && formatDateToDDMMYY(campaign.deadline)}
          </p>
        </div>
      </div>

      {campaign?.images?.length > 0 && (
        <div>
          <h2 className="text-center text-gray-700 dark:text-white font-semibold mb-2">
            Campaign Images
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {campaign.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Campaign"
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPageCard;
