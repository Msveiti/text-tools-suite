import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="py-12 bg-[#F8FAFC] border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <img 
        src="/verbometrics-logo.png" 
        alt="VM Logo" 
        className="w-12 h-12 rounded-2xl mx-auto mb-6 shadow-lg shadow-slate-200"
      />
      
      <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto mb-8">
        The premier AI-driven writing suite for professional creators.
      </p>

      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <Link to="/verb-finder" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Verb Finder</Link> {/* ADDED */}
        <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Privacy</Link>
        <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Terms</Link>
        <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Contact</Link>
      </div>
      
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
        © 2026 VerboMetrics Suite
      </p>
    </div>
  </footer>
);

export default Footer;