import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdMore, MdOutlineVerticalDistribute } from "react-icons/md";
import { FaCalendar, FaHamburger, FaLine } from "react-icons/fa";
import { BiCalendar, BiDotsHorizontal } from "react-icons/bi";
import { CgMore, CgMoreVertical } from "react-icons/cg";
import TimelineComponent from "./Timeline";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import Header from "./Header";
import AddTasksModal from "./AddTasksModal";



function TaskBoard({
  darkMode,
  isModalOpen,
  setIsModalOpen,
  taskModalOpenRef,
}) {
  const [commentsMap, setCommentsMap] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [highlightCategory, setHighlightCategory] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [timeline, setTimeline] = useState([]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);


  const taskSummaryData = {
    total: 230,
    completed: 112,
    incomplete: 99,
    review: 19,
  };
  
  const handleClick = (e, id) => {
    const onMouseMove = (e) => {
      console.log(positions);
      const getRem = (px) =>
        px / parseFloat(getComputedStyle(document.documentElement).fontStyle);
      setPositions((prev) => ({
        ...prev,
        [id]: {
          left:
            (e.pageX - (window.innerWidth / 100) * 25) /
              parseFloat(
                getComputedStyle(document.documentElement).fontSize
              ).toString() +
            "rem",
          top:
            (
              (e.pageY -
                4.5 *
                  parseFloat(
                    getComputedStyle(document.documentElement).fontSize
                  )) /
              parseFloat(getComputedStyle(document.documentElement).fontSize)
            ).toString() + "rem",
        },
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const times = () => {
    const now = new Date();
    const local = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
    });
    const x = Array.from(
      { length: 24 - parseInt(local.split(" ")[0]) },
      (_, i) => {
        return (
          (parseInt(local.split(" ")[0]) + i).toString().padStart(2, "0") +
          ":00"
        );
      }
    );
    setTimeline(x);
  };
  
  useEffect(() => {
    times();
  }, []);
  
  const handleAddClick = (category) => {
    setCurrentCategory(category);
    setTaskData({ name: "", deadline: "", description: "", id: null });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(""), 1000);
  };

  const handleTaskClick = (category, task, index) => {
    setCurrentCategory(category);
    setTaskData({ ...task });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(""), 1000);
  };

  const handleModalSubmit = () => {
    if (taskData) {
      setTasks((prev) => {
        const updatedCategory = [...prev[currentCategory]];

        if (!taskData.id) {
          taskData.id = `${currentCategory}-${Date.now()}`;
          updatedCategory.push({ ...taskData });
        } else {
          const existingIndex = updatedCategory.findIndex(
            (t) => t.id === taskData.id
          );
          if (existingIndex !== -1) {
            updatedCategory[existingIndex] = { ...taskData };
          } else {
            updatedCategory.push({ ...taskData });
          }
        }

        return { ...prev, [currentCategory]: updatedCategory };
      });

      setIsModalOpen(false);
      setTaskData(null);
    }
  };

  const project = {
    _id: "proj123",
    name: "Website Redesign",
    description:
      "Redesigning the company's main website with modern UI and better UX.",
    status: "In Progress",
    startDate: "2025-06-01T00:00:00.000Z",
    endDate: "2025-06-20T00:00:00.000Z",
    createdBy: "user001",
    teamMembers: ["user001", "user002", "user003"],
    tasks: ["task001", "task002", "task003"],
    issues: ["issue001", "issue002"],
    timeline: [
      {
        title: "Project Kickoff",
        date: "2025-06-01T00:00:00.000Z",
        description: "Initial meeting with stakeholders",
      },
      {
        title: "Design Approval",
        date: "2025-06-05T00:00:00.000Z",
        description: "Client approved the UI designs",
      },
    ],
    tags: ["UI", "Frontend", "ClientProject"],
    priority: "High",
    progress: 40,
    isArchived: false,
    createdAt: "2025-05-30T00:00:00.000Z",
    updatedAt: "2025-06-06T00:00:00.000Z",
  };
  
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
  
  const [positions, setPositions] = useState({});
  const handleCreateTask = () => {
    console.log("Create task clicked!");
    // Trigger modal or route here
  };

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <Header userName="UserName" date={new Date().toDateString()} onCreateTask={() => setShowAddTaskModal(true)} />
      <TaskSummary data={taskSummaryData} />
      {timeline.length > 0 && <TimelineComponent tasks={tasks} />}
      <TaskList tasks={tasks} setTasks={setTasks} />
       {/* Add Task Modal */}
       {showAddTaskModal && (
        <AddTasksModal
        onClose={() => setShowAddTaskModal(false)
        }
      />
      )}
    </div>
  );
}

export default TaskBoard;