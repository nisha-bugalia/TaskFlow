import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFolder } from "react-icons/fa";
import TaskDetailModal from "../Projects-Management/TaskDetailModal";

const AssignedTasksSection = ({ user }) => {
  // if (!user || !user._id) {
  //     return <p className="text-sm text-gray-500">Loading user tasks...</p>;
  //   }
  console.log("usreinjdd:", user.id);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/task/get-all-tasks",
          { withCredentials: true }
        ); // or your actual route

        const allTasks = res.data.tasks || [];

        const assignedToUser = allTasks.filter(
          (task) =>
            Array.isArray(task.assignee) &&
            task.assignee.map(String).includes(String(user.id))
        );
        console.log("Checking user ID:", user._id);
        allTasks.forEach((task) => {
          console.log("Task ID:", task._id, "| Assignees:", task.assignee);
        });

        setTasks(assignedToUser);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAllTasks();
  }, [user._id]);

  return (
    <div className="mt-8">
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="bg-white p-6 dark:bg-gray-900 rounded-lg shadow border dark:border-gray-700 min-h-[450px]">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            My Tasks
          </h3>

          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => setSelectedTask(task)}
              className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {task.title}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white rounded-full font-semibold">
                  {task.projectId.title}
                </span>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {task.endDate
                    ? new Date(task.endDate).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updated) => {
            setTasks((prev) =>
              prev.map((t) => (t._id === updated._id ? updated : t))
            );
            setSelectedTask(null);
          }}
          onDelete={(taskId) => {
            setTasks((prev) => prev.filter((t) => t._id !== taskId));
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default AssignedTasksSection;
