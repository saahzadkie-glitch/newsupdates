import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Check, Sparkles, Send } from 'lucide-react';

interface NewsletterSectionProps {
  onSubscribe: (email: string, categories: string[]) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['technology', 'ai']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topicsList = [
    { id: 'technology', label: 'Tech' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'finance', label: 'Finance' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' }
  ];

  const toggleTopic = (id: string) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics(selectedTopics.filter(t => t !== id));
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    onSubscribe(email.trim(), selectedTopics);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-8 md:p-12 shadow-2xl border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Daily AI Briefing
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
            Join The Neural Loop
          </h2>

          <p className="text-sm md:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Morning briefings curated and verified by our editorial intelligence engine delivered straight to your inbox every day.
          </p>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-500/40 text-emerald-300 space-y-2 max-w-md mx-auto animate-in zoom-in duration-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white">You are Subscribed!</h4>
              <p className="text-xs text-slate-200">
                We have added <span className="font-semibold text-white">{email}</span> to your selected topic feeds.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              {/* Topics Selection */}
              <div className="flex flex-wrap justify-center gap-2">
                {topicsList.map(t => {
                  const isChecked = selectedTopics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopic(t.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        isChecked
                          ? 'bg-indigo-500 text-white border border-indigo-400'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/5'
                      }`}
                    >
                      {t.label} {isChecked && '✓'}
                    </button>
                  );
                })}
              </div>

              {/* Input Form */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 text-sm font-medium backdrop-blur-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe Free</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Zero spam. Unsubscribe anytime with 1 click. Powered by AI News Desk.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
