import React from "react";
import ProjectHeader from "./ProjectHeader";
import { useParams } from "react-router-dom";
import { use, useEffect } from "react";
import ProjectSummary from "./ProjectSummary";
import TaskList from "../dashboard/TaskList";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Project_TasksSummary from "./Project_TasksSummary";
import AddTasksModal from "../dashboard/AddTasksModal";
import ProjectViewToggle from "./ProjectViewToggle";
import ListViewTasks from "./ListViewTasks";
import Timeline from "../dashboard/Timeline";
import MessagesTab from "./Messages/MessagesTab";
import axios from "axios";

function ProjectDetailPage({ projects, setProjects }) {
  const [tasks, setTasks] = useState([
    {
      id: "task001",
      project: "proj123",
      title: "Design Landing Page",
      description: "Create responsive UI for homepage",
      status: "In Progress",
      assignedTo: "user1",
      startDate: "2025-06-08T06:06:00.000Z",
      dueDate: "2025-06-10T00:00:00.000Z",
      priority: "Medium",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task002",
      project: "proj123",
      title: "Build Login API",
      description: "JWT based secure login system",
      status: "Done",
      assignedTo: "user2",
      startDate: "2025-06-07T08:00:00.000Z",
      dueDate: "2025-06-10T00:00:00.000Z",
      priority: "High",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task003",
      project: "proj123",
      title: "Setup MongoDB Schema",
      description: "Define data models for tasks and users",
      status: "Not Started",
      assignedTo: "user3",
      startDate: "2025-06-09T09:00:00.000Z",
      dueDate: "2025-06-12T00:00:00.000Z",
      priority: "Low",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task004",
      project: "proj123",
      title: "Create Project Dashboard",
      description: "Dashboard to display project status",
      status: "Done",
      assignedTo: "user4",
      startDate: "2025-06-10T08:00:00.000Z",
      dueDate: "2025-06-12T00:00:00.000Z",
      priority: "Medium",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task005",
      project: "proj123",
      title: "Write Unit Tests",
      description: "Add test coverage for auth module",
      status: "In Progress",
      assignedTo: "user1",
      startDate: "2025-06-07T13:00:00.000Z",
      dueDate: "2025-06-08T00:00:00.000Z",
      priority: "High",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task006",
      project: "proj123",
      title: "Design Email Templates",
      description: "HTML templates for system notifications",
      status: "Not Started",
      assignedTo: "user2",
      startDate: "2025-06-11T16:00:00.000Z",
      dueDate: "2025-06-13T00:00:00.000Z",
      priority: "Low",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task007",
      project: "proj123",
      title: "Implement Logout Flow",
      description: "Clear tokens and redirect to login",
      status: "Done",
      assignedTo: "user3",
      startDate: "2025-06-08T19:00:00.000Z",
      dueDate: "2025-06-11T00:00:00.000Z",
      priority: "Medium",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task008",
      project: "proj123",
      title: "Optimize Load Time",
      description: "Improve performance using lazy loading",
      status: "In Progress",
      assignedTo: "user4",
      startDate: "2025-06-12T00:00:00.000Z",
      dueDate: "2025-06-13T00:00:00.000Z",
      priority: "High",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task009",
      project: "proj123",
      title: "Refactor Redux Store",
      description: "Simplify state management structure",
      status: "Not Started",
      assignedTo: "user1",
      startDate: "2025-06-09T14:59:00.000Z",
      dueDate: "2025-06-10T00:00:00.000Z",
      priority: "Low",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
    {
      id: "task010",
      project: "proj123",
      title: "Deploy to Production",
      description: "Push latest build to live server",
      status: "Done",
      assignedTo: "user2",
      startDate: "2025-06-13T23:00:00.000Z",
      dueDate: "2025-06-13T00:00:00.000Z",
      priority: "Medium",
      createdAt: "2025-06-07T00:00:00.000Z",
    },
  ]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [project, setProject] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/project/${id}`, {
        withCredentials: true,
      });
      setProject(res.data.project);
    } catch (error) {
      console.error("Failed to load project:", error);
    }
  };

  fetchProject();
}, [id]);

  const [activeTab, setActiveTab] = useState("Overview");

  const handleSave = (updatedProject) => {
    const updated = projects.map((p) =>
      p._id === updatedProject._id ? updatedProject : p
    );
    setProjects(updated);
  };

  if (!project) {
    return (
      <div className="md:ml-[20vw] p-4">
        <h2 className="text-xl font-semibold text-red-500">
          Project not found or not passed correctly.
        </h2>
        <p>
          Try going back to the Projects page and clicking a project card again.
        </p>
      </div>
    );
  }

  return (
    <div className="md:ml-[20vw] p-4">
      <ProjectHeader
        id={id}
        title={project.title}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab == "Overview" && (
        <>
          <Project_TasksSummary />
          <ProjectSummary
            description={project.description}
            dueDate={project.dueDate}
            priority={project.priority}
            status={project.status}
            onEdit={() => setIsEditOpen(true)}
          />
        </>
      )}

      {isEditOpen && (
        <AddTasksModal
          isEdit
          initialData={project}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      )}
      {activeTab == "List" && (
        <ListViewTasks tasks={tasks} setTasks={setTasks} />
      )}

      {activeTab == "Board" && (
        <ProjectViewToggle tasks={tasks} setTasks={setTasks} />
      )}
      {activeTab == "Timeline" && <Timeline tasks={tasks} />}
      {activeTab == "Messages" && <MessagesTab />}
    </div>
  );
}

export default ProjectDetailPage;
