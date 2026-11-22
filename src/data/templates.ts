export interface TemplateItem {
  id: string;
  slug: string;
  name: string;
  category: 'minimalist' | 'floral' | 'traditional' | 'luxury' | 'islamic' | 'rustic' | 'cartoon';
  isCartoon: boolean;
  themeType: string;
  badge?: string;
  thumbnail: string;
  description: string;
  accentColor: string;
  bgColor: string;
  fontFamily: string;
  features: string[];
}

export const TEMPLATES_DATA: TemplateItem[] = [
  // ================= 30 PHOTO TEMPLATES =================
  // 1. Minimalist & Modern Clean (5)
  {
    id: 'photo-min-1',
    slug: 'minimal-editorial',
    name: 'Minimal Editorial',
    category: 'minimalist',
    isCartoon: false,
    themeType: 'Foto - Minimalist',
    badge: 'Popular',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Tata letak editorial majalah dengan tipografi serif elegan dan whitespace modern.',
    accentColor: '#2b2b2b',
    bgColor: '#fcfcfc',
    fontFamily: 'font-serif',
    features: ['Tipografi Modern', 'Full-screen Photo', 'Responsive Clean Layout']
  },
  {
    id: 'photo-min-2',
    slug: 'modern-monochrome',
    name: 'Modern Monochrome',
    category: 'minimalist',
    isCartoon: false,
    themeType: 'Foto - Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Nuansa hitam-putih kontras tinggi yang timeless dan berkelas.',
    accentColor: '#171717',
    bgColor: '#ffffff',
    fontFamily: 'font-sans',
    features: ['Dark Mode Accent', 'Minimalist Grid', 'Smooth Transitions']
  },
  {
    id: 'photo-min-3',
    slug: 'clean-aesthetic',
    name: 'Clean Aesthetic',
    category: 'minimalist',
    isCartoon: false,
    themeType: 'Foto - Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Perpaduan warna krem hangat dan garis halus berkesan kontemporer.',
    accentColor: '#78716c',
    bgColor: '#fafaf9',
    fontFamily: 'font-serif',
    features: ['Warm Neutral Palette', 'Subtle Borders', 'Aesthetic Spacing']
  },
  {
    id: 'photo-min-4',
    slug: 'serene-white',
    name: 'Serene White',
    category: 'minimalist',
    isCartoon: false,
    themeType: 'Foto - Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    description: 'Kemurnian warna putih gading dengan penataan foto polaroid artistik.',
    accentColor: '#57534e',
    bgColor: '#f8fafc',
    fontFamily: 'font-sans',
    features: ['Polaroid Gallery', 'Pure Serenity', 'Mobile Optimized']
  },
  {
    id: 'photo-min-5',
    slug: 'nordic-chic',
    name: 'Nordic Chic',
    category: 'minimalist',
    isCartoon: false,
    themeType: 'Foto - Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    description: 'Gaya Skandinavia minimalis berpadu abu-abu lembut dan sentuhan natural.',
    accentColor: '#475569',
    bgColor: '#f1f5f9',
    fontFamily: 'font-sans',
    features: ['Scandi Layout', 'Light Gray Accents', 'Clean Headers']
  },

  // 2. Floral & Botanical (5)
  {
    id: 'photo-flor-1',
    slug: 'romantic-rose',
    name: 'Romantic Rose',
    category: 'floral',
    isCartoon: false,
    themeType: 'Foto - Floral',
    badge: 'Best Seller',
    thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    description: 'Aksen kelopak mawar blush pink dan ornamen bunga lembut nan mempesona.',
    accentColor: '#e11d48',
    bgColor: '#fff1f2',
    fontFamily: 'font-serif',
    features: ['Watercolor Rose Art', 'Blush Pink Aesthetics', 'Romantic Frame']
  },
  {
    id: 'photo-flor-2',
    slug: 'sage-eucalyptus',
    name: 'Sage Eucalyptus',
    category: 'floral',
    isCartoon: false,
    themeType: 'Foto - Floral',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    description: 'Dedaunan eucalyptus hijau sage yang segar dan menyejukkan mata.',
    accentColor: '#059669',
    bgColor: '#f0fdf4',
    fontFamily: 'font-serif',
    features: ['Sage Green Leaves', 'Botanical Frame', 'Fresh Nature Feel']
  },
  {
    id: 'photo-flor-3',
    slug: 'watercolor-bloom',
    name: 'Watercolor Bloom',
    category: 'floral',
    isCartoon: false,
    themeType: 'Foto - Floral',
    thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
    description: 'Lukisan cat air bunga mekar dengan transisi warna pastel cerah.',
    accentColor: '#d97706',
    bgColor: '#fefce8',
    fontFamily: 'font-serif',
    features: ['Handcrafted Watercolor', 'Golden Yellow Touches', 'Artistic Header']
  },
  {
    id: 'photo-flor-4',
    slug: 'lavender-breeze',
    name: 'Lavender Breeze',
    category: 'floral',
    isCartoon: false,
    themeType: 'Foto - Floral',
    thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Pesona lavender ungu pastel yang menenangkan dan penuh kehangatan.',
    accentColor: '#9333ea',
    bgColor: '#faf5ff',
    fontFamily: 'font-serif',
    features: ['Lavender Accents', 'Gentle Violet Gradients', 'Dreamy Aura']
  },
  {
    id: 'photo-flor-5',
    slug: 'peony-bliss',
    name: 'Peony Bliss',
    category: 'floral',
    isCartoon: false,
    themeType: 'Foto - Floral',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    description: 'Bunga peony kuncup dan mekar memberikan nuansa pernikahan manis.',
    accentColor: '#db2777',
    bgColor: '#fdf2f8',
    fontFamily: 'font-serif',
    features: ['Peony Illustration', 'Soft Pink Tones', 'Charming Borders']
  },

  // 3. Adat Tradisional Nusantara (5)
  {
    id: 'photo-adat-1',
    slug: 'jawa-klasik',
    name: 'Jawa Klasik Kasunanan',
    category: 'traditional',
    isCartoon: false,
    themeType: 'Foto - Tradisional Adat',
    badge: 'Favorite',
    thumbnail: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
    description: 'Nuansa cokelat sogan batik sidomukti, ornamen gunungan, dan keagungan adat Jawa.',
    accentColor: '#78350f',
    bgColor: '#fef3c7',
    fontFamily: 'font-serif',
    features: ['Ornamen Gunungan Wayang', 'Batik Sogan Klasik', 'Gamelan Ambience']
  },
  {
    id: 'photo-adat-2',
    slug: 'sunda-parahyangan',
    name: 'Sunda Parahyangan',
    category: 'traditional',
    isCartoon: false,
    themeType: 'Foto - Tradisional Adat',
    thumbnail: 'https://images.unsplash.com/photo-1584447141399-be2f62da6d14?auto=format&fit=crop&w=600&q=80',
    description: 'Kesucian adat Sunda dengan sentuhan siger perak/emas dan untaian melati.',
    accentColor: '#0d9488',
    bgColor: '#f0fdfa',
    fontFamily: 'font-serif',
    features: ['Siger Sunda Motif', 'Untaian Melati Animasi', 'Nuansa Putih Bersih']
  },
  {
    id: 'photo-adat-3',
    slug: 'minang-elegance',
    name: 'Minang Rumah Gadang',
    category: 'traditional',
    isCartoon: false,
    themeType: 'Foto - Tradisional Adat',
    thumbnail: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=600&q=80',
    description: 'Kemegahan ornamen gonjong Minangkabau berpadu merah marun dan sulaman emas.',
    accentColor: '#991b1b',
    bgColor: '#fff1f2',
    fontFamily: 'font-serif',
    features: ['Ornamen Suntiang & Gonjong', 'Marun & Emas Mewah', 'Adat Minang']
  },
  {
    id: 'photo-adat-4',
    slug: 'batak-ulos',
    name: 'Batak Ulos Sejahtera',
    category: 'traditional',
    isCartoon: false,
    themeType: 'Foto - Tradisional Adat',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    description: 'Kearifan tenun ulos khas Batak dengan aksen geometris gorga yang agung.',
    accentColor: '#b91c1c',
    bgColor: '#fef2f2',
    fontFamily: 'font-serif',
    features: ['Motif Gorga Batak', 'Nuansa Tenun Ulos', 'Pemberkatan Sakral']
  },
  {
    id: 'photo-adat-5',
    slug: 'bali-heritage',
    name: 'Bali Royal Heritage',
    category: 'traditional',
    isCartoon: false,
    themeType: 'Foto - Tradisional Adat',
    thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Eksotisme ukiran khas Bali, warna prada emas, dan nuansa tropis Pulau Dewata.',
    accentColor: '#b45309',
    bgColor: '#fffbeb',
    fontFamily: 'font-serif',
    features: ['Ukiran Prada Bali', 'Bunga Kamboja Tropis', 'Eksotis Elegan']
  },

  // 4. Luxury & Royal Glamour (5)
  {
    id: 'photo-lux-1',
    slug: 'royal-emerald-gold',
    name: 'Royal Emerald & Gold',
    category: 'luxury',
    isCartoon: false,
    themeType: 'Foto - Luxury Glamour',
    badge: 'Premium',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Warna hijau zamrud mewah dipadukan dengan aksen border emas berkilau.',
    accentColor: '#d97706',
    bgColor: '#064e3b',
    fontFamily: 'font-serif',
    features: ['Deep Emerald Theme', 'Gold Foil Particles', 'Luxury Dark Mode']
  },
  {
    id: 'photo-lux-2',
    slug: 'midnight-sapphire',
    name: 'Midnight Sapphire',
    category: 'luxury',
    isCartoon: false,
    themeType: 'Foto - Luxury Glamour',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    description: 'Biru safir pekat bak langit malam berpadu gemerlap bintang dan glitter.',
    accentColor: '#38bdf8',
    bgColor: '#0f172a',
    fontFamily: 'font-serif',
    features: ['Midnight Blue Vibe', 'Glittering Stars Animation', 'Royal Typography']
  },
  {
    id: 'photo-lux-3',
    slug: 'burgundy-velvet',
    name: 'Burgundy Velvet',
    category: 'luxury',
    isCartoon: false,
    themeType: 'Foto - Luxury Glamour',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    description: 'Merah anggur merah burgundy beludru yang memancarkan pesona ningrat.',
    accentColor: '#f59e0b',
    bgColor: '#450a0a',
    fontFamily: 'font-serif',
    features: ['Burgundy Wine Aesthetic', 'Champagne Gold Details', 'Exclusive Feel']
  },
  {
    id: 'photo-lux-4',
    slug: 'noir-elegance',
    name: 'Noir Elegance',
    category: 'luxury',
    isCartoon: false,
    themeType: 'Foto - Luxury Glamour',
    thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    description: 'Hitam pekat ultra-mewah dengan bingkai geometris emas art-deco.',
    accentColor: '#fbbf24',
    bgColor: '#0a0a0a',
    fontFamily: 'font-serif',
    features: ['Art Deco Gold Frames', 'Pure Black Canvas', 'Cinematic Look']
  },
  {
    id: 'photo-lux-5',
    slug: 'imperial-champagne',
    name: 'Imperial Champagne',
    category: 'luxury',
    isCartoon: false,
    themeType: 'Foto - Luxury Glamour',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Kilau warna champagne dan kristal elegan yang hangat nan megah.',
    accentColor: '#b45309',
    bgColor: '#fefce8',
    fontFamily: 'font-serif',
    features: ['Champagne Shimmer', 'Crystal Accents', 'Warm Luxury Glow']
  },

  // 5. Islamic / Arabian Elegance (5)
  {
    id: 'photo-isl-1',
    slug: 'nur-islami',
    name: 'Nur Islami Barakah',
    category: 'islamic',
    isCartoon: false,
    themeType: 'Foto - Islamic Elegance',
    badge: 'Popular',
    thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Nuansa islami syahdu dengan kaligrafi Bismillah, ornamen kubah, dan ayat suci.',
    accentColor: '#047857',
    bgColor: '#ecfdf5',
    fontFamily: 'font-serif',
    features: ['Kaligrafi Ar-Rum:21', 'Ornamen Kubah Masjid', 'Nuansa Hijau Islami']
  },
  {
    id: 'photo-isl-2',
    slug: 'ar-rum-elegance',
    name: 'Ar-Rum Golden Heritage',
    category: 'islamic',
    isCartoon: false,
    themeType: 'Foto - Islamic Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    description: 'Kutipan Ar-Rum dengan aksen emas geometris islami dan nuansa putih suci.',
    accentColor: '#b45309',
    bgColor: '#fffdf5',
    fontFamily: 'font-serif',
    features: ['Geometric Islamic Patterns', 'White & Gold Theme', 'Doa Pernikahan']
  },
  {
    id: 'photo-isl-3',
    slug: 'arabesque-gold',
    name: 'Arabesque Medina',
    category: 'islamic',
    isCartoon: false,
    themeType: 'Foto - Islamic Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    description: 'Pola arabes timur tengah megah berpadu latar biru malam dan kaligrafi.',
    accentColor: '#f59e0b',
    bgColor: '#1e293b',
    fontFamily: 'font-serif',
    features: ['Arabesque Motifs', 'Night Blue & Gold', 'Bismillah Heading']
  },
  {
    id: 'photo-isl-4',
    slug: 'medina-classic',
    name: 'Medina Classic Mint',
    category: 'islamic',
    isCartoon: false,
    themeType: 'Foto - Islamic Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Warna mint pastel yang lembut dan sejuk dengan hiasan ornamen islami kontemporer.',
    accentColor: '#0f766e',
    bgColor: '#f0fdfa',
    fontFamily: 'font-serif',
    features: ['Mint Green Palette', 'Subtle Lanterns Art', 'Peaceful Atmosphere']
  },
  {
    id: 'photo-isl-5',
    slug: 'crescent-peace',
    name: 'Crescent Moon Grace',
    category: 'islamic',
    isCartoon: false,
    themeType: 'Foto - Islamic Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
    description: 'Siluet bulan sabit dan lentera temaram mengiringi kisah kasih suci.',
    accentColor: '#d97706',
    bgColor: '#fffbeb',
    fontFamily: 'font-serif',
    features: ['Crescent Moon Motif', 'Warm Lantern Glow', 'Islamic Salawat']
  },

  // 6. Rustic & Vintage Bohemian (5)
  {
    id: 'photo-rust-1',
    slug: 'pampas-warmth',
    name: 'Pampas Warmth',
    category: 'rustic',
    isCartoon: false,
    themeType: 'Foto - Rustic Vintage',
    badge: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    description: 'Pesona rumput pampas kering, warna earth tone, dan nuansa rustic outdoor.',
    accentColor: '#a16207',
    bgColor: '#fefce8',
    fontFamily: 'font-serif',
    features: ['Dried Pampas Art', 'Warm Earth Tones', 'Rustic Wood Texture']
  },
  {
    id: 'photo-rust-2',
    slug: 'terracotta-dream',
    name: 'Terracotta Dream',
    category: 'rustic',
    isCartoon: false,
    themeType: 'Foto - Rustic Vintage',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    description: 'Kehangatan warna terakota bata yang modern, chic, dan sangat fotogenik.',
    accentColor: '#c2410c',
    bgColor: '#fff7ed',
    fontFamily: 'font-sans',
    features: ['Terracotta Palette', 'Bohemian Typography', 'Organic Curves']
  },
  {
    id: 'photo-rust-3',
    slug: 'vintage-woodland',
    name: 'Vintage Woodland',
    category: 'rustic',
    isCartoon: false,
    themeType: 'Foto - Rustic Vintage',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    description: 'Kesan hutan pinus dan kayu alami dengan pencahayaan lampu temaram romantis.',
    accentColor: '#4d7c0f',
    bgColor: '#f7fee7',
    fontFamily: 'font-serif',
    features: ['Woodland Forest Feels', 'Fairy Lights Glow', 'Pine Cone Detailing']
  },
  {
    id: 'photo-rust-4',
    slug: 'boho-sunset',
    name: 'Boho Sunset Glow',
    category: 'rustic',
    isCartoon: false,
    themeType: 'Foto - Rustic Vintage',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Semburat warna senja jingga keemasan yang menawan dan penuh kebebasan jiwa.',
    accentColor: '#ea580c',
    bgColor: '#fffbeb',
    fontFamily: 'font-sans',
    features: ['Sunset Golden Hour', 'Boho Macrame Art', 'Cozy Romantic Tone']
  },
  {
    id: 'photo-rust-5',
    slug: 'autumn-whisper',
    name: 'Autumn Whisper',
    category: 'rustic',
    isCartoon: false,
    themeType: 'Foto - Rustic Vintage',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    description: 'Guguran daun musim gugur dengan warna amber, tembaga, dan cokelat hangat.',
    accentColor: '#b45309',
    bgColor: '#fffaf0',
    fontFamily: 'font-serif',
    features: ['Autumn Leaves Effect', 'Amber & Copper Tones', 'Warm Memory Notes']
  },

  // ================= 5 NON-FOTO CARTOON ANIMATION TEMPLATES =================
  {
    id: 'cartoon-1',
    slug: 'cartoon-syari',
    name: 'Muslim Syar\'i Animated Tale',
    category: 'cartoon',
    isCartoon: true,
    themeType: 'Animasi Kartun Non-Foto',
    badge: 'Syar\'i / Privasi',
    thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Khusus pasangan syar\'i/muslim tanpa foto asli. Karakter animasi kartun berhijab anggun & pria berkoko dengan guguran kelopak bunga.',
    accentColor: '#059669',
    bgColor: '#ecfdf5',
    fontFamily: 'font-serif',
    features: [
      'Animasi Partikel Bunga Melayang',
      'Preset Karakter Hijab Syar\'i',
      'Bebas Foto Asli / Menjaga Privasi',
      'Bisa Upload Karikatur Sendiri'
    ]
  },
  {
    id: 'cartoon-2',
    slug: 'cartoon-modern',
    name: 'Cute Modern Casual Love',
    category: 'cartoon',
    isCartoon: true,
    themeType: 'Animasi Kartun Non-Foto',
    badge: 'Playful',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Animasi kartun modern kasual yang ceria dan santai. Animasi balon cinta melayang, interaksi klik menyapa, dan palet warna pastel.',
    accentColor: '#e11d48',
    bgColor: '#fff1f2',
    fontFamily: 'font-sans',
    features: [
      'Animasi Balon Hati Melayang',
      'Karakter Pakaian Kasual Modern',
      'Desain Ceria & Bersahaja',
      'Micro-Interactions Interaktif'
    ]
  },
  {
    id: 'cartoon-3',
    slug: 'cartoon-adat',
    name: 'Nusantara Adat Cartoon',
    category: 'cartoon',
    isCartoon: true,
    themeType: 'Animasi Kartun Non-Foto',
    badge: 'Adat Lucu',
    thumbnail: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
    description: 'Karakter kartun lucu berbusana adat pengantin Nusantara (Jawa, Sunda, Minang) dengan ornamen batik dan wayang beranimasi lembut.',
    accentColor: '#b45309',
    bgColor: '#fefce8',
    fontFamily: 'font-serif',
    features: [
      'Pilihan Busana Adat Nusantara',
      'Animasi Ornamen Tradisional',
      'Batik Halus & Ramah Budaya',
      'Dukungan Custom Karikatur Adat'
    ]
  },
  {
    id: 'cartoon-4',
    slug: 'cartoon-fairytale',
    name: 'Fairytale & Storybook Fantasy',
    category: 'cartoon',
    isCartoon: true,
    themeType: 'Animasi Kartun Non-Foto',
    badge: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    description: 'Konsep buku cerita dongeng romantis dengan animasi kunang-kunang malam, istana kastil temaram, dan kisah cinta sang pangeran & putri.',
    accentColor: '#7c3aed',
    bgColor: '#f5f3ff',
    fontFamily: 'font-serif',
    features: [
      'Animasi Kunang-kunang Malam',
      'Transisi Halaman Buku Cerita',
      'Karakter Putri & Pangeran',
      'Nuansa Magis Penuh Kehangatan'
    ]
  },
  {
    id: 'cartoon-5',
    slug: 'cartoon-chibi',
    name: 'Chibi Romantis & Confetti Fun',
    category: 'cartoon',
    isCartoon: true,
    themeType: 'Animasi Kartun Non-Foto',
    badge: 'Menggemaskan',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Karakter chibi menggemaskan dengan animasi kedipan mata, efek ledakan konfeti saat dibuka, dan desain yang sangat disukai tamu muda.',
    accentColor: '#db2777',
    bgColor: '#fdf2f8',
    fontFamily: 'font-sans',
    features: [
      'Efek Ledakan Konfeti Realtime',
      'Karakter Chibi Imut & Lucu',
      'Animasi Goyang Ceria (Wiggle)',
      'Cocok untuk Pasangan Berjiwa Muda'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Semua Template (35)' },
  { id: 'cartoon', label: '🎨 Animasi Kartun Non-Foto (5)' },
  { id: 'minimalist', label: 'Minimalist Clean (5)' },
  { id: 'floral', label: 'Floral & Botanical (5)' },
  { id: 'traditional', label: 'Adat Tradisional (5)' },
  { id: 'luxury', label: 'Luxury & Royal Gold (5)' },
  { id: 'islamic', label: 'Islamic Elegance (5)' },
  { id: 'rustic', label: 'Rustic & Bohemian (5)' },
];
