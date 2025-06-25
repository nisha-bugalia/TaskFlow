import React from 'react'
import Header from './dashboard/Header'
import AddTasksModal from './dashboard/AddTasksModal'
import { useState } from 'react';
import ProjectCard from './Projects-Management/ProjectCard';
import toast from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
function MainProjectsPage({projects, setProjects}) {
  const handleDeleteProject = (idToDelete) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4">
          <div className='flex items-center gap-1'>
          <FiTrash className='text-red-500'/>
          <span className="font-medium">  Are you sure you want to DELETE?</span>
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
              onClick={() => {
                setProjects(prev => prev.filter(project => project.id !== idToDelete));
                toast.dismiss(t.id);
                toast.success('Project deleted');
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };
  

 const [showAddTaskModal, setShowAddTaskModal] = useState(false);
 const [editProject, setEditProject] = useState(null);

 const handleAddOrUpdateProject = (newProject) => {
  const exists = projects.find(p => p.id === newProject.id);
  if (exists) {
    const updated = projects.map(p => p.id === newProject.id ? newProject : p);
    setProjects(updated);
  } else {
    const projectWithId = {
      ...newProject,
      id: Date.now(),
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
    };
    setProjects(prev => [...prev, projectWithId]);
  }

};
   
  return (
    <div className='md:ml-[20vw] p-4'>
      <Header title="Your Projects" subtitle="Organize, track, and conquer your projects effortlessly." date={new Date().toDateString()} onCreateTask={() => setShowAddTaskModal(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={() => {
          setEditProject(project);           // set the project you're editing
          setShowAddTaskModal(true);   
                // open the modal
        }} 
        onDelete={() => handleDeleteProject(project.id)}/>
        
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
  )
}

export default MainProjectsPage
