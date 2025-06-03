import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { ImImage } from "react-icons/im";

function AddTasks({
  isOpen,
  onClose,
  onSubmit,
  taskData,
  setTaskData,
  comments,
  addComment,
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
    return (
      <div
        className=" fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] text-black z-20 backdrop-blur-md"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <div className=" h-[50%] bg-white shadow-md w-[70%]  rounded-md p-2 flex flex-col gap-5">
          <div className=" flex justify-between">
            <div
              className="h-1/5"
            
            >
             
              Drag and Drop Here
            </div>
            <div className=" cursor-pointer"   onClick={() => {
                setImageAdd(false);
                setImages([]);
              }}>
              {" "}
              <GiCancel></GiCancel>
            </div>
          </div>
          <div className="h-3/5  border-dotted p-2 rounded-lg border-4 flex justify-center items-center">
            <div className=" text-7xl text-gray-500">
              <BiPlus></BiPlus>
            </div>
          </div>

          <div className=" h-1/5 p-2 flex gap-2 w-[100%]">
            {images.map((image) => {
              return (
                <div className=" overflow-hidden w-1/12 border-[1px] border-gray-300 h-[100%] p-1 rounded-md  flex items-center ">
                  <img src={image} class=" rounded-md  "></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      {imageAdd && <DragDrop></DragDrop>}

      <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl flex">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-600 hover:text-black text-xl font-bold"
        >
          x
        </button>
        {/* Form */}
        <div className="flex-1">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-purple-950 text-xl font-semibold">
              {taskData?.id ? "Edit Task" : "Add Task"}
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <label className="text-black text-lg w-full p-1 block my-2">
              Task
            </label>
            <input
              type="text"
              value={taskData?.name || ""}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
              className="text-black w-full p-2 border rounded"
              required
            />
            <label
              htmlFor="deadline"
              className="text-black text-lg w-full p-1 block my-2"
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
              className="text-black w-full p-2 border rounded"
            />
            <label
              htmlFor="description"
              className="text-black text-lg w-full p-1 block my-2"
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
              className="text-black w-full p-2 border rounded"
            />
            <div
              className="text-black p-2 border-[1px] w-fit rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setImageAdd(true);
              }}
            >
              <ImImage></ImImage>
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
            >
              {taskData?.id ? "Save Changes" : "Add Task"}
            </button>
          </form>
        </div>

        {/* Comments */}
        {taskData?.id && (
          <div className="flex-1 ml-4 bg-gray-100 p-2 rounded">
            <div className="flex justify-between ">
              <h4 className="text-lg text-purple-950 font-semibold mb-2">
                Comments
              </h4>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {comments.map((comment, index) => (
                <div key={index} className="p-2 bg-white rounded shadow">
                  <p className="text-sm text-black">{comment.text}</p>
                  <p className="text-xs text-gray-600">
                    {comment.user} •{" "}
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 text-black p-2 border rounded"
                placeholder="Write a comment..."
              />
              <button
                onClick={handleAddComment}
                className="bg-purple-600 text-white px-4 py-2 rounded ml-2"
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
