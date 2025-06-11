import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { TbFlag } from "react-icons/tb";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi"; // Import icons
import { MdMoreVert } from "react-icons/md";

const ProjectCard = ({ project }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideMenu = menuRef.current?.contains(event.target);
      const clickedMenuButton = event.target.closest("button"); // Prevent closing immediately
  
      // Only close if clicked outside both menu and toggle button
      if (!clickedInsideMenu && !clickedMenuButton) {
        setShowMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-400",
    Low: "bg-green-500",
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border hover:shadow-lg hover:border-gray-700 transition cursor-pointer">
      <div
        className={`flex gap-x-1 absolute top-2 left-3 text-white text-xs px-3 py-1 rounded-lg shadow ${priorityColors[project.priority]} `}
      >
        <TbFlag fontSize={15} /> {project.priority}
      </div>
      <div
        ref={menuRef}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
      >
        <button onClick={() => setShowMenu((prev) => !prev)}>
          <MdMoreVert fontSize={20} />
        </button>

      {showMenu && (
        <div className="absolute right-4 mt-3 w-40 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl z-10 border border-purple-200 dark:border-gray-700 animate-fade-in">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to={`/projects/${project.id}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100  transition"
              >
                <FiEye className="text-blue-500" />
                View
              </Link>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100  transition">
                <FiEdit className="text-green-500" />
                Edit
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100  transition">
                <FiTrash className="text-red-500" />
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
      </div>

      <div className="flex justify-between items-start pt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {project.title}
        </h2>
        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          #{project.tag}
        </span>
      </div>
      <div className="py-3 text-gray-600">
        <p className="font-light text-sm">
          Created On: {moment(project.startDate).format("MMM DD, YYYY")}
        </p>
        <p className="font-light text-sm">
          Deadline: {moment(project.dueDate).format("MMM DD, YYYY")}
        </p>
      </div>

      <p className="text-sm text-gray-800 mt-1 line-clamp-2">
        {project.description}
      </p>

      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-gray-400">
          {project.completedTasks}/{project.totalTasks} tasks completed
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
