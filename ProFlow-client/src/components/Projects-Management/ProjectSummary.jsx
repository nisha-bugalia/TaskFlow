import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import ProjectShareModal from "./ProjectShareModal";

const statusOptions = ["On track", "At risk", "Off track"];

const ProjectSummarySection = ({
  description,
  dueDate,
  priority,
  status,
  onEdit,
}) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(description);
  const [projectStatus, setProjectStatus] = useState("On track");
  const [localDueDate, setLocalDueDate] = useState(new Date(dueDate));

  const [showModal, setShowModal] = useState(false);


  const handleDescSave = () => {
    setIsEditingDesc(false);
    // You can call onSave(descValue) if needed
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full bg-white dark:bg-gray-900 rounded-lg rounded-t-none   p-6 ">
      {/* Left Panel */}
      <div className="w-full md:w-2/3 space-y-6 border-r-2 border-purple-300 pr-3">
        <div>
          <p className="text-lg text-black font-semibold mb-2">
            Project description
          </p>
          {isEditingDesc ? (
            <div className="space-y-2">
              <textarea
                className="w-full border-2 border-purple-300 p-2 rounded-md text-sm resize-none dark:bg-gray-800 dark:text-white"
                rows={4}
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleDescSave}
                  className="px-3 py-1 text-sm rounded bg-black text-white hover:bg-gray-800"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingDesc(false);
                    setDescValue(description);
                  }}
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p
              className="text-gray-700 border border-purple-200 h- dark:text-gray-300 text-sm bg-purple-50 dark:bg-gray-800 px-3 py-2 rounded hover:border-purple-400 cursor-pointer"
              onClick={() => setIsEditingDesc(true)}
            >
              {descValue || "Click to add description..."}
            </p>
          )}
        </div>

        <div>
          <p className="text-lg text-black font-semibold mb-1">Project roles</p>
          <div className="flex items-center gap-3">
            <button
            onClick={()=>setShowModal(true)}
             className="border-dashed border border-purple-400 text-sm text-gray-800 px-3 py-1 rounded-full hover:bg-purple-100">
              + Add member
            </button>
            <ProjectShareModal isOpen={showModal} onClose={()=>setShowModal(false)}/>
            <div className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
              Ni
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Nisha - Project Owner
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-semibold mb-1">
            Connected Goals
          </p>
          <div className="p-3 border rounded text-gray-400 italic text-sm">
            No goals connected yet
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/3 space-y-6">
        <div>
          <p className="text-lg text-gray-500 font-semibold mb-2">
            What's the status?
          </p>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option}
                className={`px-3 py-1 text-sm rounded-full border ${
                  projectStatus === option
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setProjectStatus(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm text-gray-500 font-semibold mb-1">
              Due Date:
            </p>
            <div className="relative w-fit flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 hover:border-purple-400 text-sm">
              <FiCalendar className="text-purple-500" />
              <DatePicker
                selected={localDueDate}
                onChange={(date) => {
                  setLocalDueDate(date);
                }}
                dateFormat="MMM dd, yyyy"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummarySection;
