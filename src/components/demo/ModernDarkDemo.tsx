import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Music, VolumeX, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { weddingData, galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";
import ExportButton from "@/components/invitation/ExportButton";

import { useRef } from "react";

const ModernDarkDemo = () => {
  const navigate = useNavigate();
  const invitationRef = useRef<HTMLDivElement>(null);
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
  } = useWeddingTemplate();

  return (
    <div ref={invitationRef} className="min-h-screen bg-gray-950 text-white">
      {/* Opening Cover - Cinematic Dark */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)",
            }}
          >
            {/* Animated Stars */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="mb-8"
              >
                <Sparkles className="h-16 w-16 mx-auto text-amber-400" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, letterSpacing: "0em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-amber-400/80 text-xs uppercase mb-8"
              >
                Wedding Invitation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent"
              >
                {weddingData.groomName}
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-4 my-6"
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
                <Heart className="h-6 w-6 text-amber-400 fill-amber-400" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent"
              >
                {weddingData.brideName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-gray-400 mb-12"
              >
                {weddingData.date}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 px-12 py-6 text-lg font-semibold"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Open Invitation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="fixed top-4 right-4 z-40">
        <Button variant="secondary" size="icon" onClick={() => setIsMuted(!isMuted)} className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="relative">
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
            <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200" alt="" className="w-full h-full object-cover" />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 text-center px-8">
              <Sparkles className="h-8 w-8 mx-auto mb-6 text-amber-400" />
              <p className="text-amber-400/60 text-xs tracking-[0.5em] uppercase mb-8">The Wedding Of</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                {weddingData.groomName}
              </h1>
              <p className="text-4xl text-amber-400 my-4">&</p>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                {weddingData.brideName}
              </h1>
              <p className="text-gray-400 mt-8">{weddingData.date}</p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16">
                <ChevronDown className="h-8 w-8 mx-auto text-amber-400/50" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah */}
          <section className="py-24 px-4 bg-gray-900">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <p className="text-3xl text-amber-300/60 mb-6" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-amber-400 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
              <p className="text-gray-400 leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
              </p>
            </motion.div>
          </section>

          {/* Couple */}
          <section className="py-24 px-4 bg-gray-950">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-amber-400/30 p-1">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-gray-900 text-xs font-bold uppercase tracking-wider">
                    Groom
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-amber-400">{weddingData.groomFullName}</h3>
                <p className="text-gray-500 text-sm mt-2">{weddingData.groomChild}</p>
                <div className="h-px w-16 bg-amber-400/30 mx-auto my-4" />
                <p className="text-gray-500 text-sm">{weddingData.groomParents.father}</p>
                <p className="text-gray-500 text-sm">& {weddingData.groomParents.mother}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-amber-400/30 p-1">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-gray-900 text-xs font-bold uppercase tracking-wider">
                    Bride
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-amber-400">{weddingData.brideFullName}</h3>
                <p className="text-gray-500 text-sm mt-2">{weddingData.brideChild}</p>
                <div className="h-px w-16 bg-amber-400/30 mx-auto my-4" />
                <p className="text-gray-500 text-sm">{weddingData.brideParents.father}</p>
                <p className="text-gray-500 text-sm">& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-24 px-4 bg-gray-900">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <p className="text-amber-400/50 text-5xl mb-6">"</p>
              <p className="text-xl text-gray-300 italic leading-relaxed">
                Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri.
              </p>
              <p className="text-amber-400 mt-6">— QS. Ar-Rum: 21</p>
            </motion.div>
          </section>

          {/* Countdown */}
          <section className="py-24 px-4 bg-gray-950">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <Sparkles className="h-8 w-8 mx-auto mb-4 text-amber-400" />
                <h2 className="text-3xl font-bold text-amber-400 mb-12">Counting Down</h2>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-16">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Mins" },
                    { value: countdown.seconds, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-900 border border-amber-400/20 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-amber-400">{item.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900 border border-amber-400/20 p-8 rounded-2xl">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white mb-4">Akad Nikah</h3>
                  <p className="text-gray-400">{weddingData.date}</p>
                  <p className="text-amber-400 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-900 border border-amber-400/20 p-8 rounded-2xl">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white mb-4">Resepsi</h3>
                  <p className="text-gray-400">{weddingData.date}</p>
                  <p className="text-amber-400 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900 border border-amber-400/20 p-8 rounded-2xl max-w-3xl mx-auto">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-amber-400" />
                <h3 className="text-xl font-semibold text-white mb-2">{weddingData.venue}</h3>
                <p className="text-gray-400 mb-6">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-amber-500 hover:bg-amber-600 text-gray-900">
                  <MapPin className="h-4 w-4 mr-2" />
                  Open Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-24 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-amber-400 text-center mb-12">Gallery</h2>
              <div className="relative">
                <motion.img key={activeGallery} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-96 object-cover rounded-2xl" />
                <button onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur rounded-full border border-amber-400/30">
                  <ChevronLeft className="h-6 w-6 text-amber-400" />
                </button>
                <button onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur rounded-full border border-amber-400/30">
                  <ChevronRight className="h-6 w-6 text-amber-400" />
                </button>
              </div>
            </div>
          </section>

          {/* Gift */}
          <section className="py-24 px-4 bg-gray-950">
            <div className="max-w-2xl mx-auto text-center">
              <Gift className="h-10 w-10 mx-auto mb-4 text-amber-400" />
              <h2 className="text-3xl font-bold text-amber-400 mb-4">Wedding Gift</h2>
              <p className="text-gray-400 mb-12">Your blessing is a gift to us.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gray-900 border border-amber-400/20 p-6 rounded-2xl">
                  <CreditCard className="h-8 w-8 mx-auto mb-4 text-amber-400" />
                  <h3 className="font-semibold text-white mb-4">Bank Transfer</h3>
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">{weddingData.bankAccount.bank}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-mono text-lg text-amber-400">{weddingData.bankAccount.number}</p>
                      <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-2 bg-amber-500 text-gray-900 rounded-lg">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">a.n. {weddingData.bankAccount.name}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-900 border border-amber-400/20 p-6 rounded-2xl">
                  <Gift className="h-8 w-8 mx-auto mb-4 text-amber-400" />
                  <h3 className="font-semibold text-white mb-4">Send Gift</h3>
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">{weddingData.giftAddress}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Countdown Timer */}
          <section className="py-24 px-4 bg-gray-950">
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-4 text-amber-400" />
              <h2 className="text-3xl font-bold text-amber-400 mb-8">Counting Down</h2>
              <CountdownTimer targetDate={new Date("2026-02-15")} />
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-24 px-4 bg-gray-900">
            <GuestBook />
          </section>

          {/* QR Code & Share */}
          <section className="py-24 px-4 bg-gray-950">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6">QR Code</h3>
                  <QRCodeGenerator url={window.location.href} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6">Share Invitation</h3>
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
          <footer className="py-16 text-center bg-gray-950 border-t border-gray-800">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-amber-400" />
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              {weddingData.groomName} & {weddingData.brideName}
            </p>
            <p className="text-gray-500 mt-2">15 . 02 . 2026</p>
          </footer>

          <div className="fixed bottom-4 right-4 z-40">
            <Button onClick={() => navigate("/register")} className="shadow-lg bg-amber-500 hover:bg-amber-600 text-gray-900">
              Use This Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDarkDemo;
