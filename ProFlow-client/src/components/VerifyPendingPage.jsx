import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

const VerifyPendingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-purple-200">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-4 rounded-full shadow-sm">
            <FaEnvelopeOpenText className="text-white text-3xl" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-black mb-2">
          Check your email
        </h2>
        <p className="text-gray-600 mb-4">
          A verification link has been sent to your email address. Please check your inbox to activate your account.
        </p>
        <p className="text-sm text-gray-500">
          Didn’t get the email?{" "}
          <button className="text-purple-600 hover:underline font-semibold">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyPendingPage;
