import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [role, setRole] = useState(user.role || "");
  const [image, setImage] = useState(user.profileImage || null);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      fullName,
      username,
      bio,
      role,
      profileImage: image,
    };
    onSave(updatedUser);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-6 rounded-lg z-50 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Profile</h2>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={image || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-24 h-24 opacity-0 cursor-pointer"
              title="Change Profile Picture"
            />
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />

          <textarea
            placeholder="Short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white resize-none"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Role</option>
            <option value="">Select Role</option>
  <option>Developer</option>
  <option>Software Engineer</option>
  <option>Project Manager</option>
  <option>Team Lead</option>
  <option>UI/UX Designer</option>
  <option>Graphic Designer</option>
  <option>Content Creator</option>
  <option>DevOps Engineer</option>
  <option>Marketing Manager</option>
  <option>Business Analyst</option>
  <option>Operations Manager</option>
  <option>Freelancer</option>
  <option>Student</option>
  <option>Other</option>
          </select>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
