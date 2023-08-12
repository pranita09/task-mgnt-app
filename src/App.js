import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, TaskMetrics } from "./pages";
import { Header, ToastWrapper } from "./components";

function App() {
  return (
    <div className={`App dark:bg-slate-900 dark:text-white`}>
      <Header />
      <ToastWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-metrics" ekement={<TaskMetrics />} />
      </Routes>
    </div>
  );
}

export default App;
