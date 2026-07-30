import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Article, 
  Category, 
  AdPlacement, 
  AutoPublisherSettings, 
  PublishingLog, 
  NewsletterSubscriber,
  RevenueAnalyticsSummary,
  SponsoredArticleSubmission,
  AiToolListing,
  AffiliateProduct,
  DigitalProduct
} from '../types';
import { MonetizationDashboard } from './MonetizationDashboard';
import {
  ShieldCheck,
  Plus,
  BarChart3,
  Bot,
  FileText,
  Settings,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Sparkles,
  RefreshCw,
  Clock,
  LayoutGrid,
  Send,
  Sliders,
  Eye,
  X,
  Play
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  ads: AdPlacement[];
  onUpdateAds: (ads: AdPlacement[]) => void;
  settings: AutoPublisherSettings;
  onUpdateSettings: (settings: AutoPublisherSettings) => void;
  logs: PublishingLog[];
  subscribers: NewsletterSubscriber[];
  onTriggerAiGenerate: (topic: string, category: string, isBreaking: boolean) => Promise<boolean>;
  revenueSummary: RevenueAnalyticsSummary;
  sponsoredSubmissions: SponsoredArticleSubmission[];
  aiTools: AiToolListing[];
  affiliates: AffiliateProduct[];
  digitalProducts: DigitalProduct[];
  onMonetizationDataRefresh: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  categories,
  onUpdateCategories,
  ads,
  onUpdateAds,
  settings,
  onUpdateSettings,
  logs,
  subscribers,
  onTriggerAiGenerate,
  revenueSummary,
  sponsoredSubmissions,
  aiTools,
  affiliates,
  digitalProducts,
  onMonetizationDataRefresh
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'monetization' | 'ai_engine' | 'articles' | 'ads' | 'categories' | 'logs'>('analytics');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [genCategory, setGenCategory] = useState('technology');
  const [genBreaking, setGenBreaking] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [aiPromptHelper, setAiPromptHelper] = useState('');
  const [isImproving, setIsImproving] = useState(false);

  if (!isOpen) return null;

  const totalViews = articles.reduce((acc, a) => acc + a.viewCount, 0);

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const success = await onTriggerAiGenerate(genTopic, genCategory, genBreaking);
    setIsGenerating(false);
    if (success) {
      setGenTopic('');
      setActiveTab('articles');
    }
  };

  const handleCategoryToggle = (id: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c);
    onUpdateCategories(updated);
  };

  const handleAdToggle = (id: string) => {
    const updated = ads.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a);
    onUpdateAds(updated);
  };

  const handleAdSnippetChange = (id: string, code: string, bannerUrl?: string) => {
    const updated = ads.map(a => a.id === id ? { ...a, codeSnippet: code, imageBannerUrl: bannerUrl || a.imageBannerUrl } : a);
    onUpdateAds(updated);
  };

  const handleAiImprove = async () => {
    if (!editingArticle || !editingArticle.body) return;
    setIsImproving(true);
    try {
      const res = await fetch('/api/ai/improve-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleBody: editingArticle.body, prompt: aiPromptHelper || 'Polish markdown layout' })
      });
      const data = await res.json();
      if (data.success && data.improvedBody) {
        setEditingArticle({ ...editingArticle, body: data.improvedBody });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsImproving(false);
      setAiPromptHelper('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-6xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="lg" />
            <div className="h-8 w-px bg-slate-800 hidden sm:block mx-1" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Admin Control Desk</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v3.0 Monetized
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage AI News Engine, AdSense, B2B Submissions & Revenue Analytics</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto bg-slate-100 dark:bg-slate-950 px-4 border-b border-slate-200 dark:border-slate-800 gap-1 text-xs font-bold no-scrollbar">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Performance Analytics
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'monetization'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-500" /> Revenue & Monetization
          </button>
          <button
            onClick={() => setActiveTab('ai_engine')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'ai_engine'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-500" /> AI Engine & Scheduler
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'articles'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'ads'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-500" /> AdSense Code
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'categories'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Categories
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'logs'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" /> Audit Logs ({logs.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-900/50">
          {/* Revenue & Monetization Hub Tab */}
          {activeTab === 'monetization' && (
            <MonetizationDashboard
              revenueSummary={revenueSummary}
              sponsoredSubmissions={sponsoredSubmissions}
              aiTools={aiTools}
              affiliates={affiliates}
              digitalProducts={digitalProducts}
              onDataRefresh={onMonetizationDataRefresh}
            />
          )}

          {/* Analytics View */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Total Articles</span>
                    <FileText className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{articles.length}</div>
                  <p className="text-[11px] text-emerald-500 font-semibold">↑ 100% Automated Output</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Total Article Views</span>
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{totalViews.toLocaleString()}</div>
                  <p className="text-[11px] text-indigo-500 font-semibold">Across all 14 categories</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Active Subscribers</span>
                    <Users className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{subscribers.length + 1420}</div>
                  <p className="text-[11px] text-emerald-500 font-semibold">Daily Digest Enabled</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Total Earnings</span>
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    ${revenueSummary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold">Affiliates + Products + Sponsors</p>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <h3 className="font-bold text-lg">AI Auto-News Publisher Status: ACTIVE</h3>
                </div>
                <p className="text-xs text-slate-300">
                  Engine scanning global search trends every {settings.frequencyHours} hours using Gemini 3.6 Flash with Google Search Grounding. Next scheduled execution in 1 hour 15 mins.
                </p>
              </div>
            </div>
          )}

          {/* AI Engine & Scheduler */}
          {activeTab === 'ai_engine' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Instant Manual AI Generation */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <Bot className="w-5 h-5" />
                  <h3>Instant AI Article Generator</h3>
                </div>

                <form onSubmit={handleGenerateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Topic or Guideline (Leave blank for Auto-Detect Breaking News)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Breakthrough in room temperature superconductors, SpaceX Starship launch..."
                      value={genTopic}
                      onChange={e => setGenTopic(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={genCategory}
                        onChange={e => setGenCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={genBreaking}
                          onChange={e => setGenBreaking(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                        <span>Tag as Breaking News</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Gemini AI is Researching & Writing Story...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate & Auto-Publish Article</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Automated Scheduler Settings */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <Sliders className="w-5 h-5" />
                  <h3>Auto-Publish Schedule Settings</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Enable Auto-Publishing</div>
                      <p className="text-slate-400">Background AI engine continuously fetches and publishes new articles</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoPublishEnabled}
                      onChange={e => onUpdateSettings({ ...settings, autoPublishEnabled: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Publishing Frequency
                    </label>
                    <select
                      value={settings.frequencyHours}
                      onChange={e => onUpdateSettings({ ...settings, frequencyHours: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value={1}>Every 1 Hour (High Traffic Mode)</option>
                      <option value={2}>Every 2 Hours (Standard)</option>
                      <option value={6}>Every 6 Hours</option>
                      <option value={12}>Every 12 Hours</option>
                      <option value={24}>Every 24 Hours (Daily Digest)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Auto-Approve AI Content</div>
                      <p className="text-slate-400">If disabled, generated stories go to pending queue for admin review</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoApprove}
                      onChange={e => onUpdateSettings({ ...settings, autoApprove: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Management (CMS) */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">All Published Articles</h3>
                <button
                  onClick={() => {
                    const blank: Article = {
                      id: 'art-' + Date.now(),
                      slug: 'manual-article-' + Date.now(),
                      title: 'New Article Headline',
                      category: 'technology',
                      author: { name: 'PulseAI News Desk', role: 'Staff Writer', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80' },
                      publicationDate: new Date().toISOString(),
                      readingTime: 4,
                      summary: 'Brief news summary...',
                      body: 'Write or generate article body content here...',
                      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
                      tags: ['News'],
                      viewCount: 1,
                      likesCount: 0,
                      status: 'published',
                      metaTitle: 'New Article Headline',
                      metaDescription: 'Brief news summary...',
                      comments: []
                    };
                    setEditingArticle(blank);
                  }}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create Manual Article
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Views</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {articles.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                            {a.title}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px]">
                              {a.category}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">
                            {new Date(a.publicationDate).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-300 font-mono">
                            {a.viewCount.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                              {a.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => setEditingArticle(a)}
                              className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteArticle(a.id)}
                              className="p-1.5 rounded bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AdSense & Monetization */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
                <strong>Google AdSense Integration:</strong> Configure ad code snippets and toggles. Ad density is automatically constrained to maintain core web vitals and optimal reader experience.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ads.map(ad => (
                  <div key={ad.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{ad.name}</span>
                      <input
                        type="checkbox"
                        checked={ad.enabled}
                        onChange={() => handleAdToggle(ad.id)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Provider</label>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {ad.provider}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Ad Code Snippet / HTML</label>
                      <textarea
                        rows={3}
                        value={ad.codeSnippet}
                        onChange={e => handleAdSnippetChange(ad.id, e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Manager */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{cat.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cat.enabled}
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Audit Logs */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              {logs.map(log => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <span>{log.action}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-[10px]">
                        {log.status}
                      </span>
                    </div>
                    {log.articleTitle && <p className="text-slate-600 dark:text-slate-300 font-medium mt-0.5">{log.articleTitle}</p>}
                    <p className="text-slate-400 mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-slate-400 text-[11px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Drawer / Editor */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Article Details</h3>
              <button onClick={() => setEditingArticle(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white font-serif text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary}
                  onChange={e => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white"
                />
              </div>

              {/* Gemini AI Assistant Rewrite Box */}
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini Copilot Editor Assistant</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Add 2 paragraphs about economic impact, make intro punchier..."
                    value={aiPromptHelper}
                    onChange={e => setAiPromptHelper(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAiImprove}
                    disabled={isImproving}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold flex items-center gap-1"
                  >
                    {isImproving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>Rewrite</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Markdown Body</label>
                <textarea
                  rows={10}
                  value={editingArticle.body}
                  onChange={e => setEditingArticle({ ...editingArticle, body: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (articles.some(a => a.id === editingArticle.id)) {
                      onUpdateArticle(editingArticle);
                    } else {
                      onAddArticle(editingArticle);
                    }
                    setEditingArticle(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
