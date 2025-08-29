import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    setLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/user/login`, userInfo);
      localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 transition-all duration-300">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
              Login to Your Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className={`peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500`}
                  placeholder=""
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  Email Address
                </label>
              </div>


              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder=""
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  Password
                </label>

                {/* Eye toggle */}
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-cyan-500 cursor-pointer hover:scale-105 hover:-translate-y-0.5 ease-in-out text-white rounded-md px-4 py-2 transition-opacity ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              New here?
              <a
                href="/signup"
                className="text-blue-500 hover:underline ml-1"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
