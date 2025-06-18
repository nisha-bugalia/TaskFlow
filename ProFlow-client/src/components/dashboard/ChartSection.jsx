import { useState } from "react";
import TaskStatusChart from "./AnalyticCharts/TaskStatusChart";
import TasksPerAssigneeChart from "./AnalyticCharts/TasksPerAssigneeChart ";
import TasksPerProjectChart from "./AnalyticCharts/TasksPerProjectChart ";
import { FaChartPie } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { TbChartBar } from "react-icons/tb";
import { MdBarChart, MdDonutSmall } from "react-icons/md";

const TaskOverviewSection = ({ tasks }) => {
  const [barView, setBarView] = useState("assignee"); // or "project"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
      {/* Left Side - Doughnut Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-700">
        <h3 className="flex items-center gap-1 text-lg font-semibold text-zinc-800 dark:text-white mb-4">
          <MdDonutSmall className="text-purple-500 text-xl"/> Task Status Overview
        </h3>
        <div className="h-[250px]">
          <TaskStatusChart tasks={tasks} />
        </div>
      </div>

      {/* Right Side - Toggle Bar Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center gap-1 text-lg font-semibold text-zinc-800 dark:text-white">
          <MdBarChart className="text-purple-600 text-2xl" /> Tasks Distribution
          </h3>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm font-semibold rounded-md ${
                barView === "assignee"
                  ? "bg-black text-white"
                  : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
              }`}
              onClick={() => setBarView("assignee")}
            >
              Per User
            </button>
            <button
              className={`px-3 py-1 text-sm font-semibold rounded-md ${
                barView === "project"
                  ? "bg-black text-white"
                  : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
              }`}
              onClick={() => setBarView("project")}
            >
              Per Project
            </button>
          </div>
        </div>
        <div className="h-[250px]">
          {barView === "assignee" ? (
            <TasksPerAssigneeChart tasks={tasks} />
          ) : (
            <TasksPerProjectChart tasks={tasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewSection;
