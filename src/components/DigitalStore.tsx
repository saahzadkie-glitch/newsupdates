import React, { useState } from 'react';
import { DigitalProduct, DigitalPurchaseOrder } from '../types';
import { MonetizationStorageService } from '../services/monetizationStorage';
import { 
  ShoppingBag, 
  Download, 
  CheckCircle, 
  Star, 
  FileText, 
  Code, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalStoreProps {
  products: DigitalProduct[];
  onProductsUpdate: () => void;
}

export const DigitalStore: React.FC<DigitalStoreProps> = ({ products, onProductsUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<DigitalProduct | null>(null);

  // Checkout Modal State
  const [checkoutProduct, setCheckoutProduct] = useState<DigitalProduct | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'PayPal' | 'Paystack' | 'Flutterwave'>('Stripe');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<DigitalPurchaseOrder | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const handleStartCheckout = (product: DigitalProduct) => {
    setActiveModalProduct(null);
    setCheckoutProduct(product);
    setCompletedOrder(null);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutProduct || !customerEmail) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = MonetizationStorageService.processDigitalPurchase(
        checkoutProduct.id,
        customerEmail,
        paymentMethod
      );

      setIsProcessing(false);
      setCompletedOrder(order);
      onProductsUpdate();

      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {}
    }, 1200);
  };

  const handleDownloadFile = (order: DigitalPurchaseOrder) => {
    // Simulate instant file download blob
    const element = document.createElement("a");
    const file = new Blob([
      `NEWUPDATE DIGITAL STORE PURCHASE RECEIPT\n\n` +
      `Product: ${order.productTitle}\n` +
      `Order Ref: ${order.transactionRef}\n` +
      `Download Token: ${order.downloadToken}\n` +
      `Customer: ${order.customerEmail}\n` +
      `Amount Paid: $${order.amountPaid}\n` +
      `Gateway: ${order.paymentMethod}\n` +
      `Date: ${order.purchasedAt}\n\n` +
      `Thank you for supporting NewUpdate Tech Publishing!`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${order.productTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-access.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
            <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
            Digital Knowledge Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight">
            Developer Ebooks, AI Prompts & Templates
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Instant-download software engineering guides, curated prompt engineering vaults, security cheat sheets, and production-ready React starter boilerplates.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Products ({products.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  {product.type.replace('_', ' ')}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[10px] text-slate-300 font-normal">({product.salesCount} sold)</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-baseline justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Preview
                </button>
              </div>

              <button
                onClick={() => handleStartCheckout(product)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-purple-600/20 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Buy & Instant Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Preview Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {activeModalProduct.type.replace('_', ' ')}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{activeModalProduct.title}</h2>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModalProduct.description}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Product Sample Preview</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  &quot;{activeModalProduct.previewSnippet}&quot;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">What&apos;s Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {activeModalProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">${activeModalProduct.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleStartCheckout(activeModalProduct)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Checkout</h3>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {completedOrder ? (
              <div className="space-y-4 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Payment Successful!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your purchase of <span className="font-bold">{completedOrder.productTitle}</span> has been confirmed.
                </p>

                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-left text-xs space-y-1 font-mono">
                  <p><span className="text-slate-400">Transaction:</span> {completedOrder.transactionRef}</p>
                  <p><span className="text-slate-400">Token:</span> {completedOrder.downloadToken}</p>
                  <p><span className="text-slate-400">Email:</span> {completedOrder.customerEmail}</p>
                </div>

                <button
                  onClick={() => handleDownloadFile(completedOrder)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Product Access Package</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPayment} className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{checkoutProduct.title}</span>
                    <span className="text-[11px] text-purple-400 font-semibold">{checkoutProduct.type}</span>
                  </div>
                  <span className="text-lg font-black text-slate-900 dark:text-white">${checkoutProduct.price.toFixed(2)}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Delivery Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="developer@example.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Select Payment Gateway
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Stripe', 'PayPal', 'Paystack', 'Flutterwave'] as const).map(gateway => (
                      <button
                        key={gateway}
                        type="button"
                        onClick={() => setPaymentMethod(gateway)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                          paymentMethod === gateway
                            ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{gateway}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>256-bit Encrypted Test Payment Environment</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-lg shadow-purple-600/20"
                >
                  {isProcessing ? 'Processing Secure Payment...' : `Complete Purchase ($${checkoutProduct.price.toFixed(2)})`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
