export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 149.000",
    description: "Cocok untuk pasangan yang menginginkan undangan sederhana",
    features: [
      "1 Template Pilihan",
      "Galeri 10 Foto",
      "RSVP Online (50 tamu)",
      "Countdown Timer",
      "Berlaku 30 Hari",
    ],
    buttonText: "Mulai Sekarang",
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rp 299.000",
    description: "Pilihan terbaik untuk pengalaman undangan yang lengkap",
    features: [
      "Semua Template Premium",
      "Galeri 50 Foto",
      "RSVP Online (200 tamu)",
      "Countdown Timer",
      "Musik Latar",
      "Lokasi Maps",
      "Berlaku 60 Hari",
      "Custom Domain",
    ],
    isPopular: true,
    buttonText: "Pilih Premium",
  },
  {
    id: "exclusive",
    name: "Exclusive",
    price: "Rp 599.000",
    description: "Paket lengkap dengan fitur eksklusif tanpa batas",
    features: [
      "Semua Template",
      "Galeri Unlimited",
      "RSVP Online Unlimited",
      "Countdown Timer",
      "Musik Latar",
      "Lokasi Maps",
      "Video Support",
      "Gift Registry",
      "Berlaku 1 Tahun",
      "Custom Domain",
      "Priority Support",
    ],
    buttonText: "Pilih Exclusive",
  },
];
