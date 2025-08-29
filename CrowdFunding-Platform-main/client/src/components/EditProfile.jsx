import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [profilePic, setProfilePic] = useState(user.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Crowd_fund_user_images");
    data.append("cloud_name", "dgs40un2h");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgs40un2h/image/upload", {
        method: "POST",
        body: data
      });
      const updatedImageURL = await res.json();
      setProfilePic(updatedImageURL.url);
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    const formData = {
      name: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      image: profilePic
    };

    try {
      const res = await axios.put(`${Base_Url}/user/updateuser/${user._id}`, formData);
      toast.success("Profile updated successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <Toaster />
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        ✏️ Edit Profile
      </h2>

      <div className="space-y-5">
        {/* First name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 dark:text-gray-300">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B1C37]"
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 dark:text-gray-300">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B1C37]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 dark:text-gray-300">Registered Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="border rounded-md px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 dark:text-gray-300">Phone Number</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-20 border rounded-md px-2 py-2 text-center"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Profile picture */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 dark:text-gray-300">Change Profile Picture</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="bg-gray-100 border px-4 py-2 rounded cursor-pointer hover:bg-gray-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
              <span className="text-[#8B1C37] font-medium">Choose File</span>
            </label>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="rounded-full w-12 h-12 object-cover" />
              ) : (
                firstName.charAt(0).toUpperCase()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSave}
          disabled={isUploading}
          className={`px-8 py-2 rounded-full cursor-pointer transition-all duration-300 ${
            isUploading || !profilePic
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#8B1C37] hover:bg-[#a82b48] text-white"
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-4 w-4" />
              Uploading...
            </div>
          ) : (
            "💾 Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
