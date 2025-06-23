import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaBell } from "react-icons/fa";

// Dummy notifications
//this drop down will oly past 7 days notification all other will be on a separate page ("view all")
const dummyNotifications = [
  {
    id: 1,
    message: "You were assigned a new task: Design Login Page",
    type: "assignment",
    time: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: 2,
    message: "Task 'Deploy to Prod' was marked complete",
    type: "complete",
    time: dayjs().subtract(2, "day").toISOString(),
  },
  {
    id: 3,
    message: "Reminder: 'Update Docs' is due today",
    type: "alert",
    time: dayjs().subtract(6, "day").toISOString(),
  },
  {
    id: 4,
    message: "You joined project: ProFlow UI Redesign",
    type: "info",
    time: dayjs().subtract(8, "day").toISOString(), // won't show
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter past 7 days
  const recentNotifications = dummyNotifications.filter((n) =>
    dayjs(n.time).isAfter(dayjs().subtract(7, "day"))
  );

  const getIcon = (type) => {
    switch (type) {
      case "assignment":
        return <FiCheckCircle className="text-blue-500" />;
      case "complete":
        return <FiCheckCircle className="text-green-500" />;
      case "alert":
        return <FiAlertCircle className="text-red-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
      title="notification"
        onClick={() => setOpen(!open)}
        className="border p-3 border-gray-200 rounded-lg bg-white"
      >
        <FaBell className=" text-gray-700 dark:text-zinc-200" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-700 rounded-xl z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-100">
            Notifications
          </div>

          <ul className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentNotifications.length === 0 ? (
              <li className="p-4 text-sm text-zinc-500 dark:text-zinc-400 text-center italic">
                No new notifications.
              </li>
            ) : (
              recentNotifications.map((notif) => (
                <li
                  key={notif.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                >
                  <div className="pt-1">{getIcon(notif.type)}</div>
                  <div className="text-sm text-zinc-700 dark:text-zinc-200">
                    <p>{notif.message}</p>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {dayjs(notif.time).fromNow()}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="p-2 text-center border-t dark:border-zinc-700">
            <button
              onClick={() => {
                navigate("/notifications");
                setOpen(false);
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
