import React, { useState,useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";

const CommentInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native);
   
  };

  return (
    <div className="relative mt-4 flex items-center gap-2" ref={pickerRef}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow border border-gray-300 rounded px-4 py-2"
      />

      {/* Emoji Toggle Button */}
      <button onClick={() => setShowPicker((v) => !v)}>
        <BsEmojiSmile size={20} />
      </button>

      {/* Emoji Picker */}
      {showPicker && (
        <div className="absolute bottom-12 z-50">
          <Picker
            data={emojiData}
            onEmojiSelect={addEmoji}
            theme="light"
            previewPosition="none"
          />
        </div>
      )}

      <button
        onClick={() => {
          if (!message.trim()) return;
          onSend(message);
          setMessage("");
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Send
      </button>
    </div>
  );
};

export default CommentInput;
