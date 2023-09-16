export const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const actionTypes = {
  GET_TASKS: "GET_TASKS",
  SET_SEARCH_INPUT: "SET_SEARCH_INPUT",
  SET_DATE_TYPE: "SET_DATE_TYPE",
  SET_ASSIGNEE: "SET_ASSIGNEE",
  SET_PRIORITY: "SET_PRIORITY",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  ADD_NEW_TASK: "ADD_NEW_TASK",
};
