"use client";

import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
      <img
        src={theme === 'light' ? '/moon.svg' : '/sun.svg'}
        alt={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        style={{ width: '24px', height: '24px' }}
      />
    </button>
  );
};

export default ThemeToggle;
