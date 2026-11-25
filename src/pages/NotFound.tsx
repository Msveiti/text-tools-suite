import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FileText, Type, GitCompare, Search } from 'lucide-react';

const tools = [
  { name: 'Word Counter', path: '/', description: 'Count words, characters, sentences and reading time.', icon: FileText },
  { name: 'Case Converter', path: '/case-converter', description: 'Switch text between upper, lower, title and sentence case.', icon: Type },
  { name: 'Text Diff', path: '/text-diff', description: 'Compare two versions of a text and see every change.', icon: GitCompare },
  { name: 'Verb Finder', path: '/verb-finder', description: 'Highlight and count every verb in your writing.', icon: Search },
];

const NotFound = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 animate-in">
    <SEO
      title="Page Not Found"
      description="The page you were looking for does not exist. Browse the free VerboMetrics writing and text analysis tools instead."
      path="/404"
      noindex
    />

    <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Error 404</p>
    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
      We couldn&apos;t find that page
    </h1>
    <p className="text-slate-500 mt-4 text-lg max-w-2xl">
      The link may be broken or the page may have moved. Every tool on VerboMetrics is free and
      needs no signup — pick one below to keep working.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link
            key={tool.path}
            to={tool.path}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">{tool.description}</p>
          </Link>
        );
      })}
    </div>

    <div className="mt-10 flex flex-wrap gap-6 text-sm font-bold">
      <Link to="/blog" className="text-indigo-600 hover:underline">Writing guides</Link>
      <Link to="/contact" className="text-indigo-600 hover:underline">Contact support</Link>
      <Link to="/" className="text-indigo-600 hover:underline">All tools</Link>
    </div>
  </div>
);

export default NotFound;
