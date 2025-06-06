import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function Sidebar({ darkMode, isOpen, sidebarRef }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => setShowLogout(true);
  const confirmLogout = () => {
    setShowLogout(false);
    console.log("User logged out");
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen])

  return (
    <>
    <div 
    ref={sidebarRef}
    className={`
      fixed top-16 left-0 z-[900] border-2 rounded-lg w-64 h-[calc(100vh-4rem)] transition-transform duration-300
      ${darkMode ? 'bg-gray-800 border-purple-600 text-white' : 'bg-purple-200 border-purple-950 text-gray-900'}
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block
    `}>
      <div className="p-4">
        <h1 className="text-xl font-bold">My WorkSpace</h1>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        <Link to="/dashboard" className={`flex items-center p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'}`}>
          <MdDashboard className="mr-2" />
          Dashboard
        </Link>

        <Link to="/profile" className={`flex items-center p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'}`}>
          <CgUser className="mr-2" />
          Profile
        </Link>

        <Link to="/settings" className={`flex items-center p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'}`}>
          <FcSettings className="mr-2" />
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'}`}
        >
          <BiLogOut className="mr-2" />
          Logout
        </button>
      </nav>

      
    </div>
    <LogoutModal
    isOpen={showLogout}
    onClose={() => setShowLogout(false)}
    onConfirm={confirmLogout}
    darkMode={darkMode}
  />
  </>
  );
}

export default Sidebar;
