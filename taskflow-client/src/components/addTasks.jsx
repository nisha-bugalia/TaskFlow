import React from 'react';

function AddTaskModal({ isOpen, onClose, onSubmit, taskData, setTaskData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-purple-950 text-xl font-semibold">
            {taskData?.id !== null ? "Edit Task" : "Add Task"}
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">X</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Task Name */}
          <label className="text-black text-lg w-full p-1 block my-2">Task</label>
          <input
            type="text"
            value={taskData?.name || ''}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            className="text-black w-full p-2 border rounded"
            placeholder="Enter task"
            required
          />

          {/* Deadline */}
          <label htmlFor="deadline" className="text-black text-lg w-full p-1 block my-2">Deadline</label>
          <input
            type="date"
            id="deadline"
            value={taskData?.deadline || ''}
            onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
            className="text-black w-full p-2 border rounded "
            placeholder="Select deadline"
            
          />

          <label htmlFor="description" className="text-black text-lg w-full p-1 block my-2">Description</label>
          <textarea
            id="description"
            rows="4"
            value={taskData?.description || ''}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="text-black w-full p-2 border rounded"
            placeholder="Write task description here"
          />

          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded mt-4">
            {taskData?.id !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
