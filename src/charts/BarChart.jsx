import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTasks } from "../contexts/tasksContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const {
    state: { tasks },
  } = useTasks();

  const statusWiseTaskCount = {};

  tasks.forEach((task) => {
    const status = task.status;
    if (statusWiseTaskCount.hasOwnProperty(status)) {
      statusWiseTaskCount[status]++;
    } else {
      statusWiseTaskCount[status] = 1;
    }
  });

  const data = {
    labels: tasks?.reduce(
      (acc, curr) => (acc.includes(curr.status) ? acc : [...acc, curr.status]),
      []
    ),
    datasets: [
      {
        label: "Number of Tasks",
        data: Object.values(statusWiseTaskCount),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
  };

  return (
    <div className="w-[19rem] sm:w-[30rem] bg-[white] dark:bg-[#cbd5e1] dark:text-[black] p-4 rounded">
      <h1 className="text-lg py-4 text-center">
        <span className="font-[500]">Status wise Tasks Count </span>
        <span className="text-sm">(Bar Chart)</span>
      </h1>
      <Bar options={options} data={data} />
    </div>
  );
};
