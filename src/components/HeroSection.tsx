import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { Sparkles, TrendingUp, Flame } from 'lucide-react';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  articles,
  onSelectArticle,
  bookmarkedIds,
  onToggleBookmark
}) => {
  if (articles.length === 0) return null;

  const mainStory = articles[0];
  const sideStories = articles.slice(1, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-6 rounded-full bg-indigo-600" />
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Top Headlines & Lead Coverage
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time AI Verification</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Card (8 Cols) */}
        <div className="lg:col-span-8">
          <ArticleCard
            article={mainStory}
            onSelect={onSelectArticle}
            variant="featured"
            isBookmarked={bookmarkedIds.includes(mainStory.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </div>

        {/* Side Highlight List (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                Trending Analysis
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Top Stories</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sideStories.map(story => (
                <ArticleCard
                  key={story.id}
                  article={story}
                  onSelect={onSelectArticle}
                  variant="sidebar"
                  isBookmarked={bookmarkedIds.includes(story.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
