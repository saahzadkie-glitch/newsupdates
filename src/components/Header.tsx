import React, { useState, useRef, useEffect } from 'react';
import { Category, Article, UserMembershipTier } from '../types';
import { Logo } from './Logo';
import { 
  Search, 
  Moon, 
  Sun, 
  Bookmark, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  X, 
  Clock, 
  Layers,
  ShoppingBag,
  Zap,
  Tag,
  Megaphone,
  Crown,
  ChevronDown,
  Menu,
  Grid,
  Newspaper,
  Compass,
  CheckCircle2
} from 'lucide-react';

export type MonetizationTab = 'news' | 'affiliates' | 'directory' | 'digital' | 'sponsored';

interface HeaderProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  activeMonetizationTab: MonetizationTab;
  onSelectMonetizationTab: (tab: MonetizationTab) => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
  onOpenSeoModal: () => void;
  onOpenMembership: () => void;
  userTier: UserMembershipTier;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  activeMonetizationTab,
  onSelectMonetizationTab,
  articles,
  onSelectArticle,
  darkMode,
  onToggleDarkMode,
  onOpenAdmin,
  onOpenSeoModal,
  onOpenMembership,
  userTier,
  bookmarkedCount,
  onOpenBookmarks
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const exploreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target as Node)) {
        setIsExploreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredArticles = searchQuery.trim()
    ? articles.filter(
        a =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSelectTab = (tab: MonetizationTab) => {
    onSelectMonetizationTab(tab);
    setIsExploreMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Title & Primary Nav */}
        <div className="flex items-center gap-6 md:gap-8">
          <Logo onClick={() => { onSelectCategory(null); onSelectMonetizationTab('news'); }} />

          {/* Desktop Streamlined Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => { onSelectCategory(null); onSelectMonetizationTab('news'); }}
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                activeMonetizationTab === 'news' && activeCategory === null
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              News Feed
            </button>

            {/* Explore Hubs Mega Dropdown */}
            <div className="relative" ref={exploreDropdownRef}>
              <button
                onClick={() => setIsExploreMenuOpen(!isExploreMenuOpen)}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  activeMonetizationTab !== 'news'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explore Hubs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExploreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {isExploreMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                    Marketplaces & Directories
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => handleSelectTab('directory')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition ${
                        activeMonetizationTab === 'directory'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">AI Tools Directory</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">Curated AI SaaS & Models</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectTab('digital')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition ${
                        activeMonetizationTab === 'digital'
                          ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Digital Tech Store</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">E-books, Guides & Datasets</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectTab('affiliates')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition ${
                        activeMonetizationTab === 'affiliates'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Tech & AI Deals</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">Exclusive Hardware & Software</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectTab('sponsored')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition ${
                        activeMonetizationTab === 'sponsored'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Sponsored Hub</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">B2B Partner Submissions</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Header Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search news..."
              onClick={() => setIsSearchOpen(true)}
              readOnly
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-full py-1.5 pl-8 pr-3 text-xs w-36 lg:w-44 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 cursor-pointer"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Saved Articles"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Master Features Menu Drawer Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-indigo-600 transition text-xs font-bold shadow-sm"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Clean Category Navigation Bar */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
            <button
              onClick={() => { onSelectCategory(null); onSelectMonetizationTab('news'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeMonetizationTab === 'news' && activeCategory === null
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              All News
            </button>

            {categories
              .filter(c => c.enabled)
              .map(cat => {
                const isActive = activeMonetizationTab === 'news' && activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { onSelectCategory(cat.id); onSelectMonetizationTab('news'); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
          </nav>
        </div>
      </div>

      {/* Slide-Out Master Feature Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <Logo onClick={() => { setIsMobileMenuOpen(false); onSelectCategory(null); onSelectMonetizationTab('news'); }} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Membership Status */}
              <div
                onClick={() => { setIsMobileMenuOpen(false); onOpenMembership(); }}
                className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 cursor-pointer hover:border-indigo-500 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                    NEWUPDATE Membership
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold">
                    {userTier !== 'free' ? `${userTier}` : 'Free'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {userTier !== 'free'
                    ? 'Ad-free news browsing active with premium briefings.'
                    : 'Upgrade to Ad-Free Pro for instant AI analysis & exclusive guides.'}
                </p>
              </div>

              {/* Marketplaces & Ecosystem Section */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                  Ecosystem & Marketplaces
                </div>

                <button
                  onClick={() => handleSelectTab('news')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    activeMonetizationTab === 'news'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Newspaper className="w-4 h-4" />
                    <span>Real-Time News Stream</span>
                  </div>
                  {activeMonetizationTab === 'news' && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleSelectTab('directory')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    activeMonetizationTab === 'directory'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Zap className="w-4 h-4 text-indigo-500" />
                    <span>AI Tools Directory</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTab('digital')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    activeMonetizationTab === 'digital'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <ShoppingBag className="w-4 h-4 text-purple-500" />
                    <span>Digital Tech Store</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTab('affiliates')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    activeMonetizationTab === 'affiliates'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Tag className="w-4 h-4 text-emerald-500" />
                    <span>Tech & AI Deals</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTab('sponsored')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    activeMonetizationTab === 'sponsored'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Megaphone className="w-4 h-4 text-amber-500" />
                    <span>Sponsored Submissions</span>
                  </div>
                </button>
              </div>

              {/* Tools & Settings Section */}
              <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                  Tools & Control
                </div>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenSeoModal(); }}
                  className="w-full text-left p-3 rounded-xl flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition text-xs font-semibold"
                >
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>SEO & Structured Data</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenAdmin(); }}
                  className="w-full text-left p-3 rounded-xl flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white transition text-xs font-bold shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Control Desk</span>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-6 border-t border-slate-200 dark:border-slate-800">
              NEWUPDATE v3.0 • Autonomous AI News Platform
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Input Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-indigo-500 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search headlines, keywords, topics (e.g., Quantum, AI, Cyber, Business)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-indigo-400 opacity-60" />
                  Type to search through AI-curated news articles...
                </div>
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readingTime} min read
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-xs">
                  No articles found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

