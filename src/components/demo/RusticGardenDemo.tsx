import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Music, VolumeX, ChevronLeft, ChevronRight, Leaf, Expand,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";
import ExportButton from "@/components/invitation/ExportButton";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import LoveStoryTimeline from "@/components/invitation/LoveStoryTimeline";
import LightboxGallery from "@/components/invitation/LightboxGallery";
import { useLightbox } from "@/hooks/useLightbox";

import { useRef } from "react";

const RusticGardenDemo = () => {
  const navigate = useNavigate();
  const invitationRef = useRef<HTMLDivElement>(null);
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
    weddingData, songs, hasFeature,
  } = useWeddingTemplate("rustic-garden");
  
  const { isOpen: lightboxOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();

  return (
    <div ref={invitationRef} className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-100 text-gray-800">
      {/* Opening Cover - Garden Theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(240,253,244,0.9)), url(https://images.unsplash.com/photo-1518882605630-8eb elected-30?w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Floating Leaves */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -50,
                  rotate: 0 
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{ 
                  duration: 10 + Math.random() * 5, 
                  repeat: Infinity,
                  delay: Math.random() * 5 
                }}
              >
                <Leaf className="h-6 w-6" />
              </motion.div>
            ))}

            <div className="text-center relative z-10 p-8">
              {/* Wreath decoration */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="text-7xl mb-6"
              >
                🌿
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-green-600 text-sm tracking-[0.3em] uppercase mb-4"
              >
                You're Invited To
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-5xl md:text-7xl font-serif text-green-800 mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {weddingData.groomName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-3xl text-green-500 my-4"
              >
                ❧
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-5xl md:text-7xl font-serif text-green-800 mb-8"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-green-600 mb-8"
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
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full shadow-lg"
                >
                  <Leaf className="h-5 w-5 mr-2" />
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="bg-white/80 backdrop-blur shadow-lg">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      {/* Music Player */}
      {isOpen && <MusicPlayer accentColor="emerald" />}

      {isOpen && (
        <div className="relative">
          {/* Hero with wooden texture feel */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-emerald-100" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200)", backgroundSize: "cover" }} />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 text-center px-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-4xl">🌿</span>
                <span className="text-green-600 text-sm tracking-[0.3em] uppercase">The Wedding Of</span>
                <span className="text-4xl">🌿</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif text-green-800" style={{ fontFamily: "Georgia, serif" }}>
                {weddingData.groomName}
              </h1>
              <p className="text-4xl text-green-500 my-6">&</p>
              <h1 className="text-5xl md:text-7xl font-serif text-green-800" style={{ fontFamily: "Georgia, serif" }}>
                {weddingData.brideName}
              </h1>

              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-16 bg-green-400" />
                <Leaf className="h-6 w-6 text-green-500" />
                <div className="h-px w-16 bg-green-400" />
              </div>

              <p className="text-green-600 mt-6">{weddingData.date}</p>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16">
                <ChevronDown className="h-8 w-8 mx-auto text-green-500" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah */}
          <section className="py-20 px-4 bg-white" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%2322c55e\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <Leaf className="h-8 w-8 mx-auto mb-6 text-green-500" />
              <p className="text-2xl text-green-700/60 mb-4" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-green-600 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
              <p className="text-gray-600 leading-relaxed">
                Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk merayakan hari bahagia kami.
              </p>
            </motion.div>
          </section>

          {/* Couple with floral frame */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-4 border-2 border-green-300 rounded-full" style={{ borderStyle: "dashed" }} />
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-green-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-3xl">🌿</span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-3xl">🌿</span>
                </div>
                <h3 className="text-2xl font-serif text-green-800">{weddingData.groomFullName}</h3>
                <p className="text-green-500 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-4 border-2 border-green-300 rounded-full" style={{ borderStyle: "dashed" }} />
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-green-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-3xl">🌸</span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-3xl">🌸</span>
                </div>
                <h3 className="text-2xl font-serif text-green-800">{weddingData.brideFullName}</h3>
                <p className="text-green-500 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <div className="text-green-300 text-6xl mb-4">"</div>
              <p className="text-xl italic text-gray-600 leading-relaxed">
                Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri.
              </p>
              <p className="text-green-600 mt-6">— QS. Ar-Rum: 21</p>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <Leaf className="h-10 w-10 mx-auto mb-4 text-green-600" />
                <h2 className="font-serif text-3xl text-green-800 mb-4">Kisah Cinta Kami</h2>
                <p className="text-gray-600">Perjalanan cinta yang membawa kami ke hari bahagia ini</p>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="classic" accentColor="emerald" />
            </div>
          </section>

          {/* Countdown */}
          <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-serif text-green-800 mb-8">Menuju Hari Bahagia</h2>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
                  {[
                    { value: countdown.days, label: "Hari" },
                    { value: countdown.hours, label: "Jam" },
                    { value: countdown.minutes, label: "Menit" },
                    { value: countdown.seconds, label: "Detik" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-2xl shadow-lg p-4 border border-green-100">
                      <div className="text-3xl font-bold text-green-600">{item.value}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Akad Nikah</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-green-600 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Resepsi</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-green-600 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">{weddingData.venue}</h3>
                <p className="text-gray-600 mb-4">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-green-600 hover:bg-green-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif text-green-800 text-center mb-12">Galeri</h2>
              <div className="relative group cursor-pointer" onClick={() => openLightbox(activeGallery)}>
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <Expand className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
                  <ChevronLeft className="h-6 w-6 text-green-600" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
                  <ChevronRight className="h-6 w-6 text-green-600" />
                </button>
              </div>
            </div>
            <LightboxGallery images={galleryImages} initialIndex={currentIndex} isOpen={lightboxOpen} onClose={closeLightbox} />
          </section>

          {/* Gift */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-2xl mx-auto text-center">
              <Gift className="h-10 w-10 mx-auto mb-4 text-green-600" />
              <h2 className="text-3xl font-serif text-green-800 mb-4">Love Gift</h2>
              <p className="text-gray-600 mb-8">Kehadiran Anda adalah hadiah terindah bagi kami.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                  <CreditCard className="h-8 w-8 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold text-green-800 mb-4">Transfer</h3>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">{weddingData.bankAccount.bank}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-mono text-lg text-green-700">{weddingData.bankAccount.number}</p>
                      <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-2 bg-green-600 text-white rounded-lg">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">a.n. {weddingData.bankAccount.name}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                  <Gift className="h-8 w-8 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold text-green-800 mb-4">Kado</h3>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">{weddingData.giftAddress}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Countdown Timer */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <Leaf className="h-8 w-8 mx-auto mb-4 text-green-600" />
              <h2 className="text-3xl font-serif text-green-800 mb-8">Menghitung Hari</h2>
              <CountdownTimer targetDate={new Date("2026-02-15")} />
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-green-50">
            <GuestBook />
          </section>

          {/* QR Code & Share */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-green-800 mb-6">QR Code Undangan</h3>
                  <QRCodeGenerator url={window.location.href} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-green-800 mb-6">Bagikan Undangan</h3>
                  <ShareButtons 
                    url={window.location.href}
                    coupleName={`${weddingData.groomName} & ${weddingData.brideName}`}
                    weddingDate={weddingData.date}
                  />
                  <div className="mt-6">
                    <ExportButton targetRef={invitationRef} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 text-center bg-green-50 border-t border-green-100">
            <Leaf className="h-8 w-8 mx-auto mb-4 text-green-600" />
            <p className="text-2xl font-serif text-green-800">{weddingData.groomName} & {weddingData.brideName}</p>
            <p className="text-green-600 mt-2">15 . 02 . 2026</p>
          </footer>

          <div className="fixed bottom-4 right-4 z-40">
            <Button onClick={() => navigate("/register")} className="shadow-lg bg-green-600 hover:bg-green-700">
              Gunakan Template Ini
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RusticGardenDemo;
