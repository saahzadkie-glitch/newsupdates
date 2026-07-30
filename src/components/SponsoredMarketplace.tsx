import React, { useState } from 'react';
import { SponsoredArticlePackage, SponsoredArticleSubmission, SponsoredPackageTier } from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { INITIAL_SPONSORED_PACKAGES } from '../data/monetizationData';
import { 
  Megaphone, 
  CheckCircle, 
  Sparkles, 
  Building2, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SponsoredMarketplaceProps {
  submissions: SponsoredArticleSubmission[];
  onSubmissionsUpdate: () => void;
}

export const SponsoredMarketplace: React.FC<SponsoredMarketplaceProps> = ({ submissions, onSubmissionsUpdate }) => {
  const [selectedPackage, setSelectedPackage] = useState<SponsoredPackageTier>('premium');
  const [showSubmissionForm, setShowSubmissionForm] = useState<boolean>(false);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const activePackage = INITIAL_SPONSORED_PACKAGES.find(p => p.id === selectedPackage) || INITIAL_SPONSORED_PACKAGES[1];

  const handleSubmitSponsoredArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !companyEmail || !articleTitle || !articleContent) return;

    MonetizationStorageService.addSponsoredSubmission({
      companyName,
      companyEmail,
      companyWebsite: companyWebsite || 'https://' + companyName.toLowerCase().replace(/\s+/g, '') + '.com',
      packageTier: selectedPackage,
      articleTitle,
      articleContent,
      logoUrl: logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      amountPaid: activePackage.price
    });

    onSubmissionsUpdate();
    setIsSuccess(true);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      setShowSubmissionForm(false);
      setIsSuccess(false);
      setArticleTitle('');
      setArticleContent('');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Megaphone className="w-3.5 h-3.5 text-indigo-400" />
            Sponsored Content & Brand Publishing
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight">
            Publish Sponsored Articles on NewUpdate
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Position your technology brand, software tool, or cloud infrastructure before 100,000+ active developers, CTOs, and tech decision-makers.
          </p>
        </div>
      </div>

      {/* Package Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INITIAL_SPONSORED_PACKAGES.map(pkg => {
          const isSelected = pkg.id === selectedPackage;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`rounded-3xl p-6 md:p-8 border flex flex-col justify-between transition-all duration-300 cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-indigo-500 shadow-xl ring-2 ring-indigo-500'
                  : 'bg-white dark:bg-slate-900/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              {pkg.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-bold">{pkg.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-black">${pkg.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ publication</span>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs opacity-90 leading-snug">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPackage(pkg.id);
                  setShowSubmissionForm(true);
                }}
                className={`w-full mt-6 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white'
                }`}
              >
                <span>Select {pkg.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Submitted Articles Queue Status */}
      {submissions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Recent Sponsored Submissions Status</span>
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {submissions.map(sub => (
              <div key={sub.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{sub.articleTitle}</h4>
                  <span className="text-slate-500 dark:text-slate-400">By {sub.companyName} • Package: {sub.packageTier.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    sub.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    sub.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Sponsored Article Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submit Sponsored Article</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Selected Plan: <span className="font-bold uppercase text-indigo-500">{activePackage.title} (${activePackage.price})</span></p>
              </div>
              <button
                onClick={() => setShowSubmissionForm(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {isSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold">Submission Received!</h4>
                <p className="text-xs text-slate-300">Our editorial review desk will review and publish your sponsored content within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitSponsoredArticle} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Cloud Corp"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Business Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sponsor@acme.com"
                      value={companyEmail}
                      onChange={e => setCompanyEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Article Headline / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next-Gen Kubernetes Security Best Practices for 2026"
                    value={articleTitle}
                    onChange={e => setArticleTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Article Body Content *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write or paste your article markdown text here..."
                    value={articleContent}
                    onChange={e => setArticleContent(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  Pay & Submit Article (${activePackage.price})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
