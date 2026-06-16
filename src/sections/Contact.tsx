import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Copy } from 'lucide-react';
import { FaGithub, FaDiscord, FaPinterest } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import contactSticker from '../assets/contact-sticker.png';
import contactSticker2 from '../assets/contact-sticker-2.png';

const STICKERS = [contactSticker, contactSticker2];

const THOUGHTS = [
  "Oh look, a visitor. Don't be shy, the email button won't bite.",
  "Still staring? Just click one of those links already. The Discord button even copies it for you.",
  "I wonder if they prefer dark mode... I think it suits me better. *smiles*",
  "Do you think they'll notice my cute little hair accessory? *blushes*",
  "Coding is fun, but receiving a new message is even better. Hint hint...",
  "If you click that Pinterest link, you might find some hidden gems!"
];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % STICKERS.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThoughtIndex((prev) => (prev + 1) % THOUGHTS.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyDiscord = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('oi.hotaro');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="technical-grid" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '64px' }}>
      <div style={{ gridColumn: '1 / span 12', marginBottom: '32px' }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 05: CONTACT_PROTOCOL ]</h2>
      </div>

      <div className="grid-span-12 tablet-span-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            border: '1px solid var(--border-strong)',
            background: 'color-mix(in srgb, var(--bg-secondary) 40%, transparent)',
            backdropFilter: 'blur(20px)',
            padding: '60px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Subtle gradient orb for premium feel */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '400px',
              background: 'var(--accent)',
              filter: 'blur(150px)',
              opacity: 0.15,
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
            width: '100%'
          }}>
            <div className="contact-image-wrapper" style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dialog-${currentThoughtIndex}`}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.8 }}
                  className="mono"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '-80px',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    padding: '12px 16px',
                    borderRadius: '24px 24px 0px 24px',
                    border: '1px solid var(--border-subtle)',
                    borderRight: '3px solid var(--accent)',
                    fontSize: '10px',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    maxWidth: '160px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}
                >
                  {THOUGHTS[currentThoughtIndex]}
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={STICKERS[currentImageIndex]} 
                  alt="Contact" 
                  initial={{ filter: 'grayscale(100%)', opacity: 0, scale: 0.9 }}
                  animate={{ filter: 'grayscale(100%)', opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ width: '100%', maxWidth: '320px', objectFit: 'contain', cursor: 'default' }}
                  transition={{ type: 'spring', stiffness: 300, filter: { duration: 0.3 } }}
                />
              </AnimatePresence>
            </div>

            <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '16px', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Let's build something.
              </h3>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '500px', lineHeight: 1.8 }}>
                <span style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', padding: '2px 6px', borderRadius: '4px 4px 0 0', fontWeight: 500 }}>Available</span> for{' '}
                <span style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', padding: '2px 6px', borderRadius: '4px 4px 0 0', fontWeight: 500 }}>collaboration</span>,{' '}
                <span style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', padding: '2px 6px', borderRadius: '4px 4px 0 0', fontWeight: 500 }}>hiring</span>, or just a friendly chat. Reach out across any of these platforms.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.a 
                  href="mailto:sakibreza035@gmail.com"
                  whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
                  className="cursor-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.2s ease', borderRadius: '100px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                >
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Email</span>
                  <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                </motion.a>
                
                <motion.a 
                  href="https://github.com/Hotaro26"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
                  className="cursor-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.2s ease', borderRadius: '100px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                >
                  <FaGithub size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>GitHub</span>
                  <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                </motion.a>
                
                <motion.button 
                  onClick={handleCopyDiscord}
                  whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
                  className="cursor-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', color: 'var(--text-primary)', transition: 'all 0.2s ease', borderRadius: '100px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <FaDiscord size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{copied ? 'Copied!' : 'oi.hotaro'}</span>
                  <Copy size={14} style={{ opacity: 0.5 }} />
                </motion.button>
                
                <motion.a 
                  href="https://pinterest.com/Hotaro26"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
                  className="cursor-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.2s ease', borderRadius: '100px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                >
                  <FaPinterest size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Pinterest</span>
                  <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .contact-image-wrapper {
            margin-bottom: -60px;
            align-self: flex-end;
            align-items: flex-end;
          }
        }
      `}</style>
    </section>
  );
};
