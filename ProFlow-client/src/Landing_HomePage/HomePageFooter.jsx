import React from "react";
import { FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HomePageFooter = () => {
    const navigate=useNavigate();
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-8 px-4">
      {/* CTA */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to boost your team's productivity?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Join thousands of teams using ProFlow to deliver projects faster and more efficiently.
        </p>
        <div className="flex justify-center gap-4">
          <button 
          onClick={()=>navigate("/signup")}
          className="bg-purple-700 text-xl hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow">
            Get Started
          </button>
          
        </div>
      </div>

      <hr className="border-gray-600 mb-6" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="bg-purple-700 text-white p-2 rounded-lg">
            <FiZap className="text-lg" />
          </div>
          <span className="font-semibold text-white">ProFlow</span>
        </div>

        <p>© 2024 ProFlow. All rights reserved.</p>

        <div className="flex gap-6 text-gray-300">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default HomePageFooter;
