// NewThreadModal.jsx
import React, { useRef, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function NewThreadModal({ onClose, onSubmit }) {
  const ref = useRef();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const outside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-40">
      <div ref={ref} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">New Thread</h3>
          <FaTimes onClick={onClose} className="cursor-pointer" />
        </div>
        <input
          type="text"
          placeholder="Thread title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!title}
          onClick={() => onSubmit(title)}
        >
          Create
        </button>
      </div>
    </div>
  );
}
