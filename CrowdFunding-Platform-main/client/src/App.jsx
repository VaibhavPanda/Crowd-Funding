import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donate from "./pages/Donate.jsx";
import Lend from "./pages/Lend.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Campaign from "./pages/Campaign.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-100 text-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/lend" element={<Lend />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
