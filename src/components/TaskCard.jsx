export const TaskCard = ({ task }) => {
  return (
    <div className="w-64 p-4 mt-4 shadow-md rounded-md cursor-grab">
      <h1>{task.name}</h1>
    </div>
  );
};
