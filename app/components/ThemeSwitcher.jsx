"use client";

import { useTheme } from "next-themes";



const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div className="absolute top-5 right-5 w-6 h-6 text-yellow-500 " role="button" onClick={() =>
          setTheme('light')} >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
          </div>
      );
    } else {
      return (
        <div className="absolute top-5 right-5 w-6 h-6 text-gray-900 " role="button" onClick={() =>
          setTheme('dark')} >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>
          </div>
      );
    }
  };

  return (
    <>
      {renderThemeChanger()}
    </>
  );
};

export default ThemeSwitcher;