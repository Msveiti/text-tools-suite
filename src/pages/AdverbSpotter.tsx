import { useState, useMemo } from 'react';
import nlp from 'compromise';
import { SEO } from '../components/SEO';
import { Home, EyeOff, Feather, AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// A strict list of words that add zero value to a sentence
const FILLER_WORDS = new Set([
  'just', 'really', 'very', 'literally', 'basically', 'actually', 
  'totally', 'absolutely', 'suddenly', 'somehow', 'quite', 'rather', 
  'somewhat', 'simply', 'literally', 'honestly', 'obviously', 'essentially'
]);

const AdverbSpotter = () => {
  const [text, setText] = useState('');

  // Process text to find Adverbs and Filler Words
  const stats = useMemo(() => {
    if (!text.trim()) return { adverbs: 0, fillers: 0, total: 0, status: 'Clean', color: 'text-slate-400' };
    
    // 1. Find Adverbs using compromise NLP
    const doc = nlp(text);
    const adverbsList = doc.adverbs().out('array');
    
    // 2. Find Filler Words manually via regex
    const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    const fillersList = words.filter(w => FILLER_WORDS.has(w));

    const totalFluff = adverbsList.length + fillersList.length;
    const wordCount = words.length || 1;
    const density = (totalFluff / wordCount) * 100;
    
    let status = 'Tight & Concise';
    let color = 'text-emerald-500';
    
    if (density > 10) {
      status = 'Heavy Fluff Detected';
      color = 'text-rose-500';
    } else if (density > 5) {
      status = 'Some Weak Words';
      color = 'text-amber-500';
    }

    return {
      adverbs: adverbsList.length,
      fillers: fillersList.length,
      total: totalFluff,
      status,
      color
    };
  }, [text]);

  // Generate safe HTML with distinct highlights
  const highlightedText = useMemo(() => {
    if (!text.trim()) return { __html: '' };
    
    // Escape standard HTML first
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Highlight Adverbs (Purple) using compromise to wrap them securely
    const doc = nlp(escaped);
    doc.adverbs().prepend('[[[ADV_START]]]').append('[[[ADV_END]]]');
    escaped = doc.text();

    // Replace ADV tokens with HTML
    escaped = escaped
      .replace(/\[\[\[ADV_START\]\]\]/g, '<mark class="bg-purple-100 text-purple-800 font-bold px-1 rounded shadow-sm border border-purple-200" title="Adverb">')
      .replace(/\[\[\[ADV_END\]\]\]/g, '</mark>');

    // Highlight Filler Words (Amber) using Regex
    const fillerArray = Array.from(FILLER_WORDS);
    const fillerRegex = new RegExp(`\\b(${fillerArray.join('|')})\\b`, 'gi');
    
    escaped = escaped.replace(fillerRegex, '<mark class="bg-amber-100 text-amber-800 font-bold px-1 rounded shadow-sm border border-amber-200" title="Filler Word">$1</mark>');
      
    return { __html: escaped };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Adverb & Filler Word Spotter | Cut the Fluff" 
        description="Instantly find and remove weak adverbs and filler words from your writing. Make your sentences concise, punchy, and professional." 
        path="/adverb-spotter" 
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
          <li className="text-slate-900 font-medium">Adverb & Filler Spotter</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Fluff Spotter
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Identify weak adverbs and filler words to make your writing punchy and direct.
          </p>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Feather className="w-5 h-5 text-purple-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.adverbs}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Adverbs</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <EyeOff className="w-5 h-5 text-amber-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.fillers}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fillers</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px] text-center">
            {stats.total > 0 ? (
              <AlertCircle className={`w-5 h-5 mb-1 mx-auto ${stats.color}`} />
            ) : (
              <Zap className={`w-5 h-5 mb-1 mx-auto ${stats.color}`} />
            )}
            <div className={`text-sm font-black mt-1 leading-tight ${stats.color}`}>
              {stats.status}
            </div>
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
            placeholder="Type or paste your text here to find adverbs and fluff. Example: 'I literally just ran very quickly to the store.'"
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Editor's View
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Weak words will be highlighted here...
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

export default AdverbSpotter;