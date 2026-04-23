import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Book, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import { fetchLatestBlogs, fetchPostContent } from '../services/BlogService';
import type { BlogPost } from '../services/BlogService';

export const Blogs = () => {
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
    <section className="technical-grid" style={{ paddingBottom: '64px' }}>
      <div style={{ gridColumn: '1 / span 12', margin: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>[ 04: DIGI_DIARY_ENTRIES ]</h2>
        <a href="https://github.com/Hotaro26/digi-diary" target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: '10px', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Book size={10} /> SOURCE: DIGI-DIARY.git
        </a>
      </div>

      <div style={{ gridColumn: '1 / span 12', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        <div style={{ gridColumn: '1 / span 12', marginTop: '24px', textAlign: 'center' }}>
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
