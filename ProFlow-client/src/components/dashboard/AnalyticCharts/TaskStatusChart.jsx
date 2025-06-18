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
    const counts = { Done: 0, "In Progress": 0, "Not Started": 0 };
    tasks.forEach((task) => {
      if (counts[task.status] !== undefined) {
        counts[task.status]++;
      }
    });
    return counts;
  }, [tasks]);

  const data = {
    labels: ["Done", "In Progress", "Not Started"],
    datasets: [
      {
        data: [
          statusCounts["Done"],
          statusCounts["In Progress"],
          statusCounts["Not Started"],
        ],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
        borderWidth: 4,
        hoverOffset: 8,
        cutout: "40%", // to make it doughnut
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

      {/* Total Tasks Center Label */}
      <div className="absolute text-center text-zinc-700 dark:text-white">
        <p className="text-sm">Total</p>
        <p className="text-xl font-bold">{tasks.length}</p>
        <p className="text-xs text-white">Tasks</p>
      </div>
    </div>
  );
};

export default TaskStatusChart;
