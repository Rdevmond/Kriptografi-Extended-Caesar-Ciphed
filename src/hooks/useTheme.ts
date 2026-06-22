import { useEffect } from 'react';

// Light theme only as requested
export const useTheme = () => {
  useEffect(() => {
    // Forcefully remove 'dark' class just in case it was cached from previous sessions
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme'); // clear any saved preferences
  }, []);

  // Always return light mode
  return { isDark: false, toggleTheme: () => {} };
};
