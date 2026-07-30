import React from 'react';
import { AdPlacement } from '../types';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  if (!placement || !placement.enabled) return null;

  return (
    <div className={`my-6 mx-auto w-full ${className}`}>
      <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 text-center relative overflow-hidden group">
        {/* Label Tag */}
        <div className="flex items-center justify-between mb-2 px-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            Sponsored Announcement
          </span>
          <span className="text-slate-400 font-mono">{placement.provider}</span>
        </div>

        {/* Custom Ad Image Banner or Code Preview */}
        {placement.imageBannerUrl ? (
          <a
            href={placement.destinationUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-xl overflow-hidden shadow-sm hover:opacity-95 transition"
          >
            <img
              src={placement.imageBannerUrl}
              alt="Advertisement"
              className="w-full max-h-36 object-cover rounded-xl"
            />
            <div className="absolute top-2 right-2 bg-slate-900/80 text-white p-1 rounded backdrop-blur-md">
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ) : (
          <div
            className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-mono overflow-x-auto text-left"
            dangerouslySetInnerHTML={{ __html: placement.codeSnippet }}
          />
        )}
      </div>
    </div>
  );
};
