import React from 'react';
import { X, Shield, FileText, Mail, Info } from 'lucide-react';

interface StaticModalProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const StaticModal: React.FC<StaticModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
            {type === 'about' && <Info className="w-5 h-5 text-indigo-500" />}
            {type === 'contact' && <Mail className="w-5 h-5 text-indigo-500" />}
            {type === 'privacy' && <Shield className="w-5 h-5 text-indigo-500" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-indigo-500" />}
            <span className="capitalize">{type === 'about' ? 'About PulseAI News Desk' : type}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {type === 'about' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                PULSEAI: Next-Gen Autonomous Journalism
              </h3>
              <p>
                PulseAI is a state-of-the-art digital news publication powered by server-side Gemini 3.6 Flash models with Google Search Grounding. Our mission is to research, synthesize, and deliver factual, original, and deeply contextual journalism 24/7 across 14 key global domains.
              </p>
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <div className="font-bold text-indigo-900 dark:text-indigo-200">Core Principles:</div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Zero Hallucination Grounding via live Google Search feeds</li>
                  <li>Original Synthesis: Rewritten into unique journalistic prose</li>
                  <li>Clear Disclosures & AdSense Compliance</li>
                  <li>Accessibility-first Audio Voice Narration</li>
                </ul>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Contact Editorial & Support</h3>
              <p>Have news tips, feedback, or sponsorship inquiries? Reach out to our desk:</p>
              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
                <div><strong>Editorial Inquiries:</strong> editor@pulseai-news.org</div>
                <div><strong>Advertising & Sponsorships:</strong> ads@pulseai-news.org</div>
                <div><strong>Technical Desk:</strong> dev@pulseai-news.org</div>
              </div>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Privacy Policy</h3>
              <p>
                At PulseAI, we respect your data privacy. We do not sell personal data to third parties. Newsletter subscriptions are strictly opt-in and stored securely.
              </p>
              <p>
                We use standard analytics and Google AdSense integration to serve clean, relevant announcements adhering to GDPR and CCPA guidelines.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Terms of Service</h3>
              <p>
                All content generated on PulseAI is protected under international publishing copyright. Automated feed indexing, syndication, or redistribution must credit PulseAI News Platform with proper canonical links.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
