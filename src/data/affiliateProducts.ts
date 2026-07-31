export interface CategoryProduct {
  name: string;
  imageUrl: string;
  description: string;
  amazonUrl: string;
}

const buildAmazonUrl = (searchTerm: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=techverseai20-20`;

export const RELATED_PRODUCTS: Record<string, CategoryProduct[]> = {
  technology: [
    {
      name: 'Apple MacBook Air M3 Pro Laptop',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      description: 'Ultralight power and all-day battery life for modern tech professionals.',
      amazonUrl: buildAmazonUrl('Apple MacBook Air M3')
    },
    {
      name: 'Logitech MX Master 3S Wireless Mouse',
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
      description: 'Quiet clicks and 8K DPI precision tracking for high-performance workflow.',
      amazonUrl: buildAmazonUrl('Logitech MX Master 3S')
    },
    {
      name: 'Anker 737 Power Bank 24,000mAh',
      imageUrl: 'https://images.unsplash.com/photo-1609592807981-d112d7c58550?auto=format&fit=crop&w=600&q=80',
      description: 'Ultra-fast 140W portable charging for laptops, tablets, and smartphones.',
      amazonUrl: buildAmazonUrl('Anker 737 Power Bank')
    }
  ],
  ai: [
    {
      name: 'NVIDIA GeForce RTX 4090 GPU',
      imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      description: 'Ultimate graphics power for local LLM inference and AI model development.',
      amazonUrl: buildAmazonUrl('NVIDIA RTX 4090')
    },
    {
      name: 'Deep Learning with Python (2nd Ed)',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Essential practical guide by François Chollet on neural networks and Keras.',
      amazonUrl: buildAmazonUrl('Deep Learning with Python Chollet')
    },
    {
      name: 'Raspberry Pi 5 8GB Starter Kit',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      description: 'Compact hardware platform for AI edge deployment and computer vision projects.',
      amazonUrl: buildAmazonUrl('Raspberry Pi 5 8GB Kit')
    }
  ],
  cybersecurity: [
    {
      name: 'Yubico YubiKey 5C NFC Security Key',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      description: 'Hardware-based multi-factor authentication to prevent account phishing.',
      amazonUrl: buildAmazonUrl('YubiKey 5C NFC')
    },
    {
      name: 'Hardware Wallet Ledger Nano X',
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
      description: 'Secure Bluetooth cold storage device for digital credentials and crypto assets.',
      amazonUrl: buildAmazonUrl('Ledger Nano X')
    },
    {
      name: 'ASUS ROG Rapture WiFi 6E Gaming Router',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      description: 'Advanced AiProtection network security firewall with encrypted connections.',
      amazonUrl: buildAmazonUrl('ASUS ROG Rapture WiFi 6E Router')
    }
  ],
  finance: [
    {
      name: 'The Intelligent Investor by Benjamin Graham',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'The classic benchmark textbook on value investing and market strategy.',
      amazonUrl: buildAmazonUrl('The Intelligent Investor book')
    },
    {
      name: 'Casio FC-200V Financial Calculator',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      description: 'Advanced financial metrics calculator for real estate and investment analysis.',
      amazonUrl: buildAmazonUrl('Casio FC 200V Financial Calculator')
    },
    {
      name: 'Fireproof & Waterproof Document Bag',
      imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=600&q=80',
      description: 'Heavy-duty physical security storage for valuable financial and legal records.',
      amazonUrl: buildAmazonUrl('Fireproof Document Bag')
    }
  ],
  business: [
    {
      name: 'Atomic Habits by James Clear',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Proven practical framework for building effective executive habits and routines.',
      amazonUrl: buildAmazonUrl('Atomic Habits book')
    },
    {
      name: 'Sony WH-1000XM5 ANC Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Industry-leading noise cancellation for focused deep work and conference calls.',
      amazonUrl: buildAmazonUrl('Sony WH 1000XM5 Headphones')
    },
    {
      name: 'Ergonomic Mesh Executive Desk Chair',
      imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=600&q=80',
      description: 'All-day lumbar posture support for executive offices and remote workspaces.',
      amazonUrl: buildAmazonUrl('Ergonomic Mesh Desk Chair')
    }
  ],
  cryptocurrency: [
    {
      name: 'Trezor Safe 3 Crypto Hardware Wallet',
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
      description: 'Next-generation open-source cold storage wallet with hardware Secure Element.',
      amazonUrl: buildAmazonUrl('Trezor Safe 3 Wallet')
    },
    {
      name: 'Mastering Bitcoin (3rd Ed)',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Technical deep dive into the programming and security of decentralised money.',
      amazonUrl: buildAmazonUrl('Mastering Bitcoin book')
    },
    {
      name: 'Steel Cold Storage Seed Phrase Backup Plate',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      description: 'Indestructible fireproof stainless steel plate for private key seed backup.',
      amazonUrl: buildAmazonUrl('Crypto Metal Seed Phrase Plate')
    }
  ],
  science: [
    {
      name: 'Celestron NexStar 8SE Computerized Telescope',
      imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=80',
      description: 'High-precision automated Schmidt-Cassegrain telescope for astronomical observation.',
      amazonUrl: buildAmazonUrl('Celestron NexStar 8SE Telescope')
    },
    {
      name: 'AmScope 40X-2500X Compound Microscope',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      description: 'Professional LED binocular microscope for biological scientific analysis.',
      amazonUrl: buildAmazonUrl('AmScope Compound Microscope')
    },
    {
      name: 'The Physics Book: Big Ideas Simply Explained',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive visual chronicle of world-changing scientific breakthroughs.',
      amazonUrl: buildAmazonUrl('The Physics Book DK')
    }
  ],
  gaming: [
    {
      name: 'Steam Deck OLED 512GB Handheld Console',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      description: 'Portable AAA PC gaming featuring a vibrant HDR OLED touchscreen display.',
      amazonUrl: buildAmazonUrl('Steam Deck OLED')
    },
    {
      name: 'SteelSeries Arctis Nova Pro Wireless Headset',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Premium dual-wireless audio with active noise cancellation for competitive gaming.',
      amazonUrl: buildAmazonUrl('SteelSeries Arctis Nova Pro Wireless')
    },
    {
      name: 'Razer Huntsman V3 Pro Gaming Keyboard',
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
      description: 'Analog optical switches with rapid trigger technology for instant responsiveness.',
      amazonUrl: buildAmazonUrl('Razer Huntsman V3 Pro')
    }
  ],
  entertainment: [
    {
      name: 'LG C3 65-Inch OLED 4K Smart TV',
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
      description: 'Cinematic picture clarity with self-lit OLED pixels and Dolby Vision IQ.',
      amazonUrl: buildAmazonUrl('LG C3 65 Inch OLED TV')
    },
    {
      name: 'Sonos Beam Gen 2 Smart Soundbar',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Compact Dolby Atmos soundbar for immersive room-filling home theater audio.',
      amazonUrl: buildAmazonUrl('Sonos Beam Gen 2')
    },
    {
      name: 'Apple TV 4K 128GB Streaming Console',
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
      description: 'Ultra-fast 4K HDR streaming hub with Spatial Audio and smart home control.',
      amazonUrl: buildAmazonUrl('Apple TV 4K 128GB')
    }
  ],
  sports: [
    {
      name: 'Garmin Forerunner 965 GPS Smartwatch',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      description: 'Premium AMOLED running watch with full-color mapping and stamina metrics.',
      amazonUrl: buildAmazonUrl('Garmin Forerunner 965')
    },
    {
      name: 'Theragun PRO Gen 5 Percussive Massager',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      description: 'Deep tissue muscular recovery tool designed for athletes and fitness enthusiasts.',
      amazonUrl: buildAmazonUrl('Theragun PRO Gen 5')
    },
    {
      name: 'Bose SoundLink Flex Outdoor Speaker',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Rugged waterproof Bluetooth speaker built for field workouts and sports trips.',
      amazonUrl: buildAmazonUrl('Bose SoundLink Flex Speaker')
    }
  ],
  health: [
    {
      name: 'Oura Ring Gen3 Horizon Smart Ring',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      description: 'Sleek titanium smart ring for continuous sleep, HRV, and body temperature tracking.',
      amazonUrl: buildAmazonUrl('Oura Ring Gen3 Horizon')
    },
    {
      name: 'Withings Body Scan Smart Wi-Fi Scale',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      description: 'Segmental body composition analyzer with 6-lead ECG cardiovascular check.',
      amazonUrl: buildAmazonUrl('Withings Body Scan Scale')
    },
    {
      name: 'Philips Wake-Up Light Sunrise Alarm Clock',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      description: 'Natural light simulation alarm designed to improve sleep-wake circadian rhythm.',
      amazonUrl: buildAmazonUrl('Philips Wake Up Light Alarm Clock')
    }
  ],
  education: [
    {
      name: 'Kindle Paperwhite 16GB E-Reader',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: '300 ppi glare-free screen with adjustable warm light for distraction-free reading.',
      amazonUrl: buildAmazonUrl('Kindle Paperwhite 16GB')
    },
    {
      name: 'Anker Soundcore Space Q45 ANC Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Adaptive noise cancelling headphones ideal for quiet campus and library study.',
      amazonUrl: buildAmazonUrl('Anker Soundcore Space Q45')
    },
    {
      name: 'Rocketbook Core Reusable Smart Notebook',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
      description: 'Eco-friendly erasable notebook that syncs handwritten study notes to cloud storage.',
      amazonUrl: buildAmazonUrl('Rocketbook Core Reusable Notebook')
    }
  ],
  politics: [
    {
      name: "The Dictator's Handbook by Bueno de Mesquita",
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Essential political science analysis on governance, power dynamics, and statecraft.',
      amazonUrl: buildAmazonUrl('The Dictators Handbook book')
    },
    {
      name: 'Bose QuietComfort Wireless Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Engineered acoustic isolation for listening to longform political commentary.',
      amazonUrl: buildAmazonUrl('Bose QuietComfort Headphones')
    },
    {
      name: 'Moleskine Classic Hard Cover Notebook',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
      description: 'Durable thread-bound journal for policy planning, analysis, and speech notes.',
      amazonUrl: buildAmazonUrl('Moleskine Classic Hard Cover Notebook')
    }
  ],
  world: [
    {
      name: 'Kindle Scribe 64GB Digital Notebook & E-Reader',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Large 10.2" 300 ppi paperwhite screen for reading global press and taking notes.',
      amazonUrl: buildAmazonUrl('Kindle Scribe 64GB')
    },
    {
      name: 'Anker Universal Travel Plug Adapter',
      imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
      description: 'All-in-one international adapter with fast USB-C ports for multi-country travel.',
      amazonUrl: buildAmazonUrl('Anker Universal Travel Adapter')
    },
    {
      name: 'Bose QuietComfort Ultra Earbuds',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'World-class spatial audio and noise cancellation for international travel.',
      amazonUrl: buildAmazonUrl('Bose QuietComfort Ultra Earbuds')
    }
  ]
};
