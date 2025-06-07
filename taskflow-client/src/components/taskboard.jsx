import React, { useEffect, useState } from "react";
import AddTasks from "./addTasks";
import { MdDelete } from "react-icons/md";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/styles.css";

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
    setTaskData({ name: "", deadline: "", description: "", id: null }); // No ID here
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
          taskData.id = `${currentCategory}-${Date.now()}`; // Create new ID only if not present
          updatedCategory.push({ ...taskData });
        } else {
          const existingIndex = updatedCategory.findIndex(
            (t) => t.id === taskData.id
          );
          if (existingIndex !== -1) {
            updatedCategory[existingIndex] = { ...taskData }; // Update existing task
          } else {
            updatedCategory.push({ ...taskData }); // Fallback (shouldn't happen)
          }
        }

        return { ...prev, [currentCategory]: updatedCategory };
      });

      setIsModalOpen(false);
      setTaskData(null);
    }
  };

  const handleAddComment = (taskId, comment) => {
    setCommentsMap((prev) => ({
      ...prev,
      [taskId]: [comment, ...(prev[taskId] || [])],
    }));
  };

  const handleDeleteTask = (category, index) => {
    setTasks((prev) => {
      const updatedCategory = [...prev[category]];
      updatedCategory.splice(index, 1);
      return { ...prev, [category]: updatedCategory };
    });
  };

  const getCategoryStyles = (category) => {
    if (!darkMode) {
      return {
        bg:
          category === "pending"
            ? "bg-rose-100"
            : category === "current"
            ? "bg-yellow-100"
            : "bg-green-100",
        text: "text-purple-950",
        border:
          category === "pending"
            ? "border-red-200"
            : category === "current"
            ? "border-yellow-200"
            : "border-green-200",
      };
    } else {
      return {
        bg:
          category === "pending"
            ? "bg-rose-900"
            : category === "current"
            ? "bg-yellow-800"
            : "bg-green-900",
        text: "text-white",
        border:
          category === "pending"
            ? "border-rose-400"
            : category === "current"
            ? "border-yellow-400"
            : "border-green-400",
      };
    }
  };

  //
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
  // const tasks = [
  //   {
  //     _id: "task001",
  //     project: "proj123",
  //     title: "Create Landing Page UI",
  //     description: "Design responsive layout for homepage",
  //     status: "Done",
  //     assignedTo: "user002",
  //     startDate: "2025-06-08T08:06:00.000Z",
  //     dueDate: "2025-06-10T00:00:00.000Z",
  //     priority: "Medium",
  //     createdAt: "2025-06-01T00:00:00.000Z",
  //   },
  //   {
  //     _id: "task002",
  //     project: "proj123",
  //     title: "Implement Login API",
  //     description: "Secure login using JWT",
  //     status: "In Progress",
  //     assignedTo: "user003",
  //     startDate: "2025-06-09T00:00:00.000Z",
  //     dueDate: "2025-06-07T00:00:00.000Z",
  //     priority: "High",
  //     createdAt: "2025-06-03T00:00:00.000Z",
  //   },
  // ];

const tasks = [
  {
    _id: "task001",
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
    _id: "task002",
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
    _id: "task003",
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
    _id: "task004",
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
    _id: "task005",
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
    _id: "task006",
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
    _id: "task007",
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
    _id: "task008",
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
    _id: "task009",
    project: "proj123",
    title: "Refactor Redux Store",
    description: "Simplify state management structure",
    status: "Not Started",
    assignedTo: "user1",
    startDate: "2025-06-09T23:59:00.000Z",
    dueDate: "2025-06-10T00:00:00.000Z",
    priority: "Low",
    createdAt: "2025-06-07T00:00:00.000Z",
  },
  {
    _id: "task010",
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
];

const colors = [
  "#02e075", // Strong Red
  
  "#fc034a", // Teal Green
  "darkorange", // Warm Orange
  "#a103fc", // Rich Purple
  "indigo"  // Hot Pink
];


// red, blue, green, amber

  // To see the calendar and timeline variations
  const groups = [
    { id: 1, title: "group 1" },
    { id: 2, title: "group 2" },
  ];
  const dates = Array.from({ length: 7 }, (_, i) => {
    let date = new Date();

    let future = new Date();
    future.setDate(date.getDate() + i);
    return future.toLocaleDateString().split("/")[0].toString();
  });
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = ((new Date().getDay() + i) % 7).toString();
    switch (day) {
      case "1":
        return "MON";
      case "2":
        return "TUES";
      case "3":
        return "WED";
      case "4":
        return "THR";
      case "5":
        return "FRI";
      case "6":
        return "SAT";
      case "0":
        return "SUN";

      default:
        break;
    }
  });

  const items = [
    {
      id: 1,
      group: 1,
      title: "item 1",
      start_time: moment(),
      end_time: moment().add(1, "hour"),
    },
    {
      id: 2,
      group: 2,
      title: "item 2",
      start_time: moment().add(-0.5, "hour"),
      end_time: moment().add(0.5, "hour"),
    },
    {
      id: 3,
      group: 1,
      title: "item 3",

      start_time: moment().add(2, "hour"),
      end_time: moment().add(3, "hour"),
    },
  ];

 

  return (
    timeline.length > 0 && (
      <div className=" flex-col flex p-3 pt-0 pb-0 bg-white rounded-lg w-fit gap-5 relative h-96 overflow-y-scroll">
        <div className="  font-bold text-xl sticky bg-white w-[100%] p-6 pl-0 top-0 z-40">
          Project Timeline
        </div>
        <div className="flex flex-col ">
          {timeline.map((time) => (
            <div className=" h-[3rem] flex gap-7">
              <div className=" font-bold text-gray-500">{time}</div>
              <div
                className=" grow"
                style={{
                  borderTop: "2px dotted gray",

                  margin: "20px 0",
                }}
              />
            </div>
          ))}
        </div>

        {tasks.map((task) => (
          <div
            className={`absolute  h-[2.8rem] flex items-center p-2 z-30 rounded-xl text-white font-medium   `}
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
             
              width:
                (
                  6 *
                  (new Date(task.dueDate).getDate() -
                    new Date(task.startDate).getDate())
                ).toString() + "rem",
              top:
                (
                  5 +
                  3 *
                    (parseFloat(
                      new Date(task.startDate).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                      })
                    ) -
                      parseInt(timeline[0].split(":")[0])) +
                  (3 / 60) *
                    parseFloat(
                      new Date(task.startDate).toLocaleTimeString(undefined, {
                        minute: "2-digit",
                      })
                    )
                ).toString() + "rem",
                   
              left:
                (
                  5 +
                  7 *
                    (parseInt(
                      new Date(task.startDate).toLocaleDateString(undefined, {
                        day: "2-digit",
                      })
                    ) -
                      parseInt(dates[0]))
                ).toString() + "rem",
            }}
          >
           <span
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",      // or inline-block
      width: "100%",         // important to restrict width
    }}
  >
    {task.title} 
  </span>
          </div>
        ))}

        <div className=" sticky bottom-0  ml-[3.8rem] bg-white z-40 p-2 flex justify-around  ">
          {}
          {dates.map((d, index) => (
            <div className="w-[7rem] flex-col relative flex items-center">
              {index === 0 ? (
                <div className="absolute bottom-[2rem] flex-col justify-center items-center gap-0  flex   z-10">
                  {" "}
                  <div className="  h-64 bg-purple-600 w-[3px] rounded-full"></div>
                  <div className=" w-5 h-5 rounded-full bg-purple-600"></div>
                </div>
              ) : (
                ""
              )}

              <div className=" font-bold text-gray-400">
                {d} {days[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default TaskBoard;
