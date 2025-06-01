import React, { useState } from 'react';
import AddTasks from './addTasks';

function TaskBoard() {
  const [tasks, setTasks] = useState({
    pending: [],
    current: [],
    completed: [],
  });
  const [commentsMap, setCommentsMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [highlightCategory, setHighlightCategory] = useState('');
  const [taskData, setTaskData] = useState(null); // Use null when no task is open

  const handleAddClick = (category) => {
    setCurrentCategory(category);
    // Generate unique ID immediately for new tasks
    const newId = `${category}-${Date.now()}`;
    setTaskData({ name: '', deadline: '', description: '', id: null });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(''), 1000);
  };

  const handleTaskClick = (category, task, index) => {
    const taskId = `${category}-${index}`;
    setCurrentCategory(category);
    setTaskData({ ...task, id: taskId });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(''), 1000);
  };

  const handleModalSubmit = () => {
    if (taskData) {
      setTasks((prev) => {
        const updatedCategory = [...prev[currentCategory]];
        if (taskData.id) {
          // Edit existing task by matching id
          const existingIndex = updatedCategory.findIndex((t) => t.id === taskData.id);
          if (existingIndex !== -1) {
            updatedCategory[existingIndex] = {
              id: taskData.id, // Preserve the ID
              name: taskData.name,
              deadline: taskData.deadline,
              description: taskData.description,
            };
          }
        } else {
          // Add new task with unique id
          const newTask = {
            id: `${currentCategory}-${Date.now()}`,
            name: taskData.name,
            deadline: taskData.deadline,
            description: taskData.description,
          };
          updatedCategory.push(newTask);
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

  return (
    <div className="flex items-start justify-between p-4 gap-4">
      {['pending', 'current', 'completed'].map((category) => (
        <div
          key={category}
          className={`border-2 rounded-xl shadow-md p-4 w-1/3
                      ${highlightCategory === category ? 'border-purple-600' : 'border-gray-300'}
                      bg-white`}
        >
          <h2 className="text-xl text-purple-950 capitalize mb-4">{category}</h2>
          {tasks[category].length === 0 ? (
            <p className="text-gray-400 italic">No tasks</p>
          ) : (
            <ul className="mb-4">
              {tasks[category].map((task, index) => (
                <li
                  key={`${category}-${index}`}
                  className="p-2 border border-purple-300 text-purple-950 bg-gray-100 rounded mb-2 cursor-pointer hover:bg-purple-100"
                  onClick={() => handleTaskClick(category, task, index)}
                >
                  {task.name}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => handleAddClick(category)}
            className="bg-purple-600 text-white px-3 py-1 rounded w-full"
          >
            Add Task
          </button>
        </div>
      ))}

      {isModalOpen && (
        <AddTasks
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setTaskData(null); }}
          onSubmit={handleModalSubmit}
          taskData={taskData}
          setTaskData={setTaskData}
          comments={commentsMap[taskData?.id] || []}
          addComment={(comment) => handleAddComment(taskData?.id, comment)}
        />
      )}
    </div>
  );
}

export default TaskBoard;
