import React, { useRef, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { CgMoreVertical } from "react-icons/cg";
import moment from "moment"

const Task = ({ task }) => {
  return (
    <div className=" flex p-2 bg-white rounded-lg justify-between text-black  items-center h-[4rem]  overflow-hidden cursor-pointer hover:border-[2px] hover:border-purple-400 border-purple-200 border-2 ">
      <div className="flex items-center gap-2 w-1/2">
        <div className=" justify-center items-center flex w-3 h-3  rounded-full "></div>
        <div className=" w-4 h-4 border-2 rounded-full"></div>
        <div>{task.title}</div>
      </div>

      <div className=" flex justify-between w-1/2">
        <div className=" flex items-center justify-center gap-2 text-gray-500">
          <div className=" opacity-80">|</div>
          <div className="flex">
            <BiCalendar className=" text-xl"></BiCalendar>
            <span>{moment(task.dueDate).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <div>
          <CgMoreVertical></CgMoreVertical>
        </div>
      </div>
    </div>
  );
};

function TaskList({ tasks, setTasks }) {
  const container = useRef(null);
  const item = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleMouseDown = (e, index) => {
    document.removeEventListener("mouseup", handleMouseUp);
    e.preventDefault();
    setDraggingIndex(index);
    console.log(index);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const childPos = e.clientY; // in pixels
    const ParentPos = container.current.getBoundingClientRect().top; // in pixels

    const offsetY =
      (childPos - ParentPos) /
      parseFloat(getComputedStyle(document.documentElement).fontSize); //in rem
    item.current.style.top = offsetY.toString() + "rem";
    item.current.style.position = "absolute";
    item.current.style.zIndex = 100;
    item.current.style.width = 100;
    item.current.style.border = "2px solid #c203fc";
    item.current.style.borderRadius = "10px";
    let index = Math.floor(offsetY / 4);
    console.log(index);
    if (index < 0) {
      index = 0;
    }
    if (index >= tasks.length) {
      index = tasks.length - 1;
    }
    setDraggedIndex(index);
  };

  const handleMouseUp = () => {
    if (draggedIndex !== null && draggingIndex !== null) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const array = [...tasks];
      const draggedItem = array.splice(draggingIndex, 1)[0];
      array.splice(draggedIndex, 0, draggedItem);
      setTasks(array);
      item.current.style.top = "";
      item.current.style.position = "relative";
      item.current.style.zIndex = "";
      item.current.style.border = "";

      item.current = null;

      setDraggedIndex(null);
      setDraggingIndex(null);
    }
  };

  return (
    <div className=" bg-white  flex flex-col rounded-2xl p-3 text-black">
      <div className=" text-[1.3rem] p-5 pl-0 font-semibold ">Tasks List</div>
      <div ref={container} className=" relative w-[40rem ] ">
        {tasks.map((x, index) => (
          <div
            key={x.id}
            onMouseDown={(e) => handleMouseDown(e, index)}
            className="mb-2 w-full "
            ref={draggingIndex === index ? item : null}
          >
            <Task task={x} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;