import { useState } from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";
import { FaCalendar, FaFolder } from "react-icons/fa";

const TasksThisWeekCard = ({ tasks }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const today = dayjs().startOf('day');

  const filteredTasks = tasks.filter((task) => {
    const deadline = dayjs(task.dueDate).startOf('day');
    const status = task.status.toLowerCase();

    if (activeTab === "upcoming") return deadline.isAfter(today) && status !== "done";
    if (activeTab === "overdue") return deadline.isBefore(today) && status !== "done";
    if (activeTab === "completed") return status === "done";
    return false;
  });

  const tabStyles = (tab) =>
    `px-3 py-1 rounded-md text-base font-medium transition-colors duration-200 ${
      activeTab === tab
        ? "bg-purple-100 border-b-2 border-purple-400 text-black dark:bg-purple-700 dark:text-white"
        : "text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400"
    }`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
      {/* Heading */}
      <h3 className="text-xl font-bold text-black dark:text-zinc-100 flex items-center gap-2 mb-4">
        <FiCalendar/> This Week’s Tasks
      </h3>

      {/* Tabs */}
      <div className="flex border-b space-x-2 mb-4">
        <button onClick={() => setActiveTab("upcoming")} className={tabStyles("upcoming")}>
          Upcoming
        </button>
        <button onClick={() => setActiveTab("overdue")} className={tabStyles("overdue")}>
          Overdue
        </button>
        <button onClick={() => setActiveTab("completed")} className={tabStyles("completed")}>
          Completed
        </button>
      </div>

      {/* Tasks List */}
      <ul className="space-y-3 text-sm max-h-48 overflow-y-auto pr-1 custom-scroll">
        {filteredTasks.length === 0 ? (
          <li className="text-zinc-500 italic">No tasks to show.</li>
        ) : (
          filteredTasks.map((task) => {
            const deadline = dayjs(task.dueDate).startOf('day');
            const status = task.status.toLowerCase();

            return (
              <li
                key={task.id}
                className="border-b flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 p-2 rounded-md hover:shadow hover:border hover:border-gray-300 transition"
              >
                <div>
                  <p className="font-medium mb-2 text-base text-zinc-800 dark:text-zinc-100">{task.title}</p>
                  <p className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <FaFolder/> {task.project} • <FaCalendar/> {deadline.format("MMM D")}
                  </p>
                </div>
                {status === "done" ? (
                  <FiCheckCircle className="text-green-500" fontSize={20} />
                ) : deadline.isBefore(today) ? (
                  <FiAlertCircle className="text-red-500" fontSize={20}/>
                ) : (
                  <FiClock className="text-yellow-500" fontSize={20}/>
                )}
              </li>
            );
          })
        )}
      </ul>

      <div className="mt-4 text-base border border-zinc-800 w-fit rounded-lg p-1 text-zinc-700 dark:text-zinc-400">
        Total Tasks: {tasks.length}
      </div>
    </div>
  );
};

export default TasksThisWeekCard;
