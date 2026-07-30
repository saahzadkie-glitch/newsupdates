import React, { useState, useEffect } from 'react';
import { 
  Article, 
  Category, 
  AdPlacement, 
  AutoPublisherSettings, 
  PublishingLog, 
  NewsletterSubscriber,
  AffiliateProduct,
  SponsoredArticleSubmission,
  AiToolListing,
  DigitalProduct,
  UserSubscriptionState,
  RevenueAnalyticsSummary
} from './types';
import { StorageService } from './services/storage';
import { MonetizationStorageService } from './services/monetizationStorage';
import { Header, MonetizationTab } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { AdBanner } from './components/AdBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { SeoModal } from './components/SeoModal';
import { AdminDashboard } from './components/AdminDashboard';
import { StaticModal } from './components/StaticPages';
import { Footer } from './components/Footer';
import { AffiliateMarketplace } from './components/AffiliateMarketplace';
import { AiToolsDirectory } from './components/AiToolsDirectory';
import { DigitalStore } from './components/DigitalStore';
import { SponsoredMarketplace } from './components/SponsoredMarketplace';
import { MembershipModal } from './components/MembershipModal';
import { Sparkles, Bookmark, X, Flame, Layers } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<AdPlacement[]>([]);
  const [settings, setSettings] = useState<AutoPublisherSettings>({
    autoPublishEnabled: true,
    frequencyHours: 2,
    selectedCategories: ['technology', 'ai', 'cybersecurity', 'business', 'finance', 'science'],
    autoApprove: true,
    lastRunTimestamp: null,
    targetArticlesPerRun: 1
  });
  const [logs, setLogs] = useState<PublishingLog[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Monetization Tab & Data States
  const [activeMonetizationTab, setActiveMonetizationTab] = useState<MonetizationTab>('news');
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateProduct[]>([]);
  const [sponsoredSubmissions, setSponsoredSubmissions] = useState<SponsoredArticleSubmission[]>([]);
  const [aiToolsDirectory, setAiToolsDirectory] = useState<AiToolListing[]>([]);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscriptionState>({ tier: 'free', isAdFree: false });
  const [revenueSummary, setRevenueSummary] = useState<RevenueAnalyticsSummary>({
    totalRevenue: 0,
    affiliateEarnings: 0,
    sponsoredArticleIncome: 0,
    aiDirectoryIncome: 0,
    digitalProductSales: 0,
    newsletterAdRevenue: 0,
    googleAdsenseEst: 0,
    topPerformingProduct: '',
    monthlyGrowthRate: 0,
    dailyBreakdown: []
  });

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [staticModalType, setStaticModalType] = useState<'about' | 'contact' | 'privacy' | 'terms' | null>(null);
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);

  // Auto-update continuous engine state
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [newStoryToast, setNewStoryToast] = useState<Article | null>(null);

  // Load initial data
  useEffect(() => {
    const loadedArticles = StorageService.getArticles();
    const loadedCats = StorageService.getCategories();
    const loadedAds = StorageService.getAds();
    const loadedSettings = StorageService.getSettings();
    const loadedLogs = StorageService.getLogs();
    const loadedSubs = StorageService.getSubscribers();
    const loadedBookmarks = StorageService.getBookmarks();

    setArticles(loadedArticles);
    setCategories(loadedCats);
    setAds(loadedAds);
    setSettings(loadedSettings);
    setLogs(loadedLogs);
    setSubscribers(loadedSubs);
    setBookmarkedIds(loadedBookmarks);

    // Load Monetization Data
    refreshMonetizationData();

    // Dark mode init
    const isDark = localStorage.getItem('pulseai_dark_mode') !== 'false';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const refreshMonetizationData = () => {
    setAffiliateProducts(MonetizationStorageService.getAffiliateProducts());
    setSponsoredSubmissions(MonetizationStorageService.getSponsoredSubmissions());
    setAiToolsDirectory(MonetizationStorageService.getAiTools());
    setDigitalProducts(MonetizationStorageService.getDigitalProducts());
    setUserSubscription(MonetizationStorageService.getUserSubscription());
    setRevenueSummary(MonetizationStorageService.getRevenueSummary());
  };

  // Continuous Auto-Update Background Scheduler Effect
  useEffect(() => {
    if (!settings.autoPublishEnabled) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Trigger automated background story generation
          triggerAutomatedUpdate();
          return 45; // Reset countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.autoPublishEnabled, categories]);

  const triggerAutomatedUpdate = async () => {
    if (isAutoUpdating) return;
    setIsAutoUpdating(true);

    try {
      const activeCatList = categories.filter(c => c.enabled).map(c => c.id);
      const randomCat = activeCatList.length > 0 
        ? activeCatList[Math.floor(Math.random() * activeCatList.length)]
        : 'technology';

      const isBreakingChoice = Math.random() > 0.6;

      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: '',
          category: randomCat,
          isBreaking: isBreakingChoice
        })
      });

      const data = await res.json();
      if (data.success && data.article) {
        const updated = StorageService.addArticle(data.article);
        setArticles(updated);

        // Record log
        StorageService.addLog({
          timestamp: new Date().toISOString(),
          action: 'Autonomous Background Publish',
          articleTitle: data.article.title,
          category: data.article.category,
          status: 'success',
          details: 'Continuous AI engine auto-published new breaking coverage.'
        });
        setLogs(StorageService.getLogs());

        // Update settings last run timestamp
        const updatedSettings = {
          ...settings,
          lastRunTimestamp: new Date().toISOString()
        };
        setSettings(updatedSettings);
        StorageService.saveSettings(updatedSettings);

        // Trigger Toast Notification
        setNewStoryToast(data.article);
        setTimeout(() => setNewStoryToast(null), 6000);
      }
    } catch (err) {
      console.warn('Auto update cycle warning:', err);
    } finally {
      setIsAutoUpdating(false);
    }
  };

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('pulseai_dark_mode', String(next));
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleBookmark = (e: React.MouseEvent | null, id: string) => {
    if (e) e.stopPropagation();
    const updated = StorageService.toggleBookmark(id);
    setBookmarkedIds(updated);
  };

  const handleAddArticle = (article: Article) => {
    const updated = StorageService.addArticle(article);
    setArticles(updated);
    StorageService.addLog({
      timestamp: new Date().toISOString(),
      action: 'Article Created',
      articleTitle: article.title,
      category: article.category,
      status: 'success',
      details: 'Article created manually in admin desk.'
    });
    setLogs(StorageService.getLogs());
  };

  const handleUpdateArticle = (article: Article) => {
    const updated = StorageService.updateArticle(article);
    setArticles(updated);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = StorageService.deleteArticle(id);
    setArticles(updated);
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  const handleUpdateCategories = (newCats: Category[]) => {
    setCategories(newCats);
    StorageService.saveCategories(newCats);
  };

  const handleUpdateAds = (newAds: AdPlacement[]) => {
    setAds(newAds);
    StorageService.saveAds(newAds);
  };

  const handleUpdateSettings = (newSettings: AutoPublisherSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const handleTriggerAiGenerate = async (topic: string, category: string, isBreaking: boolean): Promise<boolean> => {
    try {
      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, isBreaking })
      });
      const data = await res.json();
      if (data.success && data.article) {
        handleAddArticle(data.article);
        return true;
      }
      return false;
    } catch (e) {
      console.error('AI Generation error:', e);
      return false;
    }
  };

  const handleSubscribeNewsletter = (email: string, selectedTopics: string[]) => {
    const updated = StorageService.addSubscriber(email, selectedTopics);
    setSubscribers(updated);
  };

  // Filtered articles
  const activeArticles = articles.filter(a => a.status === 'published');
  const filteredArticles = activeCategory
    ? activeArticles.filter(a => a.category === activeCategory)
    : activeArticles;

  // Hide banner ads if user has ad-free subscription tier
  const showAds = !userSubscription.isAdFree;
  const topAd = showAds ? ads.find(a => a.id === 'top_banner') : undefined;
  const inArticleAd = showAds ? ads.find(a => a.id === 'in_article') : undefined;
  const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
      {/* Breaking Ticker Banner */}
      <BreakingTicker
        articles={activeArticles}
        onSelectArticle={article => {
          setSelectedArticle(article);
          setActiveMonetizationTab('news');
        }}
        countdown={countdown}
        isAutoUpdating={isAutoUpdating}
        onManualTriggerUpdate={triggerAutomatedUpdate}
      />

      {/* Floating Real-time Auto-Published Story Toast */}
      {newStoryToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 border border-indigo-500/50 text-white rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                New Story Auto-Published
              </span>
            </div>
            <button
              onClick={() => setNewStoryToast(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <h4
            onClick={() => {
              setSelectedArticle(newStoryToast);
              setActiveMonetizationTab('news');
              setNewStoryToast(null);
            }}
            className="text-xs font-bold mt-2 text-white hover:text-indigo-300 cursor-pointer line-clamp-2 leading-snug"
          >
            {newStoryToast.title}
          </h4>
          <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
            {newStoryToast.summary}
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 capitalize">{newStoryToast.category}</span>
            <button
              onClick={() => {
                setSelectedArticle(newStoryToast);
                setActiveMonetizationTab('news');
                setNewStoryToast(null);
              }}
              className="text-indigo-400 hover:underline font-bold"
            >
              Read Now →
            </button>
          </div>
        </div>
      )}

      {/* Primary Navigation Header */}
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={catId => {
          setActiveCategory(catId);
          setSelectedArticle(null);
          setActiveMonetizationTab('news');
        }}
        activeMonetizationTab={activeMonetizationTab}
        onSelectMonetizationTab={tab => {
          setActiveMonetizationTab(tab);
          setSelectedArticle(null);
        }}
        articles={activeArticles}
        onSelectArticle={article => {
          setSelectedArticle(article);
          setActiveMonetizationTab('news');
        }}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onOpenMembership={() => setShowMembershipModal(true)}
        userTier={userSubscription.tier}
        bookmarkedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
      />

      {/* Top Banner Ad Placement */}
      {topAd && activeMonetizationTab === 'news' && (
        <div className="max-w-7xl mx-auto px-4">
          <AdBanner placement={topAd} />
        </div>
      )}

      {/* Main View Router */}
      {activeMonetizationTab === 'affiliates' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AffiliateMarketplace
            products={affiliateProducts}
            onProductsUpdate={refreshMonetizationData}
          />
        </div>
      ) : activeMonetizationTab === 'directory' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AiToolsDirectory
            tools={aiToolsDirectory}
            onToolsUpdate={refreshMonetizationData}
          />
        </div>
      ) : activeMonetizationTab === 'digital' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DigitalStore
            products={digitalProducts}
            onProductsUpdate={refreshMonetizationData}
          />
        </div>
      ) : activeMonetizationTab === 'sponsored' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SponsoredMarketplace
            submissions={sponsoredSubmissions}
            onSubmissionsUpdate={refreshMonetizationData}
          />
        </div>
      ) : selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          allArticles={activeArticles}
          onSelectArticle={art => setSelectedArticle(art)}
          onBack={() => setSelectedArticle(null)}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={id => handleToggleBookmark(null, id)}
          inArticleAd={inArticleAd}
        />
      ) : (
        <main className="pb-16 space-y-8">
          {/* Hero Section (Only on main feed) */}
          {!activeCategory && (
            <HeroSection
              articles={filteredArticles}
              onSelectArticle={art => setSelectedArticle(art)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={(e, id) => handleToggleBookmark(e, id)}
            />
          )}

          {/* Category Filter Header if category selected */}
          {activeCategory && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Category Feed
                  </span>
                  <h1 className="text-2xl md:text-3xl font-black font-serif text-slate-900 dark:text-white capitalize">
                    {categories.find(c => c.id === activeCategory)?.name || activeCategory} News
                  </h1>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {filteredArticles.length} Stories
                </span>
              </div>
            </div>
          )}

          {/* Main Grid Articles */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black font-serif text-slate-900 dark:text-white">
                {activeCategory ? 'Latest Category Briefings' : 'Latest Global Coverage'}
              </h3>
              <span className="text-xs text-slate-400">Auto-Updated continuously</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(activeCategory ? 0 : 4, 13).map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={art => setSelectedArticle(art)}
                  variant="standard"
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={(e, id) => handleToggleBookmark(e, id)}
                />
              ))}
            </div>
          </section>

          {/* In-Article / Content Ad Banner */}
          {inArticleAd && (
            <div className="max-w-7xl mx-auto px-4">
              <AdBanner placement={inArticleAd} />
            </div>
          )}

          {/* Newsletter Subscription */}
          <NewsletterSection onSubscribe={handleSubscribeNewsletter} />
        </main>
      )}

      {/* Footer */}
      <Footer
        categories={categories}
        onSelectCategory={catId => {
          setActiveCategory(catId);
          setSelectedArticle(null);
          setActiveMonetizationTab('news');
        }}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onOpenStaticModal={type => setStaticModalType(type)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Control Desk */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        articles={articles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onDeleteArticle={handleDeleteArticle}
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
        ads={ads}
        onUpdateAds={handleUpdateAds}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        logs={logs}
        subscribers={subscribers}
        onTriggerAiGenerate={handleTriggerAiGenerate}
        revenueSummary={revenueSummary}
        sponsoredSubmissions={sponsoredSubmissions}
        aiTools={aiToolsDirectory}
        affiliates={affiliateProducts}
        digitalProducts={digitalProducts}
        onMonetizationDataRefresh={refreshMonetizationData}
      />

      {/* Membership Modal */}
      {showMembershipModal && (
        <MembershipModal
          subscription={userSubscription}
          onSubscriptionUpdate={newSub => {
            setUserSubscription(newSub);
            refreshMonetizationData();
          }}
          onClose={() => setShowMembershipModal(false)}
        />
      )}

      {/* SEO & Markup Tools Modal */}
      <SeoModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
        currentArticle={selectedArticle || undefined}
      />

      {/* Static Info Modals */}
      <StaticModal type={staticModalType} onClose={() => setStaticModalType(null)} />

      {/* Bookmarks Drawer */}
      {showBookmarksDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl p-6 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Bookmark className="w-5 h-5 text-indigo-500 fill-indigo-500" />
                  <span>Saved Reading List ({bookmarkedArticles.length})</span>
                </div>
                <button
                  onClick={() => setShowBookmarksDrawer(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[75vh]">
                {bookmarkedArticles.length > 0 ? (
                  bookmarkedArticles.map(article => (
                    <div
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        setActiveMonetizationTab('news');
                        setShowBookmarksDrawer(false);
                      }}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-500 transition space-y-1"
                    >
                      <span className="text-[10px] font-bold uppercase text-indigo-500">{article.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 font-serif">
                        {article.title}
                      </h4>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-12">
                    No saved articles yet. Click the bookmark icon on any article to save it for offline reading.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

