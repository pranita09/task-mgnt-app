import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTasks } from "../contexts/tasksContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const {
    state: { tasks },
  } = useTasks();

  const priorityWiseTaskCount = {};

  tasks.forEach((task) => {
    const priority = task.priority;
    if (priorityWiseTaskCount.hasOwnProperty(priority)) {
      priorityWiseTaskCount[priority]++;
    } else {
      priorityWiseTaskCount[priority] = 1;
    }
  });

  const data = {
    labels: tasks?.reduce(
      (acc, curr) =>
        acc.includes(curr.priority) ? acc : [...acc, curr.priority],
      []
    ),
    datasets: [
      {
        label: "Number of Tasks",
        data: Object.values(priorityWiseTaskCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[19rem] sm:w-[30rem] bg-[white] dark:bg-[#cbd5e1] dark:text-[black] p-4 rounded">
      <h1 className="text-lg py-4 text-center">
        <span className="font-[500]">Priority wise Tasks Count </span>
        <span className="text-sm">(Pie Chart)</span>
      </h1>
      <Pie data={data} />
    </div>
  );
};
