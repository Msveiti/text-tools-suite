import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { SEO } from '../components/SEO';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  path: string;
  seoTitle?: string;
  seoDescription?: string;
}

const BlogPost = ({ title, date, content, path, seoTitle, seoDescription }: BlogPostProps) => (
  <main className="max-w-4xl mx-auto py-20 px-6 animate-in">
    {/* Use custom SEO title/description if provided, otherwise use defaults */}
    <SEO 
      title={seoTitle || title} 
      description={seoDescription || `${title} - Learn more about text analysis and word counting.`} 
      path={path} 
    />
    
    {/* Breadcrumb Navigation */}
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-slate-500">
        <li>
          <Link to="/" className="flex items-center hover:text-indigo-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </li>
        <li>
          <Link 
            to="/blog" 
            className="hover:text-indigo-600 transition-colors"
            aria-label="Blog"
          >
            Blog
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </li>
        <li className="text-slate-900 font-medium truncate max-w-[300px]" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>

    {/* Go Back Button (Alternative to Breadcrumb) */}
    <div className="mb-8">
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-600 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
        Back to Resources
      </Link>
    </div>

    <div className="mb-16">
        <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">{date}</span>
        <h1 className="text-6xl font-black mt-6 text-slate-900 leading-tight tracking-tight">{title}</h1>
    </div>

    {/* This wrapper handles the professional HTML rendering */}
    <div 
      className="prose prose-slate prose-lg lg:prose-xl max-w-none 
                 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-6
                 prose-strong:text-slate-900 prose-strong:font-bold
                 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                 prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                 prose-table:border prose-table:border-slate-100 prose-table:rounded-[24px] prose-table:overflow-hidden
                 prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg
                 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-6 prose-blockquote:italic"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  </main>
);

export default BlogPost;