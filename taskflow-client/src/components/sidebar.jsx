import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile, CgUser } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
function sidebar() {
  return (
    <div className="fixed top-16 mt-2 border-2 border-purple-950 rounded-xl w-64 h-[calc(100vh-4rem)] bg-purple-200 text-white">
      <div class="p-4">
        <h1 class="text-xl font-bold text-gray-900">My WorkSpace</h1>
      </div>
      <nav class="flex-1 px-2 space-y-1">
        <Link
          to="/dashboard"
          class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded"
        >
            <div className=" flex gap-2 items-center">
            <MdDashboard className="text-gray-500 text-lg"></MdDashboard> <div>Dashboard</div>
          </div>
        </Link>
        <Link
          to="/profile"
          class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded"
        >
           <div className=" flex gap-2 items-center">
            <CgUser className="text-gray-500 text-lg"></CgUser> <div>Profile</div>
          </div>
        </Link>
        <Link
          to="/settings"
          class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded"
        >
      <div className=" flex gap-2 items-center">
            <FcSettings className="text-gray-500 text-lg"></FcSettings> <div>Settings</div>
          </div>
        </Link>
        <Link
          to="/logout"
          class="flex items-center p-2 text-base font-medium text-gray-800 hover:bg-purple-100 rounded"
        >
          <div className=" flex gap-2 items-center">
            <BiLogOut className="text-gray-500 text-lg"></BiLogOut> <div>Logout</div>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default sidebar;
