import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import promptSticker from '../assets/left-sticker-2.png';

interface AboutPromptProps {
  onExplore: () => void;
  stickersEnabled: boolean;
  currentView: string;
}

const DIALOGUES = [
  "Oh, you made it all the way down here! Curious about the dev behind this layout?",
  "... (She is too nervous to speak, but really wants you to click the button below.)",
  "H-hello... I think you should read the About Me section. It's really interesting!",
  "If you explore the profile page, we might become friends...?",
  "... (She is writing on a notebook: 'Hotaro is a great developer. Please click!')",
  "U-um... the button will take you to the profile page. I-if that's okay with you..."
];

export const AboutPrompt: React.FC<AboutPromptProps> = ({ onExplore, stickersEnabled, currentView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(DIALOGUES[0]);

  useEffect(() => {
    if (currentView !== 'home') {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const threshold = 350; // Trigger when within 350px of bottom
      const totalHeight = document.documentElement.scrollHeight;
      const visibleHeight = window.innerHeight;
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      const isNearBottom = totalHeight - (scrollPos + visibleHeight) < threshold;
      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * DIALOGUES.length);
      setCurrentDialogue(DIALOGUES[randomIndex]);
    }
  }, [isVisible]);

  if (currentView !== 'home' || !stickersEnabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="about-prompt-container"
          style={{ 
            position: 'fixed', 
            bottom: '0px', 
            right: '40px', 
            zIndex: 90, 
            display: 'flex', 
            alignItems: 'flex-end', 
            pointerEvents: 'none' 
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
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
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ fontStyle: 'italic' }}>
              "{currentDialogue}"
            </div>
            <motion.button
              onClick={onExplore}
              whileHover={{ y: -2, backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                width: '100%'
              }}
            >
              <Sparkles size={10} /> Explore About Me <ArrowRight size={10} />
            </motion.button>
          </motion.div>

          <motion.img 
            src={promptSticker} 
            alt="About Prompt Character" 
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
            onClick={onExplore}
          />

          <style>{`
            @media (max-width: 768px) {
              .about-prompt-container {
                display: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};
