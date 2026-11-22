export interface InvitationEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

export interface LoveStory {
  year: string;
  title: string;
  story: string;
  image?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface GuestItem {
  id: string;
  name: string;
  phone: string;
  category: string;
  rsvp: 'attending' | 'declined' | 'pending' | 'maybe';
  pax: number;
  isCheckedIn: boolean;
  checkedInAt?: string;
}

export interface WishItem {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
  isApproved: boolean;
}

export interface InvitationData {
  id: string;
  slug: string;
  title: string;
  templateSlug: string;
  status: 'draft' | 'active';
  packageType: 'basic' | 'pro' | 'exclusive';
  isWatermarkRemoved: boolean;
  
  // Mempelai
  bride: {
    fullName: string;
    nickname: string;
    fatherName: string;
    motherName: string;
    childOrder: string;
    instagram: string;
    photo: string;
  };
  groom: {
    fullName: string;
    nickname: string;
    fatherName: string;
    motherName: string;
    childOrder: string;
    instagram: string;
    photo: string;
  };
  
  // Karakter Animasi Kartun (untuk 5 template non-foto)
  cartoonConfig: {
    selectedAvatarId: string;
    customAvatarUrl?: string;
    animationType: 'petals' | 'hearts' | 'fireflies' | 'confetti' | 'sparkles';
  };

  // Desain & Konten
  coverPhoto: string;
  quoteTitle: string;
  quoteText: string;
  events: InvitationEvent[];
  loveStories: LoveStory[];
  galleries: string[];
  bgMusicUrl: string;
  
  // Amplop Digital
  banks: BankAccount[];
  qrisImageUrl?: string;
  giftAddress?: {
    recipientName: string;
    phoneNumber: string;
    fullAddress: string;
  };

  // Data Interaktif
  guests: GuestItem[];
  wishes: WishItem[];
}

export const DEFAULT_INVITATION: InvitationData = {
  id: 'inv-demo-01',
  slug: 'romeo-juliet',
  title: 'The Wedding of Romeo & Juliet',
  templateSlug: 'minimal-editorial',
  status: 'active',
  packageType: 'pro',
  isWatermarkRemoved: true,
  
  bride: {
    fullName: 'Juliet Capulet, S.Ds.',
    nickname: 'Juliet',
    fatherName: 'Bpk. Lord Capulet',
    motherName: 'Ibu Lady Capulet',
    childOrder: 'Putri pertama dari dua bersaudara',
    instagram: 'juliet.capulet',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  groom: {
    fullName: 'Romeo Montague, S.T.',
    nickname: 'Romeo',
    fatherName: 'Bpk. Lord Montague',
    motherName: 'Ibu Lady Montague',
    childOrder: 'Putra bungsu dari tiga bersaudara',
    instagram: 'romeo.montague',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },

  cartoonConfig: {
    selectedAvatarId: 'syari-couple-1',
    customAvatarUrl: '',
    animationType: 'petals'
  },

  coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  quoteTitle: 'QS. Ar-Rum Ayat 21',
  quoteText: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',

  events: [
    {
      id: 'event-akad',
      title: 'Akad Nikah',
      date: '2026-12-25',
      startTime: '08:00',
      endTime: '10:00',
      timezone: 'WIB',
      venue: 'Masjid Agung Al-Barkah',
      address: 'Jl. Veteran No. 45, Gambir, Jakarta Pusat',
      mapsUrl: 'https://maps.google.com/?q=Monas+Jakarta'
    },
    {
      id: 'event-resepsi',
      title: 'Resepsi Pernikahan',
      date: '2026-12-25',
      startTime: '11:00',
      endTime: '16:00',
      timezone: 'WIB',
      venue: 'Grand Ballroom Mulia Hotel',
      address: 'Jl. Asia Afrika Senayan No. 1, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan'
    }
  ],

  loveStories: [
    {
      year: '2022',
      title: 'Pertemuan Pertama',
      story: 'Takdir mempertemukan kami di sebuah pameran seni di Jakarta. Sebuah percakapan singkat tentang karya lukisan menjadi awal kisah indah kami.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
    },
    {
      year: '2024',
      title: 'Menjalin Komitmen',
      story: 'Setelah dua tahun saling mengenal, berbagi impian, dan melewati berbagai suka duka bersama, kami sepakat untuk melangkah ke jenjang yang lebih serius.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80'
    },
    {
      year: '2026',
      title: 'Hari Sakral Pernikahan',
      story: 'Dengan memohon ridho Allah SWT dan restu kedua orang tua, kami mengikat janji suci pernikahan sehidup semati.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    }
  ],

  galleries: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  ],

  bgMusicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',

  banks: [
    {
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8830192847',
      accountHolder: 'Juliet Capulet'
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1370019283741',
      accountHolder: 'Romeo Montague'
    }
  ],
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WEDDING-GIFT-ROMEO-JULIET-QRIS',
  giftAddress: {
    recipientName: 'Romeo & Juliet (Penerima Paket)',
    phoneNumber: '081234567890',
    fullAddress: 'Jl. Melati Indah No. 12, Kompleks Permata Hijau, Jakarta Barat 11560'
  },

  guests: [
    {
      id: 'gst-1',
      name: 'Budi Santoso & Partner',
      phone: '081298765432',
      category: 'Sahabat Pengantin',
      rsvp: 'attending',
      pax: 2,
      isCheckedIn: true,
      checkedInAt: '11:15 WIB'
    },
    {
      id: 'gst-2',
      name: 'Dr. H. Ahmad Fauzi & Keluarga',
      phone: '081387654321',
      category: 'Keluarga Besar',
      rsvp: 'attending',
      pax: 3,
      isCheckedIn: false
    },
    {
      id: 'gst-3',
      name: 'Rina Kusuma, M.Si.',
      phone: '081576543210',
      category: 'Rekan Kantor',
      rsvp: 'attending',
      pax: 1,
      isCheckedIn: false
    },
    {
      id: 'gst-4',
      name: 'Denny Pratama',
      phone: '081765432109',
      category: 'Sahabat Kuliah',
      rsvp: 'maybe',
      pax: 1,
      isCheckedIn: false
    }
  ],

  wishes: [
    {
      id: 'wish-1',
      name: 'Budi Santoso',
      relationship: 'Sahabat',
      message: 'Selamat menempuh hidup baru Romeo & Juliet! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu selamanya!',
      date: 'Hari ini, 10:30 WIB',
      isApproved: true
    },
    {
      id: 'wish-2',
      name: 'Rina Kusuma',
      relationship: 'Rekan Kantor',
      message: 'Happy wedding! Semoga cinta kalian berdua semakin bersemi dan langgeng hingga kakek nenek. Aamiin.',
      date: 'Kemarin, 19:45 WIB',
      isApproved: true
    },
    {
      id: 'wish-3',
      name: 'Keluarga Besar Bpk. Ahmad',
      relationship: 'Keluarga',
      message: 'Barakallah lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Turut berbahagia atas pernikahan ananda berdua.',
      date: '2 hari lalu',
      isApproved: true
    }
  ]
};
