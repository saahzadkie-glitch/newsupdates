import { 
  AffiliateProduct, 
  SponsoredArticleSubmission, 
  AiToolListing, 
  DigitalProduct, 
  DigitalPurchaseOrder,
  NewsletterSponsorAd,
  UserSubscriptionState,
  RevenueAnalyticsSummary
} from '../types';

import { 
  INITIAL_AFFILIATE_PRODUCTS, 
  INITIAL_SPONSORED_SUBMISSIONS, 
  INITIAL_AI_TOOLS_DIRECTORY, 
  INITIAL_DIGITAL_PRODUCTS, 
  INITIAL_NEWSLETTER_ADS, 
  INITIAL_REVENUE_SUMMARY 
} from '../data/monetizationData';

const M_KEYS = {
  AFFILIATES: 'newupdate_affiliates_v1',
  SPONSORED_SUBMISSIONS: 'newupdate_sponsored_v1',
  AI_TOOLS: 'newupdate_aitools_v1',
  DIGITAL_PRODUCTS: 'newupdate_digital_v1',
  PURCHASES: 'newupdate_purchases_v1',
  NEWSLETTER_ADS: 'newupdate_news_ads_v1',
  USER_SUBSCRIPTION: 'newupdate_user_sub_v1',
  REVENUE_SUMMARY: 'newupdate_rev_summary_v1'
};

export class MonetizationStorageService {
  // --- AFFILIATES ---
  static getAffiliateProducts(): AffiliateProduct[] {
    try {
      const data = localStorage.getItem(M_KEYS.AFFILIATES);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(M_KEYS.AFFILIATES, JSON.stringify(INITIAL_AFFILIATE_PRODUCTS));
    return INITIAL_AFFILIATE_PRODUCTS;
  }

  static saveAffiliateProducts(products: AffiliateProduct[]): void {
    try {
      localStorage.setItem(M_KEYS.AFFILIATES, JSON.stringify(products));
    } catch (e) {}
  }

  static trackAffiliateClick(id: string): void {
    const products = this.getAffiliateProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          clicksCount: p.clicksCount + 1
        };
      }
      return p;
    });
    this.saveAffiliateProducts(updated);
  }

  static recordAffiliateConversion(id: string, commissionAmount: number): void {
    const products = this.getAffiliateProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          conversionsCount: p.conversionsCount + 1,
          totalEarnings: p.totalEarnings + commissionAmount
        };
      }
      return p;
    });
    this.saveAffiliateProducts(updated);
  }

  // --- SPONSORED SUBMISSIONS ---
  static getSponsoredSubmissions(): SponsoredArticleSubmission[] {
    try {
      const data = localStorage.getItem(M_KEYS.SPONSORED_SUBMISSIONS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(M_KEYS.SPONSORED_SUBMISSIONS, JSON.stringify(INITIAL_SPONSORED_SUBMISSIONS));
    return INITIAL_SPONSORED_SUBMISSIONS;
  }

  static addSponsoredSubmission(submission: Omit<SponsoredArticleSubmission, 'id' | 'submittedAt' | 'status'>): SponsoredArticleSubmission {
    const current = this.getSponsoredSubmissions();
    const newSubmission: SponsoredArticleSubmission = {
      ...submission,
      id: 'spon-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [newSubmission, ...current];
    try {
      localStorage.setItem(M_KEYS.SPONSORED_SUBMISSIONS, JSON.stringify(updated));
    } catch (e) {}
    return newSubmission;
  }

  static updateSponsoredStatus(id: string, status: 'approved' | 'rejected', notes?: string): SponsoredArticleSubmission[] {
    const current = this.getSponsoredSubmissions();
    const updated = current.map(s => s.id === id ? { ...s, status, adminNotes: notes } : s);
    try {
      localStorage.setItem(M_KEYS.SPONSORED_SUBMISSIONS, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  }

  // --- AI TOOLS DIRECTORY ---
  static getAiTools(): AiToolListing[] {
    try {
      const data = localStorage.getItem(M_KEYS.AI_TOOLS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(M_KEYS.AI_TOOLS, JSON.stringify(INITIAL_AI_TOOLS_DIRECTORY));
    return INITIAL_AI_TOOLS_DIRECTORY;
  }

  static addAiTool(tool: Omit<AiToolListing, 'id' | 'createdAt' | 'viewsCount' | 'clicksCount' | 'status'>): AiToolListing {
    const current = this.getAiTools();
    const newTool: AiToolListing = {
      ...tool,
      id: 'tool-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      clicksCount: 0,
      status: tool.isPremium ? 'approved' : 'pending'
    };
    const updated = [newTool, ...current];
    try {
      localStorage.setItem(M_KEYS.AI_TOOLS, JSON.stringify(updated));
    } catch (e) {}
    return newTool;
  }

  static trackToolClick(id: string): void {
    const tools = this.getAiTools();
    const updated = tools.map(t => t.id === id ? { ...t, clicksCount: t.clicksCount + 1 } : t);
    try {
      localStorage.setItem(M_KEYS.AI_TOOLS, JSON.stringify(updated));
    } catch (e) {}
  }

  // --- DIGITAL PRODUCTS & PURCHASES ---
  static getDigitalProducts(): DigitalProduct[] {
    try {
      const data = localStorage.getItem(M_KEYS.DIGITAL_PRODUCTS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(M_KEYS.DIGITAL_PRODUCTS, JSON.stringify(INITIAL_DIGITAL_PRODUCTS));
    return INITIAL_DIGITAL_PRODUCTS;
  }

  static getPurchases(): DigitalPurchaseOrder[] {
    try {
      const data = localStorage.getItem(M_KEYS.PURCHASES);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  }

  static processDigitalPurchase(
    productId: string, 
    customerEmail: string, 
    paymentMethod: 'Stripe' | 'PayPal' | 'Paystack' | 'Flutterwave'
  ): DigitalPurchaseOrder | null {
    const products = this.getDigitalProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return null;

    const order: DigitalPurchaseOrder = {
      id: 'ord-' + Date.now(),
      productId: product.id,
      productTitle: product.title,
      customerEmail,
      amountPaid: product.price,
      paymentMethod,
      transactionRef: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      purchasedAt: new Date().toISOString(),
      downloadToken: 'DL-' + Math.random().toString(36).substring(2, 12).toUpperCase()
    };

    // Save purchase
    const purchases = this.getPurchases();
    const updatedPurchases = [order, ...purchases];
    localStorage.setItem(M_KEYS.PURCHASES, JSON.stringify(updatedPurchases));

    // Update product sales stats
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          salesCount: p.salesCount + 1,
          totalRevenue: p.totalRevenue + p.price
        };
      }
      return p;
    });
    localStorage.setItem(M_KEYS.DIGITAL_PRODUCTS, JSON.stringify(updatedProducts));

    return order;
  }

  // --- USER MEMBERSHIP & PREFERENCES ---
  static getUserSubscription(): UserSubscriptionState {
    try {
      const data = localStorage.getItem(M_KEYS.USER_SUBSCRIPTION);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...parsed,
          breakingNewsAlerts: parsed.breakingNewsAlerts ?? true,
          dailyDigestAlerts: parsed.dailyDigestAlerts ?? false
        };
      }
    } catch (e) {}
    const defaultSub: UserSubscriptionState = {
      tier: 'free',
      isAdFree: false,
      userEmail: 'user@example.com',
      breakingNewsAlerts: true,
      dailyDigestAlerts: false
    };
    localStorage.setItem(M_KEYS.USER_SUBSCRIPTION, JSON.stringify(defaultSub));
    return defaultSub;
  }

  static updateUserSubscription(
    tier: 'free' | 'premium' | 'enterprise', 
    email?: string,
    breakingNewsAlerts?: boolean,
    dailyDigestAlerts?: boolean
  ): UserSubscriptionState {
    const current = this.getUserSubscription();
    const sub: UserSubscriptionState = {
      ...current,
      tier,
      isAdFree: tier !== 'free',
      userEmail: email || current.userEmail || 'user@example.com',
      breakingNewsAlerts: breakingNewsAlerts !== undefined ? breakingNewsAlerts : (current.breakingNewsAlerts ?? true),
      dailyDigestAlerts: dailyDigestAlerts !== undefined ? dailyDigestAlerts : (current.dailyDigestAlerts ?? false),
      startDate: new Date().toISOString(),
      renewalDate: new Date(Date.now() + 86400000 * 30).toISOString()
    };
    try {
      localStorage.setItem(M_KEYS.USER_SUBSCRIPTION, JSON.stringify(sub));
    } catch (e) {}
    return sub;
  }

  static toggleBreakingNewsAlerts(enabled: boolean): UserSubscriptionState {
    const current = this.getUserSubscription();
    const updated: UserSubscriptionState = {
      ...current,
      breakingNewsAlerts: enabled
    };
    try {
      localStorage.setItem(M_KEYS.USER_SUBSCRIPTION, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  }

  // --- REVENUE DASHBOARD SUMMARY ---
  static getRevenueSummary(): RevenueAnalyticsSummary {
    try {
      const data = localStorage.getItem(M_KEYS.REVENUE_SUMMARY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(M_KEYS.REVENUE_SUMMARY, JSON.stringify(INITIAL_REVENUE_SUMMARY));
    return INITIAL_REVENUE_SUMMARY;
  }
}
