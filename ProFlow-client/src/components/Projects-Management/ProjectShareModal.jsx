import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";

const ProjectShareModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  const [members, setMembers] = useState([
    { name: "Nisha", initials: "Ni", role: "Project Admin" },
  ]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb", // light bg
      borderColor: state.isFocused ? "#7c3aed" : "#d1d5db", // purple-600 or gray-300
      color: "#111827", // dark text
      fontSize: "0.875rem",
      minHeight: "36px",
      boxShadow: state.isFocused ? "0 0 0 1px #7c3aed" : "none",
      "&:hover": {
        borderColor: "#7c3aed",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff", // dropdown bg
      borderRadius: "0.5rem",
      padding: "0.25rem",
      fontSize: "0.875rem",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#ede9fe" // light purple for selected
        : state.isFocused
          ? "#f3f4f6" // light gray on hover
          : "#ffffff",
      color: "#111827", // dark text
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827", // only show title
      fontWeight: "500",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#6b7280",
      padding: "6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const roleOptions = [
    {
      value: "admin",
      label: "Project Admin",
      description: "Full access to change settings",
    },
    {
      value: "editor",
      label: "Editor",
      description: "Can add, edit, delete anything",
    },
    {
      value: "commenter",
      label: "Commenter",
      description: "Can comment, but not edit",
    },
    { value: "viewer", label: "Viewer", description: "View only" },
  ];

  const handleInvite = () => {
    if (!inviteEmail) return;

    const name = inviteEmail.split("@")[0];
    const initials = name
      .split(".")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);

    const newMember = {
      name,
      initials,
      role: inviteRole,
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail(""); // clear input
    setInviteRole("Editor");
  };

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 relative"
      >
        {/* Close Icon */}
        <button
          className="absolute rounded-lg top-4 right-4 text-zinc-500 hover:bg-gray-100"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
          Share Project
        </h2>

        {/* Invite section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Invite with email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Add members by email..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-grow border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
            />
            <Select
              styles={customStyles}
              options={roleOptions}
              onChange={(selected) => setInviteRole(selected.label)} // stores only label
              value={roleOptions.find((opt) => opt.label === inviteRole)}
              getOptionLabel={(e) => (
                <div>
                  <div className="font-medium text-sm">{e.label}</div>
                  {e.description && (
                    <div className="text-xs text-gray-500">{e.description}</div>
                  )}
                </div>
              )}
              formatOptionLabel={(data, { context }) =>
                context === "menu" ? (
                  <div>
                    <div className="font-medium text-sm">{data.label}</div>
                    <div className="text-xs text-gray-500">
                      {data.description}
                    </div>
                  </div>
                ) : (
                  <div className="font-medium text-sm">{data.label}</div>
                )
              }
            />

            <button
              onClick={handleInvite}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700"
            >
              Invite
            </button>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-300">
              <input type="checkbox" className="mr-2" />
              Notify when tasks are added to the project
            </label>
          </div>
        </div>

        {/* Members list */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
            Members
          </p>
          <ul className="space-y-2 text-sm">
            {members.map((member, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex items-center gap-2">
                  <div className="bg-purple-600 text-white rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">
                    {member.initials}
                  </div>
                  {member.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Copy project link */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-end">
          <button className="bg-zinc-800 dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 text-sm text-white dark:text-white px-4 py-2 rounded-md">
            Copy project link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectShareModal;
