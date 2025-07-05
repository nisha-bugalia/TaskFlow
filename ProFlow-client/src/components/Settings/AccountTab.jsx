import React, { useState } from "react";
import { FiKey, FiMonitor, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const AccountTab = ({ user }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteInput, setDeleteInput] = useState("");

  const handleUpdate = (type) => {
    if (type === "Password") {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return toast.error("Please fill in all fields");
      }
      if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match");
      }
    }

    toast.success(`${type} updated successfully!`);
    setShowEmailModal(false);
    setShowPasswordModal(false);
  };

  const handleDelete = () => {
    if (deleteInput.toLowerCase() !== "confirm") {
      return toast.error("You must type 'confirm' to proceed");
    }
    toast.success("Account deleted successfully!");
    setShowDeleteModal(false);
    // Optionally redirect or logout
  };

  return (
    <div className="relative">
      <div className="bg-white/100 dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-800">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Account Settings
          </h2>
        </div>

        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-900 dark:text-white font-medium">
              {user?.email || "user@example.com"}
            </p>
          </div>
          <button
            onClick={() => setShowEmailModal(true)}
            className="text-sm text-purple-600 hover:underline"
          >
            Change
          </button>
        </div>

        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FiKey />
            <span>Password</span>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-sm text-purple-600 hover:underline"
          >
            Change
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-300">
            <FiMonitor />
            <span>Login Activity</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last login: <span className="font-medium">2 hours ago</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Device: Chrome on Windows
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Location: New Delhi, India
          </p>
        </div>

        <div className="bg-red-50 m-4 dark:bg-red-900/20 border border-red-200 dark:border-red-600 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
            Deleting your account is irreversible. All your data will be permanently removed.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded shadow"
          >
            <FiTrash2 />
            Delete Account
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <Modal onClose={() => setShowEmailModal(false)} title="Change Email">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">New Email Address</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter new email"
          />
          <ActionButtons
            onCancel={() => setShowEmailModal(false)}
            onConfirm={() => handleUpdate("Email")}
          />
        </Modal>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <Modal onClose={() => setShowPasswordModal(false)} title="Change Password">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <ActionButtons
            onCancel={() => setShowPasswordModal(false)}
            onConfirm={() => handleUpdate("Password")}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" danger>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Type <span className="font-semibold text-red-600">confirm</span> to permanently delete your account.
          </p>
          <input
            type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder='Type "confirm"'
          />
          <ActionButtons
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmLabel="Delete"
            confirmClass="bg-red-600 hover:bg-red-700"
          />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, children, danger = false }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[8000] animate-fade-in">
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm shadow-xl space-y-4 ${danger ? 'border border-red-500' : ''}`}>
      <h3 className={`text-lg font-semibold ${danger ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h3>
      {children}
    </div>
  </div>
);

const ActionButtons = ({ onCancel, onConfirm, confirmLabel = "Save", confirmClass = "bg-purple-600 hover:bg-purple-700" }) => (
  <div className="flex justify-end gap-2">
    <button onClick={onCancel} className="px-3 py-1 text-sm text-gray-500 hover:text-black">
      Cancel
    </button>
    <button
      onClick={onConfirm}
      className={`px-4 py-2 text-sm text-white rounded ${confirmClass}`}
    >
      {confirmLabel}
    </button>
  </div>
);

export default AccountTab;
