import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, ChevronLeft, ChevronRight, Expand,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import LoveStoryTimeline from "@/components/invitation/LoveStoryTimeline";
import LightboxGallery from "@/components/invitation/LightboxGallery";
import { useLightbox } from "@/hooks/useLightbox";

const MinangkabauDemo = () => {
  const navigate = useNavigate();
  const {
    isOpen, setIsOpen, copied, activeGallery, setActiveGallery,
    weddingData, copyToClipboard, hasFeature,
  } = useWeddingTemplate("minangkabau");
  
  const { isOpen: lightboxOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();

  // Rumah Gadang roof shape
  const RumahGadangRoof = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 60" fill="currentColor">
      {/* Main roof with gonjong (horn-like) ends */}
      <path d="M0 60 L20 40 C40 20 50 15 60 10 C70 5 80 3 100 0 C120 3 130 5 140 10 C150 15 160 20 180 40 L200 60 L180 55 C160 45 140 40 100 35 C60 40 40 45 20 55 Z" />
    </svg>
  );

  // Minang ornamental pattern
  const MinangPattern = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 40 40" fill="currentColor">
      <pattern id="minang-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
        <path d="M20 0 L25 10 L20 20 L15 10 Z" opacity="0.3" />
        <path d="M0 20 L10 25 L20 20 L10 15 Z" opacity="0.3" />
        <path d="M40 20 L30 25 L20 20 L30 15 Z" opacity="0.3" />
        <path d="M20 40 L25 30 L20 20 L15 30 Z" opacity="0.3" />
        <circle cx="20" cy="20" r="3" opacity="0.5" />
      </pattern>
      <rect width="40" height="40" fill="url(#minang-pattern)" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-red-100 to-yellow-50 text-red-900">
      {/* Opening Cover - Minangkabau Theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #7f1d1d 0%, #991b1b 30%, #b91c1c 60%, #1a1a1a 100%)",
            }}
          >
            {/* Rumah Gadang silhouette at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg">
              <RumahGadangRoof className="w-full h-auto text-yellow-600/30" />
            </div>
            
            {/* Gold decorative border */}
            <div className="absolute inset-8 border-2 border-yellow-600/40 rounded" />
            <div className="absolute inset-12 border border-yellow-500/30 rounded" />
            
            {/* Corner ornaments */}
            {[
              { top: 16, left: 16, rotate: 0 },
              { top: 16, right: 16, rotate: 90 },
              { bottom: 16, left: 16, rotate: 270 },
              { bottom: 16, right: 16, rotate: 180 },
            ].map((pos, i) => (
              <div 
                key={i}
                className="absolute w-16 h-16"
                style={{ 
                  top: pos.top, 
                  left: pos.left, 
                  right: pos.right, 
                  bottom: pos.bottom,
                  transform: `rotate(${pos.rotate}deg)` 
                }}
              >
                <div className="w-full h-full border-l-2 border-t-2 border-yellow-500/50 rounded-tl-lg" />
              </div>
            ))}
            
            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="mb-8"
              >
                <RumahGadangRoof className="w-32 h-auto mx-auto text-yellow-500 mb-4" />
                <div className="w-24 h-24 mx-auto border-4 border-yellow-500 rounded-full bg-red-900/50 backdrop-blur flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-yellow-400 uppercase tracking-[0.4em] text-sm mb-4"
              >
                Baralek Gadang
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-yellow-100 mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.groomName}
              </motion.h1>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="my-4 flex items-center justify-center gap-4"
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500" />
                <Heart className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-yellow-100 mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-yellow-300 mb-8"
              >
                {weddingData.date}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-red-900 px-12 py-6 text-lg rounded-full shadow-xl font-semibold"
                >
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="shadow-lg bg-white/80 backdrop-blur border-red-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      
      {/* Music Player */}
      {isOpen && <MusicPlayer accentColor="red" />}

      {/* Main Content */}
      {isOpen && (
        <div className="relative">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-red-100/90 to-yellow-50/90" />
              <img
                src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200"
                alt="Minang"
                className="w-full h-full object-cover opacity-15"
              />
            </div>
            
            {/* Decorative Rumah Gadang elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-20">
              <RumahGadangRoof className="w-full h-auto text-red-800" />
            </div>
            
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-40 h-40 border-l-4 border-t-4 border-red-700 rounded-tl-3xl" />
            <div className="absolute top-4 right-4 w-40 h-40 border-r-4 border-t-4 border-red-700 rounded-tr-3xl" />
            <div className="absolute bottom-4 left-4 w-40 h-40 border-l-4 border-b-4 border-red-700 rounded-bl-3xl" />
            <div className="absolute bottom-4 right-4 w-40 h-40 border-r-4 border-b-4 border-red-700 rounded-br-3xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center p-8"
            >
              <RumahGadangRoof className="w-24 h-auto mx-auto text-red-700 mb-4" />
              <p className="text-red-600 uppercase tracking-[0.3em] text-sm mb-6">Baralek Gadang Minangkabau</p>
              <h1 className="font-serif text-5xl md:text-7xl text-red-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-600" />
                <Heart className="h-6 w-6 text-red-600 fill-red-600" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-600" />
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-red-800" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.brideName}
              </h1>
              <p className="mt-8 text-red-600">{weddingData.date}</p>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-16"
              >
                <ChevronDown className="h-8 w-8 mx-auto text-red-500" />
              </motion.div>
            </motion.div>
          </section>

          {/* Greeting Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-3xl mb-4 text-red-800" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <p className="text-red-700 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-400" />
                  <RumahGadangRoof className="w-8 h-4 text-red-500" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-400" />
                </div>
                <p className="text-red-800 leading-relaxed">
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Baralek Gadang (Pernikahan Adat Minangkabau) putra-putri kami:
                </p>
              </motion.div>
            </div>
          </section>

          {/* Couple Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
              {/* Groom */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-600 shadow-xl ring-4 ring-yellow-400">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-yellow-400">
                    👤
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-red-800">{weddingData.groomFullName}</h3>
                <p className="text-red-500 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-red-600 text-sm mt-1">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              {/* Bride */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-600 shadow-xl ring-4 ring-yellow-400">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-yellow-400">
                    👤
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-red-800">{weddingData.brideFullName}</h3>
                <p className="text-red-500 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-red-600 text-sm mt-1">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <div className="text-yellow-500 text-6xl mb-4">❝</div>
              <p className="text-xl italic text-red-800 mb-4">
                "Adat basandi syarak, syarak basandi Kitabullah" — Adat bersendikan agama, agama bersendikan Al-Quran
              </p>
              <p className="text-red-600">— Pepatah Minangkabau</p>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-red-800 mb-4">Perjalanan Cinta Kami</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-12 bg-red-400" />
                  <RumahGadangRoof className="w-8 h-4 text-red-600" />
                  <div className="h-px w-12 bg-red-400" />
                </div>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="romantic" accentColor="red" />
            </div>
          </section>

          {/* Countdown & Event Details */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-3xl text-red-800 mb-8">Menuju Hari Bahagia</h2>
                <CountdownTimer targetDate={new Date("2026-02-15")} className="mb-12" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="h-8 w-8 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-800 mb-4">Akad Nikah</h3>
                  <p className="text-red-600">{weddingData.date}</p>
                  <p className="text-red-700 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="h-8 w-8 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-800 mb-4">Baralek Gadang</h3>
                  <p className="text-red-600">{weddingData.date}</p>
                  <p className="text-red-700 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-yellow-300" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">{weddingData.venue}</h3>
                <p className="text-red-600 mb-4">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Google Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
            <div className="max-w-4xl mx-auto">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-red-800 text-center mb-12">
                Galeri Foto
              </motion.h2>
              <div className="relative group cursor-pointer" onClick={() => openLightbox(activeGallery)}>
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl border-4 border-red-200" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <Expand className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-red-200">
                  <ChevronLeft className="h-6 w-6 text-red-600" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-red-200">
                  <ChevronRight className="h-6 w-6 text-red-600" />
                </button>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                {galleryImages.map((img, index) => (
                  <button key={index} onClick={() => openLightbox(index)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${activeGallery === index ? "border-red-500 scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <LightboxGallery images={galleryImages} initialIndex={currentIndex} isOpen={lightboxOpen} onClose={closeLightbox} />
          </section>

          {/* Gift Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <Gift className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h2 className="font-serif text-3xl text-red-800 mb-4">Kado Digital</h2>
                <p className="text-red-600">Doa restu Anda adalah hadiah terindah</p>
              </motion.div>

              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-200">
                  <div className="flex items-center gap-4 mb-4">
                    <CreditCard className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">{weddingData.bankAccount.bank}</p>
                      <p className="text-red-500 text-sm">a.n. {weddingData.bankAccount.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-200">
                    <code className="flex-1 text-red-800 font-mono">{weddingData.bankAccount.number}</code>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="text-red-600 hover:text-red-700 hover:bg-red-100">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-200">
                  <div className="flex items-center gap-4 mb-4">
                    <Gift className="h-8 w-8 text-red-600" />
                    <p className="font-semibold text-red-800">Kirim Kado</p>
                  </div>
                  <p className="text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{weddingData.giftAddress}</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-red-800 mb-4">Ucapan & Doa</h2>
                <p className="text-red-600">Berikan ucapan dan doa terbaik untuk kedua mempelai</p>
              </motion.div>
              <GuestBook accentColor="red" />
            </div>
          </section>

          {/* Share & QR */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-red-100">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-3xl text-red-800 mb-8">Bagikan Undangan</h2>
                <ShareButtons groomName={weddingData.groomName} brideName={weddingData.brideName} />
                <div className="mt-8">
                  <QRCodeGenerator size={150} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 bg-gradient-to-b from-red-800 to-gray-900 text-center text-red-100">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <RumahGadangRoof className="w-20 h-auto mx-auto text-yellow-500 mb-4" />
              <p className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName} & {weddingData.brideName}
              </p>
              <p className="text-red-300 mb-4">{weddingData.date}</p>
              <p className="text-sm text-yellow-400">Baralek Gadang Minangkabau</p>
            </motion.div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default MinangkabauDemo;
