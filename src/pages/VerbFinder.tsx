import { useState, useMemo } from 'react';
import nlp from 'compromise';
import { SEO } from '../components/SEO';
import { Home, Zap, Target, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerbFinder = () => {
  const [text, setText] = useState('');

  // Process text through the NLP engine
  const stats = useMemo(() => {
    if (!text.trim()) return { totalWords: 0, verbCount: 0, uniqueVerbs: 0, density: 0 };
    
    const doc = nlp(text);
    const verbs = doc.verbs().out('array');
    const totalWords = text.split(/\s+/).filter(w => w.length > 0).length;
    
    // Calculate unique verbs (lowercase)
    const uniqueVerbsList = [...new Set(verbs.map((v: string) => v.toLowerCase()))];
    
    return {
      totalWords,
      verbCount: verbs.length,
      uniqueVerbs: uniqueVerbsList.length,
      density: totalWords > 0 ? Math.round((verbs.length / totalWords) * 100) : 0
    };
  }, [text]);

  // Generate safe HTML with highlighted verbs
  const highlightedText = useMemo(() => {
    if (!text.trim()) return { __html: '' };
    
    // We clone the document so we don't mutate the original
    const doc = nlp(text).clone();
    
    // Wrap verbs in temporary unique tokens
    doc.verbs().prepend('[[[').append(']]]');
    const rawOutput = doc.text();
    
    // Escape standard HTML to prevent XSS attacks
    const escaped = rawOutput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Replace our tokens with styled Tailwind spans
    const finalHtml = escaped
      .replace(/\[\[\[/g, '<mark class="bg-indigo-100 text-indigo-800 font-bold px-1 rounded shadow-sm">')
      .replace(/\]\]\]/g, '</mark>');
      
    return { __html: finalHtml };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Verb Finder Online | Count & Highlight Verbs in Text" 
        description="Free online verb identifier. Instantly count, highlight, and analyze verbs in your sentences. Perfect for students, writers, and SEO optimization." 
        path="/verb-finder" 
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
          <li className="text-slate-900 font-medium">Verb Finder & Highlighter</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Verb Finder
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Instantly identify action words and analyze narrative momentum.
          </p>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Hash className="w-5 h-5 text-indigo-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.verbCount}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verbs</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Target className="w-5 h-5 text-emerald-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.uniqueVerbs}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unique</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Zap className="w-5 h-5 text-amber-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.density}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Density</div>
          </div>
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
            placeholder="Type or paste your text here to identify all verbs..."
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Analysis Result
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Highlighted verbs will appear here...
              </div>
            ) : (
              <div 
                className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={highlightedText}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbFinder;