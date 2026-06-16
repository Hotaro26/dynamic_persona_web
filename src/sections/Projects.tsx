import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import PixelCard from '../components/PixelCard';
import DecryptedText from '../components/DecryptedText';

const PROJECTS = [
  {
    id: 'p1',
    title: 'seiko',
    description: 'Material expressive YouTube media downloader app for Android.',
    longDescription: 'A multi-platform media downloader built with Flutter/Dart. It features a modern Material You design and supports Android, Linux, Windows, and iOS. Focused on performance and a high-quality user experience.',
    tech: ['Dart', 'Flutter', 'Android', 'Media'],
    links: { github: 'https://github.com/Hotaro26/seiko' }
  },
  {
    id: 'p2',
    title: 'chrono-zen',
    description: 'Productivity web-app for managing to-dos and pomodoro timers.',
    longDescription: 'A clean and efficient productivity suite that integrates task management with a Pomodoro timer. Built with TypeScript to ensure type safety and high performance across browsers.',
    tech: ['TypeScript', 'React', 'Tailwind', 'Productivity'],
    links: { github: 'https://github.com/Hotaro26/chrono-zen' }
  },
  {
    id: 'p3',
    title: 'QuranReader',
    description: 'A beautiful and minimalist open-source Quran reading application for Android.',
    longDescription: 'An open-source Quran reading application built natively for Android. Designed with simplicity, focus, and a seamless user experience in mind for a distraction-free reading environment.',
    tech: ['Kotlin', 'Android', 'Open Source'],
    links: { github: 'https://github.com/Hotaro26/QuranReader' }
  },
  {
    id: 'p4',
    title: 'gabi',
    description: 'All in one media/image downloader app based on yt-dlp and gallery-dl.',
    longDescription: 'An all-in-one media and image downloader app powered by yt-dlp and gallery-dl Python libraries. Features a sleek Material Expressive 3 UI for a highly fluid user experience.',
    tech: ['Kotlin', 'Android', 'Media', 'Downloader'],
    links: { github: 'https://github.com/Hotaro26/gabi' }
  },
  {
    id: 'p5',
    title: 'gorbit',
    description: 'An open source social media platform without any brain rot, ads or trackers.',
    longDescription: 'An open-source social media platform built for meaningful connections without brain rot, intrusive ads, or trackers. Built using TypeScript for a seamless and secure experience.',
    tech: ['TypeScript', 'Social Media', 'Web', 'Open Source'],
    links: { github: 'https://github.com/Hotaro26/gorbit' }
  },
  {
    id: 'p6',
    title: 'miko',
    description: 'A manga reader app built purely with kotlin and jetpack compose.',
    longDescription: 'A native Android manga reader app built entirely with Kotlin and Jetpack Compose. It features the latest Material Expressive 3 UI and seamless AniList tracker integration.',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Manga'],
    links: { github: 'https://github.com/Hotaro26/miko' }
  }
];

export const Projects = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  return (
    <section className="technical-grid" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '64px' }}>
      <div style={{ gridColumn: '1 / span 12', margin: '32px 0' }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 02: PINNED_REPOSITORIES ]</h2>
      </div>

      {PROJECTS.map((project, index) => {
        let borderRadius = '4px';
        if (index === 0) borderRadius = '24px 4px 4px 4px';
        else if (index === 2) borderRadius = '4px 24px 4px 4px';
        else if (index === 3) borderRadius = '4px 4px 4px 24px';
        else if (index === 5) borderRadius = '4px 4px 24px 4px';

        return (
          <div key={project.id} className="grid-span-4 tablet-span-12">
            <PixelCard variant="pink" speed={20} gap={6} noFocus={false} style={{ borderRadius }}>
            <motion.div
              style={{ padding: '24px', cursor: 'pointer', height: '100%' }}
              onClick={() => setSelected(project.id)}
              whileHover={{ 
                y: -4, 
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                ID_{project.id.toUpperCase()}
              </div>
              <h3 style={{ marginBottom: '12px' }}>
                <DecryptedText 
                  text={project.title}
                  animateOn="view"
                  speed={40}
                  className="revealed"
                  encryptedClassName="encrypted"
                />
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.tech.map(t => (
                  <span key={t} className="mono" style={{ fontSize: '10px', background: 'var(--bg-tertiary)', padding: '2px 6px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </PixelCard>
        </div>
        );
      })}

      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
                cursor: 'zoom-out'
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="border-box project-modal"
              style={{
                width: '90%',
                maxWidth: '700px',
                background: 'var(--bg-primary)',
                position: 'relative',
                zIndex: 102,
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--accent)', marginBottom: '8px' }}>
                    [ REPO_SPECS ]
                  </div>
                  <h3 style={{ fontSize: '2rem' }}>{PROJECTS.find(p => p.id === selected)?.title}</h3>
                </div>
                <button onClick={() => setSelected(null)} style={{ border: 'none', padding: '8px' }}>
                  <X size={20} />
                </button>
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                {PROJECTS.find(p => p.id === selected)?.longDescription}
              </p>

              <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <a href={PROJECTS.find(p => p.id === selected)?.links.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <Terminal size={14} /> GITHUB_REPO
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
