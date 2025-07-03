import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function TasksPerAssigneeChart({ tasks }) {
  const [resolvedTasks, setResolvedTasks] = useState([]);

  useEffect(() => {
    const resolveAssignees = async () => {
      if (!tasks || tasks.length === 0) return;

      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          if (!task.assignee) {
            return { ...task, assignee: 'Unassigned' };
          }

          // If already a username (not an ID), skip fetch
          if (typeof task.assignee === 'string' && isNaN(task.assignee)) {
            return task;
          }

          try {
            const res = await axios.get(
              `http://localhost:5000/user/get-user?id=${task.assignee}`
            );
            return {
              ...task,
              assignee: res.data.user?.username || 'Unknown',
            };
          } catch (err) {
            return { ...task, assignee: 'Unknown' };
          }
        })
      );

      setResolvedTasks(updatedTasks);
    };

    resolveAssignees();
  }, [tasks]);

  const groupedData = useMemo(() => {
    const dataMap = new Map();

    resolvedTasks.forEach((task) => {
      const key = task.assignee || 'Unassigned';
      dataMap.set(key, (dataMap.get(key) || 0) + 1);
    });

    const labels = Array.from(dataMap.keys());
    const values = Array.from(dataMap.values());

    return { labels, values };
  }, [resolvedTasks]);

  const data = {
    labels: groupedData.labels,
    datasets: [
      {
        label: 'Tasks per Assignee',
        data: groupedData.values,
        backgroundColor: '#7c3aed',
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        cornerRadius: 6,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#374151',
          stepSize: 1,
          font: { size: 12, family: 'Poppins', weight: 'bold' },
        },
        grid: { color: 'rgba(55, 65, 81, 0.2)' },
      },
      x: {
        ticks: {
          color: '#374151',
          font: { size: 12, family: 'Poppins', weight: 'bold' },
        },
        grid: { display: false },
      },
    },
  };

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 text-sm">No tasks available</p>;
  }

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
}

export default TasksPerAssigneeChart;
