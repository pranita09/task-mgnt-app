import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "./contexts/themeContext";
import { TasksProvider } from "./contexts/tasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <ThemeProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </ThemeProvider>
      </BrowserRouter>
    </DndProvider>
  </React.StrictMode>
);
