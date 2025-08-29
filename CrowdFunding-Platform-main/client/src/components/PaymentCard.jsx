import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PaymentCard = ({ campaign }) => {
  const user_id = localStorage.getItem("user_id") || null;
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getUser = async () => {
      if (user_id) {
        const {
          data: { user },
        } = await axios.get(`${Base_Url}/user/getuserbyid`, {
          params: { _id: user_id },
        });
        setCurrUser(user[0]);
      }
    };
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(`${Base_Url}/pay/checkout`, data);
    const order = res.data.order;
    const {
      data: { key },
    } = await axios.get(`${Base_Url}/apikey`);
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Harshit Shrivastava",
      description: "Campaign Donation",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        if (currUser && campaign) {
          setLoading(true);
          try {
            const res = await axios.post(
              `${Base_Url}/pay/paymentverification`,
              {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                currUser,
                campaign,
              }
            );
            if (res.data.status === true) {
              toast.success("Payment Successful");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              toast.error("Payment Failed");
            }
          } catch (error) {
            console.log("An error occurred:", error);
          } finally {
            setLoading(false);
          }
        }
      },
      prefill: {
        name: currUser?.name || "",
        email: currUser?.email || "",
        contact: currUser?.phoneNumber || "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#528FF0",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="text-white text-xl font-semibold animate-pulse">
            Processing Payment...
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 max-w-sm w-full transition-all duration-300"
      >
        <Toaster />
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Donate to this Campaign
        </h2>

        <div className="relative mb-6">
          <input
            autoComplete="off"
            id="amount"
            name="amount"
            type="number"
            className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
            placeholder=""
            {...register("amount", { required: true })}
          />
          <label
            htmlFor="amount"
            className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Enter amount to donate (₹)
          </label>
        </div>
        {campaign && campaign.amountRaised<campaign.goal?(
          currUser ? (
          <button
            type="submit"
            className="w-full py-3 rounded-md cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            Donate
          </button>
        ) : (
          <button
            type="button"
            onClick={() => window.location.href = "/signup"}
            className="w-full py-3 rounded-md bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white font-semibold transition"
          >
            Login / Sign Up to Donate
          </button>
        )
        ):(
          <button
            type="button"
            // onClick={() => window.location.href = "/signup"}
            disabled = "true"
            className="w-full py-3 rounded-md bg-gray-500 hover:bg-gray-600 cursor-not-allowed text-white font-semibold transition"
          >
            No more amount left to donate
          </button>
        )}
      </form>
    </>
  );
};

export default PaymentCard;
