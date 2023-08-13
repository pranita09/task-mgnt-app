import { DoughnutChart } from "../charts";
import { Filters } from "../components";

export const TaskMetrics = () => {
  return (
    <div>
      <Filters title={"Metrics"} />
      <div className="flex items-center justify-center gap-6 flex-wrap p-4">
        <DoughnutChart />
      </div>
    </div>
  );
};
