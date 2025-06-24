import React, { useState, useRef, useEffect } from "react";
import CommentInput from "./CommentInput";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaRedo } from "react-icons/fa";
import AddEmojiReaction from "./AddEmojiReaction";

export default function ThreadView({ thread, updateThread }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [thread]);

  function addComment(text) {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text,
      timestamp: new Date().toISOString(),
      reactions: [],
    };
    updateThread({ ...thread, messages: [...thread.messages, newMessage] });
  }

  function toggleReaction(messageId, emoji) {
    const messages = thread.messages.map((m) => {
      if (m.id !== messageId) return m;
      const existing = m.reactions.find((r) => r.emoji === emoji);
      if (existing) {
        existing.count++;
      } else {
        m.reactions.push({ emoji, count: 1 });
      }
      return m;
    });
    updateThread({ ...thread, messages });
  }

  return (
    <motion.div className="flex-1 flex flex-col border-l border-gray-200 bg-white dark:bg-zinc-900 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
            {thread.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            by {thread.createdBy} • {dayjs(thread.createdAt).format("MMM D, YYYY")}
          </p>
        </div>
        <div>
          {thread.status === "open" ? (
            <button
              onClick={() => updateThread({ ...thread, status: "resolved" })}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm flex items-center gap-2"
            >
              <FaCheck /> Resolve
            </button>
          ) : (
            <button
              onClick={() => updateThread({ ...thread, status: "open" })}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm flex items-center gap-2"
            >
              <FaRedo /> Re-open
            </button>
          )}
        </div>
      </div>

      {/* Message List */}
      <div ref={ref} className="flex-1 overflow-y-visible space-y-4 mb-4">
        <AnimatePresence>
          {thread.messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-zinc-800 dark:text-white">
                  {m.sender}
                </span>
                <span className="text-xs text-zinc-500">
                  {dayjs(m.timestamp).format("MMM D, YYYY h:mm A")}
                </span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300">{m.text}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {m.reactions.map((r) => (
                  <button
                    key={r.emoji}
                    className="px-2 py-1 flex items-center gap-1 bg-zinc-200 dark:bg-zinc-700 rounded text-black dark:text-white"
                    onClick={() => toggleReaction(m.id, r.emoji)}
                  >
                    {r.emoji} {r.count}
                  </button>
                ))}
                <AddEmojiReaction messageId={m.id} onReact={toggleReaction} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <CommentInput onSend={addComment} />
    </motion.div>
  );
}
