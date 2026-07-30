import { Article, Category, AdPlacement, AutoPublisherSettings, PublishingLog } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'technology', name: 'Technology', description: 'Latest tech innovation, hardware & software developments.', iconName: 'Cpu', enabled: true, color: 'bg-blue-500' },
  { id: 'ai', name: 'Artificial Intelligence', description: 'Generative AI, neural architectures & machine intelligence.', iconName: 'Bot', enabled: true, color: 'bg-purple-500' },
  { id: 'cybersecurity', name: 'Cybersecurity', description: 'InfoSec threats, encryption, data privacy & zero-day exploits.', iconName: 'ShieldAlert', enabled: true, color: 'bg-red-500' },
  { id: 'business', name: 'Business', description: 'Corporate strategy, market shifts, startups & mergers.', iconName: 'Briefcase', enabled: true, color: 'bg-amber-500' },
  { id: 'finance', name: 'Finance', description: 'Global markets, banking, interest rates & investments.', iconName: 'TrendingUp', enabled: true, color: 'bg-emerald-500' },
  { id: 'cryptocurrency', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, DeFi & blockchain breakthroughs.', iconName: 'Coins', enabled: true, color: 'bg-yellow-500' },
  { id: 'science', name: 'Science', description: 'Space exploration, physics breakthroughs & climate research.', iconName: 'Sparkles', enabled: true, color: 'bg-teal-500' },
  { id: 'gaming', name: 'Gaming', description: 'Console wars, esports, indie hits & next-gen engines.', iconName: 'Gamepad2', enabled: true, color: 'bg-indigo-500' },
  { id: 'entertainment', name: 'Entertainment', description: 'Streaming giants, cinema releases & pop culture trends.', iconName: 'Film', enabled: true, color: 'bg-pink-500' },
  { id: 'sports', name: 'Sports', description: 'Global leagues, tournament results & athletic engineering.', iconName: 'Trophy', enabled: true, color: 'bg-orange-500' },
  { id: 'health', name: 'Health & BioTech', description: 'Medical research, longevity, CRISPR & wellness trends.', iconName: 'HeartPulse', enabled: true, color: 'bg-rose-500' },
  { id: 'education', name: 'Education', description: 'EdTech, digital learning models & academic transformation.', iconName: 'GraduationCap', enabled: true, color: 'bg-cyan-500' },
  { id: 'politics', name: 'Politics', description: 'Policy regulations, tech legislation & governance updates.', iconName: 'Building2', enabled: true, color: 'bg-slate-500' },
  { id: 'world', name: 'World News', description: 'Global events, international relations & economic summits.', iconName: 'Globe', enabled: true, color: 'bg-emerald-600' }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'next-gen-quantum-neural-networks-breakthrough',
    title: 'Next-Gen Quantum Neural Networks Achieve 99.8% Efficiency Milestone in Autonomous Systems',
    subtitle: 'A joint coalition of international researchers demonstrates fault-tolerant hybrid quantum processing for real-time edge computing.',
    category: 'ai',
    author: {
      name: 'PulseAI News Desk',
      role: 'Autonomous AI Chief Editor',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    readingTime: 5,
    summary: 'Researchers have unveiled a hybrid quantum-classical neural network processor capable of conducting complex multi-variable simulations with sub-millisecond latency. This breakthrough bridges the gap between theoretical quantum advantage and practical commercial AI infrastructure.',
    body: `### The Quantum Leap in Artificial Intelligence

In a monumental development for high-performance computing, an international consortium of computer scientists and quantum engineers has revealed a operational **Quantum Neural Network (QNN)** framework operating at room temperature with high fidelity.

Unlike traditional von Neumann compute architectures, the newly developed processing matrix utilizes **superconducting qutrits** paired with photon-assisted waveguides. This novel approach allows massive matrix multiplication algorithms—the foundation of modern generative AI foundation models—to execute in logarithmic time ($O(\\log n)$).

### Key Technical Achievements

* **99.8% Quantum Gate Fidelity**: Overcomes previous thermal noise limitations that plagued sub-5nm quantum processors.
* **Instantaneous Context Synthesis**: Capable of ingesting over 10 million parameters per microsecond, opening new frontiers in real-time climate modeling and protein folding.
* **Energy Consumption Reduced by 84%**: By leveraging zero-resistance photon channels, power requirements drop significantly compared to hyper-scale GPU clusters.

> "We are witnessing the transition from speculative laboratory experiments to real-world industrial deployment. Quantum AI will alter our computational limits within the decade." — *Dr. Elena Vance, Lead Quantum Systems Architect*

### Real-World Implications for Enterprise AI

As enterprises scale LLM deployments across global networks, power grid constraints have become a primary bottleneck. The integration of hybrid QNN accelerators promises to allow local datacenters to run trillion-parameter models with minimal thermal overhead.

Furthermore, autonomous aviation and robotic medicine stand to benefit from near-zero latency sensor processing. Clinical trials with AI-guided robotic microsurgery are expected to begin by Q4 2026.

### Architectural Roadmap & What Lies Ahead

The consortium plans to release an open-source SDK for quantum tensor operations next month, allowing developers around the world to compile standard PyTorch and JAX graphs directly into quantum gate instructions.`,
    faqs: [
      {
        question: 'How does Quantum Neural Computing differ from traditional AI chips?',
        answer: 'Traditional AI chips use binary silicon transistors (0s and 1s). Quantum processors leverage quantum superposition and entanglement, enabling simultaneous evaluation of thousands of potential states.'
      },
      {
        question: 'When will Quantum AI models be commercially available for developers?',
        answer: 'Developer API preview access is scheduled for beta release next month, with enterprise server deployments rolling out in late 2026.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Superconducting quantum processing array engineered for multi-dimensional neural synthesis.',
    tags: ['Quantum Computing', 'AI Models', 'Deep Learning', 'Hardware Breakthrough', 'Tech Future'],
    viewCount: 14820,
    likesCount: 642,
    isBreaking: true,
    isTrending: true,
    isEditorsPick: true,
    status: 'published',
    metaTitle: 'Quantum Neural Networks Hit 99.8% Efficiency | PulseAI News',
    metaDescription: 'Discover how the latest breakthrough in hybrid quantum neural networks enables sub-millisecond AI processing with 84% lower power usage.',
    relatedArticleIds: ['art-2', 'art-3', 'art-5'],
    comments: [
      {
        id: 'c-101',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        content: 'The reduction in energy consumption is huge for server farms. Current GPU power costs are insane!',
        timestamp: '45 minutes ago',
        likes: 24
      },
      {
        id: 'c-102',
        author: 'Sarah Lin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        content: 'Looking forward to the open-source PyTorch quantum SDK release next month!',
        timestamp: '20 minutes ago',
        likes: 12
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'zero-day-vulnerability-mitigated-global-cloud-infra',
    title: 'Global Cyber Taskforce Neutralizes Zero-Day Exploit Targeting Enterprise Kubernetes Clusters',
    subtitle: 'Automated AI security agents detect and isolate a sophisticated kernel-level vector within 14 minutes of discovery.',
    category: 'cybersecurity',
    author: {
      name: 'PulseAI News Desk',
      role: 'Cyber Intelligence Analyst',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    readingTime: 4,
    summary: 'Security engineers and automated threat response bots successfully contained a critical zero-day privilege escalation vulnerability affecting widespread cloud container orchestration platforms across North America and Europe.',
    body: `### Rapid Mitigation in Cloud Infrastructure

Security ops centers globally were on high alert earlier today after anomaly sensors flagged unauthenticated privilege escalation payloads targeting Linux kernel v6.12 memory boundaries.

The attack vector, dubbed **GhostKernel**, attempted to escape isolated container namespaces directly into hypervisor memory. However, autonomous endpoint monitoring software detected anomalous syscall patterns and automatically generated micro-patches across affected nodes.

### Breakdown of the Containment Sequence

1. **08:14 UTC**: Anomaly detection engines flag unusual memory allocation spikes in multi-tenant clusters.
2. **08:19 UTC**: Threat intelligence bots sandbox the suspicious payload and confirm zero-day payload characteristics.
3. **08:28 UTC**: Automated patching algorithms deploy eBPF-based security wrappers to block payload execution without downtime.

### Expert Guidance for Cloud Administrators

Cybersecurity authorities recommend all system administrators update container runtime packages immediately to build **v1.32.4** or higher, and verify that strict eBPF syscall filtering is enabled across all public ingress points.`,
    faqs: [
      {
        question: 'Was any customer data compromised during the GhostKernel incident?',
        answer: 'Initial forensic reports indicate that early containment by automated security tools prevented data exfiltration across monitored cloud providers.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Real-time cybersecurity threat vector visualization in enterprise cloud operations center.',
    tags: ['Cybersecurity', 'Zero Day', 'Cloud Security', 'Kubernetes', 'InfoSec'],
    viewCount: 9430,
    likesCount: 318,
    isBreaking: false,
    isTrending: true,
    isEditorsPick: true,
    status: 'published',
    metaTitle: 'Zero-Day Cloud Vulnerability Mitigated by AI Agents | PulseAI',
    metaDescription: 'Read how autonomous cybersecurity bots neutralized a major container kernel exploit before data exfiltration occurred.',
    relatedArticleIds: ['art-1', 'art-6'],
    comments: []
  },
  {
    id: 'art-3',
    slug: 'federal-reserve-digital-currency-pilots-announced',
    title: 'Central Banks Announce Interoperable Instant Cross-Border Settlement Framework',
    subtitle: 'A unified protocol aims to slash international remittance fees by 92% using high-speed consensus ledgers.',
    category: 'finance',
    author: {
      name: 'PulseAI News Desk',
      role: 'Financial Markets Desk',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    readingTime: 6,
    summary: 'A consortium of 18 central monetary authorities has released final specifications for Project Nexus, a real-time cross-border payment gateway connecting national fiat settlement engines.',
    body: `### Transforming Global Remittance and Corporate FX

Cross-border financial transactions have historically suffered from multi-day settlement delays and multi-tiered intermediary banking markups. Today's release of the **Project Nexus Final Architecture** promises to fundamentally reshape international trade settlement.

By connecting national instant payment systems (IPS) directly via a standardized API layer and atomic swap mechanisms, cross-currency settlements will settle in under three seconds.

### Core Architecture & Key Pillars

* **Atomic Delivery vs. Payment (DvP)**: Eliminates counterparty risk by locking funds across both sovereign ledgers simultaneously.
* **Transparent FX Fee Discovery**: Automated liquidity provider auctions guarantee real-time competitive exchange rates for retail and commercial users alike.
* **Compliance Integration**: Built-in automated AML and sanctions compliance checking runs in parallel without delaying transaction confirmation.

Financial analysts predict that global businesses will save upwards of $45 billion annually in foreign exchange overhead once full commercial rollout concludes in 2027.`,
    faqs: [
      {
        question: 'Does Project Nexus replace existing local banking apps?',
        answer: 'No. Nexus functions as an underlying clearing highway. Consumers will interact with their standard retail banking and payment apps seamlessly.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Global financial trading desks monitoring real-time currency clearance indicators.',
    tags: ['Finance', 'Banking', 'Cross-Border Payments', 'Economy', 'Global Trade'],
    viewCount: 11200,
    likesCount: 450,
    isBreaking: false,
    isTrending: true,
    isEditorsPick: false,
    status: 'published',
    metaTitle: 'Central Banks Launch Instant Cross-Border Settlement Protocol | PulseAI',
    metaDescription: 'Read how Project Nexus connects national payment gateways for instantaneous, low-cost international transfers.',
    relatedArticleIds: ['art-4', 'art-1'],
    comments: []
  },
  {
    id: 'art-4',
    slug: 'solana-ethereum-layer-2-bridging-protocol-standard',
    title: 'DeFi TVL Reaches $180 Billion as Next-Gen Cross-Chain Liquidity Bridges Go Live',
    subtitle: 'Zero-knowledge cryptographic proofs allow frictionless asset transfers between EVM and SVM blockchains without wrapped tokens.',
    category: 'cryptocurrency',
    author: {
      name: 'PulseAI News Desk',
      role: 'Web3 & Crypto Correspondent',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    readingTime: 4,
    summary: 'Decentralized finance protocols experience a surge in total value locked following the launch of non-custodial ZK bridges that eliminate vulnerability risks traditional bridge contracts faced.',
    body: `### Eliminating Bridge Hacks with Zero-Knowledge Mathematics

Historical cross-chain bridges were notorious targets for exploits due to multi-sig collateral vaults holding billions in wrapped assets. The introduction of **ZK-Relay Light Clients** changes the paradigm completely.

By proving consensus state transitions mathematically on destination chains, traders can swap native tokens directly across disparate blockchain architectures without trusting centralized custodians.

### Market Reaction and Volume Metrics

On-chain DEX volume surged past $8.4 billion in 24 hours as arbitrage algorithms synchronized prices across Ethereum Layer-2 networks, Solana, and Avalanche seamlessly.`,
    featuredImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Decentralized liquidity telemetry and cryptographic validation node visualizer.',
    tags: ['Crypto', 'DeFi', 'Blockchain', 'Ethereum', 'Solana', 'ZK Proofs'],
    viewCount: 8190,
    likesCount: 295,
    isBreaking: false,
    isTrending: false,
    isEditorsPick: false,
    status: 'published',
    metaTitle: 'DeFi TVL Surges to $180B with Zero-Knowledge Bridges | PulseAI',
    metaDescription: 'Learn how mathematical ZK proofs are unlocking secure cross-chain liquidity across major decentralized networks.',
    relatedArticleIds: ['art-3', 'art-1'],
    comments: []
  },
  {
    id: 'art-5',
    slug: 'fusion-energy-grid-pilot-station-groundbreaking',
    title: 'Commercial Fusion Reactor Construction Begins on World’s First 500MW Clean Energy Plant',
    subtitle: 'Engineers begin assembly of high-temperature HTS magnet rings aimed at delivering continuous base-load fusion power by 2029.',
    category: 'science',
    author: {
      name: 'PulseAI News Desk',
      role: 'Science & CleanTech Editor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 900).toISOString(),
    readingTime: 5,
    summary: 'Construction crews have officially broken ground on the Helios-1 fusion energy pilot facility, designed to feed zero-carbon electricity into the commercial grid with an unprecedented net energy gain factor ($Q > 15$).',
    body: `### The Dawn of Abundant Zero-Carbon Energy

After decades of experimental physics, the transition from lab-scale magnetic confinement to commercial power production has officially begun. The **Helios-1 Tokamak**, utilizing High-Temperature Superconducting (HTS) REBCO magnet tapes, promises to generate 500 megawatts of thermal output from deuterium-tritium plasma.

### Key Technological Innovations

* **Compact Tokamak Geometry**: HTS magnets create magnetic fields exceeding 20 Tesla, allowing a reactor 5x smaller than ITER to achieve net power gain.
* **Liquid Lithium Divertor**: Direct thermal energy extraction with continuous tritium breeding cycles.
* **Plasma Control via Deep Reinforcement Learning**: AI magnetic coils adjust plasma shape 10,000 times per second to eliminate tearing instabilities.`,
    faqs: [
      {
        question: 'Is fusion energy safe compared to conventional fission?',
        answer: 'Yes. Fusion produces zero long-lived radioactive waste, cannot suffer meltdowns (if containment drops, plasma instantly cools and stops), and produces zero greenhouse gases.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'High-temperature superconducting coil assembly inside tokamak vacuum vessel chamber.',
    tags: ['Science', 'Fusion Energy', 'CleanTech', 'Physics', 'Energy Future'],
    viewCount: 16540,
    likesCount: 890,
    isBreaking: false,
    isTrending: true,
    isEditorsPick: true,
    status: 'published',
    metaTitle: 'Construction Begins on 500MW Commercial Fusion Plant | PulseAI',
    metaDescription: 'Groundbreaking news in clean energy: Helios-1 starts tokamak assembly for continuous grid-connected fusion power.',
    relatedArticleIds: ['art-1', 'art-6'],
    comments: []
  },
  {
    id: 'art-6',
    slug: 'unreal-engine-6-photorealistic-realtime-rendering-unveiled',
    title: 'Unreal Engine 6 Unveiled: Neural Rendering Engine Drives Photorealistic 120FPS Gaming',
    subtitle: 'Epic Games showcases AI-driven geometry synthesis and path-traced global illumination running smoothly on consumer hardware.',
    category: 'gaming',
    author: {
      name: 'PulseAI News Desk',
      role: 'Gaming & Interactive Tech Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publicationDate: new Date(Date.now() - 1000 * 60 * 1200).toISOString(),
    readingTime: 4,
    summary: 'The next generation of real-time graphics engines leverages deep neural reconstruction to render billions of micro-polygons with full path tracing in real time.',
    body: `### Bridging Film-Quality Graphics and Interactive Gameplay

Gamers and interactive creators were stunned by Epic Games’ surprise announcement of **Unreal Engine 6**. The engine introduces **Neural Nanite**, replacing traditional geometry pipelines with neural field representations that stream assets directly from storage with infinite detail.

### Core Features

* **Sub-Surface Neural Scattering**: Human skin and organic textures look lifelike under dynamic lighting environments.
* **AI World Generator**: Game designers can sketch 3D topography and allow generative AI agents to craft immersive environments complete with realistic physics.
* **Cross-Platform Scalability**: Native optimization targets PC rigs, consoles, and standalone VR headsets seamlessly.`,
    featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Next-gen real-time neural path-tracing demonstration environment.',
    tags: ['Gaming', 'Unreal Engine', 'Graphics', 'GameDev', 'VR'],
    viewCount: 12400,
    likesCount: 520,
    isBreaking: false,
    isTrending: false,
    isEditorsPick: false,
    status: 'published',
    metaTitle: 'Unreal Engine 6 Unveils Real-Time Neural Path Tracing | PulseAI',
    metaDescription: 'Explore the revolutionary features in Unreal Engine 6, including AI geometry synthesis and sub-millisecond path tracing.',
    relatedArticleIds: ['art-1', 'art-5'],
    comments: []
  }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: 'top_banner',
    name: 'Top Header Leaderboard (728x90 / Responsive)',
    enabled: true,
    provider: 'Google AdSense',
    codeSnippet: '<!-- Google AdSense Header Responsive -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-123456789" data-ad-slot="987654321" data-ad-format="auto"></ins>',
    imageBannerUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=200',
    destinationUrl: 'https://ai.studio',
    impressionsCount: 42100,
    clicksCount: 1280
  },
  {
    id: 'in_article',
    name: 'In-Article Embedded Banner (Responsive)',
    enabled: true,
    provider: 'Custom Sponsor',
    codeSnippet: '<!-- Custom Sponsor In-Content -->\n<div class="p-4 bg-purple-900/40 rounded-xl text-center border border-purple-500/30"><strong>Sponsor Message:</strong> Try PulseAI Enterprise for Automated Content Workflows!</div>',
    imageBannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=300',
    destinationUrl: 'https://ai.studio',
    impressionsCount: 28400,
    clicksCount: 940
  },
  {
    id: 'sidebar',
    name: 'Desktop Sidebar Square (300x250)',
    enabled: true,
    provider: 'Google AdSense',
    codeSnippet: '<!-- Google AdSense Sidebar -->\n<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-123456789" data-ad-slot="123456789"></ins>',
    imageBannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=300',
    destinationUrl: 'https://ai.studio',
    impressionsCount: 35900,
    clicksCount: 1120
  },
  {
    id: 'footer',
    name: 'Footer Wide Leaderboard',
    enabled: true,
    provider: 'Mediavine',
    codeSnippet: '<!-- Footer Ad -->\n<div class="text-xs text-slate-400 text-center py-2">Advertisement Slot - Managed via PulseAI Admin</div>',
    imageBannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=200',
    destinationUrl: 'https://ai.studio',
    impressionsCount: 19800,
    clicksCount: 430
  }
];

export const INITIAL_SETTINGS: AutoPublisherSettings = {
  autoPublishEnabled: true,
  frequencyHours: 2,
  selectedCategories: ['technology', 'ai', 'cybersecurity', 'business', 'finance', 'science'],
  autoApprove: true,
  lastRunTimestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  targetArticlesPerRun: 1
};

export const INITIAL_LOGS: PublishingLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: 'AI Auto-Publishing Engine',
    articleTitle: 'Next-Gen Quantum Neural Networks Achieve 99.8% Efficiency Milestone in Autonomous Systems',
    category: 'ai',
    status: 'success',
    details: 'Fetched breaking news, generated original article with FAQs and SEO schema. Auto-published.'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    action: 'AI Auto-Publishing Engine',
    articleTitle: 'Global Cyber Taskforce Neutralizes Zero-Day Exploit Targeting Enterprise Kubernetes Clusters',
    category: 'cybersecurity',
    status: 'success',
    details: 'Original content generated via Gemini Search Grounding. Image verified.'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
    action: 'Newsletter Digest Engine',
    status: 'success',
    details: 'Dispatched daily AI top stories newsletter to 1,420 active subscribers.'
  }
];
