import { actionTypes } from "../utils/constants";

const {
  GET_TASKS,
  SET_SEARCH_INPUT,
  SET_DATE_TYPE,
  SET_ASSIGNEE,
  SET_PRIORITY,
  CLEAR_FILTERS,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_NEW_TASK,
} = actionTypes;

export const initialState = {
  tasks: [],
  searchInput: "",
  dateRadioInput: "",
  assigneeCheckboxInput: [],
  priorityRadioInput: "",
};

export const tasksReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      return { ...state, tasks: payload };
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: payload };
    case SET_DATE_TYPE:
      return { ...state, dateRadioInput: payload };
    case SET_ASSIGNEE:
      return {
        ...state,
        assigneeCheckboxInput: state.assigneeCheckboxInput.includes(payload)
          ? state.assigneeCheckboxInput.filter(
              (assignee) => assignee !== payload
            )
          : [...state.assigneeCheckboxInput, payload],
      };
    case SET_PRIORITY:
      return { ...state, priorityRadioInput: payload };
    case CLEAR_FILTERS:
      return { ...initialState, tasks: payload };
    case ADD_NEW_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload._id),
      };
    default:
      return state;
  }
};
