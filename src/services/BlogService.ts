// Dynamic connection to https://github.com/Hotaro26/digi-diary

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  repoPath: string;
}

export const fetchLatestBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('https://api.github.com/repos/Hotaro26/digi-diary/contents/src/content/post');
    if (!response.ok) throw new Error("Failed to fetch repo content");
    
    const files = await response.json();
    
    // Transform file list into BlogPost objects
    // Filtering for .md or .mdx files
    return files
      .filter((file: any) => file.name.endsWith('.md') || file.name.endsWith('.mdx'))
      .map((file: any, idx: number) => {
        // Simple name transformation for title
        const cleanName = file.name
          .replace(/\.(mdx|md)$/, '')
          .replace(/[_-]/g, ' ')
          .toUpperCase();
          
        return {
          id: `b${idx}`,
          title: cleanName,
          date: 'LATEST_ENTRY', // In a real app, you'd fetch commit date or frontmatter
          tags: ['MARKDOWN', 'JOURNAL'],
          repoPath: file.name
        };
      });
  } catch (e) {
    console.error("Failed to fetch blogs dynamically, falling back to static list", e);
    return [
      { id: 'b1', title: 'ARCH JOURNEY', date: 'APR_2026', tags: ['LINUX'], repoPath: 'arch.mdx' },
      { id: 'b2', title: 'INTERNET THOUGHTS', date: 'MAR_2026', tags: ['JOURNAL'], repoPath: 'internet_thoughts.mdx' },
      { id: 'b3', title: 'SPOTIFY CURATION', date: 'FEB_2026', tags: ['MUSIC'], repoPath: 'spotify.mdx' }
    ];
  }
};

export const fetchPostContent = async (repoPath: string): Promise<string> => {
  try {
    const rawUrl = `https://raw.githubusercontent.com/Hotaro26/digi-diary/main/src/content/post/${repoPath}`;
    const response = await fetch(rawUrl);
    if (!response.ok) throw new Error(`Post not found: ${repoPath}`);
    return await response.text();
  } catch (e) {
    console.error("Failed to fetch post content", e);
    return "## [ ERROR: FAILED_TO_LOAD_CONTENT ]\n\nCould not retrieve post from repository. Path tried: " + repoPath;
  }
};
