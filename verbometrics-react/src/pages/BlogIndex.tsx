import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BookOpen, MousePointer2, FileText } from 'lucide-react';

const posts = [
  {
    title: "Character Counter Guide 2026",
    excerpt: "Complete guide to character limits for Twitter, Instagram, and SEO optimization.",
    path: "/blog/character-counter-guide",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    date: "Jan 14, 2026"
  },
  {
    title: "How to Count Words in Google Docs",
    excerpt: "3 simple methods including keyboard shortcuts and live display tracking.",
    path: "/blog/count-words-google-docs",
    icon: <MousePointer2 className="w-6 h-6 text-emerald-600" />,
    date: "Jan 28, 2026"
  },
  {
    title: "Word Count Requirements for Students",
    excerpt: "Master the exact word counts for essays, research papers, and applications.",
    path: "/blog/word-count-requirements",
    icon: <FileText className="w-6 h-6 text-amber-600" />,
    date: "Jan 21, 2026"
  }
];

const BlogIndex = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 animate-in">
    <SEO title="Blog" description="Writing resources and guides." path="/blog" />
    <div className="mb-16 text-center">
      <h2 className="text-5xl font-black text-slate-900 tracking-tight">Writing Resources</h2>
      <p className="text-slate-500 mt-4 text-lg">Expert guides to help you master the craft of digital writing.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <Link key={i} to={post.path} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
          <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {post.icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{post.date}</span>
          <h3 className="text-2xl font-black text-slate-900 mt-2 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">{post.excerpt}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default BlogIndex;