import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskDetailModal from "./TaskDetailModal";
import axios from "axios";

const localizer = momentLocalizer(moment);

const ProjectCalendar = ({ tasks = [] }) => {
  const [enrichedTasks, setEnrichedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      const enriched = await Promise.all(
        tasks.map(async (task) => {
          try {
            const res = await axios.get(`http://localhost:5000/user/get-user?id=${task.assignee}`);
            return { ...task, assignee: res.data.user.username };
          } catch (error) {
            console.error("Error fetching user:", error);
            return { ...task, assignee: "Unknown" };
          }
        })
      );
      setEnrichedTasks(enriched);
    };

    fetchUsernames();
  }, [tasks]);

  const events = enrichedTasks
    .filter((task) => task.endDate)
    .map((task) => ({
      title: task.title,
      start: new Date(task.endDate),
      end: new Date(task.endDate),
      allDay: true,
      resource: task,
    }));

  return (
    <div className="h-[70vh] mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={(event) => {
          setSelectedTask(event.resource);
          setModalOpen(true);
        }}
        eventPropGetter={() => ({
          className:
            "bg-purple-500 text-white px-2 py-1 rounded shadow hover:opacity-90",
        })}
        messages={{
          today: "Today",
          previous: "<",
          next: ">",
          month: "Month",
          week: "Week",
          day: "Day",
          agenda: "Tasks",
        }}
      />

      {modalOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onUpdate={(updatedTask) => {
            const updated = enrichedTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            );
            setEnrichedTasks(updated);
            setModalOpen(false);
          }}
          onDelete={(taskId) => {
            setEnrichedTasks((prev) => prev.filter((task) => task._id !== taskId));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectCalendar;
