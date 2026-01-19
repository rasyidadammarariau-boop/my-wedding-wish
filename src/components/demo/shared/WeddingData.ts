import { getDefaultContent, DefaultContent } from "@/stores/adminSettingsStore";

// Get dynamic wedding data from admin settings
export const getWeddingData = (): DefaultContent & { story: typeof defaultStory } => {
  const content = getDefaultContent();
  return {
    ...content,
    story: content.loveStory,
  };
};

// Static fallback data for initial render
const defaultStory = [
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
];

// Legacy export for backward compatibility (now dynamic)
export const weddingData = getWeddingData();

export const dummyComments = [
  { id: 1, name: "Ahmad Fauzi", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah 🤲", presence: "hadir", time: "2 jam lalu" },
  { id: 2, name: "Siti Nurhaliza", message: "Barakallahu lakuma wa baraka 'alaikuma 💕", presence: "hadir", time: "5 jam lalu" },
  { id: 3, name: "Budi Santoso", message: "Turut berbahagia! Semoga Allah memberkahi pernikahan ini!", presence: "tidak hadir", time: "1 hari lalu" },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
];
