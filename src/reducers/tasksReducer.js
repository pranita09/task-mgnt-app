import { actionTypes } from "../utils/constants";

const {
  GET_TASKS,
  DRAG_AND_DROP_TASK,
  SET_SEARCH_INPUT,
  SET_DATE_TYPE,
  SET_ASSIGNEE,
  SET_PRIORITY,
  CLEAR_FILTERS,
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
    case DRAG_AND_DROP_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? { ...task, status: payload.status } : task
        ),
      };
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
    default:
      return state;
  }
};
