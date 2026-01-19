import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Music, VolumeX, ChevronLeft, ChevronRight, Crown,
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

const ClassicGoldDemo = () => {
  const navigate = useNavigate();
  const invitationRef = useRef<HTMLDivElement>(null);
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
    weddingData, songs, hasFeature,
  } = useWeddingTemplate("classic-gold");

  return (
    <div ref={invitationRef} className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 text-gray-900">
      {/* Opening Cover - Royal Gold */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2520 50%, #1a1a1a 100%)",
            }}
          >
            {/* Gold particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            <div className="text-center relative z-10 p-8">
              {/* Ornamental frame */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="absolute inset-0 border-2 border-amber-500/30 m-8 md:m-16"
                style={{ borderImage: "linear-gradient(45deg, #d4af37, #f5d061, #d4af37) 1" }}
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <Crown className="h-16 w-16 mx-auto text-amber-400 mb-4" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-amber-400/60 text-xs tracking-[0.5em] uppercase mb-6"
              >
                The Wedding Of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-5xl md:text-7xl font-serif mb-2"
                style={{ 
                  fontFamily: "Playfair Display, serif",
                  background: "linear-gradient(135deg, #d4af37 0%, #f5d061 50%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {weddingData.groomName}
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 }}
                className="flex items-center justify-center gap-4 my-4"
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-400 text-2xl">✦</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-5xl md:text-7xl font-serif mb-8"
                style={{ 
                  fontFamily: "Playfair Display, serif",
                  background: "linear-gradient(135deg, #d4af37 0%, #f5d061 50%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {weddingData.brideName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-amber-400/60 mb-10"
              >
                {weddingData.date}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-12 py-6 text-lg font-semibold border border-amber-400/30"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="bg-white/80 backdrop-blur shadow-lg border-amber-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      {/* Music Player */}
      {isOpen && <MusicPlayer accentColor="amber" />}

      {isOpen && (
        <div className="relative">
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
            {/* Decorative corners */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-amber-400" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-amber-400" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-amber-400" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-amber-400" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 text-center px-8">
              <Crown className="h-10 w-10 mx-auto mb-6 text-amber-600" />
              <p className="text-amber-600 text-sm tracking-[0.4em] uppercase mb-8">The Wedding Of</p>
              <h1 className="text-5xl md:text-7xl font-serif text-amber-800" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px w-20 bg-amber-400" />
                <span className="text-amber-500 text-xl">✦</span>
                <div className="h-px w-20 bg-amber-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-amber-800" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.brideName}
              </h1>
              <p className="text-amber-600 mt-8">{weddingData.date}</p>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16">
                <ChevronDown className="h-8 w-8 mx-auto text-amber-500" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <Crown className="h-8 w-8 mx-auto mb-6 text-amber-500" />
              <p className="text-2xl text-amber-400/70 mb-4" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-amber-600 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
              <p className="text-gray-600 leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
              </p>
            </motion.div>
          </section>

          {/* Couple */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-2 border-2 border-amber-400 rotate-45" />
                  <div className="w-48 h-48 rounded-none overflow-hidden border-4 border-amber-300 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-amber-800 mt-8">{weddingData.groomFullName}</h3>
                <p className="text-amber-500 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-2 border-2 border-amber-400 rotate-45" />
                  <div className="w-48 h-48 rounded-none overflow-hidden border-4 border-amber-300 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-amber-800 mt-8">{weddingData.brideFullName}</h3>
                <p className="text-amber-500 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-gray-500 text-sm mt-2">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <div className="text-amber-300 text-6xl mb-4">❝</div>
              <p className="text-xl italic text-gray-600 leading-relaxed">
                Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram kepadanya.
              </p>
              <p className="text-amber-600 mt-6">— QS. Ar-Rum: 21</p>
              <div className="text-amber-300 text-6xl mt-4">❞</div>
            </motion.div>
          </section>

          {/* Love Story Timeline */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-amber-800 mb-4">Kisah Cinta Kami</h2>
                <p className="text-gray-600">Perjalanan cinta yang membawa kami ke hari bahagia ini</p>
              </motion.div>
              <LoveStoryTimeline stories={weddingData.story} variant="elegant" accentColor="amber" />
            </div>
          </section>

          {/* Countdown */}
          <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-serif text-amber-800 mb-8">Menuju Hari Bahagia</h2>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
                  {[
                    { value: countdown.days, label: "Hari" },
                    { value: countdown.hours, label: "Jam" },
                    { value: countdown.minutes, label: "Menit" },
                    { value: countdown.seconds, label: "Detik" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white shadow-lg p-4 border-2 border-amber-200">
                      <div className="text-3xl font-bold text-amber-600">{item.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 shadow-lg border-2 border-amber-200">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-amber-600" />
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Akad Nikah</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-amber-600 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 shadow-lg border-2 border-amber-200">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-amber-600" />
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Resepsi</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-amber-600 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-white p-8 shadow-lg border-2 border-amber-200">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold text-amber-800 mb-2">{weddingData.venue}</h3>
                <p className="text-gray-600 mb-4">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-amber-600 hover:bg-amber-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif text-amber-800 text-center mb-12">✦ Galeri ✦</h2>
              <div className="relative">
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover shadow-xl border-4 border-amber-200" />
                <button onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur shadow-lg border border-amber-300">
                  <ChevronLeft className="h-6 w-6 text-amber-600" />
                </button>
                <button onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur shadow-lg border border-amber-300">
                  <ChevronRight className="h-6 w-6 text-amber-600" />
                </button>
              </div>
            </div>
          </section>

          {/* Gift */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-2xl mx-auto text-center">
              <Crown className="h-10 w-10 mx-auto mb-4 text-amber-600" />
              <h2 className="text-3xl font-serif text-amber-800 mb-4">Love Gift</h2>
              <p className="text-gray-600 mb-8">Doa restu Anda merupakan karunia yang sangat berarti bagi kami.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-white p-6 shadow-lg border-2 border-amber-200">
                  <CreditCard className="h-8 w-8 mx-auto mb-4 text-amber-600" />
                  <h3 className="font-semibold text-amber-800 mb-4">Transfer</h3>
                  <div className="bg-amber-50 p-4">
                    <p className="text-xs text-gray-500">{weddingData.bankAccount.bank}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-mono text-lg text-amber-700">{weddingData.bankAccount.number}</p>
                      <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-2 bg-amber-600 text-white">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">a.n. {weddingData.bankAccount.name}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-6 shadow-lg border-2 border-amber-200">
                  <Gift className="h-8 w-8 mx-auto mb-4 text-amber-600" />
                  <h3 className="font-semibold text-amber-800 mb-4">Kado</h3>
                  <div className="bg-amber-50 p-4">
                    <p className="text-sm text-gray-600">{weddingData.giftAddress}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Countdown Timer */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif text-amber-800 mb-8">Menghitung Hari</h2>
              <CountdownTimer targetDate={new Date("2026-02-15")} />
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-amber-50">
            <GuestBook />
          </section>

          {/* QR Code & Share */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-amber-800 mb-6">QR Code Undangan</h3>
                  <QRCodeGenerator url={window.location.href} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-amber-800 mb-6">Bagikan Undangan</h3>
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
          <footer className="py-12 text-center bg-amber-50 border-t-2 border-amber-200">
            <Crown className="h-8 w-8 mx-auto mb-4 text-amber-600" />
            <p className="text-2xl font-serif text-amber-800">{weddingData.groomName} & {weddingData.brideName}</p>
            <p className="text-amber-600 mt-2">15 . 02 . 2026</p>
          </footer>

          <div className="fixed bottom-4 right-4 z-40">
            <Button onClick={() => navigate("/register")} className="shadow-lg bg-amber-600 hover:bg-amber-700">
              Gunakan Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicGoldDemo;
