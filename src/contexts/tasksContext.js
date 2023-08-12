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

  // console.log(state.tasks);
  // console.log(
  //   state.tasks.reduce(
  //     (acc, curr) =>
  //       acc.includes(curr.priority) ? acc : [...acc, curr.priority],
  //     []
  //   )
  // );
  // console.log(
  //   state.tasks.reduce(
  //     (acc, curr) => (acc.includes(curr.status) ? acc : [...acc, curr.status]),
  //     []
  //   )
  // );

  const readyTasks = state.tasks.filter(({ status }) => status === "Ready");
  const inProgressTasks = state.tasks.filter(
    ({ status }) => status === "In Progress"
  );
  const testingTasks = state.tasks.filter(({ status }) => status === "Testing");
  const doneTasks = state.tasks.filter(({ status }) => status === "Done");

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
