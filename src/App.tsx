import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { AccentPicker } from './components/AccentPicker';
import { ScrollToTop } from './components/ScrollToTop';
import { Archive } from 'lucide-react';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Blogs } from './sections/Blogs';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import TargetCursor from './components/TargetCursor';
import FaultyTerminal from './components/FaultyTerminal';

function App() {
  const [terminalEnabled, setTerminalEnabled] = useState(() => {
    return localStorage.getItem('terminal-bg') === 'true';
  });
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('accent') || '#495057';
  });
  const [theme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [currentView, setCurrentView] = useState<'home' | 'archive'>('home');

  useEffect(() => {
    const handleToggle = (e: any) => setTerminalEnabled(e.detail);
    window.addEventListener('terminal-bg-change', handleToggle);
    
    const observer = new MutationObserver(() => {
      const newAccent = document.documentElement.style.getPropertyValue('--accent').trim();
      if (newAccent) setAccentColor(newAccent);
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => {
      window.removeEventListener('terminal-bg-change', handleToggle);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', transition: 'background-color 0.3s ease', position: 'relative' }}>
      {terminalEnabled && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: 'none', 
          opacity: theme === 'dark' ? 0.35 : 0.2 
        }}>
          <FaultyTerminal 
            tint={accentColor}
            scale={1.5}
            digitSize={1.2}
            timeScale={0.5}
            noiseAmp={1}
            brightness={theme === 'dark' ? 0.7 : 0.4}
            scanlineIntensity={0.4}
            curvature={0.1}
            mouseStrength={0.5}
            glitchAmount={1.1}
          />
        </div>
      )}
      
      <TargetCursor 
        targetSelector=".cursor-target, button, a, .border-box, .pixel-card" 
        spinDuration={8}
      />
      <ScrollToTop />
      
      <header style={{ 
        height: 'auto',
        minHeight: '80px',
        borderBottom: '1px solid var(--border-strong)', 
        position: 'sticky', 
        top: 0, 
        background: 'color-mix(in srgb, var(--bg-primary), transparent 35%)', 
        backdropFilter: 'blur(16px)', 
        zIndex: 10,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="technical-grid" style={{ 
          paddingTop: 0,
          paddingBottom: 0,
          width: '100%',
          alignItems: 'center'
        }}>
          <div className="grid-span-3 tablet-span-4 mobile-span-12" style={{ display: 'flex', alignItems: 'center', height: '80px' }}>
            <motion.span 
              onClick={() => setCurrentView('home')}
              whileHover={{ color: 'var(--accent)' }}
              className="mono cursor-target" 
              style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.05em', cursor: 'pointer', transition: 'color 0.2s' }}
            >
              hotaro
            </motion.span>
          </div>
          <div className="grid-span-9 tablet-span-8 mobile-span-12" style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            gap: '24px', 
            height: '80px' 
          }}>
            <AccentPicker />
            <ThemeToggle />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.button 
                onClick={() => {
                  setCurrentView('archive');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.1, color: 'var(--accent)' }}
                className="cursor-target"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: currentView === 'archive' ? 'var(--accent)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  padding: '8px'
                }}
                title="Archive"
              >
                <Archive size={20} />
              </motion.button>
            </div>
            <motion.button 
              onClick={() => {
                setCurrentView('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              whileHover={{ y: -2, background: 'var(--accent)', color: 'var(--bg-primary)' }}
              className="mono cursor-target"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase'
              }}
            >
              Contact Me
            </motion.button>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        {currentView === 'home' ? (
          <>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </>
        ) : (
          <div style={{ paddingTop: '64px', minHeight: '60vh' }}>
            <Blogs onGoHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </div>
        )}
      </main>

      <footer style={{ 
        borderTop: '1px solid var(--border-strong)', 
        marginTop: '64px',
      }}>
        <div style={{ 
          maxWidth: 'var(--container-max)', 
          margin: '0 auto', 
          width: '100%', 
          padding: '64px 32px',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <motion.p 
            whileHover={{ color: 'var(--text-primary)' }}
            className="mono" 
            style={{ fontSize: '11px', color: 'var(--text-muted)', cursor: 'default', transition: 'color 0.2s' }}
          >
            © 2026 hotaro. ALL_RIGHTS_RESERVED. <br />
            BUILT_WITH_REACT_AND_FRAMER_MOTION.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default App;
