import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTasks } from "../contexts/tasksContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const {
    state: { tasks },
  } = useTasks();

  const assigneeTaskCount = {};

  tasks.forEach((task) => {
    const assignee = task.assignee;
    if (assigneeTaskCount.hasOwnProperty(assignee)) {
      assigneeTaskCount[assignee]++;
    } else {
      assigneeTaskCount[assignee] = 1;
    }
  });

  const data = {
    labels: tasks?.reduce(
      (acc, curr) =>
        acc.includes(curr.assignee) ? acc : [...acc, curr.assignee],
      []
    ),
    datasets: [
      {
        label: "Number of Tasks",
        data: Object.values(assigneeTaskCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[30rem]">
      <Doughnut data={data} />
    </div>
  );
};
