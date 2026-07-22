import { useApp } from "../store/AppStore";
import { IconMoon, IconSun } from "./icons";

export default function ThemeToggle() {
  const { state, toggleTheme } = useApp();
  const dark = state.settings.theme === "dark";
  return (
    <button className="iconbtn" aria-label="Hell/Dunkel umschalten" onClick={toggleTheme}>
      {dark ? <IconSun size={22} /> : <IconMoon size={22} />}
    </button>
  );
}
