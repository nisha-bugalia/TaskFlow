import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar({ darkMode }) {
  return (
    <div className={`fixed top-16 mt-2 border-2 rounded-xl w-64 h-[calc(100vh-4rem)] transition-colors duration-300 
      ${darkMode ? 'bg-gray-800 border-purple-600 text-white' : 'bg-purple-200 border-purple-900 text-gray-900'}`}>
      
      <div className="p-4">
        <h1 className="text-xl font-bold">My WorkSpace</h1>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {[
          { to: "/dashboard", icon: <MdDashboard />, text: "Dashboard" },
          { to: "/profile", icon: <CgUser />, text: "Profile" },
          { to: "/settings", icon: <FcSettings />, text: "Settings" },
          { to: "/logout", icon: <BiLogOut />, text: "Logout" },
        ].map(({ to, icon, text }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center p-2 text-base font-medium rounded transition-colors duration-200
              ${darkMode 
                ? 'text-white hover:bg-gray-700' 
                : 'text-gray-800 hover:bg-purple-100'}`}
          >
            <div className="flex gap-2 items-center">
              <span className="text-lg">{icon}</span>
              <span>{text}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
