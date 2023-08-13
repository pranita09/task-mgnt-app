import { Filters, ListTasks } from "../components";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Filters title={"Board"} />
      <ListTasks />
    </div>
  );
};
