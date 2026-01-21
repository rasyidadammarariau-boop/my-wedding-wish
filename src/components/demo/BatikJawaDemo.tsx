import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, ChevronLeft, ChevronRight, Expand,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import LoveStoryTimeline from "@/components/invitation/LoveStoryTimeline";
import LightboxGallery from "@/components/invitation/LightboxGallery";
import VenueMap from "@/components/invitation/VenueMap";
import { useLightbox } from "@/hooks/useLightbox";
import ParallaxSection, { ParallaxElement, FloatingElement } from "@/components/invitation/ParallaxSection";

const BatikJawaDemo = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen, setIsOpen, copied, activeGallery, setActiveGallery,
    weddingData, copyToClipboard, hasFeature,
  } = useWeddingTemplate("batik-jawa");
  
  const { isOpen: lightboxOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const decorY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Batik pattern SVG for decorations
  const BatikPattern = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <pattern id="batik" patternUnits="userSpaceOnUse" width="20" height="20">
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="0" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="0" cy="20" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.2" />
        <path d="M0 10 Q10 5 20 10 Q10 15 0 10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      </pattern>
      <rect width="100" height="100" fill="url(#batik)" />
    </svg>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 text-amber-900">
      {/* Floating Parallax Decorations */}
      {isOpen && (
        <>
          <motion.div 
            className="fixed top-20 left-10 text-6xl text-amber-600/20 pointer-events-none z-0"
            style={{ y: decorY }}
          >
            ☸
          </motion.div>
          <motion.div 
            className="fixed top-40 right-10 text-4xl text-amber-500/15 pointer-events-none z-0"
            style={{ y: decorY2 }}
          >
            🏛️
          </motion.div>
          <motion.div 
            className="fixed bottom-40 left-20 text-5xl text-amber-400/10 pointer-events-none z-0"
            style={{ y: decorY3 }}
          >
            ❧
          </motion.div>
        </>
      )}
      
      {/* Opening Cover - Batik Jawa Theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)",
            }}
          >
            {/* Batik Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <BatikPattern className="w-full h-full text-amber-300" />
            </div>
            
            {/* Floating Wayang Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-amber-300/30 text-4xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  rotate: 0 
                }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: Math.random() * 2 
                }}
              >
                ☸
              </motion.div>
            ))}
            
            {/* Gold ornamental frame */}
            <div className="absolute inset-8 border-2 border-amber-400/40 rounded-lg" />
            <div className="absolute inset-12 border border-amber-300/30 rounded-lg" />
            
            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-36 h-36 mx-auto mb-8 relative"
              >
                {/* Ornamental circle */}
                <div className="absolute inset-0 border-4 border-amber-400 rounded-full" />
                <div className="absolute inset-2 border-2 border-amber-300/60 rounded-full" />
                <div className="absolute inset-4 bg-amber-900/40 backdrop-blur rounded-full flex items-center justify-center">
                  <span className="text-5xl">🏛️</span>
                </div>
                {/* Corner ornaments */}
                {[0, 90, 180, 270].map((deg) => (
                  <motion.div
                    key={deg}
                    className="absolute w-4 h-4 border-t-2 border-l-2 border-amber-400"
                    style={{
                      top: deg === 0 || deg === 270 ? -8 : 'auto',
                      bottom: deg === 180 || deg === 90 ? -8 : 'auto',
                      left: deg === 0 || deg === 90 ? -8 : 'auto',
                      right: deg === 180 || deg === 270 ? -8 : 'auto',
                      transform: `rotate(${deg}deg)`,
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-amber-300 uppercase tracking-[0.4em] text-sm mb-4 font-medium"
              >
                Undangan Pernikahan
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-amber-100 mb-2"
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
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-400 text-3xl">❧</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="font-serif text-5xl md:text-7xl text-amber-100 mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-amber-300 mb-8"
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
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-6 text-lg rounded-full shadow-xl border border-amber-400/50"
                >
                  <span className="mr-2">☸</span>
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="shadow-lg bg-white/80 backdrop-blur border-amber-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      
      {/* Music Player */}
      {isOpen && <MusicPlayer accentColor="amber" />}

      {/* Main Content */}
      {isOpen && (
        <div className="relative">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 to-orange-50/90 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-10">
                <BatikPattern className="w-full h-full text-amber-800" />
              </div>
            </div>
            
            {/* Javanese Ornamental Corners */}
            <div className="absolute top-4 left-4 w-40 h-40">
              <div className="w-full h-full border-l-4 border-t-4 border-amber-600 rounded-tl-3xl" />
              <div className="absolute top-2 left-2 w-full h-full border-l-2 border-t-2 border-amber-400 rounded-tl-2xl" />
            </div>
            <div className="absolute top-4 right-4 w-40 h-40">
              <div className="w-full h-full border-r-4 border-t-4 border-amber-600 rounded-tr-3xl" />
              <div className="absolute top-2 right-2 w-full h-full border-r-2 border-t-2 border-amber-400 rounded-tr-2xl" />
            </div>
            <div className="absolute bottom-4 left-4 w-40 h-40">
              <div className="w-full h-full border-l-4 border-b-4 border-amber-600 rounded-bl-3xl" />
              <div className="absolute bottom-2 left-2 w-full h-full border-l-2 border-b-2 border-amber-400 rounded-bl-2xl" />
            </div>
            <div className="absolute bottom-4 right-4 w-40 h-40">
              <div className="w-full h-full border-r-4 border-b-4 border-amber-600 rounded-br-3xl" />
              <div className="absolute bottom-2 right-2 w-full h-full border-r-2 border-b-2 border-amber-400 rounded-br-2xl" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center p-8"
            >
              <p className="text-amber-700 uppercase tracking-[0.3em] text-sm mb-6">Javanese Traditional Wedding</p>
              <h1 className="font-serif text-5xl md:text-7xl text-amber-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600" />
                <span className="text-amber-600 text-2xl">☸</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600" />
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-amber-900" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.brideName}
              </h1>
              <p className="mt-8 text-amber-700">{weddingData.date}</p>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-16"
              >
                <ChevronDown className="h-8 w-8 mx-auto text-amber-600" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-3xl mb-4 text-amber-800" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <p className="text-amber-700 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 mx-auto mb-6 rounded-full" />
                <p className="text-amber-800 leading-relaxed">
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri upacara pernikahan adat Jawa putra-putri kami:
                </p>
              </motion.div>
            </div>
          </section>

          {/* Couple Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <BatikPattern className="w-full h-full text-amber-900" />
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
              {/* Groom */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl ring-4 ring-amber-200">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white text-2xl shadow-lg border-2 border-amber-300">
                    👤
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-amber-900">{weddingData.groomFullName}</h3>
                <p className="text-amber-600 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-amber-700 text-sm mt-1">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              {/* Bride */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl ring-4 ring-amber-200">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white text-2xl shadow-lg border-2 border-amber-300">
                    👤
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-amber-900">{weddingData.brideFullName}</h3>
                <p className="text-amber-600 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-amber-700 text-sm mt-1">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <div className="text-amber-400 text-6xl mb-4">❝</div>
              <p className="text-xl italic text-amber-800 mb-4">
                "Memayu hayuning bawana" — Mempercantik keindahan dunia dengan kebaikan dan cinta kasih.
              </p>
              <p className="text-amber-600">— Falsafah Jawa</p>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-amber-900 mb-4">Perjalanan Cinta Kami</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-12 bg-amber-400" />
                  <span className="text-amber-600">☸</span>
                  <div className="h-px w-12 bg-amber-400" />
                </div>
                <p className="text-amber-700">Kisah yang membawa kami menuju ikatan suci</p>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="classic" accentColor="amber" />
            </div>
          </section>

          {/* Countdown & Event Details */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-3xl text-amber-900 mb-8">Menuju Hari Bahagia</h2>
                <CountdownTimer 
                  targetDate={new Date("2026-02-15")} 
                  className="mb-12"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Akad Nikah</h3>
                  <p className="text-amber-700">{weddingData.date}</p>
                  <p className="text-amber-600 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Resepsi</h3>
                  <p className="text-amber-700">{weddingData.date}</p>
                  <p className="text-amber-600 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{weddingData.venue}</h3>
                <p className="text-amber-700 mb-4">{weddingData.address}</p>
              </motion.div>
            </div>
          </section>

          {/* Venue Map */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-2xl mx-auto">
              <VenueMap
                venueName={weddingData.venue}
                address={weddingData.address}
                latitude={-7.7956}
                longitude={110.3695}
                googleMapsUrl={weddingData.mapsUrl}
              />
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-4xl mx-auto">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-amber-900 text-center mb-12">
                Galeri Foto
              </motion.h2>
              <div className="relative group cursor-pointer" onClick={() => openLightbox(activeGallery)}>
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl border-4 border-amber-200" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <Expand className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-amber-200">
                  <ChevronLeft className="h-6 w-6 text-amber-700" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-amber-200">
                  <ChevronRight className="h-6 w-6 text-amber-700" />
                </button>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                {galleryImages.map((img, index) => (
                  <button key={index} onClick={() => openLightbox(index)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${activeGallery === index ? "border-amber-500 scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <LightboxGallery images={galleryImages} initialIndex={currentIndex} isOpen={lightboxOpen} onClose={closeLightbox} />
          </section>

          {/* Gift Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <Gift className="h-12 w-12 mx-auto mb-4 text-amber-600" />
                <h2 className="font-serif text-3xl text-amber-900 mb-4">Kado Digital</h2>
                <p className="text-amber-700">Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, dapat melalui:</p>
              </motion.div>

              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-amber-200">
                  <div className="flex items-center gap-4 mb-4">
                    <CreditCard className="h-8 w-8 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-900">{weddingData.bankAccount.bank}</p>
                      <p className="text-amber-600 text-sm">a.n. {weddingData.bankAccount.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <code className="flex-1 text-amber-800 font-mono">{weddingData.bankAccount.number}</code>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="text-amber-600 hover:text-amber-700 hover:bg-amber-100">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-amber-200">
                  <div className="flex items-center gap-4 mb-4">
                    <Gift className="h-8 w-8 text-amber-600" />
                    <p className="font-semibold text-amber-900">Kirim Kado</p>
                  </div>
                  <p className="text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">{weddingData.giftAddress}</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-amber-900 mb-4">Ucapan & Doa</h2>
                <p className="text-amber-700">Berikan ucapan dan doa terbaik untuk kedua mempelai</p>
              </motion.div>
              <GuestBook invitationId="batik-jawa-demo" />
            </div>
          </section>

          {/* Share & QR */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-100">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-3xl text-amber-900 mb-8">Bagikan Undangan</h2>
                <ShareButtons 
                  url={window.location.href}
                  coupleName={`${weddingData.groomName} & ${weddingData.brideName}`}
                  weddingDate={weddingData.date}
                />
                <div className="mt-8">
                  <QRCodeGenerator url={window.location.href} size={150} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 bg-gradient-to-b from-amber-800 to-amber-900 text-center text-amber-100">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName} & {weddingData.brideName}
              </p>
              <p className="text-amber-300 mb-4">{weddingData.date}</p>
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <span>☸</span>
                <p className="text-sm">Javanese Traditional Wedding</p>
                <span>☸</span>
              </div>
            </motion.div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default BatikJawaDemo;
