import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTasks } from "../contexts/tasksContext";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const BubbleChart = () => {
  const {
    state: { tasks },
  } = useTasks();

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dataPoints = tasks?.map((task, index) => ({
    x: index + 1,
    y: task.effortSpent,
    r: 5,
  }));

  const data = {
    datasets: [
      {
        label: "Task Dataset (X: Task Number, Y: Efforts needed in Hours)",
        data: dataPoints,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-[19rem] sm:w-[30rem] bg-[white] dark:bg-[#cbd5e1] dark:text-[black] p-4 rounded">
      <h1 className="text-lg py-4 text-center">
        <span className="font-[500]">Efforts vs Task </span>
        <span className="text-sm">(Bubble Chart)</span>
      </h1>
      <Bubble options={options} data={data} />
    </div>
  );
};
