import React, { useState } from 'react';
import { AffiliateProduct, AffiliateCategory } from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { 
  Sparkles, 
  ExternalLink, 
  Search, 
  Star, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp,
  Tag,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AffiliateMarketplaceProps {
  products: AffiliateProduct[];
  onProductsUpdate: () => void;
}

const CATEGORIES: AffiliateCategory[] = [
  'AI Software',
  'Cybersecurity Tools',
  'VPN Services',
  'Web Hosting',
  'Domains',
  'Laptops',
  'Smartphones',
  'Programming Courses',
  'Books',
  'Developer Tools'
];

export const AffiliateMarketplace: React.FC<AffiliateMarketplaceProps> = ({ products, onProductsUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<AffiliateProduct | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuyClick = (product: AffiliateProduct) => {
    // Track click in system
    MonetizationStorageService.trackAffiliateClick(product.id);
    onProductsUpdate();

    // Trigger celebratory confetti effect
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch (e) {}

    // Open link in new tab
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Curated Tech & AI Gear Deals
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight">
            Verified Tech Tools & Software Directory
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Hand-picked software solutions, security infrastructure, development hardware, and AI tools benchmarked for maximum engineering productivity.
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>FTC Disclosure: We may earn a partner commission when you purchase through our links at no extra cost to you.</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Categories ({products.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = products.filter(p => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals & software..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  {product.category}
                </span>
                {product.isFeatured && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Featured Deal
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                  <span className="text-[11px] text-slate-300">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="space-y-1.5 pt-1">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Price & CTAs */}
            <div className="p-5 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/60 mt-2">
              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">Partner: {product.partnerName}</span>
                </div>

                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Full Review →
                </button>
              </div>

              <button
                onClick={() => handleBuyClick(product)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/20 active:scale-95"
              >
                <span>Get Offer Deal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                  {activeModalProduct.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">by {activeModalProduct.partnerName}</span>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {activeModalProduct.name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModalProduct.description}
              </p>

              {/* Pricing & CTA */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Verified Offer Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{activeModalProduct.price}</span>
                    {activeModalProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">{activeModalProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleBuyClick(activeModalProduct)}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
                >
                  <span>Activate Affiliate Discount</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Why We Recommend It
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {activeModalProduct.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Considerations
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {activeModalProduct.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FTC Disclosure */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                {activeModalProduct.disclosure}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
