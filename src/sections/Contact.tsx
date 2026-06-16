import { motion } from 'framer-motion';
import { Terminal, Mail, MessageSquare, Pin, ArrowUpRight, Copy } from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

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
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid var(--border-strong)',
            background: 'color-mix(in srgb, var(--bg-secondary) 40%, transparent)',
            backdropFilter: 'blur(20px)',
            padding: '80px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Subtle gradient orb for premium feel */}
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

          <h3 style={{ marginBottom: '16px', fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Let's build something.
          </h3>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '500px', lineHeight: 1.6 }}>
            Available for collaboration, hiring, or just a friendly chat. Reach out across any of these platforms.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
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
              <Terminal size={18} style={{ color: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>GitHub</span>
              <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
            </motion.a>
            
            <motion.button 
              onClick={handleCopyDiscord}
              whileHover={{ y: -4, background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
              className="cursor-target"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', color: 'var(--text-primary)', transition: 'all 0.2s ease', borderRadius: '100px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <MessageSquare size={18} style={{ color: 'var(--accent)' }} />
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
              <Pin size={18} style={{ color: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Pinterest</span>
              <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
