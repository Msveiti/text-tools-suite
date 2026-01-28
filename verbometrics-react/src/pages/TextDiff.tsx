import { useState, useMemo } from 'react';
import { computeDiff } from '../utils/textLogic';
import { SEO } from '../components/SEO';
import { StatCard } from '../components/Cards';
import { SearchCode, ArrowRightLeft } from 'lucide-react';

const TextDiff = () => {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  
  const diffResult = useMemo(() => computeDiff(oldText, newText), [oldText, newText]);
  
  const stats = useMemo(() => {
    const added = diffResult.filter(d => d.type === 'added').length;
    const unchanged = diffResult.filter(d => d.type === 'unchanged').length;
    const total = diffResult.length;
    return {
      changes: added,
      similarity: total > 0 ? Math.round((unchanged / total) * 100) : 100
    };
  }, [diffResult]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO title="Text Diff" description="Compare two texts." path="/text-diff" />

      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Version Control</h2>
          <p className="text-slate-500 mt-2 text-lg">Pinpoint evolution between two narratives.</p>
        </div>
        <div className="flex gap-4">
          <StatCard label="Similarity" value={`${stats.similarity}%`} colorClass="text-emerald-500" />
          <StatCard label="Additions" value={stats.changes} colorClass="text-indigo-600" />
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Original Draft</label>
          <textarea 
            className="w-full h-80 p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 font-medium"
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Paste original version..."
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Updated Version</label>
          <textarea 
            className="w-full h-80 p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all text-slate-600 font-medium"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste new version..."
          />
        </div>
      </div>

      {/* Output Comparison */}
      <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center gap-3 mb-8">
          <SearchCode className="text-indigo-600 w-6 h-6" />
          <h3 className="text-2xl font-black text-slate-900">Comparative Analysis</h3>
        </div>
        
        <div className="p-10 bg-slate-50 rounded-[32px] leading-relaxed text-xl font-medium">
          {!oldText && !newText ? (
            <span className="text-slate-300 italic">Enter text above to see diff...</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {diffResult.map((word, i) => (
                <span 
                  key={i} 
                  className={`px-1 rounded-md transition-all ${
                    word.type === 'added' 
                    ? 'bg-indigo-100 text-indigo-700 font-bold' 
                    : 'text-slate-500'
                  }`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => { const temp = oldText; setOldText(newText); setNewText(temp); }}
        className="mt-8 mx-auto flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl"
      >
        <ArrowRightLeft className="w-4 h-4" /> Swap Perspectives
      </button>
    </div>
  );
};

export default TextDiff;