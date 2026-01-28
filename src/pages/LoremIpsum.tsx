import { useState } from 'react';
import { generateLorem } from '../utils/textLogic';
import { SEO } from '../components/SEO';
import { Sparkles, Copy, Trash2 } from 'lucide-react';

const LoremIpsum = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    setOutput(generateLorem(count, type));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in">
      <SEO title="Lorem Ipsum" description="Generate placeholder text." path="/lorem-ipsum" />
      
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Placeholder Engine</h2>
        <p className="text-slate-500 mt-3 text-lg">Generate high-fidelity dummy text for your mockups.</p>
      </div>

      {/* Settings Bar */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mb-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-14 bg-slate-50 rounded-2xl border-none text-center font-black text-indigo-600 focus:ring-4 ring-indigo-500/10 outline-none"
          />
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {(['words', 'sentences', 'paragraphs'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  type === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          className="h-14 px-10 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          <Sparkles className="w-4 h-4" /> Generate
        </button>
      </div>

      {/* Output Card */}
      <div className="relative group">
        <textarea
          readOnly
          className="w-full h-[500px] p-12 rounded-[48px] bg-white border-none shadow-2xl shadow-slate-200/50 text-lg leading-relaxed text-slate-600 outline-none placeholder:text-slate-200"
          value={output}
          placeholder="Generated text will appear here..."
        />
        
        {output && (
          <div className="absolute bottom-10 right-10 flex gap-3">
            <button 
              onClick={() => { navigator.clipboard.writeText(output); alert('Copied!'); }}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
            <button 
              onClick={() => setOutput('')}
              className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:text-rose-500 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoremIpsum;