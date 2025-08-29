import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbXboxX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const LendPageCard = ({ user }) => {
  const navigate = useNavigate();
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 10);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const onSubmit = async (data) => {
    const campaignData = {
      title: data.title,
      description: data.description,
      category: data.category,
      goal: data.goal,
      images: data.images,
      deadline: data.deadline,
      creatorId: user._id
    };
    try {
      const res = await axios.post(`${Base_Url}/campaign/campaignadd`, campaignData);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate(`/campaign?id=${res.data.campaignId}`);
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleUpload = async (files) => {
    setUploading(true);
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Crowd_fund_user_images");
      formData.append("cloud_name", "dgs40un2h");
      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dgs40un2h/image/upload", formData);
        urls.push(res.data.url);
      } catch {
        toast.error("Upload Failed");
      }
    }
    setImages(urls);
    setUploading(false);
  };

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  const handleDelete = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleUpload(files);
  };

  const options = [
    "Medical", "Memorials", "Non-Profit", "Education", "Emergencies",
    "Children", "Animal", "Sports", "Community", "Elderly",
    "Art & Media", "Women", "Technology", "Environment",
    "Social Entrepreneurship", "Human Rights", "Rural Development",
    "Livelihood", "Loans", "Construction", "Others"
  ];

  return (
    <div className="w-full px-4 md:px-0 flex justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-8">
        <h1 className="text-2xl font-semibold text-center">Create Your Campaign</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Campaign Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Write about your campaign..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          {/* Category with dropdown */}
          <div className="relative">
            <label className="block font-semibold mb-1">Category</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={query}
                {...register("category", { required: "Category is required" })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 cursor-pointer bg-white dark:bg-gray-800 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Select category"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                ▼
              </button>
            </div>
            {showDropdown && (
              <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow max-h-48 overflow-auto">
                {options.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                      setValue("category", item);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Goal */}
          <div>
            <label className="block font-semibold mb-1">Goal Amount</label>
            <input
              type="number"
              placeholder="Enter goal amount"
              {...register("goal", { required: "Goal amount is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.goal && <p className="text-red-600 text-sm">{errors.goal.message}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block font-semibold mb-1">Deadline</label>
            <input
              type="date"
              min={minDate}
              {...register("deadline", { required: "Deadline is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.deadline && <p className="text-red-600 text-sm">{errors.deadline.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((url, index) => (
                <div key={index} className="relative w-20 h-20 rounded overflow-hidden border border-gray-300">
                  <img src={url} alt="uploaded" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="absolute top-0 right-0 bg-black/60 text-white rounded-bl px-1"
                  >
                    <TbXboxX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 cursor-pointer hover:scale-110  hover:-translate-y-2 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Submit Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendPageCard;

