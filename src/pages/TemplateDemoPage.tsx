import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  Clock,
  ChevronDown,
  Gift,
  CreditCard,
  Copy,
  Check,
  Send,
  Music,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Demo wedding data
const weddingData = {
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
  story: [
    {
      title: "💼 Awal Pertemuan",
      date: "Januari 2024",
      content: "Kami bertemu di sebuah konferensi teknologi di Jakarta. Wahyu sebagai pembicara dan Riski sebagai peserta. Setelah sesi tanya jawab yang panjang, kami bertukar kontak untuk diskusi lebih lanjut.",
    },
    {
      title: "💞 Proses Ta'aruf",
      date: "Maret 2024",
      content: "Dengan perantara ustaz yang kami percaya, proses ta'aruf dimulai. Kami saling mengenal dengan cara yang diridhai Allah, membahas visi misi hidup dan harapan dalam berumah tangga.",
    },
    {
      title: "💍 Lamaran",
      date: "September 2024",
      content: "Setelah mendapat restu dari kedua keluarga, Wahyu melamar Riski dalam acara sederhana namun penuh makna. Alhamdulillah, lamaran diterima dengan penuh sukacita.",
    },
  ],
  bankAccount: {
    bank: "Bank Central Asia (BCA)",
    number: "1234567890",
    name: "Riski Amelia",
  },
  giftAddress: "Jl. Merdeka No. 123, RT 01/RW 02, Jakarta Selatan",
};

const dummyComments = [
  { id: 1, name: "Ahmad Fauzi", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah 🤲", presence: "hadir", time: "2 jam lalu" },
  { id: 2, name: "Siti Nurhaliza", message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair 💕", presence: "hadir", time: "5 jam lalu" },
  { id: 3, name: "Budi Santoso", message: "Turut berbahagia untuk kalian berdua. Semoga Allah memberkahi pernikahan ini!", presence: "tidak hadir", time: "1 hari lalu" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
];

const TemplateDemoPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState({ name: "", message: "", presence: "hadir" });

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2026-02-15T08:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.message) {
      setComments([
        { id: Date.now(), ...newComment, time: "Baru saja" },
        ...comments,
      ]);
      setNewComment({ name: "", message: "", presence: "hadir" });
    }
  };

  const getTemplateStyle = () => {
    switch (templateId) {
      case "elegant-rose":
        return { bg: "bg-rose-50", accent: "text-rose-600", accentBg: "bg-rose-600", border: "border-rose-200" };
      case "modern-dark":
        return { bg: "bg-gray-900", accent: "text-amber-400", accentBg: "bg-amber-500", border: "border-gray-700" };
      case "rustic-garden":
        return { bg: "bg-green-50", accent: "text-green-700", accentBg: "bg-green-700", border: "border-green-200" };
      case "classic-gold":
        return { bg: "bg-amber-50", accent: "text-amber-700", accentBg: "bg-amber-600", border: "border-amber-200" };
      default:
        return { bg: "bg-rose-50", accent: "text-rose-600", accentBg: "bg-rose-600", border: "border-rose-200" };
    }
  };

  const style = getTemplateStyle();
  const isDark = templateId === "modern-dark";

  return (
    <div className={`min-h-screen ${style.bg} ${isDark ? "text-white" : "text-gray-800"}`}>
      {/* Opening Cover */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center text-white p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm uppercase tracking-widest mb-4 opacity-80"
              >
                Undangan Pernikahan
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-display text-5xl md:text-7xl font-bold mb-2"
              >
                {weddingData.groomName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-4xl font-display mb-2"
              >
                &
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="font-display text-5xl md:text-7xl font-bold mb-8"
              >
                {weddingData.brideName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-lg opacity-80 mb-8"
              >
                {weddingData.date}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <p className="text-sm opacity-60 mb-4">Kepada Yth.</p>
                <p className="text-xl font-semibold mb-6">Bapak/Ibu/Saudara/i</p>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-6 text-lg"
                >
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button & Music Toggle */}
      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/templates")}
          className="shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      <div className="fixed top-4 right-4 z-40">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="shadow-lg"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Content */}
      {isOpen && (
        <div className="relative">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center text-center p-8 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <p className={`text-sm uppercase tracking-widest mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                The Wedding Of
              </p>
              <h1 className={`font-display text-5xl md:text-7xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                {weddingData.groomName}
                <span className={`block text-3xl md:text-4xl my-4 ${style.accent}`}>&</span>
                {weddingData.brideName}
              </h1>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {weddingData.date}
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-12"
              >
                <ChevronDown className={`h-8 w-8 mx-auto ${style.accent}`} />
                <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Scroll Down</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah Section */}
          <section className={`py-20 px-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl font-arabic mb-4" style={{ fontFamily: "serif" }}>
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
                <p className={`text-lg mb-6 ${style.accent}`}>
                  Assalamualaikum Warahmatullahi Wabarakatuh
                </p>
                <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
                </p>
              </motion.div>
            </div>
          </section>

          {/* Couple Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 ${style.border}`}>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                      alt={weddingData.groomFullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-display text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    {weddingData.groomFullName}
                  </h3>
                  <p className={`text-sm mb-2 ${style.accent}`}>{weddingData.groomChild}</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {weddingData.groomParents.father}
                    <br />& {weddingData.groomParents.mother}
                  </p>
                </motion.div>

                {/* Ampersand */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
                >
                  <div className={`w-16 h-16 rounded-full ${style.accentBg} flex items-center justify-center`}>
                    <Heart className="h-8 w-8 text-white fill-white" />
                  </div>
                </motion.div>

                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 ${style.border}`}>
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                      alt={weddingData.brideFullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-display text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    {weddingData.brideFullName}
                  </h3>
                  <p className={`text-sm mb-2 ${style.accent}`}>{weddingData.brideChild}</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {weddingData.brideParents.father}
                    <br />& {weddingData.brideParents.mother}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Quran Verse */}
          <section className={`py-20 px-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className={`text-sm uppercase tracking-widest mb-6 ${style.accent}`}>
                  Allah Subhanahu Wa Ta'ala berfirman
                </p>
                <blockquote className={`text-lg md:text-xl italic mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
                </blockquote>
                <p className={`text-sm ${style.accent}`}>— QS. Ar-Rum: 21</p>
              </motion.div>
            </div>
          </section>

          {/* Love Story */}
          <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className={`font-display text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  Kisah <span className={style.accent}>Cinta</span>
                </h2>
              </motion.div>

              <div className="space-y-8">
                {weddingData.story.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full ${style.accentBg} flex items-center justify-center flex-shrink-0 text-white font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`font-display text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm mb-3 ${style.accent}`}>{item.date}</p>
                        <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Countdown & Event Details */}
          <section className={`py-20 px-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className={`font-display text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
                  Moment <span className={style.accent}>Bahagia</span>
                </h2>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
                  {[
                    { value: countdown.days, label: "Hari" },
                    { value: countdown.hours, label: "Jam" },
                    { value: countdown.minutes, label: "Menit" },
                    { value: countdown.seconds, label: "Detik" },
                  ].map((item) => (
                    <div key={item.label} className={`p-4 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                      <div className={`font-display text-3xl font-bold ${style.accent}`}>
                        {item.value}
                      </div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Event Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-8 rounded-2xl text-center ${isDark ? "bg-gray-700" : "bg-rose-50"}`}
                >
                  <Calendar className={`h-12 w-12 mx-auto mb-4 ${style.accent}`} />
                  <h3 className={`font-display text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    Akad Nikah
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{weddingData.date}</p>
                  <p className={`text-lg font-semibold mt-2 ${style.accent}`}>{weddingData.akadTime}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`p-8 rounded-2xl text-center ${isDark ? "bg-gray-700" : "bg-rose-50"}`}
                >
                  <Clock className={`h-12 w-12 mx-auto mb-4 ${style.accent}`} />
                  <h3 className={`font-display text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    Resepsi
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{weddingData.date}</p>
                  <p className={`text-lg font-semibold mt-2 ${style.accent}`}>{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mt-8 p-8 rounded-2xl text-center ${isDark ? "bg-gray-700" : "bg-rose-50"}`}
              >
                <MapPin className={`h-12 w-12 mx-auto mb-4 ${style.accent}`} />
                <h3 className={`font-display text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  {weddingData.venue}
                </h3>
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {weddingData.address}
                </p>
                <Button
                  onClick={() => window.open(weddingData.mapsUrl, "_blank")}
                  className={style.accentBg}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Google Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className={`font-display text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  <span className={style.accent}>Galeri</span> Foto
                </h2>
              </motion.div>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <motion.img
                    key={activeGallery}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={galleryImages[activeGallery]}
                    alt={`Gallery ${activeGallery + 1}`}
                    className="w-full h-80 md:h-96 object-cover"
                  />
                </div>
                <button
                  onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="flex gap-2 justify-center mt-4 flex-wrap">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveGallery(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeGallery === index ? `${style.border} scale-110` : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Love Gift */}
          <section className={`py-20 px-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Gift className={`h-12 w-12 mx-auto mb-4 ${style.accent}`} />
                <h2 className={`font-display text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  Love <span className={style.accent}>Gift</span>
                </h2>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Bank Transfer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl ${isDark ? "bg-gray-700" : "bg-rose-50"}`}
                >
                  <CreditCard className={`h-8 w-8 mb-4 ${style.accent}`} />
                  <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    Transfer Bank
                  </h3>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-gray-600" : "bg-white"}`}>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {weddingData.bankAccount.bank}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`font-mono text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                        {weddingData.bankAccount.number}
                      </p>
                      <button
                        onClick={() => copyToClipboard(weddingData.bankAccount.number)}
                        className={`p-2 rounded-lg ${style.accentBg} text-white`}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      a.n. {weddingData.bankAccount.name}
                    </p>
                  </div>
                </motion.div>

                {/* Gift Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`p-6 rounded-2xl ${isDark ? "bg-gray-700" : "bg-rose-50"}`}
                >
                  <Gift className={`h-8 w-8 mb-4 ${style.accent}`} />
                  <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    Kirim Kado
                  </h3>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-gray-600" : "bg-white"}`}>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {weddingData.giftAddress}
                    </p>
                    <button
                      onClick={() => copyToClipboard(weddingData.giftAddress)}
                      className={`mt-4 w-full py-2 rounded-lg ${style.accentBg} text-white text-sm`}
                    >
                      Salin Alamat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* RSVP & Comments */}
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className={`font-display text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  Ucapan & <span className={style.accent}>Doa</span>
                </h2>
              </motion.div>

              {/* Comment Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmitComment}
                className={`p-6 rounded-2xl mb-8 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Nama
                    </label>
                    <Input
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className={isDark ? "bg-gray-700 border-gray-600" : ""}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Konfirmasi Kehadiran
                    </label>
                    <select
                      value={newComment.presence}
                      onChange={(e) => setNewComment({ ...newComment, presence: e.target.value })}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="hadir">✅ Hadir</option>
                      <option value="tidak hadir">❌ Berhalangan Hadir</option>
                      <option value="ragu">🤔 Masih Ragu</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Ucapan & Doa
                    </label>
                    <Textarea
                      value={newComment.message}
                      onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                      placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                      rows={4}
                      className={isDark ? "bg-gray-700 border-gray-600" : ""}
                    />
                  </div>
                  <Button type="submit" className={`w-full ${style.accentBg}`}>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Ucapan
                  </Button>
                </div>
              </motion.form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                          {comment.name}
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {comment.time} • {comment.presence === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                        </p>
                      </div>
                    </div>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {comment.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`py-12 text-center ${isDark ? "border-t border-gray-700" : "border-t border-rose-100"}`}>
            <Heart className={`h-8 w-8 mx-auto mb-4 ${style.accent} fill-current`} />
            <p className={`font-display text-2xl ${isDark ? "text-white" : "text-gray-800"}`}>
              {weddingData.groomName} & {weddingData.brideName}
            </p>
            <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              15 . 02 . 2026
            </p>
            <p className={`mt-4 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
          </footer>

          {/* CTA to use this template */}
          <div className="fixed bottom-4 right-4 z-40">
            <Button variant="hero" onClick={() => navigate("/register")} className="shadow-lg">
              Gunakan Template Ini
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDemoPage;
