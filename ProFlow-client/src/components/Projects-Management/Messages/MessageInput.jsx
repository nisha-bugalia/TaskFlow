import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const send = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded-l"
        placeholder="Type your message..."
      />
      <button onClick={send} className="bg-purple-600 text-white px-4 rounded-r">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
