import { useState, useMemo } from 'react';
import { getStats, getKeywordDensity, getAIInsights } from '../utils/textLogic';
import { StatCard, SocialCard } from '../components/Cards';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WordCounter = () => {
  const [text, setText] = useState('');
  const stats = useMemo(() => getStats(text), [text]);
  const densityData = useMemo(() => getKeywordDensity(text), [text]);
  const aiInsights = useMemo(() => getAIInsights(text), [text]);

  return (
    <div className="max-w-7xl mx-auto px-6 animate-in">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-6xl font-[900] text-slate-900 tracking-tight mb-2">Writing Analytics</h2>
        <p className="text-slate-500 text-lg font-medium">Real-time metrics and lexical signals.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        <StatCard label="Words" value={stats.words} colorClass="text-indigo-600" />
        <StatCard label="Chars" value={stats.characters} colorClass="text-indigo-600" />
        <StatCard label="Sentences" value={stats.sentences} colorClass="text-indigo-600" />
        <StatCard label="Paras" value={stats.paragraphs} colorClass="text-indigo-600" />
        <StatCard label="Reading" value={`${stats.readingTime}m`} colorClass="text-emerald-500" />
        <StatCard label="Speaking" value={`${stats.speakingTime}m`} colorClass="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Area */}
        <div className="lg:col-span-8 space-y-10">
          <div className="relative group">
            <div className="absolute top-6 left-6 flex gap-2 z-10">
               <button 
                 onClick={() => setText('')} 
                 className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-black uppercase rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all"
               >
                 Clear
               </button>
               <button 
                 onClick={() => navigator.clipboard.writeText(text)} 
                 className="px-4 py-2 bg-indigo-50 text-indigo-400 text-xs font-black uppercase rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
               >
                 Copy
               </button>
            </div>
            <textarea 
              className="w-full h-[600px] p-16 pt-24 rounded-[48px] bg-white border-none shadow-2xl shadow-slate-200/50 text-xl font-medium text-slate-700 outline-none focus:ring-4 ring-indigo-500/5 transition-all placeholder:text-slate-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Draft content..."
            />
          </div>

          {/* Lexical Density Chart */}
          {densityData.length > 0 && (
            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-3xl font-black mb-8 text-slate-900">Lexical Density</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={densityData} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="word" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontWeight: 'bold', fill: '#64748b' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }} 
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: 'none', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                        padding: '12px'
                      }} 
                      formatter={(value) => [`${value} occurrences`, 'Count']}
                    />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={20}>
                      {densityData.map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index % 4 === 0 ? '#6366f1' : 
                                index % 4 === 1 ? '#818cf8' : 
                                index % 4 === 2 ? '#a5b4fc' : 
                                '#c7d2fe'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Verbo Intelligence Box - Updated with real AI insights */}
          <div className="bg-[#0F172A] p-10 rounded-[40px] text-white shadow-2xl shadow-indigo-900/20">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Verbo Intelligence</h3>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">
              {aiInsights}
            </p>
            
            {/* Additional insights based on text length */}
            {text.length > 100 && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-xl">
                    <div className="text-xs uppercase text-slate-400 mb-1">Word Variety</div>
                    <div className="font-bold text-slate-200">
                      {(() => {
                        const uniqueWords = new Set(text.toLowerCase().match(/\b\w+\b/g) || []);
                        return `${((uniqueWords.size / Math.max(stats.words, 1)) * 100).toFixed(0)}%`;
                      })()}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl">
                    <div className="text-xs uppercase text-slate-400 mb-1">Avg. Sentence</div>
                    <div className="font-bold text-slate-200">
                      {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 text-slate-900">Social Safeguards</h3>
            <div className="space-y-6">
              <SocialCard platform="Twitter / X" limit={280} current={stats.characters} icon="🐦" />
              <SocialCard platform="Instagram Caption" limit={2200} current={stats.characters} icon="📸" />
              <SocialCard platform="Facebook Post" limit={63206} current={stats.characters} icon="👥" />
              <SocialCard platform="LinkedIn Post" limit={3000} current={stats.characters} icon="💼" />
              <SocialCard platform="Meta Description" limit={160} current={stats.characters} icon="🔍" />
            </div>
          </div>

          {/* Advanced Metrics Card */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 text-slate-900">Advanced Metrics</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Chars (no spaces)</span>
                <span className="font-bold text-slate-900">{stats.charsNoSpaces}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Unique Words</span>
                <span className="font-bold text-slate-900">
                  {(() => {
                    const uniqueWords = new Set(text.toLowerCase().match(/\b\w+\b/g) || []);
                    return uniqueWords.size;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Avg. Word Length</span>
                <span className="font-bold text-slate-900">
                  {stats.words > 0 ? (stats.charsNoSpaces / stats.words).toFixed(1) : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Words per Paragraph</span>
                <span className="font-bold text-slate-900">
                  {stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;