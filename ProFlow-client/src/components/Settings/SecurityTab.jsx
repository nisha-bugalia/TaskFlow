import React, { useState } from "react";
import { FiShield, FiLogOut, FiSmartphone, FiMapPin, FiInfo } from "react-icons/fi";
import { Switch } from "@headlessui/react";

const SecurityTab = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const recentDevices = [
    {
      device: "Chrome on Windows",
      location: "New Delhi, India",
      time: "2 hours ago",
    },
    {
      device: "Safari on iPhone",
      location: "Mumbai, India",
      time: "Yesterday",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-800 w-full">
      
      {/* Header */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Security Settings
        </h2>
      </div>

      {/* Two-Factor Authentication */}
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium mb-1 flex items-center gap-1">
            <FiShield /> Two-Factor Authentication
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
            Add an extra layer of protection to your account by enabling two-factor authentication.
          </p>
        </div>
        <Switch
          checked={twoFactorEnabled}
          onChange={setTwoFactorEnabled}
          className={`${
            twoFactorEnabled ? "bg-purple-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              twoFactorEnabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      {/* Recent Devices */}
      <div className="px-6 py-5 space-y-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Recent Login Devices</h3>
        {recentDevices.map((d, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-3 border border-gray-200 dark:border-gray-800 rounded-md text-sm"
          >
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-1">
                <FiSmartphone />
                {d.device}
              </p>
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <FiMapPin />
                {d.location}
              </p>
              <p className="text-xs text-gray-500">{d.time}</p>
            </div>
            <button className="text-sm text-purple-600 hover:underline flex items-center gap-1">
              <FiLogOut />
              Sign Out
            </button>
          </div>
        ))}
      </div>

      {/* Security Tips */}
      <div className="px-6 py-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          <FiInfo className="inline mr-1" />
          Security Tips
        </h3>
        <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Use a strong password with symbols and numbers.</li>
          <li>Don’t reuse passwords from other sites.</li>
          <li>Enable two-factor authentication for better protection.</li>
          <li>Sign out from devices you no longer use.</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityTab;
