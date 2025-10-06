"use client";
import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Theme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync with localStorage and apply theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle the theme
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border-primary bg-background backdrop-blur-md border cursor-pointer hover:bg-secondary hover:text-primary-foreground transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* Sun Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDarkMode
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        >
          <IoMdSunny
            size={25}
            className="text-background-foreground transform transition-transform duration-500"
          />
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDarkMode
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <IoMdMoon
            size={25}
            className="text-background-foreground transform transition-transform duration-500"
          />
        </div>
      </div>
    </button>
  );
};

export default Theme;
