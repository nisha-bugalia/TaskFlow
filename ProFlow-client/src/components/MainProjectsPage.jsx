import React, { useEffect } from "react";
import Header from "./dashboard/Header";
import AddTasksModal from "./dashboard/AddTasksModal";
import { useState } from "react";
import ProjectCard from "./Projects-Management/ProjectCard";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import axios from "axios";
function MainProjectsPage({ projects, setProjects }) {

  useEffect(() => {
    axios.get("http://localhost:5000/project/get-projects", {
      withCredentials: true,
    })
    .then((res) => {
      setProjects(res.data.projects); // ✅ now updates AppContent state
    })
    .catch((error) => console.log(error));
  }, []);
  
  const handleDeleteProject = (idToDelete) => {
  toast((t) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <FiTrash className="text-red-500" />
        <span className="font-medium">
          Are you sure you want to DELETE?
        </span>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded"
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:5000/project/${idToDelete}`, {
                withCredentials: true,
              });
              setProjects((prev) =>
                prev.filter((project) => project._id !== idToDelete)
              );
              toast.dismiss(t.id);
              toast.success("Project deleted");
            } catch (err) {
              toast.dismiss(t.id);
              toast.error("Failed to delete project");
              console.error(err);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ), { duration: 5000 });
};


  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleAddOrUpdateProject = (newProject) => {
  const exists = projects.find((p) => p._id === newProject._id); // ✅ Use _id
  if (exists) {
    const updated = projects.map((p) =>
      p._id === newProject._id ? newProject : p
    );
    setProjects(updated);
  } else {
    setProjects((prev) => [...prev, newProject]);
  }
};


  return (
    <div className="md:ml-[20vw] p-4">
      <Header
        title="Your Projects"
        subtitle="Organize, track, and conquer your projects effortlessly."
        date={new Date().toDateString()}
        onCreateTask={() => setShowAddTaskModal(true)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={() => {
              setEditProject(project); // set the project you're editing
              setShowAddTaskModal(true);
              // open the modal
            }}
            onDelete={() => handleDeleteProject(project._id)}
          />
        ))}
      </div>
      {showAddTaskModal && (
        <AddTasksModal
          isEdit={!!editProject}
          initialData={editProject || {}}
          onClose={() => {
            setShowAddTaskModal(false);
            setEditProject(null);
          }}
          onSave={handleAddOrUpdateProject}
        />
      )}
    </div>
  );
}

export default MainProjectsPage;
