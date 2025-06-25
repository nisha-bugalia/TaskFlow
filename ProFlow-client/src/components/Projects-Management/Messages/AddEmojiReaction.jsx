// AddEmojiReaction.jsx
import React, { useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react"; // ✅ Correct
import data from "@emoji-mart/data";
import { FaPlus } from "react-icons/fa";

export default function AddEmojiReaction({ messageId, onReact }) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleEmojiSelect = (emoji) => {
    onReact(messageId, emoji.native);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        className="px-2 z-[9999] py-1 bg-zinc-200 dark:bg-zinc-600 rounded hover:bg-zinc-300 dark:hover:bg-zinc-500 text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
        title="React with emoji"
      >
        <FaPlus className="text-gray-700"/>
      </button>

      {isOpen && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-[10000]">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light" // You can switch to "dark" for dark mode
            previewPosition="none"
            maxFrequentRows={3}
          />
        </div>
      )}
    </div>
  );
}
