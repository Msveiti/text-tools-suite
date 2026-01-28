import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  const navClass = (path: string) => 
    `px-5 py-2 rounded-xl text-sm font-bold transition-all ${
      pathname === path 
      ? 'bg-white text-indigo-600 shadow-sm shadow-indigo-100' 
      : 'text-slate-500 hover:text-slate-900'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:rotate-12">📝</span>
          <span className="text-xl font-black text-slate-900 tracking-tight">VerboMetrics</span>
        </Link>
        
        {/* Main Tool Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
          <Link to="/" className={navClass('/')}>Word Counter</Link>
          <Link to="/case-converter" className={navClass('/case-converter')}>Case Converter</Link>
          <Link to="/text-diff" className={navClass('/text-diff')}>Text Diff</Link>
          <Link to="/lorem-ipsum" className={navClass('/lorem-ipsum')}>Lorem Ipsum</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Blog</Link>
          <Link to="/contact" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">Support</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;