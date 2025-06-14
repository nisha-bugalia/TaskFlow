// TaskSummary.jsx
import React from "react";
import { MdOutlineAssignment } from "react-icons/md";

const cardStyles = {
  base: "flex-1 p-4 m-2 rounded-2xl shadow-sm border bg-white",
  colors: {
    total: " bg-purple-500 text-white",
    completed: "bg-green-500 text-white",
    incomplete: "bg-orange-500 text-white",
    review: "bg-pink-500 text-white",
  },
};

const TaskCard = ({ title, count, type }) => (
  <div className={`${cardStyles.base}`}>
    <div className="text-md mt-1 font-semibold">{title}</div>
    <div className="flex">
        <MdOutlineAssignment size={50} className={`${cardStyles.colors[type]} rounded-full p-2 mr-3`}/>
        <div className="flex flex-col">
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm text-gray-500">Total Project Counts</div>
        </div>
    </div>
  </div>
);

const TaskSummary = ({ data }) => {
  return (
    <div className="flex justify-between flex-wrap pt-4">
      <TaskCard title="Total Projects" count={data.total} type="total" />
      <TaskCard title="Completed Projects" count={data.completed} type="completed" />
      <TaskCard title="Incomplete Projects" count={data.incomplete} type="incomplete" />
      <TaskCard title="Under Review Projects" count={data.review} type="review" />
    </div>
  );
};

export default TaskSummary;
