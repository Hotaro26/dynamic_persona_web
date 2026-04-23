import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  return (
    <motion.button 
      onClick={toggle}
      whileHover={{ scale: 1.05, background: 'var(--bg-secondary)' }}
      whileTap={{ scale: 0.95 }}
      className="mono"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: '12px',
        textTransform: 'uppercase'
      }}
    >
      {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
      <span className="hide-mobile">{theme === 'light' ? '[ MODE: DARK ]' : '[ MODE: LIGHT ]'}</span>
    </motion.button>
  );
};
