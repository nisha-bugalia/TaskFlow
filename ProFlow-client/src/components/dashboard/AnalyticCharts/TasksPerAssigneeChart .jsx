import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { useMemo } from 'react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


function TasksPerAssigneeChart ({tasks}) {
    const groupedData = useMemo(() => {
        const dataMap = new Map();
        tasks.forEach(task => {
          const key = task.assignedTo;
          dataMap.set(key, (dataMap.get(key) || 0) + 1);
        });
    
        const labels = Array.from(dataMap.keys());
        const values = Array.from(dataMap.values());
    
        return { labels, values };
      }, [tasks]);

      const data = {
        labels: groupedData.labels,
        datasets: [
          {
            label:"Tasks per Assignee",
            data: groupedData.values,
            backgroundColor: "#7c3aed",
            borderRadius: 5,
            barThickness: 30,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#fff",
            bodyColor: "#e5e7eb",
            cornerRadius: 6,
            padding: 12,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#374151", stepSize: 1, font: { size: 12, family: "Poppins", weight: "bold" },
        },
            grid: {  
                color: "rgba(55, 65, 81, 0.2)"
              },
          },
          x: {
            ticks: { color: "#374151", font: { size: 12, family: "Poppins", weight: "bold" } },
            grid: { display: false },
          },
          
        },
      };

      
  return (
    <div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default TasksPerAssigneeChart ;
