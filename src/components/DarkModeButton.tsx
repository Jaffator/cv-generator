import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  function updateBodyClass(isDarkMode: boolean) {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    setIsDark(isDarkMode);
  }

  return (
    <button
      onClick={() => updateBodyClass(!isDark)}
      className="
        relative flex items-center justify-center 
        w-12 h-10 rounded-xl transition-all duration-300
        bg-black/10 dark:bg-white/10
        hover:scale-110 active:scale-95
        backdrop-blur-xl border border-white/20 dark:border-black/20
      "
    >
      {isDark ? (
        <Moon className="text-yellow-200 w-4 h-4 transition-all duration-300" />
      ) : (
        <Sun className="text-yellow-500 w-4 h-4 transition-all duration-300" />
      )}
    </button>
  );
}
