"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className=" flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-right border border-gray-200 dark:border-gray-700">
      <h1 className=" text-black dark:text-white font-semibold text-lg">
        Rate Calculator
      </h1>
      <button
        className=" cursor-pointer text-black dark:text-white text-sm"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {theme === "light" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
