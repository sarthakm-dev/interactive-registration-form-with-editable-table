import { useUIStore } from "../../store/useUIStore";

const ThemeToggle = () => {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? '☀︎' : '☽︎'}
    </button>
  );
};

export default ThemeToggle;