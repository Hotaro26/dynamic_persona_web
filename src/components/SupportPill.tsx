import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiBuymeacoffee } from 'react-icons/si';
import { ArrowUpRight, X } from 'lucide-react';
import kofiQrCode from '../assets/kofi_qr_code.png';

export const SupportPill = ({ onOpenChange }: { onOpenChange?: (isOpen: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: '35vh',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            whileHover={{ scale: 1.05, paddingRight: '20px' }}
            onClick={() => setIsOpen(true)}
            className="cursor-target"
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              borderLeft: 'none',
              borderRadius: '0 50px 50px 0',
              padding: '16px 16px 16px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--accent)',
              boxShadow: '4px 4px 20px rgba(0,0,0,0.05)',
              transition: 'padding 0.2s ease, background 0.2s ease',
            }}
            title="Support Me"
          >
            <SiBuymeacoffee size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 24, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              left: 0,
              background: 'color-mix(in srgb, var(--bg-secondary) 80%, transparent)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '10px 10px 40px rgba(0,0,0,0.2)',
              width: '280px'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="cursor-target"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <X size={20} />
            </button>
            
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '4px' }}>Support Me</h3>
            
            <div style={{
              background: '#fff',
              padding: '12px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: '200px'
            }}>
              <img 
                src={kofiQrCode} 
                alt="Buy Me a Coffee QR Code" 
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
            
            <motion.a 
              href="https://buymeacoffee.com/oi.hotaro"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
              className="cursor-target"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px', 
                padding: '14px 24px', 
                textDecoration: 'none', 
                color: 'var(--text-primary)', 
                transition: 'all 0.2s ease', 
                borderRadius: '100px', 
                border: '1px solid var(--border-subtle)', 
                background: 'var(--bg-primary)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <SiBuymeacoffee size={18} style={{ color: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Buy Me a Coffee</span>
              <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
