import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import popupSticker from '../assets/popup-sticker.png';

const FACTS = [
  "Welcome! Take a look around and explore my projects.",
  "Bye bye! Leaving you to explore."
];

export const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), 1000); // Appear at 1s
    const t2 = setTimeout(() => setCurrentFactIndex(1), 6000); // Say bye bye at 6s
    const t3 = setTimeout(() => setIsVisible(false), 8000); // Disappear at 8s
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{ position: 'fixed', bottom: '0px', right: '40px', zIndex: 90, display: 'flex', alignItems: 'flex-end', pointerEvents: 'none' }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            className="mono"
            style={{
              position: 'relative',
              right: '-60px',
              bottom: '160px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '16px',
              borderRadius: '24px 24px 0px 24px',
              border: '1px solid var(--border-subtle)',
              borderRight: '3px solid var(--accent)',
              fontSize: '11px',
              lineHeight: 1.5,
              maxWidth: '220px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              pointerEvents: 'auto',
              fontStyle: 'italic'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFactIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {FACTS[currentFactIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.img 
            src={popupSticker} 
            alt="Guide Character" 
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
        </div>
      )}
    </AnimatePresence>
  );
};
