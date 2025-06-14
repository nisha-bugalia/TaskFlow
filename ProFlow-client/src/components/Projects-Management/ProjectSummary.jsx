import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

const ProjectSummarySection = ({
  description,
  dueDate,
  priority,
  status,
  onEdit,
}) => {
  const formattedDate = new Date(dueDate).toLocaleDateString();

  const priorityColors = {
    High: 'bg-red-600 text-white',
    Medium: 'bg-yellow-500 text-white',
    Low: 'bg-green-600 text-white',
    Critical: 'bg-red-800 text-white',
  };

  const statusColors = {
    'Done': 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Not Started': 'bg-red-100 text-red-700',
  };

  return (
    <div className="relative w-full rounded-2xl bg-white border border-gray-200 p-8 mt-2 mb-2 transition-all ">
      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 flex items-center gap-1 text-sm px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all"
      >
        <FiEdit2 size={16} />
        Edit
      </button>

      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Project Summary
        </h2>
        <p className="text-sm text-gray-400 mt-1">Overview of project attributes</p>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-black uppercase font-medium mb-1">
            Description
          </p>
          <p className="text-gray-700 text-base leading-relaxed">{description}</p>
        </div>

        <div>
          <p className="text-sm text-black uppercase font-medium mb-1">
            Due Date
          </p>
          <p className="text-base font-semibold text-gray-800">{formattedDate}</p>
        </div>

        <div>
          <p className="text-sm text-black uppercase font-medium mb-1">
            Priority
          </p>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full shadow-sm ${priorityColors[priority] || 'bg-gray-200 text-gray-800'}`}
          >
            {priority}
          </span>
        </div>

        <div>
          <p className="text-sm text-black uppercase font-medium mb-1">
            Status
          </p>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full ${statusColors[status] || 'bg-gray-200 text-gray-800'}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummarySection;
