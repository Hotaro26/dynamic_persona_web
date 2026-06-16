import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          whileHover={{ y: -4, backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            zIndex: 999,
            padding: '16px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transition: 'color 0.2s'
          }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
