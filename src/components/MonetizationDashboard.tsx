import React, { useState } from 'react';
import { 
  RevenueAnalyticsSummary, 
  SponsoredArticleSubmission, 
  AiToolListing, 
  AffiliateProduct, 
  DigitalProduct,
  NewsletterSponsorAd
} from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShoppingBag, 
  Megaphone, 
  Layers, 
  BarChart3,
  ExternalLink,
  Tag,
  Plus
} from 'lucide-react';

interface MonetizationDashboardProps {
  revenueSummary: RevenueAnalyticsSummary;
  sponsoredSubmissions: SponsoredArticleSubmission[];
  aiTools: AiToolListing[];
  affiliates: AffiliateProduct[];
  digitalProducts: DigitalProduct[];
  onDataRefresh: () => void;
}

export const MonetizationDashboard: React.FC<MonetizationDashboardProps> = ({
  revenueSummary,
  sponsoredSubmissions,
  aiTools,
  affiliates,
  digitalProducts,
  onDataRefresh
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sponsored' | 'directory' | 'affiliates' | 'products'>('overview');

  const handleApproveSubmission = (id: string) => {
    MonetizationStorageService.updateSponsoredStatus(id, 'approved', 'Approved by Admin');
    onDataRefresh();
  };

  const handleRejectSubmission = (id: string) => {
    MonetizationStorageService.updateSponsoredStatus(id, 'rejected', 'Rejected by Admin');
    onDataRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Monetization Admin Sub-Header Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Revenue Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('sponsored')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'sponsored'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Sponsored Queue ({sponsoredSubmissions.filter(s => s.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'directory'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Tools Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('affiliates')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'affiliates'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Affiliate Products</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Digital Products</span>
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Highlight Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
              <span className="text-xs text-slate-400 font-medium">Total Platform Income</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">${revenueSummary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +{revenueSummary.monthlyGrowthRate}% vs last month
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
              <span className="text-xs text-slate-400 font-medium">Affiliate Commissions</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">${revenueSummary.affiliateEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">From 5 partner programs</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
              <span className="text-xs text-slate-400 font-medium">Digital Product Sales</span>
              <div className="text-2xl font-black text-purple-400 mt-1">${revenueSummary.digitalProductSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">Top: {revenueSummary.topPerformingProduct}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
              <span className="text-xs text-slate-400 font-medium">Sponsored & Directory</span>
              <div className="text-2xl font-black text-amber-400 mt-1">${(revenueSummary.sponsoredArticleIncome + revenueSummary.aiDirectoryIncome).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">B2B Paid Publishing</span>
            </div>
          </div>

          {/* Revenue Stream Breakdown List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Channels Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Affiliate Marketing Deals</span>
                  <span className="text-indigo-600 dark:text-indigo-400">${revenueSummary.affiliateEarnings.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Digital Product Store</span>
                  <span className="text-purple-600 dark:text-purple-400">${revenueSummary.digitalProductSales.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Sponsored Articles Marketplace</span>
                  <span className="text-amber-600 dark:text-amber-400">${revenueSummary.sponsoredArticleIncome.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>AI Tools Directory Listings</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${revenueSummary.aiDirectoryIncome.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPONSORED SUBMISSIONS TAB */}
      {activeTab === 'sponsored' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Sponsored Article Review Queue</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sponsoredSubmissions.map(sub => (
              <div key={sub.id} className="py-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sub.articleTitle}</h4>
                    <p className="text-xs text-slate-500">Company: {sub.companyName} ({sub.companyEmail}) • Paid: <span className="font-bold text-emerald-500">${sub.amountPaid}</span></p>
                  </div>

                  <div className="flex items-center gap-2">
                    {sub.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApproveSubmission(sub.id)}
                          className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700"
                        >
                          Approve & Publish
                        </button>
                        <button
                          onClick={() => handleRejectSubmission(sub.id)}
                          className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        sub.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {sub.status}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                  {sub.articleContent}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI TOOLS TAB */}
      {activeTab === 'directory' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Tools Directory Management</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {aiTools.map(tool => (
              <div key={tool.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={tool.logoUrl} alt={tool.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{tool.name}</h4>
                    <span className="text-slate-400">{tool.category} • {tool.pricingModel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{tool.clicksCount} Clicks</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tool.isPremium ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    {tool.isPremium ? 'PREMIUM $49/mo' : 'FREE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AFFILIATES TAB */}
      {activeTab === 'affiliates' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Affiliate Links & Performance</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {affiliates.map(aff => (
              <div key={aff.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{aff.name}</h4>
                  <span className="text-slate-400">{aff.partnerName} • Rate: {aff.commissionRate}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Clicks: <strong className="text-indigo-500">{aff.clicksCount}</strong></span>
                  <span>Conv: <strong className="text-emerald-500">{aff.conversionsCount}</strong></span>
                  <span>Earned: <strong className="text-amber-500">${aff.totalEarnings.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIGITAL PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Digital Store Catalog</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {digitalProducts.map(prod => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{prod.title}</h4>
                  <span className="text-slate-400">{prod.category} • Price: ${prod.price}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span>Sales: <strong className="text-purple-500">{prod.salesCount}</strong></span>
                  <span>Revenue: <strong className="text-emerald-500">${prod.totalRevenue.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
