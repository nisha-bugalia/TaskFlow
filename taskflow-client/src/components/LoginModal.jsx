import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaMicrosoft, FaApple, FaEyeSlash, FaEye } from "react-icons/fa";

const LoginPage = () => {
  const[showPassword, setShowPassword]=useState(false);
  return (
    <div className="flex py-10 items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold my-4">ProFlow</h1>
        <h2 className="text-base font-semibold mb-6 text-gray-700">
          Log in to continue
        </h2>

        <label className="w-full text-sm font-semibold mb-1">Email *</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label className="w-full max-w-sm text-sm font-semibold mb-1">
          Password 
        </label>
        <div className="relative w-full max-w-sm mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="w-full max-w-sm text-right mb-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="w-full flex items-center mb-6">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm text-gray-600">Remember me</span>
        </div>

        <button className="w-full bg-purple-800 text-white py-2 rounded mb-4 hover:bg-black">
          Continue
        </button>

        <p className="text-center text-gray-500 mb-2">Or continue with:</p>

        <div className="w-full flex flex-col gap-3">
          <button className="flex items-center justify-center border py-2 rounded">
            <FaGoogle className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center border py-2 rounded">
            <FaMicrosoft className="mr-2" /> Microsoft
          </button>
          <button className="flex items-center justify-center border py-2 rounded">
            <FaApple className="mr-2" /> Apple
          </button>
        </div>

        <div className="text-center text-sm mt-6">
          <a href="#" className="text-blue-500 hover:underline">
            Can't log in?
          </a>{" "}
          &middot;
          <Link
            to="/signup"
            className="text-blue-500 hover:underline ml-1"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
