import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  { label: 'Slate', value: '#495057' },
  { label: 'Azure', value: '#228be6' },
  { label: 'Emerald', value: '#2b8a3e' },
  { label: 'Violet', value: '#7048e8' },
  { label: 'Ruby', value: '#c92a2a' },
  { label: 'Amber', value: '#e67700' },
];

export const AccentPicker = () => {
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('accent') || '#495057';
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    // Rough approximation for muted version
    document.documentElement.style.setProperty('--accent-muted', `${accent}22`);
    localStorage.setItem('accent', accent);
  }, [accent]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span className="mono hide-mobile" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>[ ACCENT ]:</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        {COLORS.map((color) => (
          <motion.button
            key={color.value}
            onClick={() => setAccent(color.value)}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '14px',
              height: '14px',
              background: color.value,
              border: accent === color.value ? '1px solid var(--text-primary)' : '1px solid transparent',
              padding: 0,
              minWidth: 'auto',
              borderRadius: '2px'
            }}
            title={color.label}
          />
        ))}
        <input 
          type="color" 
          value={accent} 
          onChange={(e) => setAccent(e.target.value)}
          style={{ 
            width: '14px', 
            height: '14px', 
            padding: 0, 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer' 
          }}
        />
      </div>
    </div>
  );
};
