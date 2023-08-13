import { useDrop } from "react-dnd";
import { useTasks } from "../contexts/tasksContext";
import { TaskCard } from "./TaskCard";
import { actionTypes } from "../utils/constants";
import { toast } from "react-hot-toast";

export const ListTasks = () => {
  const { isLoading } = useTasks();
  const allStatus = ["Ready", "In Progress", "Testing", "Done"];
  return (
    <div className="p-4">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="flex items-start justify-center gap-14 flex-wrap">
          {allStatus.map((status, index) => (
            <Section key={index} status={status} />
          ))}
        </div>
      )}
    </div>
  );
};

const Section = ({ status }) => {
  const { dispatch, readyTasks, inProgressTasks, testingTasks, doneTasks } =
    useTasks();

  const { DRAG_AND_DROP_TASK } = actionTypes;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      dispatch({ type: DRAG_AND_DROP_TASK, payload: { id: item.id, status } });
      toast.success("Task status changed successfully!");
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text, borderColor, tasksToMap;

  if (status === "Ready") {
    text = "Ready";
    borderColor = "border-[#6fd6ea]";
    tasksToMap = readyTasks;
  }
  if (status === "In Progress") {
    text = "In Progress";
    borderColor = "border-[#f6bb6f]";
    tasksToMap = inProgressTasks;
  }
  if (status === "Testing") {
    text = "Testing";
    borderColor = "border-[#94a3b8]";
    tasksToMap = testingTasks;
  }
  if (status === "Done") {
    text = "Done";
    borderColor = "border-[#48944f]";
    tasksToMap = doneTasks;
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-[#e2e8f0]" : ""}`}
    >
      <div
        className={`flex items-center font-[500] justify-start gap-2 border-b-4 ${borderColor} h-10 pl-4 rounded uppercase `}
      >
        <span className="text-lg">{text}</span>
        <span className="text-[0.8rem]">({tasksToMap.length})</span>
      </div>
      {tasksToMap.length > 0 &&
        tasksToMap?.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};