import { motion } from 'framer-motion';
import DecryptedText from '../components/DecryptedText';

const LEARNING_JOURNEY = [
  {
    category: 'CURRENT_EXPLORATION',
    role: 'Independent Developer',
    period: '2024 - PRESENT',
    description: 'Developing seiko and other open-source projects while diving deep into Flutter, Dart, and system-level customization.',
    highlights: ['Multi-platform media delivery', 'Personal desktop configuration']
  },
  {
    category: 'WEB_FOUNDATIONS',
    role: 'Frontend Projects',
    period: '2023 - 2024',
    description: 'Building tools like chrono-zen to master TypeScript and modern web development patterns.',
    highlights: ['Type-safe productivity tools', 'Interactive UI experiments']
  }
];

export const Experience = () => {
  return (
    <section className="technical-grid" style={{ paddingBottom: '64px' }}>
      <div style={{ gridColumn: '1 / span 12', margin: '32px 0' }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 03: LEARNING_JOURNEY ]</h2>
      </div>

      <div style={{ gridColumn: '1 / span 12', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {LEARNING_JOURNEY.map((item, idx) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 8 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', cursor: 'default' }}
            className="experience-item"
          >
            <div className="mono grid-span-3 tablet-span-12" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
              {item.period}
            </div>
            <div className="grid-span-6 tablet-span-12">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                <DecryptedText 
                  text={item.role}
                  animateOn="view"
                  speed={40}
                  className="revealed"
                  encryptedClassName="encrypted"
                />
              </h3>
              <div className="mono" style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                #{item.category}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{item.description}</p>
            </div>
            <div className="grid-span-3 tablet-span-12">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {item.highlights.map(h => (
                  <li key={h} className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span>»</span> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ gridColumn: '1 / span 12', height: '1px', background: 'var(--border-subtle)', marginTop: '16px' }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
