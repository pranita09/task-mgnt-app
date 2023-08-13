import { actionTypes } from "../utils/constants";

const { GET_TASKS, DRAG_AND_DROP_TASK } = actionTypes;

export const initialState = {
  tasks: [],
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
    default:
      return state;
  }
};
