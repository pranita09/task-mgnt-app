import { BarChart, BubbleChart, DoughnutChart, PieChart } from "../charts";
import { Filters, Loader } from "../components";
import { useTasks } from "../contexts/tasksContext";

export const TaskMetrics = () => {
  const { isLoading } = useTasks();
  return (
    <div>
      <Filters title={"Metrics"} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center gap-8 flex-wrap p-6">
          <BarChart />
          <BubbleChart />
          <DoughnutChart />
          <PieChart />
        </div>
      )}
    </div>
  );
};
