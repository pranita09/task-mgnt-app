import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { initialState, tasksReducer } from "../reducers/tasksReducer";
import { actionTypes } from "../utils/constants";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { GET_TASKS, UPDATE_TASK } = actionTypes;

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://organizely-nodejs-restapi.onrender.com/tasks"
      );
      dispatch({ type: GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.post(
        `https://organizely-nodejs-restapi.onrender.com/tasks/${taskId}`,
        updatedData
      );
      dispatch({ type: UPDATE_TASK, payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://organizely-nodejs-restapi.onrender.com/tasks/${taskId}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasksBySearch = state.searchInput
    ? state.tasks.filter((task) =>
        task.name.toLowerCase().includes(state.searchInput.toLowerCase())
      )
    : state.tasks;

  const filteredTasksByDate = state.dateRadioInput
    ? filteredTasksBySearch.sort((a, b) => {
        if (state.dateRadioInput === "asc-startDate") {
          return new Date(a.startDate) - new Date(b.startDate);
        }
        if (state.dateRadioInput === "dsc-startDate") {
          return new Date(b.startDate) - new Date(a.startDate);
        }
        if (state.dateRadioInput === "asc-endDate") {
          return new Date(a.endDate) - new Date(b.endDate);
        }
        if (state.dateRadioInput === "dsc-endDate") {
          return new Date(b.endDate) - new Date(a.endDate);
        }
      })
    : filteredTasksBySearch;

  const filteredTasksByAssignee =
    state.assigneeCheckboxInput.length > 0
      ? filteredTasksByDate.filter((task) =>
          state.assigneeCheckboxInput.some(
            (assignee) => task.assignee === assignee
          )
        )
      : filteredTasksByDate;

  const filteredTasks = state.priorityRadioInput
    ? filteredTasksByAssignee.filter((task) => {
        if (state.priorityRadioInput === "High") {
          return task.priority === "High";
        }
        if (state.priorityRadioInput === "Medium") {
          return task.priority === "Medium";
        }
        if (state.priorityRadioInput === "Low") {
          return task.priority === "Low";
        }
      })
    : filteredTasksByAssignee;

  const readyTasks = filteredTasks.filter(({ status }) => status === "Ready");
  const inProgressTasks = filteredTasks.filter(
    ({ status }) => status === "In Progress"
  );
  const testingTasks = filteredTasks.filter(
    ({ status }) => status === "Testing"
  );
  const doneTasks = filteredTasks.filter(({ status }) => status === "Done");

  return (
    <TasksContext.Provider
      value={{
        state,
        dispatch,
        updateTask,
        deleteTask,
        isLoading,
        readyTasks,
        inProgressTasks,
        testingTasks,
        doneTasks,
        filteredTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
