export type CategoryId =
  | 'technology'
  | 'ai'
  | 'cybersecurity'
  | 'business'
  | 'finance'
  | 'cryptocurrency'
  | 'sports'
  | 'entertainment'
  | 'gaming'
  | 'science'
  | 'health'
  | 'education'
  | 'politics'
  | 'world';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  enabled: boolean;
  color: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: CategoryId;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publicationDate: string; // ISO or formatted date
  updatedAt?: string;
  readingTime: number; // in minutes
  summary: string;
  body: string; // Markdown formatted article body
  faqs?: ArticleFAQ[];
  featuredImage: string;
  imageCaption?: string;
  tags: string[];
  viewCount: number;
  likesCount: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isEditorsPick?: boolean;
  status: 'published' | 'draft' | 'pending';
  metaTitle: string;
  metaDescription: string;
  relatedArticleIds?: string[];
  comments: Comment[];
  audioUrl?: string; // Optional audio narration link or generated TTS
  relatedProducts?: {
    name: string;
    searchTerm: string;
    description?: string;
  }[];
}

export interface AdPlacement {
  id: 'top_banner' | 'in_article' | 'sidebar' | 'footer';
  name: string;
  enabled: boolean;
  provider: 'Google AdSense' | 'Custom Sponsor' | 'Mediavine';
  codeSnippet: string;
  imageBannerUrl?: string;
  destinationUrl?: string;
  impressionsCount: number;
  clicksCount: number;
}

export interface AutoPublisherSettings {
  autoPublishEnabled: boolean;
  frequencyHours: number; // e.g. every 1 hour, 6 hours
  selectedCategories: CategoryId[];
  autoApprove: boolean; // if false, goes to pending approval queue
  lastRunTimestamp: string | null;
  targetArticlesPerRun: number;
}

export interface PublishingLog {
  id: string;
  timestamp: string;
  action: string;
  articleTitle?: string;
  category?: CategoryId;
  status: 'success' | 'failed' | 'pending';
  details: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  categories: CategoryId[];
  status: 'active' | 'unsubscribed';
}

export interface AnalyticsOverview {
  totalArticles: number;
  totalViews: number;
  totalSubscribers: number;
  totalAdImpressions: number;
  aiArticlesGenerated: number;
  popularCategories: { category: string; count: number }[];
}

export type AffiliateCategory = 
  | 'AI Software'
  | 'Cybersecurity Tools'
  | 'VPN Services'
  | 'Web Hosting'
  | 'Domains'
  | 'Laptops'
  | 'Smartphones'
  | 'Programming Courses'
  | 'Books'
  | 'Developer Tools';

export interface AffiliateProduct {
  id: string;
  name: string;
  category: AffiliateCategory;
  image: string;
  description: string;
  features: string[];
  price: string;
  originalPrice?: string;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  partnerName: string;
  commissionRate: string; // e.g. "30%" or "$25/sale"
  clicksCount: number;
  conversionsCount: number;
  totalEarnings: number;
  isFeatured?: boolean;
  disclosure: string;
  faq?: { question: string; answer: string }[];
  comparisonTable?: { feature: string; thisProduct: string; competitor: string }[];
}

export type SponsoredPackageTier = 'basic' | 'premium' | 'enterprise';

export interface SponsoredArticlePackage {
  id: SponsoredPackageTier;
  title: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface SponsoredArticleSubmission {
  id: string;
  companyName: string;
  companyEmail: string;
  companyWebsite: string;
  packageTier: SponsoredPackageTier;
  articleTitle: string;
  articleContent: string;
  logoUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  amountPaid: number;
  adminNotes?: string;
}

export interface AiToolListing {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  logoUrl: string;
  websiteUrl: string;
  isPremium: boolean;
  isVerified: boolean;
  pricingModel: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  startingPrice: string;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  clicksCount: number;
  submittedBy: string;
  createdAt: string;
  status: 'approved' | 'pending';
}

export type DigitalProductType = 
  | 'ebook'
  | 'prompt_pack'
  | 'template'
  | 'cheat_sheet'
  | 'course';

export interface DigitalProduct {
  id: string;
  title: string;
  type: DigitalProductType;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  previewSnippet: string;
  downloadUrl: string;
  rating: number;
  salesCount: number;
  totalRevenue: number;
  features: string[];
  author: string;
}

export interface DigitalPurchaseOrder {
  id: string;
  productId: string;
  productTitle: string;
  customerEmail: string;
  amountPaid: number;
  paymentMethod: 'Stripe' | 'PayPal' | 'Paystack' | 'Flutterwave';
  transactionRef: string;
  purchasedAt: string;
  downloadToken: string;
}

export interface NewsletterSponsorAd {
  id: string;
  sponsorName: string;
  headline: string;
  bodyText: string;
  ctaText: string;
  targetUrl: string;
  bannerImage?: string;
  placement: 'top_banner' | 'in_article' | 'footer';
  price: number;
  impressions: number;
  clicks: number;
  status: 'active' | 'scheduled' | 'completed';
  startDate: string;
  endDate: string;
}

export type UserMembershipTier = 'free' | 'premium' | 'enterprise';

export interface UserSubscriptionState {
  tier: UserMembershipTier;
  isAdFree: boolean;
  userEmail?: string;
  startDate?: string;
  renewalDate?: string;
  breakingNewsAlerts?: boolean;
  dailyDigestAlerts?: boolean;
}

export interface RevenueAnalyticsSummary {
  totalRevenue: number;
  affiliateEarnings: number;
  sponsoredArticleIncome: number;
  aiDirectoryIncome: number;
  digitalProductSales: number;
  newsletterAdIncome: number;
  adSenseIncome: number;
  monthlyGrowthRate: number;
  topPerformingProduct: string;
  dailyBreakdown: { date: string; amount: number }[];
}

