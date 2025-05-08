import React, { createContext, useState, useEffect } from 'react';

// Create Context for the Theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Track the current theme state (default to light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Persist theme to localStorage and apply it on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // Update the body class based on the current theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
