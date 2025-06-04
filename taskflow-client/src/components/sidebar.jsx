import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function Sidebar({ darkMode }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };

  const confirmLogout = () => {
    setShowLogout(false);
    //logout logic like clear auths here
    console.log("User logged out");
  };

  return (
    <div className={`fixed top-16 mt-2 border-2 rounded-lg w-64 h-[calc(100vh-4rem)] transition-colors duration-300 
      ${darkMode ? 'bg-gray-800 border-purple-600 text-white' : 'bg-purple-200 border-purple-950 text-gray-900'}`}>

      <div className="p-4">
        <h1 className="text-xl font-bold">My WorkSpace</h1>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <Link to="/dashboard" className={`flex items-center p-2 text-base font-medium rounded transition-colors duration-200
          ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-purple-100'}`}>
          <MdDashboard className="text-lg mr-2" />
          Dashboard
        </Link>

        <Link to="/profile" className={`flex items-center p-2 text-base font-medium rounded transition-colors duration-200
          ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-purple-100'}`}>
          <CgUser className="text-lg mr-2" />
          Profile
        </Link>

        <Link to="/settings" className={`flex items-center p-2 text-base font-medium rounded transition-colors duration-200
          ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-purple-100'}`}>
          <FcSettings className="text-lg mr-2" />
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full text-left flex items-center p-2 text-base font-medium rounded transition-colors duration-200
            ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-purple-100'}`}
        >
          <BiLogOut className="text-lg mr-2" />
          Logout
        </button>
      </nav>

      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={confirmLogout}
        darkMode={darkMode}
      />
    </div>
  );
}

export default Sidebar;
