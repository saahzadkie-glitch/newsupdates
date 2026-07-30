import React from 'react';
import { Article } from '../types';
import { ChevronRight, RefreshCw, Radio } from 'lucide-react';

interface BreakingTickerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  countdown?: number;
  isAutoUpdating?: boolean;
  onManualTriggerUpdate?: () => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  articles,
  onSelectArticle,
  countdown = 45,
  isAutoUpdating = false,
  onManualTriggerUpdate
}) => {
  const breakingArticles = articles.filter(a => a.isBreaking || a.isTrending);
  const current = breakingArticles.length > 0 ? breakingArticles[0] : articles[0];

  if (!current) return null;

  return (
    <div className="h-10 bg-slate-900 text-white flex items-center px-4 sm:px-6 gap-3 overflow-hidden shrink-0 border-b border-slate-800">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] uppercase font-black bg-indigo-600 text-white px-2.5 py-0.5 rounded tracking-widest shrink-0 shadow-sm flex items-center gap-1">
            <Radio className="w-3 h-3 text-red-400 animate-pulse" />
            Live Ticker
          </span>
          <button
            onClick={() => onSelectArticle(current)}
            className="text-xs font-medium text-slate-200 hover:text-indigo-400 transition-colors truncate text-left"
          >
            {current.title}
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px] font-semibold text-slate-400">
          {/* Live Continuous Update Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/60 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {isAutoUpdating ? (
              <span className="text-indigo-300 font-bold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Auto-Publishing Story...
              </span>
            ) : (
              <span className="text-slate-300 font-mono">
                Auto-Update: <span className="text-emerald-400 font-bold">{countdown}s</span>
              </span>
            )}
          </div>

          {onManualTriggerUpdate && (
            <button
              onClick={onManualTriggerUpdate}
              disabled={isAutoUpdating}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase transition disabled:opacity-50"
              title="Force immediate AI update cycle"
            >
              <RefreshCw className={`w-3 h-3 ${isAutoUpdating ? 'animate-spin' : ''}`} />
              <span>Update Now</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="text-slate-500 uppercase font-mono">{current.category}</span>
            <span>•</span>
            <button
              onClick={() => onSelectArticle(current)}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Read Story</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
