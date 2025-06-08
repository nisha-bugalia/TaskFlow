import React, { useEffect, useRef, useState } from "react";
import AddTasks from "./addTasks";
import { MdDelete, MdMore, MdOutlineVerticalDistribute } from "react-icons/md";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/styles.css";
import { Container } from "postcss";
import { FaCalendar, FaHamburger, FaLine } from "react-icons/fa";
import { BiCalendar, BiDotsHorizontal } from "react-icons/bi";
import { CgMore, CgMoreVertical } from "react-icons/cg";

function TaskBoard({
  darkMode,
  isModalOpen,
  setIsModalOpen,
  taskModalOpenRef,
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [highlightCategory, setHighlightCategory] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const handleClick = (e, id) => {
    // setDraggingId(id);
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
      // setDraggingId(null);
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
  const colors = ["#02e075", "#fc034a", "darkorange", "#a103fc", "indigo"];
  const [positions, setPositions] = useState({});
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

  const container = useRef(null);
  const item = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleMouseDown = (e, index) => {
    document.removeEventListener("mouseup", handleMouseUp);
    e.preventDefault();
    setDraggingIndex(index);
    console.log(index);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const Task = ({ task }) => {
    return (
      <div className=" flex p-2 bg-white rounded-lg justify-between  items-center h-[4rem]  overflow-hidden cursor-pointer hover:border-[2px] hover:border-purple-400 border-purple-200 border-2 ">
        <div className="flex items-center gap-2 w-1/2">
          <div className=" justify-center items-center flex w-3 h-3  rounded-full "></div>
          <div className=" w-4 h-4 border-2 rounded-full"></div>
          <div>{task.title}</div>
        </div>

        <div className=" flex justify-between w-1/2">
          <div className=" flex items-center justify-center gap-2 text-gray-500">
            <div className=" opacity-80">|</div>
            <div>
              <BiCalendar className=" text-xl"></BiCalendar>
            </div>
          </div>
          <div>
            <CgMoreVertical></CgMoreVertical>
          </div>
        </div>
      </div>
    );
  };
  const handleMouseMove = (e) => {
    const childPos = e.clientY; // in pixels
    const ParentPos = container.current.getBoundingClientRect().top; // in pixels

    const offsetY =
      (childPos - ParentPos) /
      parseFloat(getComputedStyle(document.documentElement).fontSize); //in rem
    item.current.style.top = offsetY.toString() + "rem";
    item.current.style.position = "absolute";
    item.current.style.zIndex = 100;
    item.current.style.width = 100;
    item.current.style.border = "2px solid #c203fc";
    item.current.style.borderRadius = "10px";
    let index = Math.floor(offsetY / 4);
    console.log(index);
    if (index < 0) {
      index = 0;
    }
    if (index >= tasks.length) {
      index = tasks.length - 1;
    }
    setDraggedIndex(index);
  };
  const handleMouseUp = () => {
    if (draggedIndex !== null && draggingIndex !== null) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const array = [...tasks];
      const draggedItem = array.splice(draggingIndex, 1)[0];
      array.splice(draggedIndex, 0, draggedItem);
      setTasks(array);
      item.current.style.top = "";
      item.current.style.position = "relative";
      item.current.style.zIndex = "";
      item.current.style.border = "";

      item.current = null;

      setDraggedIndex(null);
      setDraggingIndex(null);
    }
  };
  return (
    <div className="flex flex-col gap-4 items-stretch">
      {timeline.length > 0 && (
        <div className=" flex-col flex p-3 pt-0 pb-0 bg-white rounded-lg w-fit gap-5 relative h-96 overflow-y-scroll">
          <div className="  font-bold text-xl sticky bg-white w-[100%] p-6 pl-0 top-0 z-40 ">
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

          {tasks.map((task) => {
            const pos = {
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
            };
            return (
              <div
                className={`absolute h-[2.8rem] flex items-center p-2 z-30 rounded-xl text-white font-medium cursor-pointer  `}
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],

                  width:
                    (
                      6 *
                      (new Date(task.dueDate).getDate() -
                        new Date(task.startDate).getDate())
                    ).toString() + "rem",
                  top: pos.top,
                  left: pos.left,
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {task.title}
                </span>
              </div>
            );
          })}

          <div className="sticky bottom-0  ml-[3.8rem] bg-white z-40 p-2 flex justify-around">
            {dates.map((d, index) => (
              <div className="w-[7rem] flex-col relative flex items-center">
                {index === 0 ? (
                  <div className="absolute bottom-[2rem] flex-col justify-center items-center gap-0  flex   z-10">
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
      )}
      <div className=" bg-white  flex flex-col rounded-2xl p-3">
        <div className=" text-[1.3rem] p-5 pl-0 font-semibold ">Tasks List</div>
        <div ref={container} className=" relative w-[40rem ] ">
          {tasks.map((x, index) => (
            <div
              key={x.id}
              onMouseDown={(e) => handleMouseDown(e, index)}
              className="mb-2 w-full "
              ref={draggingIndex === index ? item : null}
            >
              <Task task={x} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TaskBoard;
