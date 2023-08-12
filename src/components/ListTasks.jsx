import { useTasks } from "../contexts/tasksContext";
import { TaskCard } from "./TaskCard";

export const ListTasks = () => {
  const { isLoading } = useTasks();
  const allStatus = ["Ready", "In Progress", "Testing", "Done"];
  return (
    <div className="p-4">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="flex items-start justify-center gap-16 flex-wrap">
          {allStatus.map((status, index) => (
            <Section key={index} status={status} />
          ))}
        </div>
      )}
    </div>
  );
};

const Section = ({ status }) => {
  const { readyTasks, inProgressTasks, testingTasks, doneTasks } = useTasks();

  let text;
  let borderColor;
  let tasksToMap;

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
    <div className="w-64">
      <div
        className={`flex items-center justify-start gap-2 border-b-4 ${borderColor} h-12 pl-4 rounded uppercase `}
      >
        <span>{text}</span>
        <span className="text-[0.8rem]">({tasksToMap.length})</span>
      </div>
      {tasksToMap.length > 0 &&
        tasksToMap?.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};
