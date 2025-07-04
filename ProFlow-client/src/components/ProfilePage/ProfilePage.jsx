import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import EditProfileModal from "./EditProfileModal";
import AssignedTasksSection from "./AssignedTasksSection";
import MyProjectsSection from "./MyProjectsSection";

const ProfilePage = () => {
    
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        console.log("ijskd:", storedUser)
        return storedUser ? JSON.parse(storedUser) : null;
      });
      
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="md:ml-[20vw] p-6 max-w-5xl mx-auto">
      <ProfileHeader user={user} onEdit={() => setEditModalOpen(true)} />
      <AssignedTasksSection user={user} />
      <MyProjectsSection user={user}/>

      {editModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
