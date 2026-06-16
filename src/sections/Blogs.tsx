import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Book, X, Loader2, ChevronDown, ChevronUp, Home } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import { fetchLatestBlogs, fetchPostContent } from '../services/BlogService';
import type { BlogPost } from '../services/BlogService';
import archiveSticker from '../assets/contact-sticker-3.png';

export const Blogs = ({ onGoHome }: { onGoHome?: () => void }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    fetchLatestBlogs().then(setPosts);
  }, []);

  useEffect(() => {
    if (selected) {
      setLoading(true);
      document.body.style.overflow = 'hidden';
      fetchPostContent(selected.repoPath).then((text) => {
        setContent(text);
        setLoading(false);
      });
    } else {
      setContent('');
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  const displayedPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section className="technical-grid" style={{ paddingBottom: '64px', position: 'relative' }}>
      <div style={{ position: 'fixed', bottom: '0px', left: '20px', zIndex: 0, display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 1.5 }}
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
            pointerEvents: 'none'
          }}
        >
          Fascinating reading, I know. But when you're done digging up the past, the home button is right there.
        </motion.div>
        
        <motion.img 
          src={archiveSticker} 
          alt="Archive Character" 
          initial={{ opacity: 0, x: -50, filter: 'grayscale(100%)' }}
          animate={{ opacity: 1, x: 0, filter: 'grayscale(100%)' }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2, filter: { duration: 0.3 } }}
          whileHover={{ scale: 1.05, rotate: 2, filter: 'grayscale(0%)' }}
          style={{
            width: '280px',
            objectFit: 'contain',
            pointerEvents: 'auto',
            cursor: 'pointer'
          }}
        />
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
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 04: DIGI_DIARY_ENTRIES ]</h2>
        <a href="https://github.com/Hotaro26/digi-diary" target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: '10px', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Book size={10} /> SOURCE: DIGI-DIARY.git
        </a>
      </div>

      <div style={{ gridColumn: '1 / span 12', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
        <AnimatePresence initial={false}>
          {displayedPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              layout="position"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: showAll ? 0 : idx * 0.1 }}
              whileHover={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
              onClick={() => setSelected(post)}
              className="border-box"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(12, 1fr)', 
                gap: '16px',
                alignItems: 'center',
                cursor: 'pointer',
                borderLeft: '4px solid var(--accent)'
              }}
            >
              <div className="mono grid-span-2 tablet-span-4 mobile-span-12" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {post.date}
              </div>
              <div className="grid-span-6 tablet-span-8 mobile-span-12">
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{post.title}</h3>
              </div>
              <div className="mono grid-span-3 tablet-span-10 mobile-span-10" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '9px', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '2px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="grid-span-1 tablet-span-2 mobile-span-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {posts.length > 3 && (
        <div style={{ gridColumn: '1 / span 12', marginTop: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="mono" 
            style={{ 
              fontSize: '11px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '12px 24px'
            }}
          >
            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAll ? '[ COLLAPSE_ARCHIVE ]' : `[ LOAD_FULL_ARCHIVE (${posts.length - 3} MORE) ]`}
          </button>
        </div>
      )}

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
              className="border-box blog-modal"
              style={{
                width: '90%',
                maxWidth: '800px',
                maxHeight: '85vh',
                overflowY: 'auto',
                background: 'var(--bg-primary)',
                position: 'relative',
                zIndex: 102,
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--accent)', marginBottom: '8px' }}>
                    [ READING_ENTRY: {selected.date} ]
                  </div>
                  <h3 style={{ fontSize: '2rem' }}>{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)} style={{ border: 'none', padding: '8px' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="blog-content" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '40px 0' }}>
                    <Loader2 className="animate-spin" size={20} />
                    <span className="mono">FETCHING_CONTENT...</span>
                  </div>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkFrontmatter]} 
                    rehypePlugins={[rehypeRaw]}
                  >
                    {content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3 { color: var(--text-primary); margin: 1.5rem 0 1rem; }
        .blog-content p { margin-bottom: 1rem; }
        .blog-content code { background: var(--bg-tertiary); padding: 2px 4px; border-radius: 4px; font-family: var(--mono); font-size: 0.9em; }
        .blog-content ul { padding-left: 20px; margin-bottom: 1rem; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};
