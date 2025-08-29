import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const Cards = ({ item }) => {
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState();
  const percentage = Math.floor((item.amountRaised * 100) / item.goal);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${Base_Url}/user/getuserbyid`, {
        params: { _id: item.creatorId },
      });
      setUser(res.data.user[0]);
    };
    getUser();
  }, []);

  return (
    <Link
      to={`/campaign?id=${item._id}`}
      className="w-full max-w-sm bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
    >
      {/* Image Section */}
      <figure className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
        <img
          src={item.images[0]}
          alt="Campaign"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-center mb-4">
          {item.title}
        </h2>

        {/* Progress & Info */}
        <div className="flex justify-between items-center gap-4">
          {/* Circular Progress */}
          <div className="w-14 h-14">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                strokeLinecap: "round",
                textSize: "24px",
                pathColor: "#22c55e", // green
                textColor: "#15803d",
                trailColor: "#d1d5db",
              })}
            />
          </div>

          {/* Raised */}
          <div className="flex-1 text-center border-l border-gray-200 pl-4">
            <p className="text-sm text-gray-500">Raised</p>
            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
              ₹{item.amountRaised}
            </p>
          </div>

          {/* Creator */}
          <div className="flex-1 text-center border-l border-gray-200 pl-4">
            <p className="text-sm text-gray-500">Created By</p>
            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
              {user?.name || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
