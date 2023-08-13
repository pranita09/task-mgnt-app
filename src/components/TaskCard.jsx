import { useDrag } from "react-dnd";
import { formatDate } from "../utils/formatDate";
import {
  MdOutlineAssignmentInd,
  MdOutlineDateRange,
  GiSandsOfTime,
} from "../utils/icons";

export const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(task);

  const {
    id,
    assignee,
    name,
    priority,
    startDate,
    endDate,
    status,
    summary,
    type,
    effortsSpent,
  } = task;

  let typeBgColor, typeTextColor, typeBorderColor;
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
      className={`w-60 p-3 mt-4 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="text-[0.75rem] flex gap-4">
        <span
          className={`${priorityBgColor} ${priorityTextColor} border ${priorityBorderColor} px-1.5 py-[0.01rem] rounded`}
        >
          {priority}
        </span>
        <span className="bg-lightBlue text-blue border border-blue px-1.5 py-[0.01rem] rounded">
          {type}
        </span>
      </div>
      <p className="text-2xl pt-3 pb-1 font-[500]">{name}</p>
      <p className="py-1.5 text-sm">{summary}</p>
      <p className="text-[0.8rem] py-1.5 flex items-center justify-start gap-2">
        <MdOutlineAssignmentInd className="text-xl" />{" "}
        <span className="text-sm font-[500]">{assignee}</span>
      </p>
      <div className="flex items-center justify-between py-2">
        <p className="text-[0.8rem] flex items-center justify-start gap-1">
          <MdOutlineDateRange className="text-xl" />
          <span className="text-sm">{formatDate(startDate)}</span>
        </p>
        <p className="text-[0.8rem] flex items-center justify-start gap-1">
          <GiSandsOfTime className="text-xl" />
          <span className="text-sm">{formatDate(endDate)}</span>
        </p>
      </div>
    </div>
  );
};
