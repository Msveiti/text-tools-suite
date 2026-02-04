import { useState } from 'react';
import { converters } from '../utils/textLogic';
import { SEO } from '../components/SEO';
import { Toast } from '../components/Toast';
import { Home } from 'lucide-react';

interface CaseConverterProps {
  seoTitle?: string;
  seoDescription?: string;
}

const CaseConverter = ({ seoTitle, seoDescription }: CaseConverterProps) => {
  const [text, setText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleConvert = (type: keyof typeof converters) => {
    setText(converters[type](text));
  };

  const copyToClipboard = () => {
    if (text.trim()) {
      navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in">
      {/* Use custom SEO props if provided */}
      <SEO 
        title={seoTitle || "Case Converter"} 
        description={seoDescription || "Change text case instantly. Convert to uppercase, lowercase, sentence case, and title case."} 
        path="/case-converter" 
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-slate-500">
          <li>
            <a href="/" className="flex items-center hover:text-indigo-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span className="sr-only">Home</span>
            </a>
          </li>
          <li className="text-slate-900 font-medium">Case Converter</li>
        </ol>
      </nav>

      {/* Toast Notification */}
      <Toast message="Copied to clipboard" show={showToast} />
      
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
            onClick={copyToClipboard}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!text.trim()}
          >
            Copy Result
          </button>
          <button 
            onClick={() => setText('')}
            className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!text.trim()}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// Default props in case they're not provided
CaseConverter.defaultProps = {
  seoTitle: "Case Converter: Transform Text Instantly",
  seoDescription: "Convert text to uppercase, lowercase, sentence case, or title case in one click. Perfect for formatting documents, code, and social media posts. No signup required."
};

export default CaseConverter;