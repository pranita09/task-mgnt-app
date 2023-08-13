import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { FaMoon, FaSun, FiSearch } from "../utils/icons";
import { useTasks } from "../contexts/tasksContext";
import { actionTypes } from "../utils/constants";

export const Header = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const { state, dispatch } = useTasks();

  const { SET_SEARCH_INPUT } = actionTypes;

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="nav-left">
          <span className="app-name">Organizely</span>
        </div>
      </NavLink>
      <div className="nav-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={state.searchInput}
          placeholder="Search task by task name..."
          onChange={(e) =>
            dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value })
          }
        />
      </div>
      <div className="nav-right">
        <button
          className="nav-icon"
          onClick={() => setIsDarkTheme((prev) => !prev)}
        >
          <span className="text-xl">
            {isDarkTheme ? (
              <FaSun title="Light Mode" />
            ) : (
              <FaMoon title="Dark Mode" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
