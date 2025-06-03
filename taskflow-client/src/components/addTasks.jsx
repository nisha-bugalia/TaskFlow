import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { ImImage } from "react-icons/im";
import { useRef } from "react";
function AddTasks({
  isOpen,
  onClose,
  onSubmit,
  taskData,
  setTaskData,
  comments,
  addComment,
  darkMode,
}) {
  const [newComment, setNewComment] = useState("");
  const [images, setImages] = useState([]);
  const [imageAdd, setImageAdd] = useState(false);
  if (!isOpen) return null;

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const comment = {
      user: "CurrentUser",
      text: newComment.trim(),
      timestamp: Date.now(),
    };
    addComment(comment);
    setNewComment("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const DragDrop = () => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    };
    return (
      <div
        className={`fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] z-20 ${
          darkMode ? "backdrop-blur-md bg-black/60 text-white" : "backdrop-blur-md text-black"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        />
        <div
          className={`h-[50%] w-[70%] rounded-md p-2 flex flex-col gap-5 shadow-md ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="flex justify-between">
            <div className="h-1/5">Drag and Drop Here</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setImageAdd(false);
                setImages([]);
              }}
            >
              <GiCancel />
            </div>
          </div>
          <div
            className={`h-3/5 border-dotted p-2 rounded-lg border-4 flex justify-center items-center ${
              darkMode ? "border-gray-500" : "border-gray-300"
            }`}
          >
            <div className="text-7xl text-gray-500 cursor-pointer"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <BiPlus />
            </div>
          </div>
          <div className="h-1/5 p-2 flex gap-2 w-full">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="overflow-hidden w-1/12 border border-gray-300 h-full p-1 rounded-md flex items-center"
              >
                <img src={image} className="rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-10 ${
        darkMode ? "bg-black/70" : "bg-black bg-opacity-50"
      }`}
    >
      {imageAdd && <DragDrop />}

      <div
        className={`relative rounded-lg p-4 w-full max-w-3xl flex ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-1 right-1 text-xl font-bold ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
          }`}
        >
          <GiCancel />
        </button>

        {/* Form */}
        <div className="flex-1">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-semibold">
              {taskData?.id ? "Edit Task" : "Add Task"}
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <label
              className={`block my-2 text-lg w-full p-1 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Task
            </label>
            <input
              type="text"
              value={taskData?.name || ""}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
              required
            />
            <label
              htmlFor="deadline"
              className={`block my-2 text-lg w-full p-1 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={taskData?.deadline || ""}
              onChange={(e) =>
                setTaskData({ ...taskData, deadline: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <label
              htmlFor="description"
              className={`block my-2 text-lg w-full p-1 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={taskData?.description || ""}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <div
              className={`p-2 border w-fit rounded-full cursor-pointer mt-2 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-500"
                  : "bg-gray-100 hover:bg-gray-200 text-black"
              }`}
              onClick={() => {
                setImageAdd(true);
              }}
            >
              <ImImage />
            </div>

            <button
              type="submit"
              className={`bg-purple-600 text-white px-4 py-2 rounded mt-4 ${darkMode ? 'bg-purple-950 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-500'}`}            >
              {taskData?.id ? "Save Changes" : "Add Task"}
            </button>
          </form>
        </div>

        {/* Comments */}
        {taskData?.id && (
          <div
            className={`flex-1 ml-4 p-2 rounded ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h4
              className={`text-lg font-semibold mb-2 ${
                darkMode ? "text-white" : "text-purple-950"
              }`}
            >
              Comments
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={`p-2 rounded shadow ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                >
                  <p className="text-sm">{comment.text}</p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {comment.user} •{" "}
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No comments yet.
                </p>
              )}
            </div>

            <div className="mt-2 flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={`flex-1 p-2 border rounded ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                placeholder="Write a comment..."
              />
              <button
                onClick={handleAddComment}
                className={` px-4 py-2 rounded ml-2 ${darkMode ? 'bg-purple-950 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-500'}
                text-white`}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTasks;
