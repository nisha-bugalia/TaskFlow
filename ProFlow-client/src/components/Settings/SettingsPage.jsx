import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import AccountTab from "./AccountTab";
import NotificationsTab from "./NotificationsTab";
import SecurityTab from "./SecurityTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("ijskd:", storedUser)
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <div className="md:ml-[20vw] pl-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <SettingsPanel activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-2 pt-4">
        {activeTab === "Account" && <AccountTab user={user}/>}
        {/* {activeTab === "Preferences" && <div>Preferences settings here...</div>} */}
        {activeTab === "Security" && <SecurityTab/>}
        {activeTab === "Notifications" && <NotificationsTab/>}
        {/* {activeTab === "Team Settings" && <div>Team settings here...</div>} */}
      </div>
    </div>
  );
};

export default SettingsPage;
