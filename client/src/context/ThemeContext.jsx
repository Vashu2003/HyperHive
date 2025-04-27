import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for the theme
const ThemeContext = createContext();

// A custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default to light theme

  useEffect(() => {
    // Apply the theme to the <html> element
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");

    // Add the theme class to the <html> element
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
