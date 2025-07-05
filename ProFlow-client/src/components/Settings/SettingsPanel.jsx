import React, { useState } from "react";

const tabs = [
  "Account",
//   "Preferences",
  "Security",
  "Notifications",
//   "Team Settings",
];

const SettingsPanel = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg border-b dark:border-gray-700 px-6 pt-3 shadow-sm">
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-all ${
              activeTab === tab
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;
