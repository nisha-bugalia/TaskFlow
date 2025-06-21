import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { TbFlag } from "react-icons/tb";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi"; // Import icons
import { MdMoreVert } from "react-icons/md";

const ProjectCard = ({ project, onEdit, onDelete }) => {
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
    Critical: "bg-red-800 border-red-900",
    High: "bg-red-500 border-red-600",
    Medium: "bg-yellow-400 border-yellow-500",
    Low: "bg-green-500 border-green-600",
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl  border hover:shadow-lg hover:translate-y-2  transition cursor-pointer">
      <div className="absolute top-2 left-3 flex gap-x-2">
        
        <div
          className={`flex items-center gap-x-1 text-white text-xs border px-3 py-1 rounded-lg ${priorityColors[project.priority]}`}
        >
          <TbFlag fontSize={15} /> {project.priority}
        </div>

        <div className="flex items-center gap-x-1 border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded-lg bg-gray-50">
          {moment(project.startDate).format("MMM DD, YYYY")}
        </div>
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
                state={project}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100  transition"
              >
                <FiEye className="text-blue-500" />
                View
              </Link>
            </li>
            <li>
              <button
              onClick={onEdit}
               className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100  transition">
                <FiEdit className="text-green-500" />
                Edit
              </button>
            </li>
            <li>
              <button
              onClick={onDelete}
               className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100  transition">
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
      <p className="text-sm text-gray-800 mt-1 line-clamp-3">
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
