import React from "react";
import { MdOutlineAssignment } from "react-icons/md";

const cardStyles = {
  base: "flex-1 p-4 m-2 rounded-2xl shadow-sm border bg-white",
  colors: {
    total: "bg-purple-500 text-white",
    notStarted: "bg-yellow-500 text-white",
    inProgress: "bg-blue-500 text-white",
    onHold: "bg-orange-500 text-white",
    completed: "bg-green-500 text-white",
  },
};

const TaskCard = ({ title, count, type }) => (
  <div className={`${cardStyles.base}`}>
    <div className="text-md mt-1 font-semibold">{title}</div>
    <div className="flex items-center">
      <MdOutlineAssignment
        size={50}
        className={`${cardStyles.colors[type]} rounded-full p-2 mr-3`}
      />
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{count}</div>
        <div className="text-sm text-gray-500">Total Task Count</div>
      </div>
    </div>
  </div>
);

const TaskSummary = ({ data }) => {
  return (
    <div className="flex justify-between flex-wrap pt-4">
      <TaskCard title="Total Tasks" count={data.total} type="total" />
      <TaskCard title="Not Started" count={data.notStarted} type="notStarted" />
      <TaskCard title="In Progress" count={data.inProgress} type="inProgress" />
      <TaskCard title="On Hold" count={data.onHold} type="onHold" />
      <TaskCard title="Completed" count={data.completed} type="completed" />
    </div>
  );
};

export default TaskSummary;
