import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Home, Code, Heart, Settings, Coffee, Award, Sparkles } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import aboutSticker from '../assets/left-sticker-3.png';
import ProfileCard from '../components/ProfileCard';
import avatarImg from '../assets/avatar.png';
import miniAvatarImg from '../assets/left-sticker-1.png';
import iconPattern from '../assets/iconpattern.png';

export const About = ({ onGoHome, stickersEnabled = true }: { onGoHome?: () => void, stickersEnabled?: boolean }) => {
  const [currentTab, setCurrentTab] = useState<'profile' | 'specs' | 'hobbies'>('profile');
  const [thoughtIndex, setThoughtIndex] = useState(0);

  const THOUGHTS = [
    "Oh, you want to know more about me? How flattering! *smiles*",
    "I spend a lot of time tuning my Neovim config. It's a disease, really.",
    "Do you like my desktop layout? Niri is honestly the best window manager.",
    "If you want to collaborate, don't hesitate to reach out on the contact section!",
    "Yes, I watch anime. Hyouka is one of my favorites, in case you couldn't tell."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % THOUGHTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="technical-grid" style={{ paddingBottom: '64px', position: 'relative' }}>
      {/* Floating back button & sticker at bottom left */}
      <div style={{ position: 'fixed', bottom: '0px', left: '20px', zIndex: 0, display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
        <AnimatePresence>
          {stickersEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 50 }}
              style={{ display: 'flex', alignItems: 'flex-end', gap: '24px' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 1.2 }}
                className="mono"
                style={{
                  position: 'absolute',
                  bottom: '220px',
                  left: '150px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 0px',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--accent)',
                  fontSize: '11px',
                  lineHeight: 1.5,
                  maxWidth: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  pointerEvents: 'none',
                  fontStyle: 'italic'
                }}
              >
                {THOUGHTS[thoughtIndex]}
              </motion.div>
              
              <motion.img 
                src={aboutSticker} 
                alt="About Character" 
                initial={{ opacity: 0, x: -50, filter: 'grayscale(100%)' }}
                animate={{ opacity: 1, x: 0, filter: 'grayscale(100%)' }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2, filter: { duration: 0.3 } }}
                whileHover={{ scale: 1.05, rotate: -2, filter: 'grayscale(0%)' }}
                style={{
                  width: '280px',
                  objectFit: 'contain',
                  pointerEvents: 'auto',
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {onGoHome && (
          <motion.button
            onClick={onGoHome}
            whileHover={{ y: -4, backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
            style={{
              marginBottom: '40px',
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
              pointerEvents: 'auto',
              transition: 'color 0.2s ease, background-color 0.2s ease'
            }}
            title="Return Home"
          >
            <Home size={28} />
          </motion.button>
        )}
      </div>

      <div style={{ gridColumn: '1 / span 12', margin: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 06: ABOUT_ME_PROTOCOL ]</h2>
      </div>

      {/* Tabs / Navigation inside About Me */}
      <div style={{ gridColumn: '1 / span 12', display: 'flex', gap: '8px', marginBottom: '24px', position: 'relative', zIndex: 1, overflowX: 'auto', paddingBottom: '8px' }}>
        {[
          { id: 'profile', label: 'USER_BIO', icon: User },
          { id: 'specs', label: 'SYSTEM_SPECS', icon: Settings },
          { id: 'hobbies', label: 'CORE_INTERESTS', icon: Heart }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mono cursor-target"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={12} />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ gridColumn: '1 / span 12', position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {currentTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
            >
              <div className="grid-span-8 tablet-span-12" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="border-box bio-article-container">
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
                    <DecryptedText text="Hey, I'm Hotaro." animateOn="view" speed={40} />
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                    I'm a <span className="bio-keyword">17 y/o boy</span> and a <span className="bio-keyword">self-taught</span> <span className="bio-keyword">independent developer</span> focused on building beautiful, performant, and type-safe <span className="bio-keyword">cross-platform software</span>. My coding journey is driven by a deep curiosity about how things work under the hood and a passion for crafting pixel-perfect, interactive user interfaces.
                  </p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Whether I'm writing native Android apps with <span className="bio-keyword">Kotlin</span> and <span className="bio-keyword">Compose</span>, designing multi-platform downloaders with <span className="bio-keyword">Flutter</span> and <span className="bio-keyword">Dart</span>, or tinkering with web apps in <span className="bio-keyword">React</span> and <span className="bio-keyword">TypeScript</span>, I prioritize <span className="bio-keyword">clean architecture</span> and seamless usability. Beyond building applications, I love customizing my development environment, optimizing tools, and diving into <span className="bio-keyword">system-level configs</span>.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="border-box" style={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Coffee size={12} />
                      PHILOSOPHY
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      "Keep it simple, make it expressive, and enjoy the process. Good design is as little design as possible."
                    </p>
                  </div>
                  <div className="border-box" style={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Code size={12} />
                      DEVELOPMENT
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Believer in open-source software, type-safety, and smooth animations that make web and mobile apps feel alive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid-span-4 tablet-span-12" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ProfileCard
                  name="Hotaro"
                  title="Independent Developer"
                  handle="oi.hotaro"
                  status="Active on System"
                  contactText="Contact Me"
                  avatarUrl={avatarImg}
                  miniAvatarUrl={miniAvatarImg}
                  iconUrl={iconPattern}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => {
                    const contactEl = document.getElementById('contact');
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onGoHome?.();
                      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200);
                    }
                  }}
                  behindGlowEnabled={true}
                  behindGlowColor="rgba(125, 190, 255, 0.67)"
                  innerGradient="linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)"
                />


              </div>
            </motion.div>
          )}

          {currentTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
            >
              <div className="grid-span-6 tablet-span-12">
                <div className="border-box mono" style={{ borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={14} /> WORKSTATION_CONFIG
                  </div>
                  {[
                    { key: 'OS', val: 'Arch Linux (x86_64)' },
                    { key: 'WINDOW_MANAGER', val: 'Niri (Wayland Tiling WM)' },
                    { key: 'SHELL', val: 'Bash / Zsh with custom prompts' },
                    { key: 'TERMINAL_EMULATOR', val: 'Alacritty / Kitty' },
                    { key: 'EDITOR_ENVIRONMENT', val: 'Neovim (LazyVim base)' },
                    { key: 'DOTFILES', val: 'Noctalia Config' }
                  ].map((spec) => (
                    <div key={spec.key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--border-subtle)', paddingBottom: '8px', fontSize: '12px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{spec.key}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid-span-6 tablet-span-12">
                <div className="border-box mono" style={{ borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code size={14} /> LANGUAGE_SPECIFICATIONS
                  </div>
                  {[
                    { lang: 'Dart / Flutter', level: 90 },
                    { lang: 'TypeScript / React', level: 85 },
                    { lang: 'Kotlin / Compose', level: 80 },
                    { lang: 'Python / OpenCV', level: 75 },
                    { lang: 'Shell Scripting', level: 70 }
                  ].map((item) => (
                    <div key={item.lang} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span>{item.lang}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{item.level}%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          style={{ height: '100%', background: 'var(--accent)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'hobbies' && (
            <motion.div
              key="hobbies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
            >
              {[
                { title: 'Linux Rice & Customization', desc: 'Obsessed with creating beautiful tiling window manager setups. Crafting dotfiles, customizing color schemes, and making scripts to automate desktop tasks.', icon: Sparkles },
                { title: 'Anime & Manga Enthusiast', desc: 'Enjoying rich visual storytelling, character-driven narratives, and unique art styles. Always open for recommendations or sharing lists.', icon: Award },
                { title: 'Minimalist UI Design', desc: 'Studying typography, layouts, and animations. I believe modern software should be clean, distraction-free, and feel amazing to interact with.', icon: Heart }
              ].map((hobby, index) => {
                const Icon = hobby.icon;
                return (
                  <div key={index} className="grid-span-4 tablet-span-12">
                    <motion.div
                      whileHover={{ y: -4, borderColor: 'var(--accent)', background: 'var(--bg-secondary)' }}
                      className="border-box"
                      style={{ borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--accent)'
                      }}>
                        <Icon size={18} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{hobby.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{hobby.desc}</p>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        .bio-keyword {
          display: inline-block;
          background-color: color-mix(in srgb, var(--accent) 12%, transparent);
          color: var(--text-primary);
          border-bottom: 2px solid var(--accent);
          padding: 1px 4px;
          border-radius: 3px 3px 0 0;
          font-weight: 500;
          transition: background-color 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
        }

        .bio-keyword:hover,
        .bio-article-container:hover .bio-keyword {
          background-color: rgba(244, 143, 177, 0.25) !important;
          border-bottom-color: #f48fb1 !important;
        }

        .bio-article-container {
          border-radius: 16px;
          background-color: var(--bg-secondary);
          padding: 32px;
        }
      `}</style>
    </section>
  );
};
