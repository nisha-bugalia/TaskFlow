import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("private");
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (!title.trim()) return;

    const newProject = {
      title,
      visibility,
    };

    onCreate(newProject); // tells parent to add project and navigate
    setTitle("");
    setVisibility("private");

  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black bg-opacity-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-lg relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">
              Create a New Project
            </h2>

            <div className="space-y-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
              />

              <div className="flex items-center gap-4">
                <label className="text-sm text-zinc-700 dark:text-zinc-300">
                  Visibility:
                </label>
                <button
                  onClick={() =>
                    setVisibility((prev) =>
                      prev === "private" ? "public" : "private"
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    visibility === "private"
                      ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {visibility === "private" ? "Private" : "Public"}
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreate}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Create Project
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
