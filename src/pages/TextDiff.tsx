import { useState, useMemo } from 'react';
import { computeDiff } from '../utils/textLogic';
import { SEO } from '../components/SEO';
import { StatCard } from '../components/Cards';
import { SearchCode, ArrowRightLeft, Home } from 'lucide-react';

const TextDiff = () => {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  
  const diffResult = useMemo(() => computeDiff(oldText, newText), [oldText, newText]);
  
  const stats = useMemo(() => {
    const added = diffResult.filter(d => d.type === 'added').length;
    const removed = diffResult.filter(d => d.type === 'removed').length;
    const unchanged = diffResult.filter(d => d.type === 'unchanged').length;
    const total = diffResult.length;

    return {
      added,
      removed,
      unchanged,
      similarity: total > 0 ? Math.round((unchanged / total) * 100) : 100,
      changes: added + removed
    };
  }, [diffResult]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO title="Text Diff" description="Compare two texts." path="/text-diff" />

      {/* Breadcrumb Navigation */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-slate-500">
          <li>
            <a href="/" className="flex items-center hover:text-indigo-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span className="sr-only">Home</span>
            </a>
          </li>
          <li className="text-slate-900 font-medium">Text Difference Checker</li>
        </ol>
      </nav>

      {/* Updated Header + Stats */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Version Control
          </h2>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Pinpoint evolution between two narratives.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <StatCard
            label="Similarity"
            value={`${stats.similarity}%`}
            colorClass="text-emerald-500"
          />
          <StatCard
            label="Additions"
            value={stats.changes}
            colorClass="text-indigo-600"
          />
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Original Draft
          </label>

          <textarea
            className="w-full h-80 p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 font-medium resize-none"
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Paste original version..."
          />

          <div className="text-xs text-slate-400 text-center">
            {oldText.length} characters • {oldText.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Updated Version
          </label>

          <textarea
            className="w-full h-80 p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 font-medium resize-none"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste new version..."
          />

          <div className="text-xs text-slate-400 text-center">
            {newText.length} characters • {newText.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
        </div>
      </div>

      {/* Output Comparison */}
      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <SearchCode className="text-indigo-600 w-6 h-6" />
            <h3 className="text-2xl font-black text-slate-900">
              Comparative Analysis
            </h3>
          </div>
        </div>

        {/* Updated Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full" />
            <span className="text-[10px] font-black uppercase text-slate-400">Added</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rose-400 rounded-full" />
            <span className="text-[10px] font-black uppercase text-slate-400">Removed</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded-full" />
            <span className="text-[10px] font-black uppercase text-slate-400">Unchanged</span>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-slate-50 rounded-[32px] min-h-[200px]">
          {!oldText && !newText ? (
            <div className="flex items-center justify-center h-40">
              <span className="text-slate-300 italic text-lg">
                Enter text above to see the difference...
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-1 gap-y-2 leading-relaxed">
              {diffResult.map((word, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    word.type === 'added'
                      ? 'bg-emerald-50 text-emerald-700 font-medium border-b-2 border-emerald-400'
                      : word.type === 'removed'
                      ? 'bg-rose-50 text-rose-600 line-through opacity-80 border border-rose-200'
                      : 'text-slate-500'
                  }`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats footer */}
        {oldText || newText ? (
          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Added Words</div>
              <div className="text-2xl font-bold text-emerald-600">{stats.added}</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Removed Words</div>
              <div className="text-2xl font-bold text-rose-600">{stats.removed}</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Unchanged</div>
              <div className="text-2xl font-bold text-slate-600">{stats.unchanged}</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Similarity</div>
              <div className="text-2xl font-bold text-indigo-600">{stats.similarity}%</div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          onClick={() => {
            const temp = oldText;
            setOldText(newText);
            setNewText(temp);
          }}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          <ArrowRightLeft className="w-4 h-4" /> Swap Texts
        </button>

        <button
          onClick={() => {
            setOldText('');
            setNewText('');
          }}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-200"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TextDiff;