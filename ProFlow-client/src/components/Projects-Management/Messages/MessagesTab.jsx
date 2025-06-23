// MessagesTab.jsx
import React, { useState } from "react";
import ThreadList from "./ThreadList";
import ThreadView from "./ThreadView";
import { motion } from "framer-motion";

export default function MessagesTab() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Bug in Login Screen",
      createdBy: "Nisha",
      createdAt: new Date().toISOString(),
      status: "open",
      messages: [
        {
          id: 101,
          sender: "Nisha",
          text: "Login button doesn't work on Safari.",
          timestamp: new Date().toISOString(),
          reactions: [{ emoji: "👍", count: 1 }],
        },
      ],
    },
  ]);
  const [activeId, setActiveId] = useState(1);

  const activeThread = threads.find((t) => t.id === activeId);

  return (
    <div className="flex h-full gap-4 p-4">
      <ThreadList
        threads={threads}
        activeId={activeId}
        onSelect={(id) => setActiveId(id)}
        onAdd={(newThread) =>
          setThreads((prev) => [newThread, ...prev])
        }
      />
      <ThreadView
        thread={activeThread}
        updateThread={(updated) =>
          setThreads((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t))
          )
        }
      />
    </div>
  );
}
