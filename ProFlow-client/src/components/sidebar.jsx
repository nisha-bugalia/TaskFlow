import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { FaFile, FaFolder } from "react-icons/fa";
import { BsCollection } from 'react-icons/bs';


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
       z-[900] rounded-lg w-[20vw] pr-12 h-[100vh] transition-transform duration-300 m-3
      ${darkMode ? 'bg-gray-800 border-white text-white' : 'bg-white border-purple-950 text-gray-900  shadow-md'}
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block
    `}>
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center gap-2"> <div className=" p-3 bg-purple-600 w-fit rounded-full"><FaFolder className=" text-white"></FaFolder></div>My WorkSpace</h1>
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
        <Link to="/projects" className={`flex items-center p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'}`}>
          <BsCollection className="mr-2" />
          Projects
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
