import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Home, BarChart2, Hash, PieChart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Standard English stop words to filter out if requested
const STOP_WORDS = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were', 'am', 'been', 'being']);

const WordFrequency = () => {
  const [text, setText] = useState('');
  const [excludeCommon, setExcludeCommon] = useState(true);

  const stats = useMemo(() => {
    if (!text.trim()) return { total: 0, unique: 0, density: 0, topWords: [], maxCount: 0 };

    // Extract words using regex (includes words with apostrophes like "don't")
    const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    const totalWords = words.length;

    // Filter stop words if toggle is active
    const filteredWords = excludeCommon 
      ? words.filter(w => !STOP_WORDS.has(w) && w.length > 1) 
      : words;

    // Count frequencies
    const counts: Record<string, number> = {};
    filteredWords.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });

    // Calculate Unique Words (from the unfiltered list for accurate lexical density)
    const uniqueTotal = new Set(words).size;
    
    // Sort words by frequency (highest first)
    const sortedWords = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20); // Get top 20

    return {
      total: totalWords,
      unique: uniqueTotal,
      density: totalWords > 0 ? Math.round((uniqueTotal / totalWords) * 100) : 0,
      topWords: sortedWords,
      maxCount: sortedWords.length > 0 ? sortedWords[0][1] : 0
    };
  }, [text, excludeCommon]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO title="Word Frequency Counter & Lexical Density Analyzer" description="Free online word frequency counter. Find your most overused words, calculate lexical density, and improve your vocabulary diversity." path="/word-frequency"/>

      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-slate-500">
          <li>
            <Link to="/" className="flex items-center hover:text-indigo-600 transition-colors">
              <Home className="w-4 h-4 mr-1"/>
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="text-slate-900 font-medium">Word Frequency Analyzer</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Word Frequency
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Uncover repetitive phrasing and measure your lexical diversity.
          </p>
        </div>

        
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Hash className="w-5 h-5 text-indigo-500 mb-1"/>
            <div className="text-2xl font-black text-slate-900">{stats.total}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Words</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <PieChart className="w-5 h-5 text-emerald-500 mb-1"/>
            <div className="text-2xl font-black text-slate-900">{stats.unique}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unique</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]" title="Percentage of unique words">
            <BarChart2 className="w-5 h-5 text-amber-500 mb-1"/>
            <div className="text-2xl font-black text-slate-900">{stats.density}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Density</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        
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
            className="w-full h-[600px] p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 text-lg leading-relaxed resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to analyze word frequency..."
            spellCheck="false"
          />
        </div>

        
        <div className="space-y-4">
          <div className="flex justify-between items-center ml-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Top 20 Words
            </label>
            
            <button 
              onClick={() => setExcludeCommon(!excludeCommon)}
              className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
                excludeCommon ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Filter className="w-3 h-3"/>
              {excludeCommon ? 'Ignoring Stop Words' : 'Include Stop Words'}
            </button>
          </div>

          <div className="w-full h-[600px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-slate-100 shadow-sm">
            {!text ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">
                <BarChart2 className="w-12 h-12 text-slate-200 mb-4"/>
                <p>Frequency chart will appear here...</p>
              </div>
            ) : stats.topWords.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                No words found (or all filtered out).
              </div>
            ) : (
              <div className="space-y-4">
                {stats.topWords.map(([word, count], index) => (
                  <div key={word} className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-slate-700">
                        {index + 1}. {word}
                      </span>
                      <span className="font-bold text-indigo-600">{count}</span>
                    </div>
                    
                    <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(count / stats.maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WordFrequency;