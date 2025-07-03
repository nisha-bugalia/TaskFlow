import React, { useEffect, useState } from "react";
import TaskDetailModal from "./TaskDetailModal";
import InlineTaskComposer from "./InlineTaskComposer";
import axios from "axios";

const statuses = ["Not Started", "In Progress", "On Hold", "Completed"];

const ListViewTasks = ({ projectId, preTasks }) => {
  const [tasks, setTasks] = useState(preTasks || []);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeComposer, setActiveComposer] = useState(null);

  // ✅ Fetch username for each task on mount
  useEffect(() => {
    const fetchUsernames = async () => {
      const updated = await Promise.all(
        tasks.map(async (task) => {
          if (!task.assignee) return task;
          try {
            const res = await axios.get(
              `http://localhost:5000/user/get-user?id=${task.assignee}`
            );
            return {
              ...task,
              assignee: res.data.user.username,
            };
          } catch (err) {
            console.error("Failed to fetch user:", err);
            return task;
          }
        })
      );
      setTasks(updated);
    };

    fetchUsernames();
  }, []);

  // ✅ Create task & immediately fetch username
  const handleCreateTask = async (newTask) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/get-user?id=${newTask.assignee}`
      );
      const enrichedTask = {
        ...newTask,
        assignee: res.data.user.username,
      };
      setTasks((prev) => [...prev, enrichedTask]);
    } catch (err) {
      setTasks((prev) => [...prev, newTask]); // fallback with ID
    }

    setActiveComposer(null);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setModalOpen(false);
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm space-y-6">
      {statuses.map((status) => (
        <div key={status} className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              {status}
            </h3>
            <button
              onClick={() =>
                setActiveComposer((prev) => (prev === status ? null : status))
              }
              className="text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
            >
              + Add Task
            </button>
          </div>

          <div className="space-y-2">
            {getTasksByStatus(status).map((task) => (
              <div
                key={task._id}
                onClick={() => {
                  setSelectedTask(task);
                  setModalOpen(true);
                }}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:shadow transition"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {task.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between mt-1">
                  <span>{task.assignee || "Unassigned"}</span>
                  <span>
                    {task.endDate
                      ? new Date(task.endDate).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })
                      : "No due date"}
                  </span>
                  {task.priority && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {activeComposer === status && (
              <InlineTaskComposer
                projectId={projectId}
                status={status}
                onCreate={handleCreateTask}
                onClose={() => setActiveComposer(null)}
                showStatus={false}
              />
            )}
          </div>
        </div>
      ))}

      {modalOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onUpdate={handleUpdateTask}
          onDelete={(taskId) => {
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ListViewTasks;
