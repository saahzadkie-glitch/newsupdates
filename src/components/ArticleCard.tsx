import React from 'react';
import { Article } from '../types';
import { Clock, Eye, Bookmark, Sparkles, TrendingUp, Volume2 } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  variant?: 'featured' | 'standard' | 'horizontal' | 'compact' | 'sidebar';
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  variant = 'standard',
  isBookmarked = false,
  onToggleBookmark
}) => {
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (variant === 'featured') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl cursor-pointer transition-all hover:shadow-2xl flex flex-col justify-between h-full min-h-[440px]"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        </div>

        {/* Top Badges */}
        <div className="relative z-10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-tighter shadow-sm">
              Editor&apos;s Pick
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-tighter border border-white/20">
              {article.category}
            </span>
          </div>

          {onToggleBookmark && (
            <button
              onClick={(e) => onToggleBookmark(e, article.id)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition backdrop-blur-md"
              title="Bookmark story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-400 text-indigo-400' : 'text-white'}`} />
            </button>
          )}
        </div>

        {/* Bottom Headline & Metadata */}
        <div className="relative z-10 p-6 md:p-8 space-y-3 mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border border-white/20"></div>
            <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
              Synthesized by AI News Desk • {article.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-[1.15] tracking-tight group-hover:text-indigo-200 transition-colors font-serif">
            {article.title}
          </h1>

          <p className="text-white/70 text-sm md:text-base line-clamp-2 leading-relaxed">
            {article.summary}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover border border-indigo-400"
              />
              <span className="font-semibold text-white">{article.author.name}</span>
            </div>
            <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read Article →
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col sm:flex-row gap-4 items-stretch"
      >
        <div className="relative w-full sm:w-48 h-36 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-slate-900/80 text-white backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-1.5">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-500" /> {article.readingTime} min
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif">
              {article.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
              By {article.author.name}
            </span>
            {onToggleBookmark && (
              <button
                onClick={(e) => onToggleBookmark(e, article.id)}
                className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar' || variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-800/80 last:border-0 cursor-pointer"
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {article.category}
            </span>
            {article.isTrending && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> Hot
              </span>
            )}
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif leading-snug">
            {article.title}
          </h4>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {formattedDate} • {article.readingTime} min read
          </span>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div
      onClick={() => onSelect(article)}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-slate-900/85 text-white backdrop-blur-md border border-white/10">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide bg-red-600 text-white animate-pulse">
              Breaking
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button
            onClick={(e) => onToggleBookmark(e, article.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''}`} />
          </button>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 font-medium">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-500" /> {article.readingTime} min read
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-medium text-slate-700 dark:text-slate-300 text-xs truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
            Read Article →
          </span>
        </div>
      </div>
    </div>
  );
};
