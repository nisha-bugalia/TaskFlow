import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaMicrosoft,
  FaApple,
  FaSlack,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    image: "",
    role: "",
    company: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/user/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(
        userDetails
      )
    }).then(res=>res.json()).then(data=>console.log(data)).catch(err=> console.log(err))
    navigate("/verify-pending");
  };
 

  return (
    <div className="flex py-10 items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold my-4">ProFlow</h1>
        <h2 className="text-base font-semibold mb-6 text-gray-700">
          Sign up to continue
        </h2>
        <form onSubmit={handleSignup}>
          <label className="w-full text-sm font-semibold mb-1">Full Name</label>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            type="text"
            placeholder="Enter your Full Name"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="w-full text-sm font-semibold mb-1">Email</label>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="w-full max-w-sm text-sm font-semibold mb-1">
            Password
          </label>
          <div className="relative w-full max-w-sm mb-2">
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: (e.target.value).toString() })
              }
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
          <label className="w-full max-w-sm text-sm font-semibold mb-1">
            Repeat Password
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

          <p className="text-sm my-3">
            I accept the
            <a href="#" className="text-blue-500 hover:underline ml-1">
              terms
            </a>
          </p>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded mb-4 hover:bg-black"
            onClick={() => {
              console.log(userDetails);
            }}
          >
            Sign up
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
        </form>
        <div className="text-center text-sm mt-6">
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
