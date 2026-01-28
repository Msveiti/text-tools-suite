import { SEO } from '../components/SEO';

const LegalPage = ({ title, lastUpdated, path, children }: any) => (
  <main className="max-w-4xl mx-auto py-20 px-6 animate-in">
    <SEO title={title} description={title} path={path} />
    <div className="mb-16 border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-400 font-bold mt-4 uppercase text-xs tracking-widest text-indigo-500">Last Updated: {lastUpdated}</p>
    </div>
    <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-black">
        {children}
    </div>
  </main>
);

export default LegalPage;