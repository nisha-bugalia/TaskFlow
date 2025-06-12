import React from 'react'
import Header from './dashboard/Header'
import AddTasksModal from './dashboard/AddTasksModal'
import { useState } from 'react';
import ProjectCard from './Projects-Management/ProjectCard';
function MainProjectsPage() {
 const [showAddTaskModal, setShowAddTaskModal] = useState(false);


    
    const [projects, setProjects] = useState([
        {
        id: 1,
        title: "Portfolio Website",
        startDate: "2025-06-08T19:00:00.000Z",
        dueDate: "2025-06-11T00:00:00.000Z",
        priority: "High",
        description: "Design and build a personal portfolio using React and Tailwind CSS.",
        tag: "Frontend",
        progress: 70,
        completedTasks: 7,
        totalTasks: 10,
        },
        {
        id: 2,
        title: "E-commerce Backend",
        startDate: "2025-06-08T19:00:00.000Z",
        dueDate: "2025-06-11T00:00:00.000Z",
        priority: "Low",
        description: "Develop RESTful APIs for product, cart, and user modules.",
        tag: "Backend",
        progress: 40,
        completedTasks: 4,
        totalTasks: 10,
        },
    ]);

    const handleAddProject=(newProject)=>{
      const projectWithId={
        ...newProject,
        id:Date.now(),
        progress:0,
        completedTasks:0,
        totalTasks:0,
      }
      setProjects((prev)=>[...prev, projectWithId]);
      setShowAddTaskModal(false);

    }



  return (
    <div>
      <Header title="Your Projects" subtitle="Organize, track, and conquer your projects effortlessly." date={new Date().toDateString()} onCreateTask={() => setShowAddTaskModal(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
      {showAddTaskModal && (
        <AddTasksModal
        onClose={() => setShowAddTaskModal(false)
        }
        onSave={handleAddProject}
      />
      )}
    </div>
  )
}

export default MainProjectsPage
