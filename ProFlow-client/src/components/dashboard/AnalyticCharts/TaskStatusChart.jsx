import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusChart = ({ tasks }) => {
  const statusCounts = useMemo(() => {
    const counts = {
      "Not Started": 0,
      "In Progress": 0,
      "On Hold": 0,
      "Completed": 0,
    };
    tasks.forEach((task) => {
      if (counts[task.status] !== undefined) {
        counts[task.status]++;
      }
    });
    return counts;
  }, [tasks]);

  const data = {
    labels: ["Not Started", "In Progress", "On Hold", "Completed"],
    datasets: [
      {
        data: [
          statusCounts["Not Started"],
          statusCounts["In Progress"],
          statusCounts["On Hold"],
          statusCounts["Completed"],
        ],
        backgroundColor: ["#facc15", "#3b82f6", "#f97316", "#10b981"], // Yellow, Blue, Orange, Green
        borderWidth: 4,
        hoverOffset: 8,
        cutout: "40%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6b7280",
          boxWidth: 14,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center h-full">
      <Doughnut data={data} options={options} />
      <div className="absolute text-center text-zinc-700 dark:text-white">
        <p className="text-sm">Total</p>
        <p className="text-xl font-bold">{tasks.length}</p>
        <p className="text-xs text-white">Tasks</p>
      </div>
    </div>
  );
};

export default TaskStatusChart;
