import React from "react";

const Project_TasksSummary = ({tasks , members}) => {
  // Default to empty array if no tasks provided
  // const total = tasks?.length || 0;
  const totalMembers=members.length;

  const summary = {
    fromMembers: totalMembers,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    underReview: tasks.filter((t) => t.status === "On Hold").length,
    complete: tasks.filter((t) => t.status === "Completed").length,
  };

  const summaryData = [
    {
      label: "Project members",
      count: summary.fromMembers,
      badgeColor: "bg-purple-500 text-white",
    },
    {
      label: "Task In Progress",
      count: summary.inProgress,
      badgeColor: "bg-orange-400 text-white",
    },
    {
      label: "On Hold",
      count: summary.underReview,
      badgeColor: "bg-pink-400 text-white",
    },
    {
      label: "Task Complete",
      count: summary.complete,
      badgeColor: "bg-green-500 text-white",
    },
  ];

  return (
    <div className="border-b border-gray-200 w-full bg-white py-4 px-6 rounded-lg rounded-b-none mt-2">
      <div className="flex items-center justify-between gap-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              index !== summaryData.length - 1
                ? "pr-16 border-r border-gray-300"
                : ""
            }`}
          >
            <span className="text-base font-bold text-gray-800 whitespace-nowrap">
              {item.label}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${item.badgeColor}`}
            >
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project_TasksSummary;
