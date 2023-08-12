import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/themeContext";
import { TasksProvider } from "./contexts/tasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
