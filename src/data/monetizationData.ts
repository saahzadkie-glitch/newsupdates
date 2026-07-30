import { 
  AffiliateProduct, 
  SponsoredArticlePackage, 
  SponsoredArticleSubmission, 
  AiToolListing, 
  DigitalProduct, 
  NewsletterSponsorAd,
  RevenueAnalyticsSummary
} from '../types';

export const INITIAL_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'aff-1',
    name: 'Jasper AI Studio Pro',
    category: 'AI Software',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Enterprise generative AI platform designed for high-velocity marketing, technical copywriting, and SEO campaign automation.',
    features: ['50+ AI Writing Workflows', 'Brand Voice Customization', 'Built-in SurferSEO Integration', 'Multi-Language Synthesis (30+ Languages)'],
    price: '$49/mo',
    originalPrice: '$69/mo',
    rating: 4.9,
    reviewsCount: 1240,
    pros: ['Industry-leading article generation quality', 'Integrates directly into CMS workflows', 'Includes plagiarism checker'],
    cons: ['Slightly higher price point for solo creators'],
    affiliateUrl: 'https://jasper.ai?ref=newupdate',
    partnerName: 'Jasper AI Inc',
    commissionRate: '30% Recurring',
    clicksCount: 1420,
    conversionsCount: 84,
    totalEarnings: 1234.80,
    isFeatured: true,
    disclosure: 'This website may earn an affiliate commission from purchases made through links on this page.',
    faq: [
      { question: 'Is there a free trial?', answer: 'Yes, Jasper offers a 7-day unlimited trial for new accounts.' },
      { question: 'Can it write long-form tech articles?', answer: 'Yes, it features custom long-form templates specifically tuned for software and technology documentation.' }
    ],
    comparisonTable: [
      { feature: 'Brand Voice Memory', thisProduct: 'Advanced Multi-Tone', competitor: 'Basic Standard' },
      { feature: 'SEO Content Mode', thisProduct: 'Included Native', competitor: 'Requires Paid Add-on' }
    ]
  },
  {
    id: 'aff-2',
    name: 'NordVPN Threat Protection Ultra',
    category: 'VPN Services',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Next-generation VPN with hardware-accelerated encryption, malware blocker, and automated dark-web leak monitoring.',
    features: ['Double Data Encryption (AES-256)', 'Strict Zero-Logs Policy', 'Built-in Meshnet Remote Access', 'Over 6,000 High-Speed Servers'],
    price: '$3.09/mo',
    originalPrice: '$12.99/mo',
    rating: 4.8,
    reviewsCount: 3820,
    pros: ['Blazing fast NordLynx protocol', 'Audited zero-logs security infrastructure', 'Blocks malicious ads and popups'],
    cons: ['Desktop interface can be slightly dense'],
    affiliateUrl: 'https://nordvpn.com?ref=newupdate',
    partnerName: 'Nord Security',
    commissionRate: '$40/sale',
    clicksCount: 2150,
    conversionsCount: 112,
    totalEarnings: 4480.00,
    isFeatured: true,
    disclosure: 'This website may earn an affiliate commission from purchases made through links on this page.'
  },
  {
    id: 'aff-3',
    name: 'Hostinger Cloud Startup Hosting',
    category: 'Web Hosting',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance cloud hosting powered by NVMe SSD storage, HTTP/3, dedicated IP, and free automated SSL certificates.',
    features: ['300 Websites Included', '300 GB NVMe Storage', 'Free Global CDN & Daily Backups', '99.9% Uptime SLA Guaranteed'],
    price: '$9.99/mo',
    originalPrice: '$24.99/mo',
    rating: 4.7,
    reviewsCount: 1950,
    pros: ['Exceptional speed benchmark scores', 'Free domain name included for 1st year', 'One-click Node.js & WordPress deploys'],
    cons: ['Renews at standard non-promotional rate'],
    affiliateUrl: 'https://hostinger.com?ref=newupdate',
    partnerName: 'Hostinger International',
    commissionRate: '60% Per Sale',
    clicksCount: 980,
    conversionsCount: 39,
    totalEarnings: 1404.00,
    isFeatured: false,
    disclosure: 'This website may earn an affiliate commission from purchases made through links on this page.'
  },
  {
    id: 'aff-4',
    name: 'MacBook Pro 16" M3 Max (64GB)',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate workstation laptop for AI developers, machine learning engineers, and software architects.',
    features: ['Apple M3 Max Chip (16-core CPU, 40-core GPU)', '64GB Unified Memory', '16.2" Liquid Retina XDR Display', '22-hour Battery Life'],
    price: '$3,499.00',
    rating: 4.95,
    reviewsCount: 890,
    pros: ['Unrivaled local LLM inference performance', 'Silent thermal architecture', 'Best-in-class XDR display'],
    cons: ['Heavy initial financial investment'],
    affiliateUrl: 'https://amazon.com/dp/B0CL5J?tag=newupdate-20',
    partnerName: 'Amazon Associates',
    commissionRate: '4% Sale Value',
    clicksCount: 3400,
    conversionsCount: 14,
    totalEarnings: 1959.44,
    isFeatured: true,
    disclosure: 'As an Amazon Associate, this site earns from qualifying purchases.'
  },
  {
    id: 'aff-5',
    name: 'Full-Stack AI Engineer Masterclass 2026',
    category: 'Programming Courses',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive 80-hour video curriculum teaching LLM fine-tuning, RAG architecture, Vector DBs, LangChain, and production API deployments.',
    features: ['Certificate of Mastery', '20+ Hands-on Production Repos', 'Private Discord Mentor Access', 'Lifetime Content Updates'],
    price: '$129.00',
    originalPrice: '$299.00',
    rating: 4.9,
    reviewsCount: 610,
    pros: ['Updated monthly with latest GenAI models', 'Real-world deployment projects included', 'Direct Q&A with Senior Engineers'],
    cons: ['Requires intermediate JavaScript/TypeScript knowledge'],
    affiliateUrl: 'https://course-platform.com?ref=newupdate',
    partnerName: 'TechAcademy Pro',
    commissionRate: '40% Per Student',
    clicksCount: 1650,
    conversionsCount: 52,
    totalEarnings: 2683.20,
    isFeatured: true,
    disclosure: 'This website may earn an affiliate commission from purchases made through links on this page.'
  }
];

export const INITIAL_SPONSORED_PACKAGES: SponsoredArticlePackage[] = [
  {
    id: 'basic',
    title: 'Basic Sponsor',
    price: 299,
    features: [
      'Standard Sponsored Article Publication',
      'Permanent Do-Follow Backlink',
      'Company Logo & Website Mention',
      'Indexed by Google News & Search Engines'
    ]
  },
  {
    id: 'premium',
    title: 'Premium Growth Package',
    price: 699,
    recommended: true,
    features: [
      'Featured Homepage Carousel Placement (7 Days)',
      'Permanent Do-Follow Backlink & Brand Profile',
      'Inclusion in Daily AI Newsletter (25,000+ Subscribers)',
      'Dedicated Social Media Blast on X & LinkedIn',
      'Custom SEO Meta Tag & Schema Optimization'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Campaign',
    price: 1499,
    features: [
      '3 Dedicated Sponsored Tech Articles',
      'Top Banner Placement for 30 Days',
      'Exclusive AI Tools Directory Verified Listing',
      'Top-Tier Newsletter Solo Sponsorship Slot',
      'Detailed Performance Analytics & Click Tracking'
    ]
  }
];

export const INITIAL_SPONSORED_SUBMISSIONS: SponsoredArticleSubmission[] = [
  {
    id: 'spon-1',
    companyName: 'NeuralCloud Inc.',
    companyEmail: 'marketing@neuralcloud.io',
    companyWebsite: 'https://neuralcloud.io',
    packageTier: 'premium',
    articleTitle: 'How NeuralCloud is Reducing Serverless Inference Latency by 70%',
    articleContent: 'As generative AI adoption skyrockets, enterprise infrastructure demands sub-millisecond model response times...',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'approved',
    amountPaid: 699,
    adminNotes: 'Verified domain ownership. Approved for publication.'
  }
];

export const INITIAL_AI_TOOLS_DIRECTORY: AiToolListing[] = [
  {
    id: 'tool-1',
    name: 'Claude 3.7 Sonnet',
    tagline: 'Hybrid reasoning and instant code synthesis model by Anthropic',
    description: 'Claude 3.7 Sonnet combines speed and deep step-by-step cognitive reasoning for complex engineering, math, and creative tasks.',
    category: 'AI Coding & LLM',
    logoUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80',
    websiteUrl: 'https://anthropic.com',
    isPremium: true,
    isVerified: true,
    pricingModel: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.95,
    reviewsCount: 1420,
    viewsCount: 18400,
    clicksCount: 3910,
    submittedBy: 'Anthropic Team',
    createdAt: '2026-01-10',
    status: 'approved'
  },
  {
    id: 'tool-2',
    name: 'Cursor IDE',
    tagline: 'The AI-first code editor built for extreme developer velocity',
    description: 'Fork of VS Code built from the ground up to integrate multi-file edits, codebase indexing, and conversational refactoring.',
    category: 'Developer Tools',
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80',
    websiteUrl: 'https://cursor.com',
    isPremium: true,
    isVerified: true,
    pricingModel: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.9,
    reviewsCount: 980,
    viewsCount: 14200,
    clicksCount: 2890,
    submittedBy: 'Anysphere Inc.',
    createdAt: '2026-02-15',
    status: 'approved'
  },
  {
    id: 'tool-3',
    name: 'Perplexity Pro',
    tagline: 'AI conversational search engine with live web grounding',
    description: 'Replaces traditional search engines with clear, cited answer summaries powered by GPT-4o, Claude 3.5, and Sonar models.',
    category: 'AI Search & Research',
    logoUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=200&q=80',
    websiteUrl: 'https://perplexity.ai',
    isPremium: false,
    isVerified: true,
    pricingModel: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.8,
    reviewsCount: 740,
    viewsCount: 9300,
    clicksCount: 1840,
    submittedBy: 'Perplexity Team',
    createdAt: '2026-03-01',
    status: 'approved'
  },
  {
    id: 'tool-4',
    name: 'ElevenLabs Voice AI',
    tagline: 'Hyper-realistic text-to-speech & real-time voice cloning',
    description: 'Generates natural human speech in over 30 languages with emotion, tone adjustment, and low-latency API integration.',
    category: 'Audio & Audio AI',
    logoUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80',
    websiteUrl: 'https://elevenlabs.io',
    isPremium: true,
    isVerified: true,
    pricingModel: 'Freemium',
    startingPrice: '$5/mo',
    rating: 4.85,
    reviewsCount: 520,
    viewsCount: 8100,
    clicksCount: 1520,
    submittedBy: 'ElevenLabs Inc',
    createdAt: '2026-03-12',
    status: 'approved'
  }
];

export const INITIAL_DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'dig-1',
    title: 'The AI Prompt Engineering Bible 2026',
    type: 'prompt_pack',
    category: 'AI & Automation',
    description: 'Over 500+ battle-tested prompts for software architecture, code review, automated testing, copywriting, and SEO keyword research.',
    price: 29.00,
    originalPrice: 79.00,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewSnippet: 'Includes system prompts for GPT-4o, Claude 3.7, DeepSeek V3, and Gemini 2.0. Copy-paste ready markdown templates.',
    downloadUrl: '/downloads/ai-prompt-bible-2026.pdf',
    rating: 4.95,
    salesCount: 384,
    totalRevenue: 11136.00,
    features: ['500+ Curated Prompts', 'Includes System Prompt Instructions', 'Lifetime Free Content Updates', 'PDF & Notion Database Format'],
    author: 'NewUpdate AI Editorial Team'
  },
  {
    id: 'dig-2',
    title: 'Enterprise DevSecOps & Security Cheat Sheet',
    type: 'cheat_sheet',
    category: 'Cybersecurity',
    description: 'High-density visual reference guide covering Kubernetes hardening, OWASP Top 10 mitigation, Docker container security, and cloud IAM policies.',
    price: 19.00,
    originalPrice: 49.00,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    previewSnippet: 'Quick lookup tables for Linux kernel hardening, SSH key rotation, Nginx SSL security headers, and PCI-DSS compliance checklists.',
    downloadUrl: '/downloads/devsecops-security-cheatsheet.pdf',
    rating: 4.9,
    salesCount: 290,
    totalRevenue: 5510.00,
    features: ['High-Res Vector PDF', 'Printable Desk Reference Sheet', 'Includes Shell Commands & Code Snippets', 'Verified by CISSP Engineers'],
    author: 'Security Research Lead'
  },
  {
    id: 'dig-3',
    title: 'Full-Stack React + Express + Tailwind SaaS Starter',
    type: 'template',
    category: 'Developer Templates',
    description: 'Production-ready boilerplate featuring Stripe subscription billing, authentication, dark mode, responsive layout, and clean TypeScript setup.',
    price: 49.00,
    originalPrice: 120.00,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    previewSnippet: 'Clean modular code structure with React 19, Express Node server, Tailwind v4, and comprehensive UI components.',
    downloadUrl: '/downloads/saas-starter-template-ts.zip',
    rating: 4.85,
    salesCount: 165,
    totalRevenue: 8085.00,
    features: ['Complete Source Code License', 'Stripe Payment Webhook Integration', '100% TypeScript Coverage', 'Documentation & Setup Guide'],
    author: 'Senior Systems Architect'
  },
  {
    id: 'dig-4',
    title: 'Modern Cybersecurity Handbook (2nd Edition)',
    type: 'ebook',
    category: 'Cybersecurity',
    description: '350-page deep-dive ebook exploring zero-trust architecture, AI-driven threat detection, ransomware defense tactics, and incident response.',
    price: 35.00,
    originalPrice: 65.00,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    previewSnippet: 'Chapter 4: Hardening Zero-Trust Boundaries in Multi-Cloud Environments using Automated Policy Enforcers.',
    downloadUrl: '/downloads/cybersecurity-handbook-2nd-edition.pdf',
    rating: 4.9,
    salesCount: 210,
    totalRevenue: 7350.00,
    features: ['EPUB, MOBI & DRM-free PDF', '35 Real-World Case Studies', 'Includes Architecture Diagrams', 'Source Code Exercises Included'],
    author: 'Dr. Marcus Vance'
  }
];

export const INITIAL_NEWSLETTER_ADS: NewsletterSponsorAd[] = [
  {
    id: 'news-ad-1',
    sponsorName: 'Datadog APM',
    headline: 'Monitor AI Pipeline Latency in Real-Time with Datadog',
    bodyText: 'Track LLM call costs, token usage, and API response times across your entire cloud stack with zero-code instrumentation.',
    ctaText: 'Start Free 14-Day Trial →',
    targetUrl: 'https://datadoghq.com?ref=newupdate',
    placement: 'top_banner',
    price: 450.00,
    impressions: 24500,
    clicks: 890,
    status: 'active',
    startDate: '2026-07-01',
    endDate: '2026-08-01'
  }
];

export const INITIAL_REVENUE_SUMMARY: RevenueAnalyticsSummary = {
  totalRevenue: 38450.44,
  affiliateEarnings: 11757.44,
  sponsoredArticleIncome: 7490.00,
  aiDirectoryIncome: 3920.00,
  digitalProductSales: 12083.00,
  newsletterAdIncome: 2200.00,
  adSenseIncome: 1000.00,
  monthlyGrowthRate: 24.5,
  topPerformingProduct: 'The AI Prompt Engineering Bible 2026',
  dailyBreakdown: [
    { date: 'Jul 24', amount: 980 },
    { date: 'Jul 25', amount: 1240 },
    { date: 'Jul 26', amount: 1100 },
    { date: 'Jul 27', amount: 1450 },
    { date: 'Jul 28', amount: 1680 },
    { date: 'Jul 29', amount: 1520 },
    { date: 'Jul 30', amount: 1890 }
  ]
};
