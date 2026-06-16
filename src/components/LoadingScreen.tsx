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
import loadingSticker from '../assets/loading-sticker.png';

const ASSETS_TO_PRELOAD = [
  confirmSticker,
  contactSticker2,
  contactSticker3,
  contactSticker,
  hero,
  leftSticker1,
  leftSticker2,
  leftSticker3,
  popupSticker,
  loadingSticker
];

const LOGS = [
  "Mounting core systems...",
  "Loading stylistic assets...",
  "Initializing neural pathways...",
  "Compiling visual interface...",
  "Establishing secure connection..."
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detect OS theme and website theme automatically
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;
    
    // Ensure the cool TUI animation has time to play
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

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
      setTimeout(() => {
        onComplete();
      }, 500);
    });
  }, [onComplete]);

  useEffect(() => {
    if (progress > 20 && logIndex < 1) setLogIndex(1);
    if (progress > 40 && logIndex < 2) setLogIndex(2);
    if (progress > 60 && logIndex < 3) setLogIndex(3);
    if (progress > 80 && logIndex < 4) setLogIndex(4);
    if (progress >= 100 && logIndex < 5) setLogIndex(5);
  }, [progress, logIndex]);

  const bgColor = isDark ? '#0d0d0d' : '#f8f9fa';
  const textColor = isDark ? '#f8f9fa' : '#0d0d0d';
  const mutedColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: bgColor,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor
      }}
    >
      <motion.img 
        className="loading-sticker"
        src={loadingSticker}
        alt="Loading Character"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'absolute',
          left: '0px',
          bottom: '0px',
          height: '80vh',
          minHeight: '550px',
          objectFit: 'contain',
          objectPosition: 'bottom left',
          filter: isDark ? 'grayscale(100%)' : 'grayscale(100%) contrast(1.2)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '320px',
          padding: '24px',
          border: `1px solid ${borderColor}`,
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          zIndex: 2,
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <div className="mono" style={{ fontSize: '10px', color: mutedColor, borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <span>root@hotaro-os:~</span>
            <span>[ SYSTEM_BOOT ]</span>
          </div>

          <div className="mono" style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '120px' }}>
            {LOGS.slice(0, logIndex + 1).map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span style={{ color: 'var(--accent)', marginRight: '8px' }}>&gt;</span>
                {log}
              </motion.div>
            ))}
            {progress >= 100 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--accent)', marginTop: '8px' }}>
                ACCESS GRANTED.
              </motion.div>
            )}
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span className="mono" style={{ fontSize: '10px', color: mutedColor }}>
                PROGRESS
              </span>
              <span className="mono" style={{ fontSize: '12px', color: textColor, fontWeight: 600 }}>
                {progress}%
              </span>
            </div>
            
            <div style={{ 
              height: '2px', 
              width: '100%', 
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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
        </div>
      </div>
    </motion.div>
  );
};
