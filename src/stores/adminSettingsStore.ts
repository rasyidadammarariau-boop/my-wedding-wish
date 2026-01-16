// Admin Settings Store using localStorage

export interface TemplateSettings {
  id: string;
  name: string;
  category: "Basic" | "Pro" | "Premium";
  price: number;
  status: "active" | "inactive";
  color: string;
  demoUrl: string;
  features: string[];
  users: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  status: "active" | "inactive";
}

export interface DefaultContent {
  groomName: string;
  groomFullName: string;
  groomParents: { father: string; mother: string };
  groomChild: string;
  brideName: string;
  brideFullName: string;
  brideParents: { father: string; mother: string };
  brideChild: string;
  date: string;
  akadTime: string;
  resepsiTime: string;
  venue: string;
  address: string;
  mapsUrl: string;
  bankAccount: {
    bank: string;
    number: string;
    name: string;
  };
  giftAddress: string;
  loveStory: {
    title: string;
    date: string;
    content: string;
  }[];
}

export interface AdminSettings {
  templates: TemplateSettings[];
  musicLibrary: MusicTrack[];
  defaultContent: DefaultContent;
}

const STORAGE_KEY = "weddingku_admin_settings";

const defaultTemplates: TemplateSettings[] = [
  { 
    id: "elegant-rose", 
    name: "Elegant Rose", 
    category: "Premium", 
    price: 299000, 
    status: "active", 
    color: "#f43f5e",
    demoUrl: "/demo/elegant-rose",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book", "Music Player", "Love Story Timeline", "Export PDF"],
    users: 234
  },
  { 
    id: "minimalist-white", 
    name: "Minimalist White", 
    category: "Basic", 
    price: 0, 
    status: "active", 
    color: "#ffffff",
    demoUrl: "/demo/minimalist-white",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book"],
    users: 567
  },
  { 
    id: "modern-dark", 
    name: "Modern Dark", 
    category: "Premium", 
    price: 349000, 
    status: "active", 
    color: "#1a1a2e",
    demoUrl: "/demo/modern-dark",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book", "Music Player", "Love Story Timeline", "Export PDF"],
    users: 123
  },
  { 
    id: "rustic-garden", 
    name: "Rustic Garden", 
    category: "Pro", 
    price: 199000, 
    status: "active", 
    color: "#4a7c59",
    demoUrl: "/demo/rustic-garden",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book", "Music Player", "Love Story Timeline"],
    users: 89
  },
  { 
    id: "floral-dream", 
    name: "Floral Dream", 
    category: "Premium", 
    price: 299000, 
    status: "active", 
    color: "#f0c6d3",
    demoUrl: "/demo/floral-dream",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book", "Music Player", "Love Story Timeline", "Export PDF"],
    users: 156
  },
  { 
    id: "classic-gold", 
    name: "Classic Gold", 
    category: "Pro", 
    price: 199000, 
    status: "active", 
    color: "#d4af37",
    demoUrl: "/demo/classic-gold",
    features: ["Countdown Timer", "QR Code", "Share Buttons", "Guest Book", "Music Player", "Love Story Timeline"],
    users: 45
  },
];

const defaultMusicLibrary: MusicTrack[] = [
  { id: "1", title: "Beautiful In White", artist: "Shane Filan", url: "/music/beautiful-in-white.mp3", status: "active" },
  { id: "2", title: "Perfect", artist: "Ed Sheeran", url: "/music/perfect.mp3", status: "active" },
  { id: "3", title: "A Thousand Years", artist: "Christina Perri", url: "/music/a-thousand-years.mp3", status: "active" },
  { id: "4", title: "All of Me", artist: "John Legend", url: "/music/all-of-me.mp3", status: "active" },
  { id: "5", title: "Can't Help Falling In Love", artist: "Elvis Presley", url: "/music/cant-help-falling.mp3", status: "active" },
  { id: "6", title: "Marry Me", artist: "Train", url: "/music/marry-me.mp3", status: "active" },
  { id: "7", title: "I Wanna Grow Old With You", artist: "Westlife", url: "/music/grow-old.mp3", status: "active" },
  { id: "8", title: "At Last", artist: "Etta James", url: "/music/at-last.mp3", status: "inactive" },
];

const defaultContentData: DefaultContent = {
  groomName: "Wahyu",
  groomFullName: "Wahyu Pratama",
  groomParents: { father: "Bapak Ahmad Sudrajat", mother: "Ibu Siti Aminah" },
  groomChild: "Putra ke-2",
  brideName: "Riski",
  brideFullName: "Riski Amelia",
  brideParents: { father: "Bapak Hendra Wijaya", mother: "Ibu Dewi Lestari" },
  brideChild: "Putri ke-1",
  date: "Sabtu, 15 Februari 2026",
  akadTime: "08:00 WIB",
  resepsiTime: "11:00 WIB",
  venue: "Gedung Serbaguna Mawar",
  address: "Jl. Merdeka No. 123, Kota Jakarta Selatan, DKI Jakarta 12345",
  mapsUrl: "https://maps.google.com",
  bankAccount: {
    bank: "Bank Central Asia (BCA)",
    number: "1234567890",
    name: "Riski Amelia",
  },
  giftAddress: "Jl. Merdeka No. 123, RT 01/RW 02, Jakarta Selatan",
  loveStory: [
    {
      title: "💼 Awal Pertemuan",
      date: "Januari 2024",
      content: "Kami bertemu di sebuah konferensi teknologi di Jakarta. Wahyu sebagai pembicara dan Riski sebagai peserta.",
    },
    {
      title: "💞 Proses Ta'aruf",
      date: "Maret 2024",
      content: "Dengan perantara ustaz yang kami percaya, proses ta'aruf dimulai. Kami saling mengenal dengan cara yang diridhai Allah.",
    },
    {
      title: "💍 Lamaran",
      date: "September 2024",
      content: "Setelah mendapat restu dari kedua keluarga, Wahyu melamar Riski dalam acara sederhana namun penuh makna.",
    },
  ],
};

const defaultSettings: AdminSettings = {
  templates: defaultTemplates,
  musicLibrary: defaultMusicLibrary,
  defaultContent: defaultContentData,
};

// Get settings from localStorage
export const getAdminSettings = (): AdminSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading admin settings:", error);
  }
  return defaultSettings;
};

// Save settings to localStorage
export const saveAdminSettings = (settings: AdminSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving admin settings:", error);
  }
};

// Template operations
export const getTemplates = (): TemplateSettings[] => {
  return getAdminSettings().templates;
};

export const saveTemplates = (templates: TemplateSettings[]): void => {
  const settings = getAdminSettings();
  settings.templates = templates;
  saveAdminSettings(settings);
};

export const getActiveTemplates = (): TemplateSettings[] => {
  return getTemplates().filter(t => t.status === "active");
};

// Music operations
export const getMusicLibrary = (): MusicTrack[] => {
  return getAdminSettings().musicLibrary;
};

export const saveMusicLibrary = (music: MusicTrack[]): void => {
  const settings = getAdminSettings();
  settings.musicLibrary = music;
  saveAdminSettings(settings);
};

export const getActiveMusicTracks = (): MusicTrack[] => {
  return getMusicLibrary().filter(m => m.status === "active");
};

// Default content operations
export const getDefaultContent = (): DefaultContent => {
  return getAdminSettings().defaultContent;
};

export const saveDefaultContent = (content: DefaultContent): void => {
  const settings = getAdminSettings();
  settings.defaultContent = content;
  saveAdminSettings(settings);
};

// Reset to defaults
export const resetToDefaults = (): void => {
  saveAdminSettings(defaultSettings);
};
