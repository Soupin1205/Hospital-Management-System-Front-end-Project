import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
      <div className="toggle-track">
        <span className="material-symbols-outlined toggle-icon sun">light_mode</span>
        <div className={`toggle-thumb ${isDark ? 'dark' : 'light'}`}></div>
        <span className="material-symbols-outlined toggle-icon moon">dark_mode</span>
      </div>
    </button>
  );
};

export default ThemeToggle;