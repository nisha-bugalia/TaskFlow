import React from 'react';

const Project_TasksSummary = () => {
  const summaryData = [
    { label: 'Task form members', count: 20, badgeColor: 'bg-purple-500 text-white' },
    { label: 'Task In progress', count: 20, badgeColor: 'bg-orange-400 text-white' },
    { label: 'Under Review', count: 20, badgeColor: 'bg-pink-400 text-white' },
    { label: 'Task Complete', count: 20, badgeColor: 'bg-green-500 text-white' },
  ];

  return (
    <div className=" border border-gray-200 w-full bg-white py-4 px-6 rounded-xl mb-2">
      <div className="flex items-center justify-between gap-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              index !== summaryData.length - 1 ? 'pr-16 border-r border-gray-300' : ''
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
