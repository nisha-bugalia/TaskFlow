import React, { useState } from "react";
import AddTasks from "./addTasks";
import { MdDelete } from "react-icons/md";

function TaskBoard({ darkMode, isModalOpen, setIsModalOpen, taskModalOpenRef }) {
  const [tasks, setTasks] = useState({
    pending: [],
    current: [],
    completed: [],
  });
  const [commentsMap, setCommentsMap] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [highlightCategory, setHighlightCategory] = useState("");
  const [taskData, setTaskData] = useState(null);

  const handleAddClick = (category) => {
    setCurrentCategory(category);
    setTaskData({ name: "", deadline: "", description: "", id: null }); // No ID here
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(""), 1000);
  };

  const handleTaskClick = (category, task, index) => {
    setCurrentCategory(category);
    setTaskData({ ...task });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(""), 1000);
  };

  const handleModalSubmit = () => {
    if (taskData) {
      setTasks((prev) => {
        const updatedCategory = [...prev[currentCategory]];

        if (!taskData.id) {
          taskData.id = `${currentCategory}-${Date.now()}`; // Create new ID only if not present
          updatedCategory.push({ ...taskData });
        } else {
          const existingIndex = updatedCategory.findIndex(
            (t) => t.id === taskData.id
          );
          if (existingIndex !== -1) {
            updatedCategory[existingIndex] = { ...taskData }; // Update existing task
          } else {
            updatedCategory.push({ ...taskData }); // Fallback (shouldn't happen)
          }
        }

        return { ...prev, [currentCategory]: updatedCategory };
      });

      setIsModalOpen(false);
      setTaskData(null);
    }
  };

  const handleAddComment = (taskId, comment) => {
    setCommentsMap((prev) => ({
      ...prev,
      [taskId]: [comment, ...(prev[taskId] || [])],
    }));
  };

  const handleDeleteTask = (category, index) => {
    setTasks((prev) => {
      const updatedCategory = [...prev[category]];
      updatedCategory.splice(index, 1);
      return { ...prev, [category]: updatedCategory };
    });
  };

  const getCategoryStyles = (category) => {
    if (!darkMode) {
      return {
        bg:
          category === "pending"
            ? "bg-rose-100"
            : category === "current"
              ? "bg-yellow-100"
              : "bg-green-100",
        text: "text-purple-950",
        border:
          category === "pending"
            ? "border-red-200"
            : category === "current"
              ? "border-yellow-200"
              : "border-green-200",
      };
    } else {
      return {
        bg:
          category === "pending"
            ? "bg-rose-900"
            : category === "current"
              ? "bg-yellow-800"
              : "bg-green-900",
        text: "text-white",
        border:
          category === "pending"
            ? "border-rose-400"
            : category === "current"
              ? "border-yellow-400"
              : "border-green-400",
      };
    }
  };

  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start z-55">
        {["pending", "current", "completed"].map((category) => {
          const { bg, text, border } = getCategoryStyles(category);
          return (
            <div
              key={category}
              className={`border-2 rounded-xl shadow-md p-4 transition-colors duration-300
                ${highlightCategory === category ? "border-purple-950 shadow-sm" : border}
                ${bg} ${text}`}
            >
              <h2 className="text-xl capitalize mb-4">{category}</h2>
              {tasks[category].length === 0 ? (
                <p
                  className={`${darkMode ? "text-indigo-300" : "text-gray-400"} italic`}
                >
                  No tasks
                </p>
              ) : (
                <ul className="mb-4">
                  {tasks[category].map((task, index) => (
                    <li
                      key={`${category}-${index}`}
                      className={`relative group p-2 border rounded mb-2 cursor-pointer z-10 transition-colors
                        ${
                          darkMode
                            ? "bg-purple-800 border-purple-500 text-white hover:bg-purple-600"
                            : "bg-gray-100 border-purple-300 text-purple-950 hover:bg-purple-100"
                        }
                      `}
                      onClick={() => handleTaskClick(category, task, index)}
                    >
                      {task.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(category, index);
                        }}
                        className={`absolute right-2 top-1 
                          block 
                          md:group-hover:block md:hidden
                          text-red-600 bg-white rounded-full
                        `}
                        title="Delete Task"
                      >
                        <MdDelete
                          size={18}
                          className={`${
                            darkMode
                              ? "text-purple-900 hover:text-black"
                              : "text-purple-950 hover:text-black"
                          }`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleAddClick(category)}
                className={`w-full px-3 py-1 rounded transition-colors
                  ${darkMode ? "bg-purple-950 hover:bg-purple-800" : "bg-purple-600 hover:bg-purple-500"}
                  text-white
                `}
              >
                Add Task
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <AddTasks
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setTaskData(null);
          }}
          onSubmit={handleModalSubmit}
          taskData={taskData}
          setTaskData={setTaskData}
          comments={commentsMap[taskData?.id] || []}
          addComment={(comment) => handleAddComment(taskData?.id, comment)}
          darkMode={darkMode}
          taskModalOpenRef={taskModalOpenRef}
        />
      )}
    </div>
  );
}

export default TaskBoard;
