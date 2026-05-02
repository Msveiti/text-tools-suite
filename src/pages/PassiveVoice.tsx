import { useState, useMemo } from 'react';
import nlp from 'compromise';
import { SEO } from '../components/SEO';
import { Home, AlertTriangle, Search, Activity, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PassiveVoice = () => {
  const [text, setText] = useState('');

  // Process text through the NLP engine to find passive voice
  const stats = useMemo(() => {
    if (!text.trim()) return { totalSentences: 0, passiveCount: 0, percentage: 0, status: 'Neutral', color: 'text-slate-400' };
    
    const doc = nlp(text);
    const sentences = doc.sentences().length || 1;
    
    // compromise has a built-in method to detect passive verb phrases!
    const passivePhrases = (doc as any).verbs().isPassive();
    const passiveCount = passivePhrases.length;
    
    const percentage = Math.round((passiveCount / sentences) * 100);
    
    let status = 'Excellent';
    let color = 'text-emerald-500';
    
    if (percentage > 20) {
      status = 'Heavy Passive Voice';
      color = 'text-rose-500';
    } else if (percentage > 10) {
      status = 'Some Passive Voice';
      color = 'text-amber-500';
    }

    return {
      totalSentences: sentences,
      passiveCount,
      percentage,
      status,
      color
    };
  }, [text]);

  // Generate safe HTML with highlighted passive phrases
  const highlightedText = useMemo(() => {
    if (!text.trim()) return { __html: '' };
    
    const doc = nlp(text).clone();
    
    // Target the passive verb phrases and wrap them in custom tokens
    (doc as any).verbs().isPassive().prepend('[[[').append(']]]');
    const rawOutput = doc.text();
    
    // Escape standard HTML to prevent XSS attacks
    const escaped = rawOutput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Replace our tokens with styled Tailwind spans (Warning colors)
    const finalHtml = escaped
      .replace(/\[\[\[/g, '<mark class="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded shadow-sm border border-rose-200">')
      .replace(/\]\]\]/g, '</mark>');
      
    return { __html: finalHtml };
  }, [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in">
      <SEO 
        title="Free Passive Voice Checker | Find Passive Sentences Online" 
        description="Detect passive voice in your writing instantly. Free online tool to find passive sentences and improve your writing clarity and impact." 
        path="/passive-voice" 
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
          <li className="text-slate-900 font-medium">Passive Voice Detector</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Passive Voice Detector
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Identify weak phrasing and make your writing more active and direct.
          </p>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <Search className="w-5 h-5 text-indigo-500 mb-1" />
            <div className="text-2xl font-black text-slate-900">{stats.totalSentences}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sentences</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <AlertTriangle className={`w-5 h-5 mb-1 ${stats.color}`} />
            <div className={`text-2xl font-black ${stats.color}`}>{stats.passiveCount}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passive</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[100px] text-center">
            {stats.percentage > 10 ? (
              <Activity className={`w-5 h-5 mb-1 ${stats.color} mx-auto`} />
            ) : (
              <CheckCircle2 className={`w-5 h-5 mb-1 ${stats.color} mx-auto`} />
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
            placeholder="Type or paste your text here to find passive voice. Example: 'The ball was thrown by John' instead of 'John threw the ball'..."
            spellCheck="false"
          />
        </div>

        {/* Highlighted Output Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Detection Result
          </label>
          <div className="w-full h-[500px] overflow-y-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
            {!text ? (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Highlighted passive voice will appear here...
              </div>
            ) : stats.passiveCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-emerald-500">
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-medium">Great job! No passive voice detected.</p>
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

export default PassiveVoice;