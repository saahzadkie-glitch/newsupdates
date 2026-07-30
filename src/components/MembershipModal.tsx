import React, { useState } from 'react';
import { UserSubscriptionState, UserMembershipTier } from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  EyeOff, 
  ShieldCheck, 
  Bell,
  BellRing,
  Mail,
  User,
  Settings,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MembershipModalProps {
  subscription: UserSubscriptionState;
  onSubscriptionUpdate: (newSub: UserSubscriptionState) => void;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  subscription,
  onSubscriptionUpdate,
  onClose
}) => {
  const [selectedTier, setSelectedTier] = useState<UserMembershipTier>(subscription.tier);
  const [userEmail, setUserEmail] = useState<string>(subscription.userEmail || '');
  const [breakingNewsAlerts, setBreakingNewsAlerts] = useState<boolean>(subscription.breakingNewsAlerts ?? true);
  const [dailyDigestAlerts, setDailyDigestAlerts] = useState<boolean>(subscription.dailyDigestAlerts ?? false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleToggleBreakingNews = (enabled: boolean) => {
    setBreakingNewsAlerts(enabled);
    const updated = MonetizationStorageService.toggleBreakingNewsAlerts(enabled);
    onSubscriptionUpdate(updated);

    if (enabled) {
      setNotificationToast('🔔 Breaking News push notifications enabled! You will receive instant desktop alerts for major tech stories.');
      setTimeout(() => setNotificationToast(null), 4000);
    } else {
      setNotificationToast('🔕 Push notifications paused for breaking news updates.');
      setTimeout(() => setNotificationToast(null), 3000);
    }
  };

  const handleToggleDailyDigest = (enabled: boolean) => {
    setDailyDigestAlerts(enabled);
    const updated = MonetizationStorageService.updateUserSubscription(
      selectedTier,
      userEmail,
      breakingNewsAlerts,
      enabled
    );
    onSubscriptionUpdate(updated);
  };

  const handleUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = MonetizationStorageService.updateUserSubscription(
      selectedTier,
      userEmail,
      breakingNewsAlerts,
      dailyDigestAlerts
    );
    onSubscriptionUpdate(updated);
    setIsSuccess(true);

    try {
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        {/* Toast Feedback for Push Toggle */}
        {notificationToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white dark:bg-indigo-600 px-4 py-2.5 rounded-2xl shadow-2xl border border-indigo-400/30 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <BellRing className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
            <span>{notificationToast}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Profile & Membership</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage plan tiers, notification preferences & profile options.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold">Settings & Membership Saved!</h4>
            <p className="text-xs text-slate-300">
              Your profile preferences and <span className="font-bold uppercase text-amber-400">{selectedTier}</span> plan tier have been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpgrade} className="space-y-6">
            {/* Tiers Grid */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Select Subscription Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Free Plan */}
                <div
                  onClick={() => setSelectedTier('free')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedTier === 'free'
                      ? 'bg-indigo-50 dark:bg-slate-800 border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Free Reader</h4>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-1">$0</div>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                      <li>• Standard News Feed</li>
                      <li>• Standard Ads Displayed</li>
                    </ul>
                  </div>
                </div>

                {/* Premium Plan */}
                <div
                  onClick={() => setSelectedTier('premium')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between relative ${
                    selectedTier === 'premium'
                      ? 'bg-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500 shadow-xl'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                  <div>
                    <h4 className="font-bold text-amber-400 flex items-center gap-1 text-sm">
                      <Crown className="w-3.5 h-3.5" /> Premium Pro
                    </h4>
                    <div className="text-xl font-black mt-1">$9.99 <span className="text-xs font-normal opacity-70">/mo</span></div>
                    <ul className="text-[11px] space-y-1 mt-2 opacity-90">
                      <li className="flex items-center gap-1 text-emerald-400 font-bold"><EyeOff className="w-3 h-3" /> 100% Ad-Free Reading</li>
                      <li>• Instant AI Briefings</li>
                    </ul>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div
                  onClick={() => setSelectedTier('enterprise')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedTier === 'enterprise'
                      ? 'bg-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500 shadow-xl'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-indigo-400 flex items-center gap-1 text-sm">
                      <Sparkles className="w-3.5 h-3.5" /> Enterprise
                    </h4>
                    <div className="text-xl font-black mt-1">$49 <span className="text-xs font-normal opacity-70">/mo</span></div>
                    <ul className="text-[11px] space-y-1 mt-2 opacity-90">
                      <li>• All Premium Perks</li>
                      <li>• Sponsored Credits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile & Notification Preferences Section */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <Settings className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Notification & Profile Subscriptions
                </h4>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="developer@techcorp.com"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Notification Subscription Toggles */}
              <div className="space-y-3 pt-1">
                {/* Breaking News Push Notification Toggle */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Breaking News Push Notifications</span>
                        <span className="text-[9px] bg-red-500/20 text-red-500 font-extrabold uppercase px-1.5 py-0.5 rounded">
                          Live Alerts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Simulate real-time desktop push alerts when critical technology breakthroughs &amp; security bulletins are posted.
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={breakingNewsAlerts}
                      onChange={e => handleToggleBreakingNews(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {/* Daily Digest Email Toggle */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Daily Morning Tech Briefing
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Receive a concise morning digest of top AI stories, new tools, and deal summaries in your inbox.
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={dailyDigestAlerts}
                      onChange={e => handleToggleDailyDigest(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Save Settings & Subscription ({selectedTier.toUpperCase()})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

