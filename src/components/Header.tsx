import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Compact nav styles: reduced padding
  const navClass = (path: string) => 
    `px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
      pathname === path 
      ? 'bg-white text-indigo-600 shadow-sm shadow-indigo-100' 
      : 'text-slate-500 hover:text-slate-900'
    }`;

  // Compact mobile nav styles
  const mobileNavClass = (path: string) => 
    `w-full px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center ${
      pathname === path ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      {/* Reduced header height to h-16 */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Smaller logo: w-8 h-8 */}
          <img 
            src="/verbometrics-logo.png" 
            alt="VerboMetrics Logo" 
            className="w-8 h-8 rounded-xl transition-transform group-hover:rotate-6 shadow-sm"
          />
          {/* Smaller text: text-lg */}
          <span className="text-lg font-black text-slate-900 tracking-tight">VerboMetrics</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
          <Link to="/" className={navClass('/')}>Word Counter</Link>
          <Link to="/case-converter" className={navClass('/case-converter')}>Case Converter</Link>
          <Link to="/text-diff" className={navClass('/text-diff')}>Text Diff</Link>
          <Link to="/verb-finder" className={navClass('/verb-finder')}>Verb Finder</Link>
          <Link to="/readability-scorer" className={navClass('/readability-scorer')}>Readability</Link>
          <Link to="/lorem-ipsum" className={navClass('/lorem-ipsum')}>Lorem Ipsum</Link>
        </nav>

        {/* Desktop Right Side - reduced button padding */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/blog" className="text-sm font-bold text-slate-500 hover:text-indigo-600">Blog</Link>
          <Link to="/contact" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 shadow-lg transition-all">Support</Link>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay - adjusted top offset to match new header height */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-8 space-y-3 animate-in slide-in-from-top duration-300 shadow-2xl z-50">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-6 mb-2">Tools</span>
            <Link onClick={() => setIsOpen(false)} to="/" className={mobileNavClass('/')}>Word Counter</Link>
            <Link onClick={() => setIsOpen(false)} to="/case-converter" className={mobileNavClass('/case-converter')}>Case Converter</Link>
            <Link onClick={() => setIsOpen(false)} to="/text-diff" className={mobileNavClass('/text-diff')}>Text Diff</Link>
            <Link onClick={() => setIsOpen(false)} to="/verb-finder" className={mobileNavClass('/verb-finder')}>Verb Finder</Link>
            <Link onClick={() => setIsOpen(false)} to="/readability-scorer" className={mobileNavClass('/readability-scorer')}>Readability Scorer</Link>
            <Link onClick={() => setIsOpen(false)} to="/lorem-ipsum" className={mobileNavClass('/lorem-ipsum')}>Lorem Ipsum</Link>
          </div>
          
          <div className="pt-6 mt-4 border-t border-slate-50 flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-6 mb-2">Resources</span>
            <Link onClick={() => setIsOpen(false)} to="/blog" className={mobileNavClass('/blog')}>Blog</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className={mobileNavClass('/contact')}>Support</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;