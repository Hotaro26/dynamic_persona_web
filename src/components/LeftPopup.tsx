import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import sticker1 from '../assets/left-sticker-1.png';
import sticker2 from '../assets/left-sticker-2.png';
import sticker3 from '../assets/left-sticker-3.png';

const STICKERS = [sticker1, sticker2, sticker3];

const FACTS = [
  "I'm just hanging out on the left side. Don't mind me.",
  "Did you know this site was built with React and Framer Motion?",
  "Keep scrolling... the best parts are at the bottom."
];

export const LeftPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Wait for the right popup to leave (T=8.5s)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STICKERS.length);
    }, 20000); // Change image & text every 20 seconds
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{ position: 'fixed', bottom: '0px', left: '40px', zIndex: 90, display: 'flex', alignItems: 'flex-end', pointerEvents: 'none' }}>
          
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentIndex}
              src={STICKERS[currentIndex]} 
              alt="Left Guide Character" 
              initial={{ y: 300, opacity: 0, filter: 'grayscale(100%) drop-shadow(0 -10px 20px rgba(0,0,0,0.2))' }}
              animate={{ y: 0, opacity: 1, filter: 'grayscale(100%) drop-shadow(0 -10px 20px rgba(0,0,0,0.2))' }}
              exit={{ y: 300, opacity: 0 }}
              whileHover={{ scale: 1.05, filter: 'grayscale(0%) drop-shadow(0 -10px 20px rgba(0,0,0,0.2))' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100, filter: { duration: 0.3 } }}
              style={{
                width: '260px',
                objectFit: 'contain',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
            />
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            className="mono"
            style={{
              position: 'relative',
              left: '-60px',
              bottom: '160px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '16px',
              borderRadius: '24px 24px 24px 0px',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--accent)',
              fontSize: '11px',
              lineHeight: 1.5,
              maxWidth: '220px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              pointerEvents: 'auto',
              fontStyle: 'italic'
            }}
          >
            <button 
              onClick={() => setIsVisible(false)}
              style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: '50%',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {FACTS[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
