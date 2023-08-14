import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/tasksContext";
import { FilterTypes } from ".";
import { actionTypes } from "../utils/constants";
import {
  MdFilterList,
  BiBarChartSquare,
  MdOutlineClose,
  MdOutlineDashboard,
} from "../utils/icons";

export const Filters = ({ title }) => {
  const navigate = useNavigate();
  const {
    state: { tasks, dateRadioInput, priorityRadioInput, assigneeCheckboxInput },
    dispatch,
  } = useTasks();

  const [showFilters, setShowFilters] = useState(false);

  const { CLEAR_FILTERS } = actionTypes;

  const totalFiltersApplied =
    (dateRadioInput ? 1 : 0) +
    (priorityRadioInput ? 1 : 0) +
    (assigneeCheckboxInput.length > 0 ? assigneeCheckboxInput.length : 0);

  return (
    <div className="relative w-full bg-[#624a95] text-[white] py-3 px-8 xl:px-10 flex items-center justify-between gap-2">
      <h1 className="sm:text-xl font-[500] lg:pl-6">Tasks {title}</h1>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {title === "Board" && (
          <button
            id="filters-button"
            className="py-1 px-3 flex items-center justify-center gap-2 bg-lightGray bg-opacity-30 rounded hover:opacity-80"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <MdFilterList className="text-xl" />
            <div className="flex gap-2 justify-center items-center">
              <span className="hidden sm:block">Filters</span>
              {totalFiltersApplied > 0 && (
                <span className="text-[0.6rem] flex items-center justify-center w-4 h-4 bg-lightGray text-[black] rounded-full">
                  {totalFiltersApplied}
                </span>
              )}
            </div>
            {totalFiltersApplied > 0 && (
              <span
                className="hover:bg-lightGray hover:text-[black]"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: CLEAR_FILTERS, payload: tasks });
                  setShowFilters(false);
                }}
              >
                <MdOutlineClose className="text-xl" title="Clear Filters" />
              </span>
            )}
          </button>
        )}
        {showFilters && (
          <div className="filters w-[18.5rem] h-[32rem] absolute top-[3.8rem] right-4 sm:top-12 bg-[whitesmoke] text-[black] dark:bg-[#334155] dark:text-[white] rounded py-3 px-6 overflow-y-scroll">
            <div className="flex items-center justify-between py-2">
              <h1 className="text-lg uppercase">Filters</h1>
              <span
                className="cursor-pointer p-1 hover:bg-lightGray rounded-full"
                onClick={() => setShowFilters(false)}
              >
                <MdOutlineClose
                  className="text-xl hover:dark:text-[black]"
                  title="Close"
                />
              </span>
            </div>
            <FilterTypes />
          </div>
        )}
        {title === "Board" ? (
          <button
            className="py-1 px-3 flex items-center justify-center gap-2 bg-[#6d28d9] rounded hover:opacity-80"
            onClick={() => navigate("/task-metrics")}
          >
            <BiBarChartSquare className="text-xl" />
            <span className="hidden sm:block">Metrics</span>
          </button>
        ) : (
          <button
            className="py-1 px-3 flex items-center justify-center gap-2 bg-[#6d28d9] rounded hover:opacity-80"
            onClick={() => navigate("/")}
          >
            <MdOutlineDashboard className="text-xl" />
            <span className="hidden sm:block">Tasks Board</span>
          </button>
        )}
      </div>
    </div>
  );
};
