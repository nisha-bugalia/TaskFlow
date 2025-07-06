import React, { useState } from "react";
import { FiArrowLeft, FiBell, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import classNames from "classnames";

const dummyNotifications = [
  {
    id: 1,
    message: "You were assigned a new task: Design Login Page",
    type: "assignment",
    status: "unread",
    time: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: 2,
    message: "Task 'Deploy to Prod' was marked complete",
    type: "complete",
    status: "read",
    time: dayjs().subtract(2, "day").toISOString(),
  },
  {
    id: 3,
    message: "Reminder: 'Update Docs' is due today",
    type: "alert",
    status: "unread",
    time: dayjs().subtract(6, "day").toISOString(),
  },
  {
    id: 4,
    message: "You were mentioned in: UI Redesign thread",
    type: "mention",
    status: "read",
    time: dayjs().subtract(10, "day").toISOString(),
  },
];

const getIcon = (type) => {
  switch (type) {
    case "assignment":
    case "complete":
      return <FiCheckCircle className="text-blue-500" />;
    case "alert":
      return <FiAlertCircle className="text-red-500" />;
    case "mention":
      return <FiBell className="text-purple-500" />;
    default:
      return <FiBell className="text-gray-500" />;
  }
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filteredNotifications =
    filter === "all"
      ? dummyNotifications
      : dummyNotifications.filter((n) =>
          filter === "unread"
            ? n.status === "unread"
            : n.type === filter
        );

  return (
    <div className="md:ml-[20vw] px-6 py-3 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 dark:text-white hover:underline text-sm flex items-center gap-1"
        >
          <FiArrowLeft /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Notifications
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3 flex-wrap text-sm">
        {["all", "unread", "assignment", "alert", "mention"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={classNames(
              "px-3 py-1 rounded-full border",
              filter === f
                ? "bg-purple-600 text-white border-purple-600"
                : "text-gray-700 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow border border-zinc-200 dark:border-zinc-700 rounded-xl divide-y divide-zinc-100 dark:divide-zinc-800">
        {filteredNotifications.length === 0 ? (
          <p className="p-6 text-center text-gray-500 dark:text-zinc-400 italic">
            No notifications found.
          </p>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className="px-6 py-4 flex items-start gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <div className="pt-1">{getIcon(notif.type)}</div>
              <div className="text-sm text-gray-800 dark:text-zinc-200">
                <p>{notif.message}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  {dayjs(notif.time).fromNow()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
