import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import axios from "axios";
const InlineTaskComposer = ({ projectId, status, onCreate, onClose }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const iconRef = useRef(null);

  const composerRef = useRef();

  const [showCalendar, setShowCalendar] = useState(false);

  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  // Calculate position of calendar relative to icon
  useEffect(() => {
    if (showCalendar && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
  }, [showCalendar]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".datepicker-container") &&
        !e.target.closest(".calendar-icon")
      ) {
        setShowCalendar(false);
      }
    };
    if (showCalendar)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (composerRef.current && !composerRef.current.contains(e.target)) {
        const isEmpty = !title.trim() && !priority && !assignee && !dueDate;
        if (isEmpty) {
          onClose();
        } else {
          handleSubmit();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title, priority, assignee, dueDate]);

  const handleSubmit = () => {
    if (!title.trim()) return; // avoid adding blank title
    console.log(status);
    // ✅ send to parent
    axios
      .post("http://localhost:5000/task/create-task", {
        projectId,
        title,
        priority,
        assignee,
        endDate: dueDate,
        status,
      })
      .then((res) => {
        console.log(res.data.message);
        onCreate(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const [available, setAvailable] = useState(false);
  const [timeoutFunc, setTimeoutFunc] = useState(null);
  const check_user = (username) => {
    axios
      .get(`http://localhost:5000/user/check-username?name=${username}`)
      .then((res) => {
        console.log(res.data.available);
        if (!res.data.available) {
          setAvailable(true);
        } else {
          setAvailable(false);
        }
      });
  };
  const handleAssigne = (e) => {
    const value = e.target.value;
    console.log(value);
    if (timeoutFunc) {
      clearTimeout(timeoutFunc);
    }
    const timeout = setTimeout(() => {
      if (value.length > 2) {
        check_user(value);
      }
    }, 500);
    setTimeoutFunc(timeout);
  };
  return (
    <div
      ref={composerRef}
      className="bg-white text-black p-3 rounded-lg border border-gray-400"
    >
      <input
        type="text"
        placeholder="Write a task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-1 mb-2 rounded bg-gray-100 text-black border border-gray-200"
        autoFocus
      />
      <div className="flex gap-2 mb-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-1 rounded bg-white border border-gray-200"
        >
          <option value="">Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Assignee"
          value={assignee.toLowerCase()}
          onChange={(e) => {
            setAssignee(e.target.value);
            handleAssigne(e);
          }}
          style={{
            borderColor: available
              ? "green"
              : assignee.length > 2
              ? "red"
              : "grey",
            outline: "none",
          }}
          className="p-1 rounded bg-white border border-gray-200 w-1/2"
        />
        <div className="relative w-auto">
          <div
            className="flex items-center gap-1 cursor-pointer p-1 bg-white rounded border border-gray-200"
            onClick={() => setShowCalendar(true)}
          >
            <FiCalendar className="text-gray-600" />
            <span className="text-gray-700 text-sm">
              {dueDate ? format(dueDate, "MMMM d") : ""}
            </span>
          </div>

          {showCalendar && (
            <div
              className="datepicker-container absolute z-[9999] bg-white shadow-lg border border-gray-300 rounded"
              style={{
                top: `${calendarPosition.top}px`,
                left: `${calendarPosition.left}px`,
                position: "absolute",
              }}
            >
              <DatePicker
                selected={dueDate}
                onChange={(date) => {
                  setDueDate(date);
                  setShowCalendar(false);
                }}
                inline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlineTaskComposer;
