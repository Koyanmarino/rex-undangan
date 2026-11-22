export interface CartoonAvatar {
  id: string;
  name: string;
  category: 'syari' | 'modern' | 'adat' | 'fairytale' | 'chibi';
  gender: 'couple' | 'bride' | 'groom';
  description: string;
  svgGraphic: string; // inline SVG or avatar identifier
}

export const CARTOON_AVATARS: CartoonAvatar[] = [
  {
    id: 'syari-couple-1',
    name: 'Pasangan Syar\'i Sage',
    category: 'syari',
    gender: 'couple',
    description: 'Mempelai wanita berhijab syar\'i anggun & mempelai pria berbaju koko modern.',
    svgGraphic: 'syari-1'
  },
  {
    id: 'syari-couple-2',
    name: 'Pasangan Syar\'i Putih Suci',
    category: 'syari',
    gender: 'couple',
    description: 'Pakaian gamis pengantin putih bersih dengan peci putih dan selendang lace.',
    svgGraphic: 'syari-2'
  },
  {
    id: 'modern-couple-1',
    name: 'Modern Casual Pastel',
    category: 'modern',
    gender: 'couple',
    description: 'Gaun pastel modern tanpa penutup wajah kaku dan jas kasual pria.',
    svgGraphic: 'modern-1'
  },
  {
    id: 'adat-jawa-couple',
    name: 'Kartun Adat Jawa Paes',
    category: 'adat',
    gender: 'couple',
    description: 'Karakter kartun lucu dengan riasan paes Jawa, kebaya hitam bludru & beskap.',
    svgGraphic: 'adat-jawa'
  },
  {
    id: 'adat-sunda-couple',
    name: 'Kartun Adat Sunda Siger',
    category: 'adat',
    gender: 'couple',
    description: 'Mempelai kartun dengan mahkota siger Sunda berkilau dan untaian melati.',
    svgGraphic: 'adat-sunda'
  },
  {
    id: 'adat-minang-couple',
    name: 'Kartun Adat Minang Suntiang',
    category: 'adat',
    gender: 'couple',
    description: 'Mempelai kartun Minangkabau dengan mahkota suntiang megah dan baju kurung merah emas.',
    svgGraphic: 'adat-minang'
  },
  {
    id: 'fairytale-couple',
    name: 'Pangeran & Putri Kerajaan',
    category: 'fairytale',
    gender: 'couple',
    description: 'Gaya putri dongeng bergaun mekar dan pangeran berjas kerajaan berkancing emas.',
    svgGraphic: 'fairytale-1'
  },
  {
    id: 'chibi-couple-1',
    name: 'Chibi Imut Love Balloon',
    category: 'chibi',
    gender: 'couple',
    description: 'Karakter chibi menggemaskan berpegangan tangan dengan balon hati melayang.',
    svgGraphic: 'chibi-1'
  }
];

export const MUSIC_PLAYLIST = [
  {
    id: 'song-1',
    title: 'A Thousand Years (Instrumental Piano)',
    artist: 'Wedding Melodies',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    duration: '3:20'
  },
  {
    id: 'song-2',
    title: 'Can\'t Help Falling in Love (Acoustic Guitar)',
    artist: 'Serenade Acoustic',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=warm-acoustic-110036.mp3',
    duration: '2:45'
  },
  {
    id: 'song-3',
    title: 'Beautiful In White (Cello & Piano)',
    artist: 'Bridal Chamber Orchestra',
    url: 'https://cdn.pixabay.com/download/audio/2021/11/24/audio_3d1d23469e.mp3?filename=gentle-piano-love-story-10330.mp3',
    duration: '3:10'
  },
  {
    id: 'song-4',
    title: 'Barakallah Lakuma (Islamic Ambient)',
    artist: 'Nasheed Instrumental',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=peaceful-oriental-123447.mp3',
    duration: '3:05'
  },
  {
    id: 'song-5',
    title: 'Gamelan Udan Mas (Klasik Tradisional)',
    artist: 'Karawitan Jogja',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=traditional-asian-gamelan-ambient-16625.mp3',
    duration: '4:15'
  }
];
