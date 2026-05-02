import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

const tools = [
  { name: 'Word Counter', path: '/' },
  { name: 'Case Converter', path: '/case-converter' },
  { name: 'Text Diff', path: '/text-diff' },
  { name: 'Lorem Ipsum', path: '/lorem-ipsum' },
  { name: 'Verb Finder', path: '/verb-finder' },
  { name: 'Readability Scorer', path: '/readability-scorer' },
  { name: 'Word Frequency', path: '/word-frequency' },
  { name: 'Passive Voice', path: '/passive-voice' },
  { name: 'Tone Analyzer', path: '/tone-analyzer' },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            Verbo<span className="text-indigo-600">Metrics</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          
          {/* Tools Dropdown */}
          <div className="relative group py-8">
            <button className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
              Writing Tools <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            
            {/* Dropdown Panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-3xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all hover:bg-indigo-50 hover:text-indigo-600 ${
                    location.pathname === tool.path ? 'bg-slate-50 text-indigo-600' : 'text-slate-600'
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Blog & Guides
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Support
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-6 flex flex-col gap-4">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">All Tools</div>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-bold text-lg ${location.pathname === tool.path ? 'text-indigo-600' : 'text-slate-700'}`}
              >
                {tool.name}
              </Link>
            ))}
            <hr className="border-slate-100 my-4" />
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg text-slate-700">Blog</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg text-slate-700">Support</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;