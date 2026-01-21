export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: string;
  features: string[];
  demoUrl: string;
}

export const templates: Template[] = [
  {
    id: "elegant-rose",
    name: "Elegant Rose",
    description: "Desain elegan dengan sentuhan rose dan emas yang romantis",
    category: "Premium",
    image: "/placeholder.svg",
    price: "Rp 299.000",
    features: ["Animasi Mewah", "Galeri Foto", "RSVP Online", "Countdown Timer"],
    demoUrl: "/demo/elegant-rose",
  },
  {
    id: "minimalist-white",
    name: "Minimalist White",
    description: "Desain bersih dan modern dengan tema putih minimalis",
    category: "Basic",
    image: "/placeholder.svg",
    price: "Rp 149.000",
    features: ["Desain Bersih", "Galeri Foto", "RSVP Online"],
    demoUrl: "/demo/minimalist-white",
  },
  {
    id: "rustic-garden",
    name: "Rustic Garden",
    description: "Tema pedesaan dengan sentuhan alami dan bunga-bunga",
    category: "Premium",
    image: "/placeholder.svg",
    price: "Rp 349.000",
    features: ["Animasi Bunga", "Galeri Foto", "RSVP Online", "Musik Latar", "Lokasi Maps"],
    demoUrl: "/demo/rustic-garden",
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Desain modern dengan tema gelap yang sophisticated",
    category: "Exclusive",
    image: "/placeholder.svg",
    price: "Rp 499.000",
    features: ["Dark Theme", "Animasi Premium", "Galeri Unlimited", "RSVP Online", "Musik Latar", "Video Support"],
    demoUrl: "/demo/modern-dark",
  },
  {
    id: "floral-dream",
    name: "Floral Dream",
    description: "Desain bermotif bunga yang feminin dan romantis",
    category: "Premium",
    image: "/placeholder.svg",
    price: "Rp 299.000",
    features: ["Motif Bunga", "Galeri Foto", "RSVP Online", "Countdown Timer"],
    demoUrl: "/demo/floral-dream",
  },
  {
    id: "classic-gold",
    name: "Classic Gold",
    description: "Desain klasik dengan aksen emas yang mewah",
    category: "Exclusive",
    image: "/placeholder.svg",
    price: "Rp 599.000",
    features: ["Aksen Emas", "Animasi Mewah", "Galeri Unlimited", "RSVP Online", "Musik Latar", "Video Support", "Gift Registry"],
    demoUrl: "/demo/classic-gold",
  },
  {
    id: "batik-jawa",
    name: "Batik Jawa",
    description: "Desain khas Jawa dengan motif batik dan wayang yang elegan",
    category: "Regional",
    image: "/placeholder.svg",
    price: "Rp 399.000",
    features: ["Motif Batik", "Ornamen Wayang", "Galeri Foto", "RSVP Online", "Musik Gamelan", "Google Maps"],
    demoUrl: "/demo/batik-jawa",
  },
  {
    id: "bali-hindu",
    name: "Bali Hindu",
    description: "Desain bernuansa Hindu Bali dengan ukiran dan ornamen tradisional",
    category: "Regional",
    image: "/placeholder.svg",
    price: "Rp 399.000",
    features: ["Ukiran Bali", "Ornamen Hindu", "Galeri Foto", "RSVP Online", "Musik Tradisional", "Google Maps"],
    demoUrl: "/demo/bali-hindu",
  },
  {
    id: "minangkabau",
    name: "Minangkabau",
    description: "Desain khas Minang dengan Rumah Gadang dan ornamen tradisional",
    category: "Regional",
    image: "/placeholder.svg",
    price: "Rp 399.000",
    features: ["Rumah Gadang", "Motif Minang", "Galeri Foto", "RSVP Online", "Musik Talempong", "Google Maps"],
    demoUrl: "/demo/minangkabau",
  },
  {
    id: "bugis-makassar",
    name: "Bugis Makassar",
    description: "Desain khas Bugis-Makassar dengan aksara Lontara dan motif tradisional",
    category: "Regional",
    image: "/placeholder.svg",
    price: "Rp 399.000",
    features: ["Aksara Lontara", "Motif Bugis", "Galeri Foto", "RSVP Online", "Musik Kecapi", "Google Maps"],
    demoUrl: "/demo/bugis-makassar",
  },
];

export const categories = ["Semua", "Basic", "Premium", "Exclusive", "Regional"];
