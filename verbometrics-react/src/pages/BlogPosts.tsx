import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const BlogPost = ({ title, date, content, path }: any) => (
  <main className="max-w-4xl mx-auto py-20 px-6 animate-in">
    <SEO title={title} description={title} path={path} />
    
    {/* Go Back Button */}
    <Link 
      to="/blog" 
      className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-600 transition-all mb-12 group"
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
      Back to Resources
    </Link>

    <div className="mb-16">
        <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">{date}</span>
        <h1 className="text-6xl font-black mt-6 text-slate-900 leading-tight tracking-tight">{title}</h1>
    </div>

    {/* This wrapper handles the professional HTML rendering */}
    <div 
      className="prose prose-slate prose-lg lg:prose-xl max-w-none 
                 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                 prose-p:text-slate-600 prose-p:leading-relaxed
                 prose-strong:text-slate-900 prose-strong:font-bold
                 prose-table:border prose-table:border-slate-100 prose-table:rounded-[24px] prose-table:overflow-hidden"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  </main>
);

export default BlogPost;