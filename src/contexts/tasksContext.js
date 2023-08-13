import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { initialState, tasksReducer } from "../reducers/tasksReducer";
import { API_KEY, actionTypes } from "../utils/constants";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { GET_TASKS } = actionTypes;

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://gcp-mock.apiwiz.io/v1/tasks", {
        headers: API_KEY,
      });
      dispatch({ type: GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTasks = state.searchInput
    ? state.tasks.filter((task) =>
        task.name.toLowerCase().includes(state.searchInput.toLowerCase())
      )
    : state.tasks;

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
        isLoading,
        readyTasks,
        inProgressTasks,
        testingTasks,
        doneTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
