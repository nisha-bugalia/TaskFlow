import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiX, FiCalendar, FiUser, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskDetailModal = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title || '');
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
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
      dueDate,
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

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="bg-white dark:bg-gray-900 max-w-4xl w-full rounded-lg shadow-lg overflow-hidden relative z-50 flex">
        
        <div className="flex-1 p-6 space-y-4">
          <input
            className="text-xl pb-2 font-semibold w-full border-b focus:outline-none bg-transparent dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

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
                value={dueDate}
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
                <option>Done</option>
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

          {/* Save Button */}
          <div className="text-right">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Comments Section */}
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

        {/* Close Button */}
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
