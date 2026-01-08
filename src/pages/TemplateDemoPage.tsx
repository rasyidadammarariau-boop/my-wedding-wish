import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Heart, Users, Clock } from "lucide-react";

const TemplateDemoPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Demo wedding data
  const weddingData = {
    groomName: "John Smith",
    brideName: "Jane Doe",
    date: "Sabtu, 15 Februari 2026",
    time: "10:00 WIB",
    venue: "Hotel Grand Ballroom",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    story: "Kami bertemu di sebuah konferensi teknologi dan jatuh cinta pada pandangan pertama. Setelah 3 tahun bersama, kami siap untuk memulai perjalanan baru sebagai pasangan.",
  };

  const getTemplateStyle = () => {
    switch (templateId) {
      case "elegant-rose":
        return "bg-gradient-to-b from-rose-light via-background to-rose-light";
      case "minimalist-white":
        return "bg-white";
      case "rustic-garden":
        return "bg-gradient-to-b from-green-50 via-background to-green-50";
      case "modern-dark":
        return "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white";
      case "floral-dream":
        return "bg-gradient-to-b from-pink-50 via-background to-pink-50";
      case "classic-gold":
        return "bg-gradient-to-b from-amber-50 via-background to-amber-50";
      default:
        return "bg-gradient-hero";
    }
  };

  const isDark = templateId === "modern-dark";

  return (
    <div className={`min-h-screen ${getTemplateStyle()}`}>
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant={isDark ? "outline" : "secondary"}
          size="sm"
          onClick={() => navigate("/templates")}
          className={isDark ? "border-white/20 text-white hover:bg-white/10" : ""}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className={`text-sm uppercase tracking-widest mb-4 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
            The Wedding Of
          </p>
          <h1 className={`font-display text-5xl md:text-7xl font-bold mb-4 ${isDark ? "text-white" : "text-foreground"}`}>
            {weddingData.groomName}
            <span className={`block text-3xl md:text-4xl my-4 ${isDark ? "text-gray-400" : "text-primary"}`}>&</span>
            {weddingData.brideName}
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
            {weddingData.date}
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12"
          >
            <Heart className={`h-8 w-8 mx-auto animate-float ${isDark ? "text-rose-400" : "text-primary"} fill-current`} />
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-display text-3xl font-semibold mb-6 ${isDark ? "text-white" : "text-foreground"}`}>
              Cerita Kami
            </h2>
            <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              {weddingData.story}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-white" : "text-foreground"}`}>
              Detail Acara
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl text-center ${isDark ? "bg-white/5" : "bg-card shadow-card"}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? "bg-rose-500/20" : "bg-primary/10"}`}>
                <Calendar className={`h-8 w-8 ${isDark ? "text-rose-400" : "text-primary"}`} />
              </div>
              <h3 className={`font-display text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-foreground"}`}>
                Akad Nikah
              </h3>
              <p className={isDark ? "text-gray-300" : "text-muted-foreground"}>{weddingData.date}</p>
              <p className={isDark ? "text-gray-300" : "text-muted-foreground"}>{weddingData.time}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl text-center ${isDark ? "bg-white/5" : "bg-card shadow-card"}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? "bg-rose-500/20" : "bg-primary/10"}`}>
                <MapPin className={`h-8 w-8 ${isDark ? "text-rose-400" : "text-primary"}`} />
              </div>
              <h3 className={`font-display text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-foreground"}`}>
                Lokasi
              </h3>
              <p className={isDark ? "text-gray-300" : "text-muted-foreground"}>{weddingData.venue}</p>
              <p className={isDark ? "text-gray-400" : "text-muted-foreground/80"} style={{ fontSize: "0.875rem" }}>{weddingData.address}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className={`h-12 w-12 mx-auto mb-4 ${isDark ? "text-rose-400" : "text-primary"}`} />
            <h2 className={`font-display text-3xl font-semibold mb-4 ${isDark ? "text-white" : "text-foreground"}`}>
              Konfirmasi Kehadiran
            </h2>
            <p className={`mb-8 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Mohon konfirmasi kehadiran Anda sebelum 1 Februari 2026
            </p>
            <Button variant={isDark ? "outline" : "hero"} size="lg" className={isDark ? "border-rose-400 text-rose-400 hover:bg-rose-400/10" : ""}>
              Konfirmasi Kehadiran
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 text-center ${isDark ? "border-t border-white/10" : "border-t border-border"}`}>
        <p className={`font-display text-2xl ${isDark ? "text-white" : "text-foreground"}`}>
          {weddingData.groomName} & {weddingData.brideName}
        </p>
        <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
          15 . 02 . 2026
        </p>
      </footer>

      {/* CTA to use this template */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="hero" onClick={() => navigate("/register")}>
          Gunakan Template Ini
        </Button>
      </div>
    </div>
  );
};

export default TemplateDemoPage;
