import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { FaMoon, FaSun, FiSearch } from "../utils/icons";

export const Header = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="nav-left">
          <span className="app-name">Organizely</span>
        </div>
      </NavLink>
      <div className="nav-search">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search task by task name..." />
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
