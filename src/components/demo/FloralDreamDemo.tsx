import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Music, VolumeX, ChevronLeft, ChevronRight,
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

import { useRef } from "react";

const FloralDreamDemo = () => {
  const navigate = useNavigate();
  const invitationRef = useRef<HTMLDivElement>(null);
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
    weddingData, songs, hasFeature,
  } = useWeddingTemplate("floral-dream");

  return (
    <div ref={invitationRef} className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 text-gray-800">
      {/* Opening Cover - Dreamy Floral */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f5d0fe 100%)",
            }}
          >
            {/* Floating Flowers */}
            {[...Array(25)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl md:text-3xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -80,
                  rotate: 0,
                  opacity: 0.8 
                }}
                animate={{ 
                  y: window.innerHeight + 80,
                  rotate: Math.random() * 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{ 
                  duration: 12 + Math.random() * 6, 
                  repeat: Infinity,
                  delay: Math.random() * 6 
                }}
              >
                {["🌸", "🌺", "🌷", "💐", "🌼"][Math.floor(Math.random() * 5)]}
              </motion.span>
            ))}

            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="text-8xl mb-8"
              >
                💐
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-pink-400 text-sm tracking-[0.4em] uppercase mb-6"
              >
                Wedding Invitation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="text-5xl md:text-7xl font-serif text-pink-600 mb-2"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {weddingData.groomName}
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-center gap-3 my-4"
              >
                <span className="text-2xl">🌸</span>
                <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
                <span className="text-2xl">🌸</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
                className="text-5xl md:text-7xl font-serif text-pink-600 mb-8"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-pink-400 mb-10"
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
                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-12 py-6 text-lg rounded-full shadow-xl border-2 border-white/30"
                >
                  🌷 Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="bg-white/80 backdrop-blur shadow-lg border-pink-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      {/* Music Player */}
      {isOpen && <MusicPlayer accentColor="pink" />}

      {isOpen && (
        <div className="relative">
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-purple-50" />
            
            {/* Corner florals */}
            <div className="absolute top-0 left-0 text-6xl opacity-50">🌸</div>
            <div className="absolute top-0 right-0 text-6xl opacity-50">🌺</div>
            <div className="absolute bottom-0 left-0 text-6xl opacity-50">🌷</div>
            <div className="absolute bottom-0 right-0 text-6xl opacity-50">💐</div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 text-center px-8">
              <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-6">🌸 The Wedding Of 🌸</p>
              <h1 className="text-5xl md:text-7xl font-serif text-pink-600" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px w-16 bg-pink-300" />
                <span className="text-2xl">💕</span>
                <div className="h-px w-16 bg-pink-300" />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-pink-600" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.brideName}
              </h1>
              <p className="text-pink-400 mt-8">{weddingData.date}</p>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16">
                <ChevronDown className="h-8 w-8 mx-auto text-pink-400" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <span className="text-4xl mb-4 block">🌷</span>
              <p className="text-2xl text-pink-300/80 mb-4" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-pink-500 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
              <p className="text-gray-600 leading-relaxed">
                Dengan memohon rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami.
              </p>
            </motion.div>
          </section>

          {/* Couple */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-3 -left-3 text-3xl">🌺</span>
                  <span className="absolute -bottom-3 -right-3 text-3xl">🌸</span>
                </div>
                <h3 className="text-2xl font-serif text-pink-600">{weddingData.groomFullName}</h3>
                <p className="text-pink-400 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-3 -right-3 text-3xl">🌷</span>
                  <span className="absolute -bottom-3 -left-3 text-3xl">💐</span>
                </div>
                <h3 className="text-2xl font-serif text-pink-600">{weddingData.brideFullName}</h3>
                <p className="text-pink-400 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <span className="text-4xl">🌸</span>
              <p className="text-xl italic text-gray-600 leading-relaxed my-6">
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram kepadanya."
              </p>
              <p className="text-pink-500">— QS. Ar-Rum: 21</p>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <span className="text-4xl mb-4 block">💕</span>
                <h2 className="font-serif text-3xl text-pink-600 mb-4">Kisah Cinta Kami</h2>
                <p className="text-gray-600">Perjalanan cinta yang membawa kami ke hari bahagia ini</p>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="romantic" accentColor="pink" />
            </div>
          </section>

          {/* Countdown */}
          <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <span className="text-4xl mb-4 block">💐</span>
                <h2 className="text-3xl font-serif text-pink-600 mb-8">Menuju Hari Bahagia</h2>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
                  {[
                    { value: countdown.days, label: "Hari" },
                    { value: countdown.hours, label: "Jam" },
                    { value: countdown.minutes, label: "Menit" },
                    { value: countdown.seconds, label: "Detik" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-2xl shadow-lg p-4 border border-pink-100">
                      <div className="text-3xl font-bold text-pink-500">{item.value}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
                  <span className="text-3xl mb-4 block">💒</span>
                  <h3 className="text-xl font-semibold text-pink-600 mb-4">Akad Nikah</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-pink-500 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
                  <span className="text-3xl mb-4 block">🎉</span>
                  <h3 className="text-xl font-semibold text-pink-600 mb-4">Resepsi</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-pink-500 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-pink-500" />
                <h3 className="text-xl font-semibold text-pink-600 mb-2">{weddingData.venue}</h3>
                <p className="text-gray-600 mb-4">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif text-pink-600 text-center mb-12">🌸 Galeri 🌸</h2>
              <div className="relative">
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl" />
                <button onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-pink-200">
                  <ChevronLeft className="h-6 w-6 text-pink-500" />
                </button>
                <button onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-pink-200">
                  <ChevronRight className="h-6 w-6 text-pink-500" />
                </button>
              </div>
            </div>
          </section>

          {/* Gift */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-4xl mb-4 block">🎁</span>
              <h2 className="text-3xl font-serif text-pink-600 mb-4">Love Gift</h2>
              <p className="text-gray-600 mb-8">Kehadiran Anda adalah hadiah terindah bagi kami 💕</p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
                  <CreditCard className="h-8 w-8 mx-auto mb-4 text-pink-500" />
                  <h3 className="font-semibold text-pink-600 mb-4">Transfer</h3>
                  <div className="bg-pink-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">{weddingData.bankAccount.bank}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-mono text-lg text-pink-600">{weddingData.bankAccount.number}</p>
                      <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-2 bg-pink-500 text-white rounded-lg">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">a.n. {weddingData.bankAccount.name}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
                  <Gift className="h-8 w-8 mx-auto mb-4 text-pink-500" />
                  <h3 className="font-semibold text-pink-600 mb-4">Kado</h3>
                  <div className="bg-pink-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">{weddingData.giftAddress}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Countdown Timer */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-4xl mb-4 block">💐</span>
              <h2 className="text-3xl font-serif text-pink-600 mb-8">Menghitung Hari</h2>
              <CountdownTimer targetDate={new Date("2026-02-15")} />
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-pink-50">
            <GuestBook />
          </section>

          {/* QR Code & Share */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-pink-600 mb-6">🌸 QR Code Undangan</h3>
                  <QRCodeGenerator url={window.location.href} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-pink-600 mb-6">💌 Bagikan Undangan</h3>
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
          <footer className="py-12 text-center bg-pink-50 border-t border-pink-100">
            <span className="text-4xl">💐</span>
            <p className="text-2xl font-serif text-pink-600 mt-4">{weddingData.groomName} & {weddingData.brideName}</p>
            <p className="text-pink-400 mt-2">15 . 02 . 2026</p>
          </footer>

          <div className="fixed bottom-4 right-4 z-40">
            <Button onClick={() => navigate("/register")} className="shadow-lg bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500">
              Gunakan Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloralDreamDemo;
