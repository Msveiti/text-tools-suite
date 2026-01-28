import { useState } from 'react';
import { converters } from '../utils/textLogic';
import { SEO } from '../components/SEO';

const CaseConverter = () => {
  const [text, setText] = useState('');

  const handleConvert = (type: keyof typeof converters) => {
    setText(converters[type](text));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in">
      <SEO title="Case Converter" description="Change text case instantly." path="/case-converter" />
      
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Case Converter</h2>
        <p className="text-slate-500 mt-3 text-lg">Shift your narrative perspective instantly.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'UPPERCASE', key: 'upper' },
          { label: 'lowercase', key: 'lower' },
          { label: 'Sentence case', key: 'sentence' },
          { label: 'Title Case', key: 'title' }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => handleConvert(btn.key as any)}
            className="h-14 bg-white border border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-95"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="relative group">
        <textarea
          className="w-full h-[400px] p-10 rounded-[40px] border-2 border-slate-100 shadow-2xl text-lg focus:border-indigo-500 outline-none transition-all bg-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
        />
        
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button 
            onClick={() => { navigator.clipboard.writeText(text); alert('Copied!'); }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Copy Result
          </button>
          <button 
            onClick={() => setText('')}
            className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;