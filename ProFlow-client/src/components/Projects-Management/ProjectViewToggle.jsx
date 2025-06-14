import React, { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
  } from '@hello-pangea/dnd';

const ProjectViewToggle = ({ tasks, setTasks }) => {
  const [activeView, setActiveView] = useState('list'); // 'list' | 'board'

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleComplete = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'Done' ? 'Not Started' : 'Done' }
          : task
      )
    );
  };

  const getStatusColumn = (statusLabel) =>
    tasks.filter(task => task.status === statusLabel);

  return (
    <div className="mt-8">
      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveView('list')}
          className={`px-4 py-2 rounded font-medium ${activeView === 'list' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          List View ↑
        </button>
        <button
          onClick={() => setActiveView('board')}
          className={`px-4 py-2 rounded font-medium ${activeView === 'board' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Board View ↑
        </button>
      </div>

      {/* Conditional View Rendering */}
      {activeView === 'list' && (
        <div className="flex flex-col gap-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'Done'}
                  onChange={() => toggleComplete(task.id)}
                  className="accent-purple-600 w-5 h-5"
                />
                <div>
                  <h4 className="text-lg font-semibold">{task.title}</h4>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
              </div>
              <span className="text-sm px-2 py-1 bg-gray-200 rounded">{task.status}</span>
            </div>
          ))}
        </div>
      )}

{activeView === 'board' && (
  <DragDropContext
    onDragEnd={(result) => {
      const { destination, source, draggableId } = result;
      if (!destination || destination.droppableId === source.droppableId) return;

      setTasks(prev =>
        prev.map(task =>
          task.id === draggableId
            ? { ...task, status: destination.droppableId }
            : task
        )
      );
    }}
  >
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {['Not Started', 'In Progress', 'Done'].map((status) => (
        <Droppable droppableId={status} key={status}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-gray-100 rounded p-3 min-h-[200px]"
            >
              <h3 className="text-lg font-semibold mb-2">{status}</h3>
              <div className="flex flex-col gap-3">
                {getStatusColumn(status).map((task, index) => (
                  <Draggable
                    draggableId={task.id}
                    index={index}
                    key={task.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="p-3 bg-white rounded shadow"
                      >
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  </DragDropContext>
)}
</div>
  );
};

export default ProjectViewToggle;
