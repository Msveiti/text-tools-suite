import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Home, ShieldAlert, CheckCircle, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const GrammarChecker = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    if (!text.trim()) return { html: '', errorCount: 0 };

    let errorCount = 0;
    
    // Escape standard HTML first to prevent XSS
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // RULE 1: Repeated words (e.g., "the the")
    escaped = escaped.replace(/\b([a-zA-Z]+)\s+\1\b/gi, (match) => {
      errorCount++;
      return `<mark class="bg-rose-200 text-rose-900 font-bold px-1 rounded border border-rose-300 cursor-help" title="Error: Repeated word">${match}</mark>`;
    });

    // RULE 2: Space before punctuation (e.g., "word ,")
    escaped = escaped.replace(/\s+([.,?!;])/g, (match) => {
      errorCount++;
      return `<mark class="bg-amber-200 text-amber-900 font-bold px-1 rounded border border-amber-300 cursor-help" title="Error: Extra space before punctuation">${match}</mark>`;
    });

    // RULE 3: Basic Article Error ("a" before vowel)
    // Note: English phonetics are tricky (e.g., "a user", "an hour"). This catches the basic mistakes.
    escaped = escaped.replace(/\b([Aa])\s+([aeiouAEIOU][a-zA-Z]*)\b/g, (match, p1, p2) => {
      const lowerWord = p2.toLowerCase();
      // Ignore common phonetic exceptions
      if (lowerWord.startsWith('u') || lowerWord.startsWith('eu') || lowerWord.startsWith('one')) {
        return match; 
      }
      errorCount++;
      return `<mark class="bg-orange-200 text-orange-900 font-bold px-1 rounded border border-orange-300 cursor-help" title="Rule: Use 'an' before a vowel sound">${match}</mark>`;
    });

    // RULE 4: Missing capitalization at the start of a sentence
    escaped = escaped.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => {
      errorCount++;
      return `${p1}<mark class="bg-blue-200 text-blue-900 font-bold px-1 rounded border border-blue-300 cursor-help" title="Error: Sentence should start with a capital letter">${p2}</mark>`;
    });

    // RULE 5: Double spaces between words
    escaped = escaped.replace(/([A-Za-z.,!?])\s{2,}([A-Za-z])/g, (match, p1, p2) => {
      errorCount++;
      return `${p1}<mark class="bg-purple-200 text-purple-900 font-bold px-1 rounded border border-purple-300 cursor-help" title="Error: Multiple spaces detected">  </mark>${p2}`;
    });

    return { html: escaped, errorCount };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Free Grammar Checker | No Sign Up Required" 
        description="Check your text for grammar, spelling, and punctuation errors instantly. 100% free online grammar checker with no sign up needed." 
        path="/grammar-checker" 
      />

      {/* Breadcrumb Navigation */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-slate-500">
          <li>
            <Link to="/" className="flex items-center hover:text-indigo-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="text-slate-900 font-medium">Grammar Checker</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Grammar Checker
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Instantly spot typos, repeated words, and punctuation mistakes.
          </p>
        </div>

        {/* Live Stats Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 min-w-[200px] justify-center">
          {analysis.errorCount > 0 ? (
            <>
              <AlertOctagon className="w-8 h-8 text-rose-500" />
              <div>
                <div className="text-3xl font-black text-slate-900">{analysis.errorCount}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issues Found</div>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
              <div>
                <div className="text-xl font-black text-slate-900">Looks Good!</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">0 Errors Detected</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-center ml-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Your Text
            </label>
            <button 
              onClick={() => setText('')}
              className="text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            className="w-full h-[500px] p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 text-lg leading-relaxed resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here... Try typing 'the the', or adding a space before a comma , to see the checker in action."
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" /> Error Report
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Errors will be highlighted here. Hover over them to see the rule.
              </div>
            ) : analysis.errorCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-emerald-500">
                <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-medium text-center">No basic grammar or spacing errors detected!</p>
              </div>
            ) : (
              <div 
                className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: analysis.html }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;