import React from "react";
import { useNavigate } from "react-router-dom";
import { FiZap } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";

const HomePageHero = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white transition">
      {/* ✅ Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 shadow-sm px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xl">
            <FiZap className="text-white rounded-lg p-2 text-4xl bg-purple-600" />
            <span>ProFlow</span>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-6 text-sm">
            <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
              <a href="#features" className="hover:text-purple-600">Features</a>
              <a href="#how" className="hover:text-purple-600">How it Works</a>
              <a href="#pricing" className="hover:text-purple-600">Pricing</a>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-lg hover:text-purple-600"
              title="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Auth Buttons */}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 shadow"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section (with padding-top to offset navbar) */}
      <section className="text-center px-3 pt-32 pb-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          Work smarter. <span className="text-purple-700 dark:text-purple-400">Flow better.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
          Transform your team's productivity with ProFlow's intuitive project
          management platform. Streamline workflows, boost collaboration, and
          achieve more together.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-purple-600 text-white text-lg font-medium rounded-md shadow hover:bg-purple-700"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePageHero;
