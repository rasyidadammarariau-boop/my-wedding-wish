import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  guestName?: string;
  coupleName: string;
  weddingDate: string;
  className?: string;
}

const ShareButtons = ({ 
  url, 
  guestName = "Bapak/Ibu/Saudara/i", 
  coupleName, 
  weddingDate,
  className = "" 
}: ShareButtonsProps) => {
  
  const message = `Bismillahirrahmanirrahim

Assalamu'alaikum Wr. Wb.

Kepada Yth.
${guestName}

Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 ${coupleName}
📅 ${weddingDate}

Untuk informasi lebih lanjut, silakan klik link berikut:
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Wassalamu'alaikum Wr. Wb.`;

  const shareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareEmail = () => {
    const subject = `Undangan Pernikahan ${coupleName}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
    } catch (err) {
      toast.error("Gagal menyalin link");
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Undangan Pernikahan ${coupleName}`,
          text: `Anda diundang ke pernikahan ${coupleName}`,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      <Button 
        onClick={shareWhatsApp} 
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
      
      <Button 
        onClick={shareEmail} 
        variant="outline"
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      
      <Button 
        onClick={copyLink} 
        variant="outline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Salin Link
      </Button>
      
      <Button 
        onClick={shareNative} 
        variant="secondary"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Bagikan
      </Button>
    </div>
  );
};

export default ShareButtons;
