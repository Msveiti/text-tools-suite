import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="py-20 bg-[#F8FAFC] border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 text-center">
      {/* Brand Icon */}
      <div className="bg-slate-900 w-16 h-16 rounded-[24px] flex items-center justify-center text-white font-black text-xl mx-auto mb-8 shadow-xl shadow-slate-200">
        VM
      </div>
      
      <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">
        The premier AI-driven writing suite for professional creators.
      </p>

      {/* Blog/Resources Section */}
      <div className="mb-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Writing Resources</h4>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link to="/blog/character-counter-guide" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Character Guide</Link>
          <Link to="/blog/count-words-google-docs" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Google Docs Tips</Link>
          <Link to="/blog/word-count-requirements" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Academic Limits</Link>
        </div>
      </div>
      
      {/* Legal & Support Section */}
      <div className="flex justify-center gap-10 mb-12 py-8 border-t border-slate-50">
        <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Privacy</Link>
        <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Terms</Link>
        <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Contact</Link>
      </div>
      
      {/* Copyright */}
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
        © 2026 VerboMetrics Suite
      </p>
    </div>
  </footer>
);

export default Footer;