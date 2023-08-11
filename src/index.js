import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/themeContext";
import { TasksProvider } from "./contexts/tasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ThemeProvider>
  </React.StrictMode>
);
