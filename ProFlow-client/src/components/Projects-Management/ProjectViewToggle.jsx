import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiCalendar } from "react-icons/fi";
import InlineTaskComposer from "./InlineTaskComposer";
import TaskDetailModal from "./TaskDetailModal";
import axios from "axios";

const statusColors = {
  "Not Started": "bg-red-50 border border-red-300",
  "In Progress": "bg-blue-50 border border-blue-200",
  "On Hold": "bg-yellow-50 border border-yellow-200",
  Completed: "bg-green-50 border border-green-200",
};

const ProjectViewToggle = ({ projectId, preTasks }) => {
  const [tasks, setTasks] = useState(preTasks);
  const [activeComposer, setActiveComposer] = useState(null);
  const [composerAtTop, setComposerAtTop] = useState(false);
  const composerRefs = useRef({});
  const columnRefs = useRef({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusColumn = (statusLabel) =>
    tasks.filter((task) => task.status === statusLabel);

  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setActiveComposer(null);
    setComposerAtTop(false);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  const handleAddTaskClick = (status) => {
    setComposerAtTop(false);
    setActiveComposer(status);
    setTimeout(() => {
      composerRefs.current[status]?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const [show, setShow] = useState(false);
  const showUsername = async () => {
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        try {
          const res = await axios.get(
            `http://localhost:5000/user/get-user?id=${task.assignee}`
          );
          return {
            ...task,
            assignee: res.data.user.username, // Replace ID with username
          };
        } catch (error) {
          alert(error.response?.data?.message || "Error fetching username");
          return task; // fallback: return the original task
        }
      })
    );

    setTasks(updatedTasks);
    setShow(true);
  };

  useEffect(() => {
    showUsername();
  }, [tasks, show]);

  const handleGlobalAddTask = () => {
    setActiveComposer("Not Started");
    setComposerAtTop(true);
    setTimeout(() => {
      columnRefs.current["Not Started"]?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="mt-4 rounded-lg bg-white dark:bg-gray-900">
      <button
        onClick={handleGlobalAddTask}
        className="p-2 rounded-lg bg-black text-white mt-4 ml-4 border border-black"
      >
        + Add Task
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 grid-rows-2 gap-6 p-4">
          {["Not Started", "In Progress", "On Hold", "Completed"].map(
            (status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={(ref) => {
                      provided.innerRef(ref);
                      columnRefs.current[status] = ref;
                    }}
                    className={`rounded-lg p-4 shadow border-2 flex flex-col overflow-hidden min-h-[300px] max-h-[400px] bg-gray-100 dark:bg-gray-800 border-gray-300 ${statusColors[status]}`}
                  >
                    <h3 className="text-md font-bold mb-3 border-b pb-1">
                      <span className="mr-1">●</span>
                      {status}
                    </h3>

                    <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                      <div className="flex flex-col gap-3">
                        {activeComposer === status && composerAtTop && (
                          <div
                            ref={(ref) => (composerRefs.current[status] = ref)}
                          >
                            <InlineTaskComposer
                              status={status}
                              projectId={projectId}
                              onCreate={handleCreateTask}
                              onClose={() => setActiveComposer(null)}
                            />
                          </div>
                        )}

                        {show &&
                          getStatusColumn(status).map((task, index) => (
                            <Draggable
                              draggableId={task._id}
                              index={index}
                              key={task._id}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onClick={() => {
                                    console.log("task clicked");
                                    setSelectedTask(task);
                                    setModalOpen(true);
                                  }}
                                  className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 hover:shadow-sm transition duration-200 transform hover:scale-[1.01] cursor-pointer"
                                >
                                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                                    {task.title}
                                  </h4>
                                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <FiCalendar />
                                      {task.endDate
                                        ? new Date(
                                            task.endDate
                                          ).toLocaleDateString("en-IN", {
                                            month: "short",
                                            day: "numeric",
                                          })
                                        : "No Date"}
                                    </span>
                                    {task.priority && (
                                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        {task.priority}
                                      </span>
                                    )}
                                  </div>

                                  {task.assignee && (
                                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                                      Assigned to:
                                      {console.log(task.assignee[0] + "dfhg")}
                                      <span className="font-medium">
                                        {task.assignee}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}

                        {!composerAtTop && activeComposer === status && (
                          <div
                            ref={(ref) => (composerRefs.current[status] = ref)}
                          >
                            <InlineTaskComposer
                              status={status}
                              projectId={projectId}
                              onCreate={handleCreateTask}
                              onClose={() => setActiveComposer(null)}
                            />
                          </div>
                        )}

                        {provided.placeholder}
                      </div>
                    </div>

                    <button
                      className="mt-3 text-base text-purple-600 hover:font-semibold self-start"
                      onClick={() => handleAddTaskClick(status)}
                    >
                      + Add Task
                    </button>
                  </div>
                )}
              </Droppable>
            )
          )}
        </div>
      </DragDropContext>

      {modalOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onUpdate={(updatedTask) => {
            setTasks((prev) =>
              prev.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
              )
            );
            setModalOpen(false);
          }}
          onDelete={(taskId) => {
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectViewToggle;
