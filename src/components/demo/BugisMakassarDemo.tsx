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

const BugisMakassarDemo = () => {
  const navigate = useNavigate();
  const {
    isOpen, setIsOpen, copied, activeGallery, setActiveGallery,
    weddingData, copyToClipboard, hasFeature,
  } = useWeddingTemplate("bugis-makassar");
  
  const { isOpen: lightboxOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();

  // Lontara pattern inspired ornament
  const LontaraOrnament = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 60 30" fill="currentColor">
      {/* Simplified Lontara-inspired geometric pattern */}
      <path d="M0 15 L10 5 L20 15 L10 25 Z" opacity="0.8" />
      <path d="M20 15 L30 5 L40 15 L30 25 Z" opacity="0.8" />
      <path d="M40 15 L50 5 L60 15 L50 25 Z" opacity="0.8" />
      <circle cx="10" cy="15" r="3" opacity="0.6" />
      <circle cx="30" cy="15" r="3" opacity="0.6" />
      <circle cx="50" cy="15" r="3" opacity="0.6" />
    </svg>
  );

  // Tenun Bugis pattern
  const TenunPattern = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <pattern id="tenun" patternUnits="userSpaceOnUse" width="20" height="20">
        <line x1="0" y1="0" x2="20" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="20" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="8" y="8" width="4" height="4" fill="currentColor" opacity="0.3" />
      </pattern>
      <rect width="40" height="40" fill="url(#tenun)" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-yellow-50 to-red-100 text-red-900">
      {/* Opening Cover - Bugis Makassar Theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 30%, #991b1b 60%, #7f1d1d 100%)",
            }}
          >
            {/* Tenun pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{ 
                backgroundImage: `repeating-linear-gradient(45deg, #fcd34d 0, #fcd34d 1px, transparent 1px, transparent 20px),
                                  repeating-linear-gradient(-45deg, #fcd34d 0, #fcd34d 1px, transparent 1px, transparent 20px)`,
              }} />
            </div>
            
            {/* Gold frame with Lontara corners */}
            <div className="absolute inset-6 border-4 border-yellow-500/50 rounded" />
            <div className="absolute inset-10 border-2 border-yellow-400/30 rounded" />
            
            {/* Corner Lontara ornaments */}
            <LontaraOrnament className="absolute top-12 left-12 w-16 h-8 text-yellow-500/60" />
            <LontaraOrnament className="absolute top-12 right-12 w-16 h-8 text-yellow-500/60 scale-x-[-1]" />
            <LontaraOrnament className="absolute bottom-12 left-12 w-16 h-8 text-yellow-500/60 rotate-180" />
            <LontaraOrnament className="absolute bottom-12 right-12 w-16 h-8 text-yellow-500/60 rotate-180 scale-x-[-1]" />
            
            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-36 h-36 mx-auto mb-8"
              >
                <div className="relative w-full h-full">
                  {/* Diamond shape container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rotate-45 transform origin-center" style={{ borderRadius: '15%' }} />
                  <div className="absolute inset-2 bg-red-800 rotate-45 transform origin-center" style={{ borderRadius: '10%' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">⚜️</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-yellow-300 uppercase tracking-[0.4em] text-sm mb-2"
              >
                Mappacci & Mappenre Botting
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-yellow-200/80 text-xs uppercase tracking-widest mb-6"
              >
                Pernikahan Adat Bugis Makassar
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-yellow-100 mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.groomName}
              </motion.h1>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="my-4 flex items-center justify-center gap-4"
              >
                <LontaraOrnament className="w-12 h-6 text-yellow-400 rotate-180" />
                <Heart className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                <LontaraOrnament className="w-12 h-6 text-yellow-400" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-yellow-100 mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-yellow-300 mb-8"
              >
                {weddingData.date}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-red-900 px-12 py-6 text-lg rounded-full shadow-xl font-semibold border-2 border-yellow-300/50"
                >
                  <span className="mr-2">⚜️</span>
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
                src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200"
                alt="Bugis"
                className="w-full h-full object-cover opacity-15"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-40 h-40">
              <div className="w-full h-full border-l-4 border-t-4 border-red-600 rounded-tl-3xl" />
              <LontaraOrnament className="absolute top-6 left-6 w-12 h-6 text-red-500" />
            </div>
            <div className="absolute top-4 right-4 w-40 h-40">
              <div className="w-full h-full border-r-4 border-t-4 border-red-600 rounded-tr-3xl" />
              <LontaraOrnament className="absolute top-6 right-6 w-12 h-6 text-red-500 scale-x-[-1]" />
            </div>
            <div className="absolute bottom-4 left-4 w-40 h-40 border-l-4 border-b-4 border-red-600 rounded-bl-3xl" />
            <div className="absolute bottom-4 right-4 w-40 h-40 border-r-4 border-b-4 border-red-600 rounded-br-3xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center p-8"
            >
              <div className="text-yellow-600 text-4xl mb-4">⚜️</div>
              <p className="text-red-600 uppercase tracking-[0.3em] text-sm mb-6">Bugis Makassar Traditional Wedding</p>
              <h1 className="font-serif text-5xl md:text-7xl text-red-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <LontaraOrnament className="w-16 h-8 text-red-500 rotate-180" />
                <Heart className="h-6 w-6 text-red-600 fill-red-600" />
                <LontaraOrnament className="w-16 h-8 text-red-500" />
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
                  <LontaraOrnament className="w-12 h-6 text-red-500 rotate-180" />
                  <span className="text-yellow-600 text-xl">⚜️</span>
                  <LontaraOrnament className="w-12 h-6 text-red-500" />
                </div>
                <p className="text-red-800 leading-relaxed">
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri upacara Mappacci dan Mappenre Botting (Pernikahan Adat Bugis Makassar) putra-putri kami:
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
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-500 shadow-xl ring-4 ring-yellow-400">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-yellow-400">
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
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-500 shadow-xl ring-4 ring-yellow-400">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-yellow-400">
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
                "Sipakatau, Sipakalebbi, Sipakainge" — Saling menghormati, saling memuliakan, saling mengingatkan
              </p>
              <p className="text-red-600">— Falsafah Bugis Makassar</p>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-red-800 mb-4">Perjalanan Cinta Kami</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <LontaraOrnament className="w-10 h-5 text-red-500 rotate-180" />
                  <span className="text-yellow-600">⚜️</span>
                  <LontaraOrnament className="w-10 h-5 text-red-500" />
                </div>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="modern" accentColor="red" />
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
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="h-8 w-8 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">Mappacci</h3>
                  <p className="text-red-500 text-sm mb-2">(Malam Pacar)</p>
                  <p className="text-red-600">{weddingData.date}</p>
                  <p className="text-red-700 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="h-8 w-8 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">Mappenre Botting</h3>
                  <p className="text-red-500 text-sm mb-2">(Resepsi)</p>
                  <p className="text-red-600">{weddingData.date}</p>
                  <p className="text-red-700 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
          <footer className="py-12 px-4 bg-gradient-to-b from-red-800 to-red-900 text-center text-red-100">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <LontaraOrnament className="w-10 h-5 text-yellow-500 rotate-180" />
                <span className="text-yellow-400 text-2xl">⚜️</span>
                <LontaraOrnament className="w-10 h-5 text-yellow-500" />
              </div>
              <p className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName} & {weddingData.brideName}
              </p>
              <p className="text-red-300 mb-4">{weddingData.date}</p>
              <p className="text-sm text-yellow-400">Mappacci & Mappenre Botting</p>
            </motion.div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default BugisMakassarDemo;
