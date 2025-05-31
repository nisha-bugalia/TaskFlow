import React, { useState } from 'react';
import AddTask from './addTasks'; 

function TaskBoard() {
  const [tasks, setTasks] = useState({
    pending: [],
    current: [],
    completed: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [highlightCategory, setHighlightCategory] = useState('');
  const [taskData, setTaskData] = useState({ name: '', deadline: '', description: '', id: null });

  const handleAddClick = (category) => {
    setCurrentCategory(category);
    setTaskData({ name: '', deadline: '', description: '', id: null });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(''), 1000);
  };

  const handleTaskClick = (category, task, index) => {
    setCurrentCategory(category);
    setTaskData({ ...task, id: index });
    setIsModalOpen(true);
    setHighlightCategory(category);
    setTimeout(() => setHighlightCategory(''), 1000);
  };

  const handleModalSubmit = () => {
    if (taskData.id !== null) {
      // Edit existing task
      setTasks((prev) => {
        const updated = [...prev[currentCategory]];
        updated[taskData.id] = { name: taskData.name, deadline: taskData.deadline, description: taskData.description };
        return { ...prev, [currentCategory]: updated };
      });
    } else {
      // Add new task
      setTasks((prev) => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], { name: taskData.name, deadline: taskData.deadline, description: taskData.description }],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex  items-start justify-between p-4 gap-4 ">
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
            <ul className=" mb-4">
              {tasks[category].map((task, index) => (
                <li
                  key={index}
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

      <AddTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        taskData={taskData}
        setTaskData={setTaskData}
      />
    </div>
  );
}

export default TaskBoard;
