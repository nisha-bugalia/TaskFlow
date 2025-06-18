import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {
  FiList,
  FiColumns,
  FiCalendar,
  FiBarChart2,
  FiMessageCircle,
  FiPaperclip,
  FiPlus,
  FiLayout,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { name: 'Overview', icon: <FiLayout /> },
  { name: 'List', icon: <FiList /> },
  { name: 'Board', icon: <FiColumns /> },
  { name: 'Timeline', icon: <FiBarChart2 /> },
  { name: 'Calendar', icon: <FiCalendar /> },
  { name: 'Messages', icon: <FiMessageCircle /> },
  { name: 'Files', icon: <FiPaperclip /> },
];

const ProjectHeader = ({ id, title, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full border-b pb-2">
      {/* Top Row: Back and Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded bg-black text-white hover:bg-gray-900 transition"
            onClick={() => navigate('/projects')}
          >
            <AiOutlineArrowLeft size={18} />
            Back
          </button>
          <h1 className="text-2xl font-bold">{title || 'Project Title'}</h1>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.name
                ? 'bg-white text-black border-b-2 border-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
        <button className="ml-auto p-2 text-gray-500 hover:text-black">
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;
