import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success");
  const paymentId = searchParams.get("razorpay_payment_id");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          {isSuccess ? (
            <>
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-green-600">Payment Successful</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-100">Thank you for your contribution!</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Payment ID:</p>
                <p className="text-md font-medium text-gray-800">{paymentId}</p>
              </div>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-red-600">Payment Failed</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-100">Something went wrong. Please try again.</p>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PaymentSuccess
