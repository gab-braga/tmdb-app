import React from 'react';

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = React.useState(true);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  React.useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
