import React from 'react';

const ListViewTasks = ({ tasks = [], setTasks }) => {
  const groupBySection = (tasks) => {
    return tasks.reduce((acc, task) => {
      const section = task.status || 'To do';
      if (!acc[section]) acc[section] = [];
      acc[section].push(task);
      return acc;
    }, {});
  };

  const getPriorityBadge = (level) => {
    const styles = {
      Low: 'bg-teal-100 text-teal-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-purple-100 text-purple-800',
      Critical: 'bg-red-800 text-white',
    };
    return (
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[level] || 'bg-gray-200 text-gray-700'}`}>
        {level}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Not Started': 'bg-gray-200 text-gray-600',
      'In Progress': 'bg-yellow-100 text-yellow-700',
      Done: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status] || 'bg-red-100 text-red-700'}`}>
        {status}
      </span>
    );
  };

  const grouped = groupBySection(tasks);

  return (
    <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-900 overflow-x-auto mt-2">
      <div className="flex text-xs font-semibold text-gray-600 dark:text-gray-300 border-b pb-2 mb-3">
        <div className="w-1/4">Name</div>
        <div className="w-1/6">Assignee</div>
        <div className="w-1/6">Due date</div>
        <div className="w-1/6">Priority</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/12 text-center">+</div>
      </div>

      {Object.keys(grouped).map((section) => (
        <div key={section} className="mb-6">
          <div className="text-sm font-bold text-gray-800 dark:text-white mb-2">{section}</div>
          {grouped[section].map((task) => (
            <div
              key={task.id}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="w-1/4">{task.title}</div>
              <div className="w-1/6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-300 text-white flex items-center justify-center text-xs font-bold">
                  {task.assignedTo?.[0]?.toUpperCase() || '-'}
                </div>
                {task.assignedTo || '—'}
              </div>
              <div className="w-1/6">
                {new Date(task.startDate).toLocaleDateString()} –{' '}
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="w-1/6">{getPriorityBadge(task.priority)}</div>
              <div className="w-1/6">{getStatusBadge(task.status)}</div>
              <div className="w-1/12 text-center text-gray-400">•••</div>
            </div>
          ))}
          <div className="text-sm text-gray-500 pl-1 p-2 cursor-pointer hover:bg-gray-100">
            + Add task...
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListViewTasks;
