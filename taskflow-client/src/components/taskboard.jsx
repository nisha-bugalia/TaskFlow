import React, { useState } from 'react';

function TaskBoard() {
  const [tasks, setTasks] = useState({
    pending: ['Task 1', 'Task 2'],
    current: ['Task 3'],
    completed: ['Task 4'],
  });

  const [newTask, setNewTask] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  const handleAddTask = (category) => {
    if (newTask.trim()) {
      setTasks((prev) => ({
        ...prev,
        [category]: [...prev[category], newTask],
      }));
      setNewTask('');
      setCurrentCategory('');
    }
  };

  return (
    <div className="flex justify-between p-4 gap-4">
      {['pending', 'current', 'completed'].map((category) => (
        <div key={category} className="bg-white rounded-xl shadow-md p-4 w-1/3">
          <h2 className="text-xl text-purple-950 capitalize mb-4">{category}</h2>
          <ul className="mb-4">
            {tasks[category].map((task, index) => (
              <li key={index} className="p-2 text-purple-950 bg-gray-100 rounded mb-2">{task}</li>
            ))}
          </ul>
          {currentCategory === category ? (
            <div>
              <input
                type="text"
                className="border p-1 w-full mb-2 text-purple-950"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
              />
              <button
                onClick={() => handleAddTask(category)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentCategory(category)}
              className="bg-purple-600 text-white px-3 py-1 rounded"
            >
              Add Another
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
