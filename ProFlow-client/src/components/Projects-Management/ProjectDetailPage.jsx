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

function ProjectDetailPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const location = useLocation();
  const project = location.state;
  const [tasks, setTasks] = useState();
  const [activeTab, setActiveTab] = useState("Overview");
  const handleSave = () => {};
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
  useEffect(() => {
    console.log(project._id)
    axios.post(
      "http://localhost:5000/task/get-tasks",
      { projectId: project._id })
        .then((res) => {
          setTasks(res.data.tasks);
          console.log(res.data.message);
        })
        .catch((error) => console.log(error))
    
  }, []);
  return (
    <div className="md:ml-[20vw] p-4">
      <ProjectHeader
        id={project._id}
        title={project.title}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab == "Overview" && (
        <>
          <Project_TasksSummary />
          <ProjectSummary
            description={project.description}
            dueDate={project.endDate}
            priority={project.priority}
            status={project.status}
            projectId={project._id}
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
      {activeTab == "List" && <ListViewTasks tasks={tasks} />}

      {activeTab == "Board" && <ProjectViewToggle projectId={project._id} preTasks={tasks} />}
      {activeTab == "Timeline" && <Timeline tasks={tasks} />}
      {activeTab == "Messages" && <MessagesTab />}
    </div>
  );
}

export default ProjectDetailPage;
