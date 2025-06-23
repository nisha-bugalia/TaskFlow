// ThreadList.jsx
import React from "react";
import { motion } from "framer-motion";
import NewThreadModal from "./NewThreadModal";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";

export default function ThreadList({ threads, activeId, onSelect, onAdd }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="w-1/3 max-w-sm rounded-lg flex flex-col border-r p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Threads</h2>
        <FiPlus
          onClick={() => setShowModal(true)}
          className="cursor-pointer text-xl text-purple-600 hover:text-purple-800"
        />
      </div>
      {showModal && (
        <NewThreadModal
          onClose={() => setShowModal(false)}
          onSubmit={(title) => {
            onAdd({
              id: Date.now(),
              title,
              createdBy: "You",
              createdAt: new Date().toISOString(),
              status: "open",
              messages: [],
            });
            setShowModal(false);
          }}
        />
      )}
      <div className="mt-4 overflow-y-auto">
        {threads.map((t) => (
          <motion.div
            key={t.id}
            layout
            onClick={() => onSelect(t.id)}
            className={`p-2 rounded cursor-pointer ${
              t.id === activeId
                ? "bg-purple-100 border border-purple-300"
                : "hover:bg-gray-100"
            }`}
          >
            <p className="font-medium">{t.title}</p>
            <p className="text-xs text-gray-500">
              {t.createdBy} • {dayjs(t.createdAt).fromNow()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
