import React, { useState } from 'react';
import { AiToolListing } from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  CheckCircle, 
  PlusCircle, 
  Star, 
  Eye, 
  MousePointerClick, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiToolsDirectoryProps {
  tools: AiToolListing[];
  onToolsUpdate: () => void;
}

export const AiToolsDirectory: React.FC<AiToolsDirectoryProps> = ({ tools, onToolsUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Form State
  const [toolName, setToolName] = useState('');
  const [toolTagline, setToolTagline] = useState('');
  const [toolDesc, setToolDesc] = useState('');
  const [toolCategory, setToolCategory] = useState('AI Coding & LLM');
  const [toolLogoUrl, setToolLogoUrl] = useState('');
  const [toolWebsiteUrl, setToolWebsiteUrl] = useState('');
  const [pricingModel, setPricingModel] = useState<'Free' | 'Freemium' | 'Paid' | 'Free Trial'>('Freemium');
  const [startingPrice, setStartingPrice] = useState('$19/mo');
  const [isPremiumPlan, setIsPremiumPlan] = useState(true);
  const [submittedBy, setSubmittedBy] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const categories = Array.from(new Set(tools.map(t => t.category)));

  const filteredTools = tools.filter(tool => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleVisitTool = (tool: AiToolListing) => {
    MonetizationStorageService.trackToolClick(tool.id);
    onToolsUpdate();
    window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName || !toolWebsiteUrl) return;

    MonetizationStorageService.addAiTool({
      name: toolName,
      tagline: toolTagline || 'Advanced AI Tool',
      description: toolDesc || 'Cutting-edge AI automation software platform.',
      category: toolCategory,
      logoUrl: toolLogoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: toolWebsiteUrl,
      isPremium: isPremiumPlan,
      isVerified: isPremiumPlan,
      pricingModel,
      startingPrice,
      rating: 5.0,
      reviewsCount: 1,
      submittedBy: submittedBy || 'Founder',
    });

    onToolsUpdate();
    setIsSubmittedSuccess(true);
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setTimeout(() => {
      setShowSubmitModal(false);
      setIsSubmittedSuccess(false);
      // Reset form
      setToolName('');
      setToolWebsiteUrl('');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Verified AI Directory & Tools Ecosystem
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight">
              Discover & Launch AI Software
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Explore premier AI tools, large language models, developer assistants, and generative creation platforms verified by our research team.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your AI Tool ($49/mo)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Categories ({tools.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI directory..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tools Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
              tool.isPremium 
                ? 'border-indigo-500/50 shadow-indigo-500/5 dark:shadow-indigo-500/10' 
                : 'border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            {tool.isPremium && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Listing
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                    {tool.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-indigo-500" title="Verified AI Tool" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{tool.category}</span>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {tool.tagline}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tool.rating}</span>
                  <span className="text-slate-400 font-normal">({tool.reviewsCount})</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                  {tool.pricingModel} • {tool.startingPrice}
                </span>
              </div>

              <button
                onClick={() => handleVisitTool(tool)}
                className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Visit AI Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit AI Tool Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submit AI Tool to Directory</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Put your AI product in front of 50,000+ tech leaders & engineers.</p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold">Tool Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">Your AI listing has been submitted and is active on the platform directory.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTool} className="space-y-4">
                {/* Plan Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setIsPremiumPlan(false)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      !isPremiumPlan
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Standard Listing</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">FREE</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Basic listing queue</span>
                  </div>

                  <div
                    onClick={() => setIsPremiumPlan(true)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      isPremiumPlan
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Featured Listing</span>
                    <span className="text-sm font-black">$49 / mo</span>
                    <span className="text-[10px] opacity-80 block mt-1">Instant approval + Top placement</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">AI Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CodePulse AI"
                    value={toolName}
                    onChange={e => setToolName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous AI Code Reviewer"
                    value={toolTagline}
                    onChange={e => setToolTagline(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={toolCategory}
                      onChange={e => setToolCategory(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="AI Coding & LLM">AI Coding & LLM</option>
                      <option value="Developer Tools">Developer Tools</option>
                      <option value="AI Search & Research">AI Search & Research</option>
                      <option value="Audio & Voice AI">Audio & Voice AI</option>
                      <option value="Design & Generative Media">Design & Generative Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Website URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={toolWebsiteUrl}
                      onChange={e => setToolWebsiteUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe core features and target users..."
                    value={toolDesc}
                    onChange={e => setToolDesc(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  Submit Product Listing ({isPremiumPlan ? '$49' : 'Free'})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
