import { actionTypes } from "../utils/constants";

const { GET_TASKS } = actionTypes;

export const initialState = {
  tasks: [],
};

export const tasksReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      return { ...state, tasks: payload };
    default:
      return state;
  }
};
