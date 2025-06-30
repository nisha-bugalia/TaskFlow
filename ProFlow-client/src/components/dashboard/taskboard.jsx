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
import TaskStatusChart from "./AnalyticCharts/TaskStatusChart";
import TasksThisWeekCard from "./TasksThisWeekCard ";
import ChartSection from "./ChartSection";
import ActivityFeed from "./ActivityFeed";

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

  const [tasks, setTasks] = useState([]);
  const taskSummaryData = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "Done").length,
    incomplete: tasks.filter(
      (task) => task.status !== "Done" && task.status !== "In Progress"
    ).length,
    review: tasks.filter((task) => task.status === "In Progress").length,
  };

  const [positions, setPositions] = useState({});
  const handleCreateTask = () => {
    console.log("Create task clicked!");
    // Trigger modal or route here
  };

  return (
    <div className="md:ml-[20vw] p-4 flex flex-col gap-4 items-stretch">
      <Header
        title="Welcome Back, "
        subtitle="Your Team’s Success Starts Here. Let’s Make Progress Together!"
        userName="UserName"
        date={new Date().toDateString()}
        onCreateTask={() => setShowAddTaskModal(true)}
      />
      <TaskSummary data={taskSummaryData} />
      <TasksThisWeekCard tasks={tasks} onClick={() => navigate("/projects")} />
      <ChartSection tasks={tasks} />

      {timeline.length > 0 && <TimelineComponent tasks={tasks} />}
      {/* <TaskList tasks={tasks} setTasks={setTasks} /> */}
      <ActivityFeed/>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <AddTasksModal onClose={() => setShowAddTaskModal(false)} />
      )}
    </div>
  );
}

export default TaskBoard;
