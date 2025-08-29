import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-4 md:px-10 lg:px-20 py-10">
      {/* Right side description text */}

      {/* Left side content */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          Empower Ideas. <br /> Fuel Dreams.
        </h1>

        <a
          href="/lend"
          className="text-lg sm:text-2xl md:text-3xl hover:text-blue-400 hover:scale-105 hover:-translate-y-1 transition-transform bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg w-fit"
        >
          🔵 Start a Fund Raiser
        </a>
        <a
          href="/donate"
          className="text-lg sm:text-2xl md:text-3xl hover:text-blue-400 hover:scale-105 hover:-translate-y-1 transition-transform bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg w-fit"
        >
          ⚪ Donate to a Campaign
        </a>
      </div>
      <div className="text-base md:text-lg lg:text-xl text-center md:text-left max-w-md md:max-w-lg">
        Discover inspiring campaigns and become part of the journey. Whether
        you're starting a project or supporting one, we're building a future
        where everyone has a chance to grow.
      </div>
    </div>
  );
};

export default Banner;
