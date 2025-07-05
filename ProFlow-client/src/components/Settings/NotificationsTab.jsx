// NotificationsTab.jsx
import React, { useState } from "react";
import { FiBell, FiMail, FiSmartphone, FiClock } from "react-icons/fi";

const NotificationsTab = () => {
  const [preferences, setPreferences] = useState({
    taskAssignment: true,
    commentsMentions: true,
    projectUpdates: false,
    deadlines: true,
  });

  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    push: false,
  });

  const [muteAll, setMuteAll] = useState(false);
  const [summary, setSummary] = useState("daily");

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChannel = (key) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white/100 dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-800 w-full">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiBell /> Notification Settings
        </h2>
      </div>

      {/* Notification Preferences */}
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notify me about:</h3>
        {Object.entries(preferences).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={() => togglePreference(key)}
              className="form-checkbox accent-purple-600"
            />
          </label>
        ))}
      </div>

      {/* Notification Channels */}
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notification Channels</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-800 dark:text-gray-200">
          <label className="flex justify-between">
            <span className="flex items-center gap-2"><FiBell /> In-app</span>
            <input
              type="checkbox"
              checked={channels.inApp}
              onChange={() => toggleChannel("inApp")}
              className="form-checkbox accent-purple-600"
            />
          </label>
          <label className="flex justify-between">
            <span className="flex items-center gap-2"><FiMail /> Email</span>
            <input
              type="checkbox"
              checked={channels.email}
              onChange={() => toggleChannel("email")}
              className="form-checkbox accent-purple-600"
            />
          </label>
          <label className="flex justify-between">
            <span className="flex items-center gap-2"><FiSmartphone /> Push (Mobile)</span>
            <input
              type="checkbox"
              checked={channels.push}
              onChange={() => toggleChannel("push")}
              className="form-checkbox accent-purple-600"
            />
          </label>
        </div>
      </div>

      {/* Mute All & Summary */}
      <div className="px-6 py-4 space-y-3">
        <label className="flex justify-between items-center text-sm text-red-600 font-medium">
          <span>Mute All Notifications</span>
          <input
            type="checkbox"
            checked={muteAll}
            onChange={() => setMuteAll(!muteAll)}
            className="form-checkbox accent-red-500"
          />
        </label>

      </div>

      {/* Save Changes */}
      <div className="px-6 py-4 text-right">
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsTab;
