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
