import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";

const MyProjectsSection = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/project/get-projects", {
          withCredentials: true,
        });

        const allProjects = res.data.projects || [];

        const userProjects = allProjects.filter(
          (project) =>
            String(project.createdBy?._id) === String(user._id) ||
            project.team?.map(String).includes(String(user._id))
        );

        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user._id]);

  const handleProjectClick = (project) => {
    navigate(`/project`, { state: project });
  };

  return (
    <div className="mt-10">
      <div className="bg-white p-6 dark:bg-gray-900 rounded-lg shadow border dark:border-gray-700 overflow-hidden">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          My Recent Projects
        </h3>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-500">You are not part of any project yet.</p>
        ) : (
          <div>
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectClick(project)}
                className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <FaFolderOpen />
                  {project.title}
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.admin?.fullName || "Unknown Owner"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjectsSection;
