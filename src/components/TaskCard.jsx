import { useDrag } from "react-dnd";
import { useState } from "react";
import { Modal } from "@mui/material";
import { useTasks } from "../contexts/tasksContext";
import { TaskModal } from ".";
import { formatDate } from "../utils/formatDate";
import {
  MdOutlineAssignmentInd,
  MdOutlineDateRange,
  GiSandsOfTime,
  LuTimerReset,
  FaTrashAlt,
  FaEdit,
} from "../utils/icons";

export const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const {
    _id,
    assignee,
    name,
    priority,
    startDate,
    endDate,
    status,
    summary,
    taskType,
    effortSpent,
  } = task;

  let priorityBgColor, priorityTextColor, priorityBorderColor;

  if (priority === "High") {
    priorityBgColor = "bg-lightRed";
    priorityTextColor = "text-red";
    priorityBorderColor = "border-red";
  }
  if (priority === "Medium") {
    priorityBgColor = "bg-lightYellow";
    priorityTextColor = "text-yellow";
    priorityBorderColor = "border-yellow";
  }
  if (priority === "Low") {
    priorityBgColor = "bg-lightGreen";
    priorityTextColor = "text-green";
    priorityBorderColor = "border-green";
  }

  return (
    <div
      ref={drag}
      className={`bg-[white] dark:bg-[#1e293b] w-[17rem] p-3 mt-4 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      } hover:scale-[1.035] transition-transform`}
    >
      <div className="w-full text-[0.75rem] flex justify-between gap-4">
        <span
          className={`${priorityBgColor} ${priorityTextColor} border ${priorityBorderColor} px-1.5 py-[0.01rem] rounded`}
        >
          {priority}
        </span>
        <span className="bg-lightBlue text-blue border border-blue px-1.5 py-[0.01rem] rounded">
          {taskType}
        </span>
      </div>
      <p
        className={`text-2xl pt-3 pb-1 font-[500] ${
          status === "Done" && "line-through"
        }`}
      >
        {name}
      </p>
      <p className="py-1.5 text-sm">{summary}</p>
      <p className="text-[0.8rem] py-1.5 flex items-center justify-start gap-2">
        <MdOutlineAssignmentInd className="text-xl" title="Assignee" />{" "}
        <span className="text-sm font-[500]">{assignee}</span>
      </p>
      <p className="text-[0.8rem] py-1.5 flex items-center justify-start gap-2">
        <LuTimerReset className="text-xl" title="Effort Hours" />{" "}
        <span className="text-sm">{effortSpent} Hours needed</span>
      </p>
      <div className="flex items-center justify-between py-2">
        <p className="text-[0.8rem] flex items-center justify-start gap-1">
          <MdOutlineDateRange className="text-xl" title="Start Date" />
          <span className="text-sm">{formatDate(startDate)}</span>
        </p>
        <p className="text-[0.8rem] flex items-center justify-start gap-1">
          <GiSandsOfTime className="text-xl" title="End Date" />
          <span className="text-sm">{formatDate(endDate)}</span>
        </p>
      </div>
      <div
        className="flex items-center justify-between py-3 px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-xl text-[#2563eb] hover:text-[#1e40af]"
          onClick={() => setShowTaskModal(true)}
        >
          <FaEdit title="Edit Task" />
        </button>
        <button
          className="text-xl text-[#ef4444] hover:text-[#b91c1c]"
          onClick={() => deleteTask(_id)}
        >
          <FaTrashAlt title="Delete Task" />
        </button>
      </div>
      <Modal open={showTaskModal} onClose={() => setShowTaskModal(false)}>
        <>
          <TaskModal task={task} setShowTaskModal={setShowTaskModal} />
        </>
      </Modal>
    </div>
  );
};
