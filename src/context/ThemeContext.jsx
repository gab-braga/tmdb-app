import React from 'react';

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = React.useState(true);

  function toggleTheme() {
    setDarkMode(!darkMode);
    handleChangeTheme(!darkMode);
  }

  function handleChangeTheme(darkMode) {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
