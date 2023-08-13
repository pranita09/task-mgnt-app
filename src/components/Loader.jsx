import { SpinnerCircularFixed } from "spinners-react";
import { useTheme } from "../contexts/themeContext";

export const Loader = () => {
  const { isDarkTheme } = useTheme();
  return (
    <div className="flex items-center justify-center mt-20">
      <SpinnerCircularFixed
        size={50}
        thickness={180}
        speed={136}
        color="#473699"
        secondaryColor={
          isDarkTheme ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.3)"
        }
      />
    </div>
  );
};
