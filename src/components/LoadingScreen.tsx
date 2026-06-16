import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import confirmSticker from '../assets/confirm-sticker.png';
import contactSticker2 from '../assets/contact-sticker-2.png';
import contactSticker3 from '../assets/contact-sticker-3.png';
import contactSticker from '../assets/contact-sticker.png';
import hero from '../assets/hero.png';
import leftSticker1 from '../assets/left-sticker-1.png';
import leftSticker2 from '../assets/left-sticker-2.png';
import leftSticker3 from '../assets/left-sticker-3.png';
import popupSticker from '../assets/popup-sticker.png';

const ASSETS_TO_PRELOAD = [
  confirmSticker,
  contactSticker2,
  contactSticker3,
  contactSticker,
  hero,
  leftSticker1,
  leftSticker2,
  leftSticker3,
  popupSticker
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;
    
    // Enforce a minimum load time so the screen isn't just a flash
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));

    const loadImages = Promise.all(
      ASSETS_TO_PRELOAD.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            setProgress(Math.floor((loadedCount / totalAssets) * 100));
            resolve(img);
          };
          img.onerror = () => {
            loadedCount++;
            setProgress(Math.floor((loadedCount / totalAssets) * 100));
            resolve(img);
          };
        });
      })
    );

    Promise.all([loadImages, minLoadTime]).then(() => {
      // Let the 100% render briefly before completing
      setTimeout(() => {
        onComplete();
      }, 400);
    });
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            [ SYSTEM: INITIALIZING ]
          </span>
          <span className="mono" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
            {progress}%
          </span>
        </div>
        
        <div style={{ 
          height: '2px', 
          width: '100%', 
          background: 'var(--bg-secondary)', 
          overflow: 'hidden',
          borderRadius: '2px'
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{
              height: '100%',
              background: 'var(--accent)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
