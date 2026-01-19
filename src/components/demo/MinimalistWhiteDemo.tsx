import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Send, Music, VolumeX, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";

const MinimalistWhiteDemo = () => {
  const navigate = useNavigate();
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
    weddingData, hasFeature,
  } = useWeddingTemplate("minimalist-white");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Opening Cover - Clean Minimal */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <div className="text-center p-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-px w-32 bg-gray-900 mx-auto mb-12"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-8"
              >
                Wedding Invitation
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-5xl md:text-7xl font-light tracking-wider mb-4"
              >
                {weddingData.groomName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-2xl text-gray-300 my-4"
              >
                &
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-5xl md:text-7xl font-light tracking-wider mb-12"
              >
                {weddingData.brideName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-sm tracking-widest text-gray-500 mb-12"
              >
                15 / 02 / 2026
              </motion.p>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="h-px w-32 bg-gray-900 mx-auto mb-12"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="outline"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-6 rounded-none tracking-widest text-sm"
                >
                  OPEN
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40">
        <Button variant="ghost" size="sm" onClick={() => navigate("/templates")} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="fixed top-4 right-4 z-40">
        <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-gray-600 hover:text-gray-900">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="relative">
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-center px-8">
              <p className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-8">The Wedding Of</p>
              <h1 className="text-6xl md:text-8xl font-extralight tracking-wider">{weddingData.groomName}</h1>
              <p className="text-3xl text-gray-300 my-6">&</p>
              <h1 className="text-6xl md:text-8xl font-extralight tracking-wider">{weddingData.brideName}</h1>
              <div className="h-px w-24 bg-gray-200 mx-auto my-12" />
              <p className="text-sm tracking-[0.3em] text-gray-400">{weddingData.date}</p>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-20">
                <ChevronDown className="h-6 w-6 mx-auto text-gray-300" />
              </motion.div>
            </motion.div>
          </section>

          {/* Salam */}
          <section className="py-32 px-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
              <p className="text-2xl font-light text-gray-300 mb-8">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
              </p>
            </motion.div>
          </section>

          {/* Couple */}
          <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-light tracking-wide">{weddingData.groomFullName}</h3>
                <p className="text-xs tracking-widest text-gray-400 mt-2 uppercase">{weddingData.groomChild}</p>
                <div className="h-px w-12 bg-gray-200 mx-auto my-4" />
                <p className="text-sm text-gray-500">{weddingData.groomParents.father}</p>
                <p className="text-sm text-gray-500">& {weddingData.groomParents.mother}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
                <div className="text-8xl text-gray-200 font-extralight">&</div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-light tracking-wide">{weddingData.brideFullName}</h3>
                <p className="text-xs tracking-widest text-gray-400 mt-2 uppercase">{weddingData.brideChild}</p>
                <div className="h-px w-12 bg-gray-200 mx-auto my-4" />
                <p className="text-sm text-gray-500">{weddingData.brideParents.father}</p>
                <p className="text-sm text-gray-500">& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-32 px-4 bg-gray-50">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
              <p className="text-xl font-light italic text-gray-500 leading-relaxed">
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri."
              </p>
              <p className="text-xs tracking-widest text-gray-400 mt-8">QS. AR-RUM : 21</p>
            </motion.div>
          </section>

          {/* Countdown & Event */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <p className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-12">Counting Down</p>
                <CountdownTimer 
                  targetDate={new Date("2026-02-15")} 
                  className="mb-20"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-gray-100 p-12">
                  <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Akad Nikah</p>
                  <p className="text-xl font-light">{weddingData.akadTime}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-gray-100 p-12">
                  <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Resepsi</p>
                  <p className="text-xl font-light">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 border border-gray-100 p-12 max-w-3xl mx-auto">
                <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Location</p>
                <h3 className="text-xl font-light mb-2">{weddingData.venue}</h3>
                <p className="text-gray-500 text-sm mb-6">{weddingData.address}</p>
                <Button variant="outline" onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="rounded-none border-gray-900">
                  <MapPin className="h-4 w-4 mr-2" />
                  Open Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs tracking-[0.5em] uppercase text-gray-400 text-center mb-12">Gallery</p>
              <div className="relative">
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <button onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </section>

          {/* Gift */}
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-8">Wedding Gift</p>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-gray-100 p-8">
                  <CreditCard className="h-6 w-6 mx-auto mb-4 text-gray-400" />
                  <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">{weddingData.bankAccount.bank}</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="font-mono">{weddingData.bankAccount.number}</p>
                    <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-1 hover:bg-gray-100">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">a.n. {weddingData.bankAccount.name}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-gray-100 p-8">
                  <Gift className="h-6 w-6 mx-auto mb-4 text-gray-400" />
                  <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Send Gift</p>
                  <p className="text-sm text-gray-600">{weddingData.giftAddress}</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Share & QR */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs tracking-[0.5em] uppercase text-gray-400 text-center mb-12">Share Invitation</p>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-gray-100 p-8 flex justify-center">
                  <QRCodeGenerator url={window.location.href} size={150} />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
                  <p className="text-xs tracking-widest text-gray-400 text-center uppercase">Send Via</p>
                  <ShareButtons 
                    url={window.location.href}
                    coupleName={`${weddingData.groomName} & ${weddingData.brideName}`}
                    weddingDate={weddingData.date}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Guest Book */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <GuestBook invitationId="minimalist-white-demo" />
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 text-center border-t border-gray-100">
            <p className="text-3xl font-extralight tracking-wider">{weddingData.groomName} & {weddingData.brideName}</p>
            <p className="text-xs tracking-widest text-gray-400 mt-4">15 / 02 / 2026</p>
          </footer>

          <div className="fixed bottom-4 right-4 z-40">
            <Button onClick={() => navigate("/register")} className="shadow-lg rounded-none bg-gray-900 hover:bg-gray-800">
              Use This Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistWhiteDemo;
