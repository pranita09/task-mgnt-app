import { useState } from "react";
import { styles } from "../utils/constants";
import { useTasks } from "../contexts/tasksContext";
import toast from "react-hot-toast";

export const TaskModal = ({ task, setShowTaskModal }) => {
  const { addNewTask, updateTask } = useTasks();
  const initialTaskInputs = {
    name: "",
    summary: "",
    assignee: "",
    effortSpent: 1,
    startDate: "",
    endDate: "",
    priority: "Low",
    taskType: "",
  };
  const [taskInputs, setTaskInputs] = useState(task || initialTaskInputs);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask(task._id, taskInputs);
      toast.success("Task is updated successfully!");
    } else {
      addNewTask({ ...taskInputs, status: "Ready" });
    }
    setTaskInputs(initialTaskInputs);
    setShowTaskModal(false);
  };

  return (
    <div
      style={styles}
      className="w-[29rem] p-4 bg-lightGray dark:bg-blackColor dark:text-[white] rounded"
    >
      <h1 className="text-xl font-[500] text-center py-1">
        {task ? "Update the Task" : "Add New Task"}
      </h1>
      <form
        className="py-5 px-2 flex flex-col gap-3"
        onSubmit={handleFormSubmit}
      >
        <label>
          <span>Name</span>
          <input
            type="text"
            placeholder="Documentation"
            value={taskInputs.name}
            className="dark:text-[black] dark:bg-lightGray"
            onChange={(e) =>
              setTaskInputs({ ...taskInputs, name: e.target.value })
            }
            required
          />
        </label>
        <label>
          <span>Summary</span>
          <input
            type="text"
            placeholder="Short summary of task"
            value={taskInputs.summary}
            className="dark:text-[black] dark:bg-lightGray"
            onChange={(e) =>
              setTaskInputs({ ...taskInputs, summary: e.target.value })
            }
            required
          />
        </label>
        <div>
          <label>
            <span>Assignee</span>
            <input
              type="text"
              placeholder="John Doe"
              value={taskInputs.assignee}
              className="dark:text-[black] dark:bg-lightGray"
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, assignee: e.target.value })
              }
              required
            />
          </label>
          <label>
            <span>Efforts Spent (in hrs)</span>
            <input
              type="number"
              placeholder="10"
              min="1"
              value={taskInputs.effortSpent}
              className="dark:text-[black] dark:bg-lightGray"
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, effortSpent: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Start Date</span>
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={taskInputs.startDate}
              className="dark:text-[black] dark:bg-lightGray"
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, startDate: e.target.value })
              }
              required
            />
          </label>
          <label>
            <span>End Date</span>
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={taskInputs.endDate}
              className="dark:text-[black] dark:bg-lightGray"
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, endDate: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Priority</span>
            <select
              className="dark:text-[black] dark:bg-lightGray"
              value={taskInputs.priority}
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, priority: e.target.value })
              }
              required
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
          <label>
            <span>Task Type</span>
            <input
              type="text"
              placeholder="Design"
              value={taskInputs.taskType}
              className="dark:text-[black] dark:bg-lightGray"
              onChange={(e) =>
                setTaskInputs({ ...taskInputs, taskType: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div className="action-btns">
          <button
            type="submit"
            className="py-1 px-6 rounded border border-[#473699] bg-[#473699] text-[white]"
          >
            {task ? "Save" : "Add"}
          </button>
          <button
            className="py-1 px-6 border rounded"
            onClick={() => {
              setShowTaskModal(false);
              setTaskInputs(initialTaskInputs);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
