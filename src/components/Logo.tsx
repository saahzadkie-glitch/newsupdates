import React from 'react';
import logoImg from '../assets/images/newupdate_tech_logo_1785434505848.jpg';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  onClick,
  variant = 'auto'
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-9.5 h-9.5',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Generated High-Tech Emblem Logo Mark */}
      <div className={`relative ${iconSizes[size]} rounded-xl overflow-hidden shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300 shrink-0 flex items-center justify-center bg-slate-900 border border-indigo-500/30`}>
        <img
          src={logoImg}
          alt="NEWUPDATE Official Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
        />

        {/* Ambient Ring Highlight */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 pointer-events-none" />
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textSizes[size]} font-black tracking-tight font-sans ${
                variant === 'light'
                  ? 'text-white'
                  : variant === 'dark'
                  ? 'text-slate-900'
                  : 'text-slate-900 dark:text-white'
              } group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}
            >
              NEW<span className="text-indigo-600 dark:text-indigo-400">UPDATE</span>
            </span>
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse inline-block"
              title="Real-time Autonomous AI Live News Stream"
            />
          </div>
          <span
            className={`text-[9px] font-extrabold tracking-widest uppercase mt-0.5 ${
              variant === 'light' ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-400'
            }`}
          >
            AI News & Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
