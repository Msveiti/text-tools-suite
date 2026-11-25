import { useState, type FormEvent } from 'react';
import { SEO } from '../components/SEO';
import { Mail, Bug, Lightbulb } from 'lucide-react';

// Single source of truth for the support inbox.
const SUPPORT_EMAIL = 'yarka20250826@gmail.com';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`VerboMetrics enquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name || '(no name)'}\nReply to: ${email || '(no email)'}`
    );

    // No backend: hand the message to the visitor's mail client so nothing is
    // silently dropped. Swap this for a Formspree/API endpoint when available.
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in">
      <SEO
        title="Contact VerboMetrics"
        description="Questions, bug reports or feature requests for the VerboMetrics writing tools? Email the team or send a message here."
        path="/contact"
      />

      <div className="mb-16">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Contact Us</h1>
        <p className="text-slate-500 mt-3 text-lg">We’re here to help you optimize your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Email Us', desc: 'General inquiries', icon: <Mail className="w-6 h-6 text-indigo-600" aria-hidden="true" /> },
          { title: 'Report a Bug', desc: 'Something broken?', icon: <Bug className="w-6 h-6 text-rose-600" aria-hidden="true" /> },
          { title: 'Feature Request', desc: 'Share your ideas', icon: <Lightbulb className="w-6 h-6 text-amber-600" aria-hidden="true" /> },
        ].map((card) => (
          <a
            key={card.title}
            href={`mailto:${SUPPORT_EMAIL}`}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-1">{card.title}</h2>
            <p className="text-slate-400 font-medium">{card.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-2xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Full Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold"
              placeholder="john@example.com"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-40 p-6 bg-slate-50 rounded-[32px] border-2 border-transparent focus:border-indigo-500 outline-none transition-all font-bold"
              placeholder="How can we help?"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
            >
              Send Message
            </button>
            <p className="text-slate-400 text-sm font-medium mt-4 text-center" role="status" aria-live="polite">
              {sent
                ? 'Your email app should open with the message ready to send. If it did not, email us directly at ' + SUPPORT_EMAIL + '.'
                : 'This opens your email app with the message pre-filled — no account needed.'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
