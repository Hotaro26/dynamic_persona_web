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
import kofiQrCode from '../assets/kofi_qr_code.png';

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
  loadingSticker,
  kofiQrCode
];


const SYSTEM_LOGS = [
  "Mounting core systems...",
  "Loading stylistic assets...",
  "Initializing neural pathways...",
  "Compiling visual interface...",
  "Establishing secure connection...",
  "Allocating memory arrays...",
  "Bypassing security protocols...",
  "Loading localized string tables...",
  "Connecting to distributed node...",
  "Decrypting payload chunks...",
  "Generating terrain mesh...",
  "Executing startup script...",
  "Fetching remote dependencies...",
  "Verifying checksums...",
  "Syncing with temporal database..."
];

const ASCII_TEXT = `WELCOME                 TO               THE


  _   _  ___ _____  _    ____   ___  
 | | | |/ _ \\_   _|/ \\  |  _ \\ / _ \\ 
 | |_| | | | || | / _ \\ | |_) | | | |
 |  _  | |_| || |/ ___ \\|  _ <| |_| |
 |_| |_|\\___/ |_/_/   \\_\\_| \\_\\\\___/`;

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const [backgroundLogs, setBackgroundLogs] = useState<string[]>([]);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;
    
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 3500));

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

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 2; // Type 2 chars at a time
      if (index >= ASCII_TEXT.length) {
        setDisplayedText(ASCII_TEXT);
        setIsDoneTyping(true);
        clearInterval(interval);
      } else {
        setDisplayedText(ASCII_TEXT.substring(0, index));
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  
  // Background logs effect
  useEffect(() => {
    if (!isDoneTyping) return;
    
    const logInterval = setInterval(() => {
      const randomLog = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)];
      const hexAddr = '0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0');
      
      setBackgroundLogs(prev => {
        const newLogs = [...prev, `[${hexAddr}] ${randomLog} [OK]`];
        return newLogs.slice(-6); // Keep last 6 logs
      });
    }, 150);
    
    return () => clearInterval(logInterval);
  }, [isDoneTyping]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const bgColor = isDark ? '#0d0d0d' : '#f8f9fa';
  const textColor = isDark ? '#f8f9fa' : '#0d0d0d';
  

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

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', zIndex: 2 }}>
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <pre className="mono" style={{ 
            fontSize: 'clamp(14px, 2vw, 20px)', 
            color: textColor, 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            textAlign: 'left',
            lineHeight: '1.2',
            textShadow: isDark ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
            maxWidth: '100vw',
            overflow: 'hidden'
          }}>
            {displayedText}
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>█</span>
          </pre>
          
          <div style={{ 
            marginTop: '32px', 
            width: '100%', 
            maxWidth: '400px',
            opacity: isDoneTyping ? 1 : 0,
            transition: 'opacity 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div className="mono" style={{ fontSize: '12px', color: textColor, marginBottom: '8px' }}>
              [ LOADING... {progress}% ]
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

            <div style={{
              marginTop: '16px',
              width: '100%',
              height: '80px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              opacity: isDark ? 0.6 : 0.4
            }}>
              {backgroundLogs.map((log, i) => (
                <motion.div
                  key={i + log}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mono"
                  style={{ fontSize: '10px', color: textColor, marginBottom: '2px', textAlign: 'left', width: '100%' }}
                >
                  {log}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};
