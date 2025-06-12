import React from "react";
import { FiPlus } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";

const Header = ({title, subtitle, userName, date, onCreateTask }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-4">
      {/* Left Greeting */}
      <div>
        <h1 className="text-2xl font-bold">{title} {userName}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-3 mt-4 md:mt-0">
        <div className="flex items-center border rounded-xl px-3 py-1.5 text-sm text-gray-700">
          <BiCalendar className="mr-2" size={18} />
          {date}
        </div>
        <button
          onClick={onCreateTask}
          className="flex items-center bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          <FiPlus className="mr-2" size={16} />
          Create New Project
        </button>
      </div>
    </div>
  );
};

export default Header;
