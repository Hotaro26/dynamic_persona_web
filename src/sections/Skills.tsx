import { motion } from 'framer-motion';
import DecryptedText from '../components/DecryptedText';

const SKILLS = [
  { category: 'CROSS_PLATFORM', items: ['Flutter / Dart', 'Android SDK', 'Material Design', 'Mobile Architecture', 'Multi-platform UI'] },
  { category: 'WEB_TECHNOLOGIES', items: ['TypeScript', 'React', 'HTML / CSS', 'XSLT', 'Web Apps'] },
  { category: 'SYSTEM_SCRIPTS', items: ['Python', 'OpenCV', 'Niri / Noctalia', 'Linux Customization', 'Shell'] },
  { category: 'DEVELOPMENT', items: ['Git', 'Vite', 'Neovim', 'Task Automation', 'UI/UX Design'] },
];

export const Skills = () => {
  return (
    <section className="technical-grid" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '64px' }}>
      <div style={{ gridColumn: '1 / span 12', marginBottom: '32px' }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 01: TECHNICAL_FOCUS ]</h2>
      </div>
      
      {SKILLS.map((group, idx) => (
        <div key={group.category} className="grid-span-3 tablet-span-6 mobile-span-12">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div 
              className="mono" 
              style={{ 
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '100px',
                background: 'var(--accent-muted)',
                border: '1px solid var(--accent)',
                marginBottom: '16px', 
                fontSize: '10px', 
                fontWeight: 600,
                color: 'var(--accent)'
              }}
            >
              <DecryptedText 
                text={group.category} 
                animateOn="view" 
                speed={40} 
              />
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((skill) => (
                <motion.li 
                  key={skill} 
                  whileHover={{ x: 4, color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                  className="mono cursor-target" 
                  style={{ 
                    fontSize: '13px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    cursor: 'default',
                    padding: '4px 8px',
                    borderRadius: '2px',
                    width: 'fit-content'
                  }}
                >
                  <span style={{ width: '4px', height: '4px', background: 'var(--accent)' }}></span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </section>
  );
};
