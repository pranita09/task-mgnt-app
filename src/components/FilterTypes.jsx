import { useTasks } from "../contexts/tasksContext";
import { actionTypes } from "../utils/constants";

export const FilterTypes = () => {
  const {
    state: { tasks, dateRadioInput, assigneeCheckboxInput, priorityRadioInput },
    dispatch,
  } = useTasks();

  const { SET_DATE_TYPE, SET_ASSIGNEE, SET_PRIORITY } = actionTypes;

  const allAssignees = tasks?.reduce(
    (acc, curr) =>
      acc.includes(curr.assignee) ? acc : [...acc, curr.assignee],
    []
  );

  const allPriorities = tasks?.reduce(
    (acc, curr) =>
      acc.includes(curr.priority) ? acc : [...acc, curr.priority],
    []
  );

  return (
    <div className="py-2">
      <h2 className="pb-1 pt-1 border-b-2">Filter by Date</h2>
      <div className="flex flex-col items-start py-2 pb-3 gap-1 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="asc-startDate"
            checked={dateRadioInput === "asc-startDate"}
            onChange={(e) =>
              dispatch({ type: SET_DATE_TYPE, payload: e.target.value })
            }
          />
          <span>Ascending (Start Date)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="dsc-startDate"
            checked={dateRadioInput === "dsc-startDate"}
            onChange={(e) =>
              dispatch({ type: SET_DATE_TYPE, payload: e.target.value })
            }
          />
          <span>Descending (Start Date)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="asc-endDate"
            checked={dateRadioInput === "asc-endDate"}
            onChange={(e) =>
              dispatch({ type: SET_DATE_TYPE, payload: e.target.value })
            }
          />
          <span>Ascending (End Date)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="date"
            value="dsc-endDate"
            checked={dateRadioInput === "dsc-endDate"}
            onChange={(e) =>
              dispatch({ type: SET_DATE_TYPE, payload: e.target.value })
            }
          />
          <span>Descending (End Date)</span>
        </label>
      </div>
      <h2 className="py-1 pt-2 border-b-2">Filter By Assignee</h2>
      <div className="flex flex-col items-start py-2 pb-3 gap-1 text-sm">
        {allAssignees?.map((assignee, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value={assignee}
              checked={assigneeCheckboxInput.includes(assignee)}
              onChange={(e) =>
                dispatch({ type: SET_ASSIGNEE, payload: e.target.value })
              }
            />
            <span>{assignee}</span>
          </label>
        ))}
      </div>
      <h2 className="py-1 pt-2 border-b-2">Filter By Priority</h2>
      <div className="flex flex-col items-start py-2 pb-3 gap-1 text-sm">
        {allPriorities?.map((priority, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value={priority}
              checked={priorityRadioInput === priority}
              onChange={(e) =>
                dispatch({ type: SET_PRIORITY, payload: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
