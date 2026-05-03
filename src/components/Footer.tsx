import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/60 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
                V
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Verbo<span className="text-indigo-600">Metrics</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              The premier AI-driven writing suite for professional creators, marketers, and students.
            </p>
          </div>

          {/* Tools Column 1 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Core Tools</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Word Counter</Link></li>
              <li><Link to="/case-converter" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Case Converter</Link></li>
              <li><Link to="/text-diff" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Text Diff Checker</Link></li>
              <li><Link to="/lorem-ipsum" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Lorem Ipsum</Link></li>
            </ul>
          </div>

          {/* Tools Column 2 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Analysis</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/readability-scorer" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Readability Scorer</Link></li>
              <li><Link to="/word-frequency" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Word Frequency</Link></li>
              <li><Link to="/verb-finder" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Verb Finder</Link></li>
              <li><Link to="/passive-voice" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Passive Voice</Link></li>
              <li><Link to="/tone-analyzer" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Tone Analyzer</Link></li>
              <li><Link to="/adverb-spotter" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Adverb & Fluff Spotter</Link></li>
              <li><Link to="/sentence-length" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Sentence Length</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/blog" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Blog & Guides</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-medium">
            © {currentYear} VerboMetrics Suite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* You can add social media icons here later if needed */}
            <span className="text-slate-300 text-sm font-bold">Made for Writers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;