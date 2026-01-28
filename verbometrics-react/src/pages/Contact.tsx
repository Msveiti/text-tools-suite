import { SEO } from '../components/SEO';
import { Mail, Bug, Lightbulb } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in">
      <SEO title="Contact" description="Get in touch." path="/contact" />
      
      <div className="mb-16">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Contact Us</h2>
        <p className="text-slate-500 mt-3 text-lg">We’re here to help you optimize your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Email Us", desc: "General inquiries", icon: <Mail className="w-6 h-6 text-indigo-600" />, link: "mailto:yarka20250826@gmail.com" },
          { title: "Report a Bug", desc: "Something broken?", icon: <Bug className="w-6 h-6 text-rose-600" />, link: "mailto:yarka20250826@gmail.com" },
          { title: "Feature Request", desc: "Share your ideas", icon: <Lightbulb className="w-6 h-6 text-amber-600" />, link: "mailto:yarka20250826@gmail.com" }
        ].map((card, i) => (
          <a key={i} href={card.link} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">{card.title}</h3>
            <p className="text-slate-400 font-medium">{card.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input type="text" className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input type="email" className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold" placeholder="john@example.com" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
            <textarea className="w-full h-40 p-6 bg-slate-50 rounded-[32px] border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold" placeholder="How can we help?" />
          </div>
          <button className="md:col-span-2 h-16 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;