import { useState, useMemo } from 'react';
import nlp from 'compromise';
import { SEO } from '../components/SEO';
import { Home, AlignLeft, Maximize2, Activity, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SentenceLength = () => {
  const [text, setText] = useState('');

  // Process text to calculate sentence length stats
  const stats = useMemo(() => {
    if (!text.trim()) return { total: 0, avg: 0, longest: 0, status: 'Neutral', color: 'text-slate-400' };
    
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');
    
    if (sentences.length === 0) return { total: 0, avg: 0, longest: 0, status: 'Neutral', color: 'text-slate-400' };

    let maxLen = 0;
    let totalWords = 0;

    sentences.forEach((s: string) => {
      const wordCount = s.split(/\s+/).filter(w => w.length > 0).length;
      totalWords += wordCount;
      if (wordCount > maxLen) maxLen = wordCount;
    });

    const avg = Math.round(totalWords / sentences.length);

    let status = 'Good Variety';
    let color = 'text-emerald-500';

    if (avg > 20) {
      status = 'Very Wordy';
      color = 'text-rose-500';
    } else if (avg < 8) {
      status = 'Too Choppy';
      color = 'text-amber-500';
    }

    return {
      total: sentences.length,
      avg,
      longest: maxLen,
      status,
      color
    };
  }, [text]);

  // Generate safe HTML with distinct highlights per sentence length
  const highlightedText = useMemo(() => {
    if (!text.trim()) return { __html: '' };
    
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');
    let html = '';
    
    sentences.forEach((sentence: string) => {
      const wordCount = sentence.split(/\s+/).filter(w => w.length > 0).length;
      
      let bgColor = '';
      if (wordCount <= 8) {
        bgColor = 'bg-amber-100 text-amber-900 border-amber-200'; // Short
      } else if (wordCount <= 14) {
        bgColor = 'bg-emerald-100 text-emerald-900 border-emerald-200'; // Standard
      } else if (wordCount <= 22) {
        bgColor = 'bg-indigo-100 text-indigo-900 border-indigo-200'; // Long
      } else {
        bgColor = 'bg-rose-100 text-rose-900 border-rose-200'; // Run-on
      }

      // Escape standard HTML
      const escaped = sentence
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
        
      html += `<span class="${bgColor} border px-1.5 py-0.5 rounded mx-0.5 leading-[2.5] inline-block mb-1 shadow-sm transition-opacity hover:opacity-80" title="${wordCount} words">${escaped}</span> `;
    });
      
    return { __html: html };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Sentence Length Analyzer | Check Writing Rhythm" 
        description="Visualize your sentence lengths to avoid monotonous writing. Find run-on sentences and improve your text's rhythm and readability." 
        path="/sentence-length" 
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
          <li className="text-slate-900 font-medium">Sentence Length Analyzer</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Sentence Length
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Visualize your writing rhythm and break up exhausting run-on sentences.
          </p>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <AlignLeft className="w-5 h-5 text-indigo-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.avg}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Words</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]" title="Longest sentence">
            <Maximize2 className="w-5 h-5 text-rose-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.longest}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Longest</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px] text-center">
            <Activity className={`w-5 h-5 mb-1 mx-auto ${stats.color}`} />
            <div className={`text-sm font-black mt-1 leading-tight ${stats.color}`}>
              {stats.status}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 ml-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span className="w-3 h-3 rounded-full bg-amber-400"></span> Short (&lt;8)
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span className="w-3 h-3 rounded-full bg-emerald-400"></span> Standard (8-14)
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span className="w-3 h-3 rounded-full bg-indigo-400"></span> Long (15-22)
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span className="w-3 h-3 rounded-full bg-rose-400"></span> Run-on (&gt;22)
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
            placeholder="Paste your article here to see a visual map of your sentence rhythm..."
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <BarChart className="w-3 h-3" /> Rhythm Map
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Your color-coded sentence map will appear here...
              </div>
            ) : (
              <div 
                className="text-lg text-slate-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={highlightedText}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceLength;