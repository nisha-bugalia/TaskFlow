import React from "react";
import {
  FiCheckCircle,
  FiEdit2,
  FiUserPlus,
  FiPlusCircle,
  FiMessageCircle,
  FiActivity,
} from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const dummyActivities = [
  {
    id: 1,
    user: "Arjun Desai",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxKH-GHG7GKA11hkYH9--j0OynoGFFVsMZjw&s",
    action: "completed",
    target: "Build Login API",
    targetType: "task",
    time: dayjs().subtract(5, "minute").toISOString(),
  },
  {
    id: 2,
    user: "Raj Gupta",
    avatar: "https://i.pravatar.cc/150?img=8",
    action: "commented",
    target: "Refactor Redux Store",
    targetType: "task",
    time: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: 3,
    user: "Anjali Yadav",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq2JCrkV7jZseomcP3HFmXGPbwPKaoI8HLA&s",
    action: "created",
    target: "Marketing Website Revamp",
    targetType: "project",
    time: dayjs().subtract(2, "day").toISOString(),
  },
  {
    id: 4,
    user: "Soham Roy",
    avatar: "https://i.pravatar.cc/150?img=6",
    action: "assigned",
    target: "Design Dashboard UI",
    targetType: "task",
    time: dayjs().subtract(3, "day").toISOString(),
  },
];

const getIcon = (action) => {
  switch (action) {
    case "completed":
      return <FiCheckCircle className="text-green-500 text-lg" />;
    case "commented":
      return <FiMessageCircle className="text-blue-500 text-lg" />;
    case "created":
      return <FiPlusCircle className="text-purple-500 text-lg" />;
    case "assigned":
      return <FiUserPlus className="text-orange-500 text-lg" />;
    case "updated":
      return <FiEdit2 className="text-yellow-500 text-lg" />;
    default:
      return <FiEdit2 className="text-zinc-400 text-lg" />;
  }
};

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 max-h-96 overflow-y-auto">
      <h3 className=" text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <FiActivity/> Activity Feed
      </h3>

      <ul className="space-y-5">
        {dummyActivities.map((activity) => (
          <li key={activity.id} className="flex gap-4 items-start">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700"
            />
            <div className="flex-1">
              <p className="text-base text-zinc-700 dark:text-zinc-200">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                {activity.targetType === "task" ? (
                  <span className="font-semibold text-indigo-500">task</span>
                ) : (
                  <span className="font-semibold text-pink-500">project</span>
                )}{" "}
                <span className="italic">"{activity.target}"</span>
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {dayjs(activity.time).fromNow()}
              </p>
            </div>
            <div className="mt-1">{getIcon(activity.action)}</div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
