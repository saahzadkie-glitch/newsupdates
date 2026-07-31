import React from 'react';
import { RELATED_PRODUCTS, CategoryProduct } from '../data/affiliateProducts';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface RelatedProductItem {
  name: string;
  searchTerm: string;
  description?: string;
}

interface RelatedProductsProps {
  category: string;
  relatedProducts?: RelatedProductItem[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, relatedProducts }) => {
  const normalizedCategory = category ? category.toLowerCase().trim() : 'technology';
  const staticFallbackList: CategoryProduct[] =
    RELATED_PRODUCTS[normalizedCategory] || RELATED_PRODUCTS['technology'] || [];

  let displayProducts: CategoryProduct[] = [];

  if (relatedProducts && relatedProducts.length > 0) {
    displayProducts = relatedProducts.map((p, idx) => {
      const searchTerm = p.searchTerm || p.name;
      const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=techverseai20-20`;
      const imageUrl =
        staticFallbackList[idx % staticFallbackList.length]?.imageUrl ||
        'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';

      return {
        name: p.name,
        imageUrl,
        description: p.description || `Top-rated gear & resources relevant to ${p.name}.`,
        amazonUrl
      };
    });
  } else {
    displayProducts = staticFallbackList;
  }

  if (displayProducts.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
          <ShoppingBag className="w-5 h-5 text-amber-500" />
          You Might Also Like
        </h3>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Curated Gear & Books
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayProducts.map((product, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 transition duration-200 group shadow-sm"
          >
            <div className="space-y-3">
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition font-sans">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-xs transition-colors shadow-sm"
              >
                <span>View on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
