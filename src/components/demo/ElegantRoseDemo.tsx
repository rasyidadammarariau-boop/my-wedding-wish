import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Calendar, MapPin, Heart, Clock, ChevronDown, Gift,
  CreditCard, Copy, Check, Send, Music, VolumeX, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { weddingData, galleryImages } from "./shared/WeddingData";
import { useWeddingTemplate } from "./shared/useWeddingTemplate";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import QRCodeGenerator from "@/components/invitation/QRCodeGenerator";
import ShareButtons from "@/components/invitation/ShareButtons";
import GuestBook from "@/components/invitation/GuestBook";

const ElegantRoseDemo = () => {
  const navigate = useNavigate();
  const {
    isOpen, setIsOpen, isMuted, setIsMuted, copied, activeGallery, setActiveGallery,
    countdown, comments, newComment, setNewComment, copyToClipboard, handleSubmitComment,
  } = useWeddingTemplate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 text-gray-800">
      {/* Opening Cover - Rose Petals Theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #f48fb1 100%)",
            }}
          >
            {/* Floating Rose Petals */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-400 text-2xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -50,
                  rotate: 0,
                  opacity: 0.7 
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{ 
                  duration: 8 + Math.random() * 4, 
                  repeat: Infinity,
                  delay: Math.random() * 5 
                }}
              >
                🌹
              </motion.div>
            ))}
            
            <div className="text-center relative z-10 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-rose-300 bg-white/50 backdrop-blur flex items-center justify-center"
              >
                <span className="text-5xl">💐</span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-rose-600 uppercase tracking-[0.3em] text-sm mb-4"
              >
                The Wedding Of
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="font-serif text-6xl md:text-8xl text-rose-800 mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.groomName}
              </motion.h1>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="my-4"
              >
                <Heart className="h-10 w-10 mx-auto text-rose-500 fill-rose-500" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="font-serif text-6xl md:text-8xl text-rose-800 mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {weddingData.brideName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-rose-600 mb-8"
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
                  className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-6 text-lg rounded-full shadow-xl"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Buka Undangan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => navigate("/templates")} className="shadow-lg bg-white/80 backdrop-blur">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
      <div className="fixed top-4 right-4 z-40">
        <Button variant="secondary" size="icon" onClick={() => setIsMuted(!isMuted)} className="shadow-lg bg-white/80 backdrop-blur">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Content */}
      {isOpen && (
        <div className="relative">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-100/80 to-pink-50/80 backdrop-blur-sm" />
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
                alt="Wedding"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            
            {/* Decorative Corners */}
            <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-rose-300 rounded-tl-3xl" />
            <div className="absolute top-8 right-8 w-32 h-32 border-r-4 border-t-4 border-rose-300 rounded-tr-3xl" />
            <div className="absolute bottom-8 left-8 w-32 h-32 border-l-4 border-b-4 border-rose-300 rounded-bl-3xl" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-rose-300 rounded-br-3xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center p-8"
            >
              <p className="text-rose-500 uppercase tracking-[0.3em] text-sm mb-6">We Are Getting Married</p>
              <h1 className="font-serif text-5xl md:text-7xl text-rose-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-px w-20 bg-rose-300" />
                <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
                <div className="h-px w-20 bg-rose-300" />
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-rose-800" style={{ fontFamily: "Playfair Display, serif" }}>
                {weddingData.brideName}
              </h1>
              <p className="mt-8 text-rose-600">{weddingData.date}</p>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-16"
              >
                <ChevronDown className="h-8 w-8 mx-auto text-rose-400" />
              </motion.div>
            </motion.div>
          </section>

          {/* Bismillah */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-3xl mb-4" style={{ fontFamily: "serif" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <p className="text-rose-600 text-lg mb-6">Assalamualaikum Warahmatullahi Wabarakatuh</p>
                <p className="text-gray-600 leading-relaxed">
                  Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
                </p>
              </motion.div>
            </div>
          </section>

          {/* Couple Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Groom */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-rose-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Groom" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl">
                    🤵
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-rose-800">{weddingData.groomFullName}</h3>
                <p className="text-rose-500 text-sm mt-2">{weddingData.groomChild}</p>
                <p className="text-gray-500 text-sm mt-1">{weddingData.groomParents.father}<br/>& {weddingData.groomParents.mother}</p>
              </motion.div>

              {/* Bride */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-rose-200 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Bride" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl">
                    👰
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-rose-800">{weddingData.brideFullName}</h3>
                <p className="text-rose-500 text-sm mt-2">{weddingData.brideChild}</p>
                <p className="text-gray-500 text-sm mt-1">{weddingData.brideParents.father}<br/>& {weddingData.brideParents.mother}</p>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 px-4 bg-white">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <div className="text-rose-300 text-6xl mb-4">"</div>
              <p className="text-xl italic text-gray-700 mb-4">
                Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram kepadanya.
              </p>
              <p className="text-rose-600">— QS. Ar-Rum: 21</p>
            </motion.div>
          </section>

          {/* Countdown */}
          <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-3xl text-rose-800 mb-8">Menuju Hari Bahagia</h2>
                <CountdownTimer 
                  targetDate={new Date("2026-02-15")} 
                  className="mb-12"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-rose-500" />
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">Akad Nikah</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-rose-600 font-semibold mt-2">{weddingData.akadTime}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-rose-500" />
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">Resepsi</h3>
                  <p className="text-gray-600">{weddingData.date}</p>
                  <p className="text-rose-600 font-semibold mt-2">{weddingData.resepsiTime}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-rose-500" />
                <h3 className="text-xl font-semibold text-rose-800 mb-2">{weddingData.venue}</h3>
                <p className="text-gray-600 mb-4">{weddingData.address}</p>
                <Button onClick={() => window.open(weddingData.mapsUrl, "_blank")} className="bg-rose-500 hover:bg-rose-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka Google Maps
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-rose-800 text-center mb-12">
                Galeri Foto
              </motion.h2>
              <div className="relative">
                <motion.img key={activeGallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={galleryImages[activeGallery]} alt="Gallery" className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl" />
                <button onClick={() => setActiveGallery((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
                  <ChevronLeft className="h-6 w-6 text-rose-600" />
                </button>
                <button onClick={() => setActiveGallery((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
                  <ChevronRight className="h-6 w-6 text-rose-600" />
                </button>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                {galleryImages.map((img, index) => (
                  <button key={index} onClick={() => setActiveGallery(index)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeGallery === index ? "border-rose-500 scale-110" : "border-transparent opacity-60"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Love Gift */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Gift className="h-12 w-12 mx-auto mb-4 text-rose-500" />
                <h2 className="font-serif text-3xl text-rose-800 mb-4">Love Gift</h2>
                <p className="text-gray-600 mb-8">Doa restu Anda merupakan karunia yang sangat berarti bagi kami.</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100">
                  <CreditCard className="h-8 w-8 mb-4 text-rose-500 mx-auto" />
                  <h3 className="font-semibold text-rose-800 mb-4">Transfer Bank</h3>
                  <div className="bg-rose-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">{weddingData.bankAccount.bank}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-mono text-lg font-bold text-rose-800">{weddingData.bankAccount.number}</p>
                      <button onClick={() => copyToClipboard(weddingData.bankAccount.number)} className="p-2 bg-rose-500 text-white rounded-lg">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">a.n. {weddingData.bankAccount.name}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100">
                  <Gift className="h-8 w-8 mb-4 text-rose-500 mx-auto" />
                  <h3 className="font-semibold text-rose-800 mb-4">Kirim Kado</h3>
                  <div className="bg-rose-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">{weddingData.giftAddress}</p>
                    <button onClick={() => copyToClipboard(weddingData.giftAddress)} className="mt-4 w-full py-2 bg-rose-500 text-white rounded-lg text-sm">
                      Salin Alamat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Share & QR Code */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-serif text-3xl text-rose-800 mb-4">Bagikan Undangan</h2>
                <p className="text-gray-600">Kirim undangan ini kepada keluarga dan teman-teman</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-rose-50 p-8 rounded-2xl border border-rose-100">
                  <QRCodeGenerator 
                    url={window.location.href}
                    size={180}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-rose-800 text-center md:text-left">Kirim via</h3>
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
          <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <GuestBook invitationId="elegant-rose-demo" />
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 text-center bg-rose-50 border-t border-rose-100">
            <Heart className="h-8 w-8 mx-auto mb-4 text-rose-500 fill-rose-500" />
            <p className="font-serif text-2xl text-rose-800">{weddingData.groomName} & {weddingData.brideName}</p>
            <p className="text-rose-500 mt-2">15 . 02 . 2026</p>
          </footer>

          {/* CTA */}
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

export default ElegantRoseDemo;
