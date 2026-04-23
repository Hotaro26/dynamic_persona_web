import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from '../components/BlurText';
import DecryptedText from '../components/DecryptedText';

const ROLES = ['An Artist.', 'A Student.', 'A Nerd.', 'Building & Learning.'];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="technical-grid" style={{ paddingTop: '10vh', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="grid-span-8 tablet-span-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600 }}>
            [ SYSTEM: INITIALIZED ]
          </span>
          <h1 style={{ fontSize: '4rem', lineHeight: 1.1, margin: '1rem 0' }}>
            <DecryptedText 
              text="Hotaro" 
              animateOn="view" 
              revealDirection="center" 
              speed={180}
              className="revealed"
              encryptedClassName="encrypted"
            /> <br />
            <AnimatePresence mode="wait">
              <motion.div
                key={ROLES[roleIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                <BlurText
                  text={ROLES[roleIndex]}
                  delay={50}
                  animateBy="letters"
                  direction="top"
                  className="hero-role"
                />
              </motion.div>
            </AnimatePresence>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            💮 doin all ts cuz comp is so fun. <br />
            Exploring cross-platform dev, productivity tools, and system-level customization.
          </p>
        </motion.div>
      </div>
      
      <div className="grid-span-4 tablet-span-12" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
        <div className="hero-info-grid">
          {[
            { label: 'STATUS', value: 'ACTIVE_ON_SYSTEM' },
            { label: 'LOCATION', value: 'IST [UTC+05:30]' },
            { label: 'FOCUS', value: 'CROSS_PLATFORM_DEV' }
          ].map((item) => (
            <motion.div 
              key={item.label}
              whileHover={{ x: -4, borderColor: 'var(--accent)', background: 'var(--bg-secondary)' }}
              className="border-box mono" 
              style={{ fontSize: '11px', cursor: 'default' }}
            >
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</div>
              <div className="hover-text-accent" style={{ transition: 'color 0.2s' }}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-role {
          display: inline-flex;
          font-weight: 700;
          color: var(--text-primary);
        }
        .revealed {
          color: var(--text-primary);
        }
        .encrypted {
          color: var(--accent);
          filter: blur(1px);
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
};
