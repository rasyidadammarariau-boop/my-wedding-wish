import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Heart, Gift, MessageCircle } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface InvitationPreviewProps {
  data: InvitationData;
  miniView?: boolean;
}

const InvitationPreview = ({ data, miniView = false }: InvitationPreviewProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Tanggal Acara";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const scale = miniView ? 0.5 : 1;

  return (
    <div 
      className="bg-gradient-to-b from-rose-50 to-white min-h-full"
      style={{ 
        fontFamily: data.fontFamily,
        transform: miniView ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
        width: miniView ? "200%" : "100%",
      }}
    >
      {/* Opening Cover */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative"
        style={{ 
          background: `linear-gradient(135deg, ${data.primaryColor}15, ${data.secondaryColor}30)` 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-widest" style={{ color: data.primaryColor }}>
            Undangan Pernikahan
          </p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: data.primaryColor }}>
            {data.groomName} & {data.brideName}
          </h1>
          <p className="text-muted-foreground">{formatDate(data.akadDate)}</p>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-2">Kepada Yth.</p>
            <p className="text-lg font-medium">Bapak/Ibu/Saudara/i</p>
            <p className="text-xl font-bold" style={{ color: data.primaryColor }}>
              [Nama Tamu]
            </p>
          </div>

          <button
            className="mt-8 px-8 py-3 rounded-full text-white font-medium transition-transform hover:scale-105"
            style={{ backgroundColor: data.primaryColor }}
          >
            Buka Undangan
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div 
          className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20"
          style={{ backgroundColor: data.primaryColor }}
        />
        <div 
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: data.secondaryColor }}
        />
      </section>

      {/* Couple Section */}
      <section className="py-16 px-6 text-center">
        <p className="text-xl mb-2">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <p className="text-sm text-muted-foreground mb-8">
          Assalamualaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* Groom */}
          <div className="text-center">
            <div 
              className="w-32 h-32 mx-auto rounded-full border-4 overflow-hidden mb-4"
              style={{ borderColor: data.primaryColor }}
            >
              {data.groomPhoto ? (
                <img src={data.groomPhoto} alt={data.groomName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-1">{data.groomFullName || data.groomName}</h3>
            <p className="text-sm text-muted-foreground">{data.groomChildOrder}</p>
            <p className="text-sm">{data.groomParentFather}</p>
            <p className="text-sm">& {data.groomParentMother}</p>
          </div>

          <Heart className="h-8 w-8" style={{ color: data.primaryColor }} />

          {/* Bride */}
          <div className="text-center">
            <div 
              className="w-32 h-32 mx-auto rounded-full border-4 overflow-hidden mb-4"
              style={{ borderColor: data.primaryColor }}
            >
              {data.bridePhoto ? (
                <img src={data.bridePhoto} alt={data.brideName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-1">{data.brideFullName || data.brideName}</h3>
            <p className="text-sm text-muted-foreground">{data.brideChildOrder}</p>
            <p className="text-sm">{data.brideParentFather}</p>
            <p className="text-sm">& {data.brideParentMother}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section 
        className="py-16 px-6"
        style={{ backgroundColor: `${data.primaryColor}10` }}
      >
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: data.primaryColor }}>
          Waktu & Tempat
        </h2>

        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5" style={{ color: data.primaryColor }} />
              <h3 className="font-semibold">Akad Nikah</h3>
            </div>
            <p>{formatDate(data.akadDate)}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Pukul {data.akadTime || "00:00"} WIB</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5" style={{ color: data.primaryColor }} />
              <h3 className="font-semibold">Resepsi</h3>
            </div>
            <p>{formatDate(data.resepsiDate)}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Pukul {data.resepsiTime || "00:00"} WIB</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5" style={{ color: data.primaryColor }} />
              <h3 className="font-semibold">Lokasi</h3>
            </div>
            <p className="font-medium">{data.venue || "Nama Tempat"}</p>
            <p className="text-sm text-muted-foreground mt-1">{data.address || "Alamat lengkap"}</p>
            <button
              className="mt-3 text-sm font-medium"
              style={{ color: data.primaryColor }}
            >
              Lihat di Google Maps →
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {data.galleryImages.length > 0 && (
        <section className="py-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: data.primaryColor }}>
            Galeri
          </h2>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {data.galleryImages.slice(0, 6).map((img, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Love Gift */}
      <section 
        className="py-16 px-6"
        style={{ backgroundColor: `${data.secondaryColor}20` }}
      >
        <div className="max-w-md mx-auto text-center">
          <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: data.primaryColor }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: data.primaryColor }}>
            Love Gift
          </h2>
          <p className="text-muted-foreground mb-6">
            Doa restu Anda merupakan karunia terindah bagi kami
          </p>
          
          {data.bankName && (
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <p className="font-medium">{data.bankName}</p>
              <p className="text-lg font-mono">{data.bankAccount}</p>
              <p className="text-sm text-muted-foreground">a.n. {data.bankHolder}</p>
            </div>
          )}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <MessageCircle className="h-10 w-10 mx-auto mb-4" style={{ color: data.primaryColor }} />
          <h2 className="text-2xl font-bold mb-6" style={{ color: data.primaryColor }}>
            Ucapan & Doa
          </h2>
          <div className="bg-muted/50 p-6 rounded-xl">
            <p className="text-muted-foreground">
              Form ucapan dan konfirmasi kehadiran akan muncul di sini
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-white"
        style={{ backgroundColor: data.primaryColor }}
      >
        <p className="text-lg font-medium mb-2">
          {data.groomName} & {data.brideName}
        </p>
        <p className="text-sm opacity-80">{formatDate(data.akadDate)}</p>
        <p className="text-xs mt-4 opacity-60">
          Made with ❤️ by WeddingKu
        </p>
      </footer>
    </div>
  );
};

export default InvitationPreview;
