import { useState, useMemo } from 'react';
import Sentiment from 'sentiment';
import { SEO } from '../components/SEO';
import { Home, Smile, Frown, MessageSquare, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// Initialize the sentiment engine once
const sentimentEngine = new Sentiment();

const ToneAnalyzer = () => {
  const [text, setText] = useState('');

  // Process text through the Sentiment engine
  const stats = useMemo(() => {
    if (!text.trim()) return { score: 0, comparative: 0, positive: [], negative: [], status: 'Neutral', color: 'text-slate-400' };
    
    const result = sentimentEngine.analyze(text);
    
    let status = 'Neutral Tone';
    let color = 'text-slate-500';
    
    if (result.score > 2) {
      status = 'Highly Positive';
      color = 'text-emerald-500';
    } else if (result.score > 0) {
      status = 'Slightly Positive';
      color = 'text-emerald-400';
    } else if (result.score < -2) {
      status = 'Highly Negative';
      color = 'text-rose-500';
    } else if (result.score < 0) {
      status = 'Slightly Negative';
      color = 'text-rose-400';
    }

    return {
      score: result.score,
      comparative: result.comparative, // score per word
      positive: result.positive,
      negative: result.negative,
      status,
      color
    };
  }, [text]);

  // Generate safe HTML with highlighted positive and negative words
  const highlightedText = useMemo(() => {
    if (!text.trim()) return { __html: '' };
    
    // Escape standard HTML to prevent XSS attacks
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Highlight Positive Words (Green)
    if (stats.positive.length > 0) {
      // Sort by length descending so longer words match first (e.g., 'outstanding' before 'out')
      const posWords = [...new Set(stats.positive)].sort((a, b) => b.length - a.length);
      const posRegex = new RegExp(`\\b(${posWords.join('|')})\\b`, 'gi');
      escaped = escaped.replace(posRegex, '<mark class="bg-emerald-100 text-emerald-800 font-bold px-1 rounded shadow-sm border border-emerald-200">$1</mark>');
    }

    // Highlight Negative Words (Red)
    if (stats.negative.length > 0) {
      const negWords = [...new Set(stats.negative)].sort((a, b) => b.length - a.length);
      const negRegex = new RegExp(`\\b(${negWords.join('|')})\\b`, 'gi');
      escaped = escaped.replace(negRegex, '<mark class="bg-rose-100 text-rose-800 font-bold px-1 rounded shadow-sm border border-rose-200">$1</mark>');
    }
      
    return { __html: escaped };
  }, [text, stats]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Free Tone & Sentiment Analyzer | Text Tone Checker" 
        description="Instantly analyze the emotional tone of your writing. Free online sentiment analyzer to check if your text sounds positive, negative, or neutral." 
        path="/tone-analyzer" 
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
          <li className="text-slate-900 font-medium">Tone & Sentiment Analyzer</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Tone Analyzer
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Ensure your message strikes the perfect emotional chord.
          </p>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Smile className="w-5 h-5 text-emerald-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.positive.length}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Positive</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Frown className="w-5 h-5 text-rose-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.negative.length}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Negative</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px] text-center">
            <Activity className={`w-5 h-5 mb-1 mx-auto ${stats.color}`} />
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
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" /> Your Text
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
            placeholder="Type or paste your text here to analyze its emotional sentiment... Try words like 'excellent', 'horrible', 'love', or 'hate'."
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Sentiment Map
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Emotional triggers will be highlighted here...
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

export default ToneAnalyzer;