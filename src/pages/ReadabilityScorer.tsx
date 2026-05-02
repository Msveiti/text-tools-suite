import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Home, BookOpen, GraduationCap, Activity, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadabilityScorer = () => {
  const [text, setText] = useState('');

  // Zero-dependency accurate syllable counter
  const countSyllables = (word: string) => {
    let w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (w.length <= 3) return 1;
    w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    const syllables = w.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  // Calculate Readability Metrics
  const metrics = useMemo(() => {
    if (!text.trim()) {
      return { words: 0, sentences: 0, syllables: 0, ease: 0, grade: 0, status: 'Neutral', color: 'text-slate-400', bg: 'bg-slate-50' };
    }

    // Split logic
    const wordsArr = text.split(/\s+/).filter(w => w.length > 0);
    const sentencesArr = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const words = wordsArr.length;
    const sentences = sentencesArr.length || 1; // Prevent division by zero
    const syllables = wordsArr.reduce((acc, word) => acc + countSyllables(word), 0);

    // Flesch Reading Ease Formula
    let ease = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    ease = Math.max(0, Math.min(100, Math.round(ease))); // Clamp between 0-100

    // Flesch-Kincaid Grade Level Formula
    let grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    grade = Math.max(0, Math.round(grade * 10) / 10); // Clamp to 0 minimum, 1 decimal

    // Categorization logic
    let status = 'Standard';
    let color = 'text-indigo-600';
    let bg = 'bg-indigo-50';

    if (ease >= 80) {
      status = 'Very Easy to Read';
      color = 'text-emerald-600';
      bg = 'bg-emerald-50';
    } else if (ease >= 60) {
      status = 'Conversational / Standard';
      color = 'text-blue-600';
      bg = 'bg-blue-50';
    } else if (ease >= 30) {
      status = 'Fairly Difficult';
      color = 'text-amber-600';
      bg = 'bg-amber-50';
    } else {
      status = 'Academic / Very Difficult';
      color = 'text-rose-600';
      bg = 'bg-rose-50';
    }

    return { words, sentences, syllables, ease, grade, status, color, bg };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Free Readability Checker | Flesch-Kincaid Calculator" 
        description="Check your text readability instantly. Free Flesch-Kincaid grade level calculator and reading ease scorer for SEO and content writers." 
        path="/readability-scorer" 
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
          <li className="text-slate-900 font-medium">Readability Scorer</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Readability Scorer
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Ensure your writing is perfectly tuned for your target audience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Main Score Card */}
        <div className={`p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center transition-colors duration-500 ${metrics.bg}`}>
          <Activity className={`w-8 h-8 mb-4 ${metrics.color}`} />
          <div className={`text-6xl font-black tracking-tighter ${metrics.color}`}>
            {metrics.ease}
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-slate-500 mt-2">
            Reading Ease Score
          </div>
          <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white shadow-sm ${metrics.color}`}>
            {metrics.status}
          </div>
        </div>

        {/* Grade Level Card */}
        <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
          <GraduationCap className="w-8 h-8 mb-4 text-indigo-500" />
          <div className="text-6xl font-black tracking-tighter text-slate-900">
            {metrics.grade}
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-slate-500 mt-2">
            Flesch-Kincaid Grade
          </div>
          <div className="mt-4 text-sm font-medium text-slate-400">
            (Years of education needed to understand)
          </div>
        </div>

        {/* Core Stats Details */}
        <div className="p-8 rounded-[40px] bg-slate-900 text-white shadow-xl flex flex-col justify-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Text Anatomy
          </h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-700 pb-2">
              <span className="font-medium text-slate-300">Sentences</span>
              <span className="text-2xl font-bold">{metrics.sentences}</span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-700 pb-2">
              <span className="font-medium text-slate-300">Words</span>
              <span className="text-2xl font-bold">{metrics.words}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-medium text-slate-300">Syllables</span>
              <span className="text-2xl font-bold">{metrics.syllables}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative group">
        <div className="flex justify-between items-center mb-4 ml-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <FileText className="w-3 h-3" /> Content Editor
          </label>
          <button 
            onClick={() => setText('')}
            className="text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-colors"
          >
            Clear Text
          </button>
        </div>
        <textarea
          className="w-full h-[400px] p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 text-lg leading-relaxed resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article, essay, or blog post here to check its readability score..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default ReadabilityScorer;