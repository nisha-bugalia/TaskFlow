import React from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfileHeader = ({ user, onEdit }) => {
  return (
    <div className=" dark:bg-gray-900 rounded-xl p-6 pt-0 shadow-sm dark:border-gray-800 flex flex-col md:flex-row items-center gap-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={user.profileImage || "https://i.pravatar.cc/150?img=31"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-500 shadow-sm"
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {user.fullName || "John Doe"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">@{user.username || "username"}</p>
        {user.bio && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-md">
            {user.bio}
          </p>
        )}
      </div>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-lg shadow"
      >
        <FiEdit2 />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
