import { useTheme } from "../theme/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="absolute md:left-[96.5%] left-[90%] bg-transparent border-none text-xl text-(--primary-500) font-bold">
      {theme === "light" ? "☽︎" : "☀︎"}
    </button>
  );
};

export default ThemeToggle;