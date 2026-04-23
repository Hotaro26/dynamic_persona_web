import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const TerminalToggle = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('terminal-bg') === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('terminal-bg', String(enabled));
    // Dispatch a custom event to notify App.tsx
    window.dispatchEvent(new CustomEvent('terminal-bg-change', { detail: enabled }));
  }, [enabled]);

  return (
    <motion.button 
      onClick={() => {
        const nextState = !enabled;
        setEnabled(nextState);
        localStorage.setItem('terminal-bg', String(nextState));
        window.location.reload();
      }}
      whileHover={{ scale: 1.05, background: 'var(--bg-secondary)' }}
      whileTap={{ scale: 0.95 }}
      className="mono"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: '12px',
        textTransform: 'uppercase',
        color: enabled ? 'var(--accent)' : 'var(--text-primary)',
        borderColor: enabled ? 'var(--accent)' : 'var(--border-strong)'
      }}
    >
      <Terminal size={14} />
      <span className="hide-mobile">{enabled ? '[ BG: ON ]' : '[ BG: OFF ]'}</span>
    </motion.button>
  );
};
