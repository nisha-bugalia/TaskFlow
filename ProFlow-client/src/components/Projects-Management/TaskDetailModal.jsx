import { toast } from "react-hot-toast";
import { FiX, FiCalendar, FiUser, FiEdit2, FiTrash } from "react-icons/fi";
import axios from "axios"; // add this if not already
import { useState } from "react";
import { Dialog } from "@headlessui/react";

const TaskDetailModal = ({ task, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(task.title || '');
  const [assignee, setAssignee] = useState(task.assignee || '');
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset); // Remove timezone offset
    return date.toISOString().split('T')[0];     // Get YYYY-MM-DD
  };
  
  const [endDate, setDueDate] = useState(formatDateForInput(task.endDate || ''));
  
    const [priority, setPriority] = useState(task.priority || 'Low');
  const [status, setStatus] = useState(task.status || 'Not Started');
  const [description, setDescription] = useState(task.description || '');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(task.comments || []);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      assignee,
      endDate,
      priority,
      status,
      description,
      comments,
    };
    onUpdate(updatedTask);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      date: new Date(),
    };
    setComments([...comments, newComment]);
    setComment('');
  };

const handleDeleteTask = () => {
  toast((t) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <FiTrash className="text-red-500" />
        <span className="font-medium">Are you sure you want to DELETE?</span>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded"
          onClick={() => {
            toast.dismiss(t.id);
            toast.success("Task deleted");
            onDelete(task._id);   
              onClose();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ), { duration: 5000 });
};


  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-[8000] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="bg-white dark:bg-gray-900 max-w-4xl w-full rounded-lg shadow-lg overflow-hidden relative z-50 flex">
        
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-between items-start">
            <input
              className="text-xl pb-2 font-semibold w-full border-b focus:outline-none bg-transparent dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={handleDeleteTask}
              className="text-red-600 hover:text-red-700 p-2"
              title="Delete Task"
            >
              <FiTrash />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FiUser className="text-gray-500" />
              <input
                placeholder="Assignee"
                className="w-full border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-gray-500" />
              <input
                type="date"
                className="border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white"
                value={endDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 dark:text-white">Priority</label>
              <select
                className="w-full border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 dark:text-white">Status</label>
              <select
                className="w-full border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1 dark:text-white">Description</label>
            <textarea
              className="w-full border px-3 py-2 rounded text-sm resize-none dark:bg-gray-800 dark:text-white"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="w-[280px] m-2 border rounded-lg bg-gray-50 dark:bg-gray-800 p-4 flex flex-col justify-between">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-2">Comments</h4>
          <div className="flex-1 space-y-2 overflow-y-auto mb-3">
            {comments.map((c) => (
              <div key={c.id} className="bg-white dark:bg-gray-700 p-2 rounded text-sm shadow-sm">
                <div>{c.text}</div>
                <div className="text-right text-gray-400 text-[10px]">
                  {format(new Date(c.date), 'PPpp')}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Write comment"
              className="flex-1 border px-2 py-1 text-sm rounded dark:bg-gray-700 dark:text-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button onClick={handleAddComment} className="text-purple-600">
              <FiEdit2 />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>
      </div>
    </Dialog>
  );
};
export default TaskDetailModal;
