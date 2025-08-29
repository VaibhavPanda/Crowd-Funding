import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password1 !== data.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userInfo = {
      name: data.fullname,
      role: data.role,
      email: data.email,
      password: data.password1,
    };

    setLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/user/signup`, userInfo);
      localStorage.setItem("user_id", res.data.user_id);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 transition-all duration-300 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Full Name */}
            <div className="relative">
              <input
                id="fullname"
                type="text"
                {...register("fullname", { required: true })}
                className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="fullname"
                className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Full Name
              </label>
            </div>

            {/* Role */}
            <div className="relative">
              <input
                id="role"
                list="roles"
                type="text"
                {...register("role", { required: true })}
                className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="role"
                className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Role (Backer or Creator)
              </label>
              <datalist id="roles">
                <option value="Backer" />
                <option value="Creator" />
              </datalist>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password1"
                type={showPassword ? "text" : "password"}
                {...register("password1", { required: true })}
                className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="password1"
                className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                id="password2"
                type={showConfirmPassword ? "text" : "password"}
                {...register("password2", { required: true })}
                className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="password2"
                className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-cyan-500 cursor-pointer hover:scale-105 ease-in-out transform hover:-translate-y-0.5 text-white rounded-md px-4 py-2 transition-opacity ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?
            <a
              href="/login"
              className="text-blue-500 hover:underline ml-1"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
