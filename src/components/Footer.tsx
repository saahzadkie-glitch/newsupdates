import React from 'react';
import { Category } from '../types';
import { Logo } from './Logo';
import { Rss, Layers, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (id: string | null) => void;
  onOpenSeoModal: () => void;
  onOpenStaticModal: (type: 'about' | 'contact' | 'privacy' | 'terms') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenSeoModal,
  onOpenStaticModal,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="light" onClick={() => onSelectCategory(null)} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous AI-driven digital journalism platform delivering continuous real-time news coverage, analytical deep-dives, and verified briefings globally.
            </p>
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={onOpenSeoModal}
                className="flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>XML Sitemap</span>
              </button>
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">News Categories</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory(c.id)}
                  className="text-left text-slate-400 hover:text-indigo-400 transition"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Legal & Info Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenStaticModal('about')} className="hover:text-white transition">
                  About PulseAI Desk
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticModal('contact')} className="hover:text-white transition">
                  Editorial Contact
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticModal('privacy')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticModal('terms')} className="hover:text-white transition">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold text-slate-400">© {new Date().getFullYear()} NEWUPDATE AI NETWORK</span>
            <button onClick={() => onOpenStaticModal('terms')} className="hover:text-indigo-400 transition">
              Terms of Service
            </button>
            <button onClick={() => onOpenStaticModal('privacy')} className="hover:text-indigo-400 transition">
              Privacy Policy
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
