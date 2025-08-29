import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Campaigns from "../components/Campaigns";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      <Campaigns />
      <Footer />
    </div>
  );
};

export default Home;
