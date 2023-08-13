import { MdFilterList, BiBarChartSquare, MdOutlineClose } from "../utils/icons";
import { useState } from "react";
import { FilterTypes } from ".";
import { useTasks } from "../contexts/tasksContext";
import { actionTypes } from "../utils/constants";

export const Filters = () => {
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
      <h1 className="sm:text-xl font-[500] lg:pl-6">Tasks Board</h1>
      <div className="flex items-center justify-center gap-4">
        <button
          id="filters-button"
          className="py-1 px-3 flex items-center justify-center gap-2 bg-lightGray bg-opacity-30 rounded"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <MdFilterList className="text-xl" />
          <span>
            Filters{" "}
            {totalFiltersApplied > 0 && (
              <span className="text-[0.7rem] py-0.5 px-1.5 w-4 h-4 ml-1 bg-lightGray text-[black] rounded-full">
                {totalFiltersApplied}
              </span>
            )}
          </span>
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
        {showFilters && (
          <div className="w-[18.5rem] h-[32rem] absolute top-[3.8rem] right-4 sm:top-12 bg-[whitesmoke] text-[black] dark:bg-[#334155] dark:text-[white] rounded py-3 px-6 overflow-y-scroll">
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
        <button className="py-1 px-3 flex items-center justify-center gap-2 bg-[#6d28d9] rounded">
          <BiBarChartSquare className="text-xl" />
          <span>Metrics</span>
        </button>
      </div>
    </div>
  );
};
