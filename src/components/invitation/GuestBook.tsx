import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

interface GuestBookProps {
  invitationId?: string;
  className?: string;
}

const GuestBook = ({ invitationId = "demo", className = "" }: GuestBookProps) => {
  const storageKey = `guestbook-${invitationId}`;
  
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setMessages(parsed.map((m: any) => ({ ...m, createdAt: new Date(m.createdAt) })));
    } else {
      // Dummy messages for demo
      setMessages([
        {
          id: "1",
          name: "Ahmad & Fatimah",
          message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲",
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: "2", 
          name: "Keluarga Budi",
          message: "Barakallah untuk kedua mempelai. Semoga langgeng sampai Jannah! 💕",
          createdAt: new Date(Date.now() - 43200000),
        },
        {
          id: "3",
          name: "Siti Nurhaliza",
          message: "Happy wedding! Semoga selalu diberkahi Allah SWT. Maaf tidak bisa hadir, tapi doa selalu menyertai 🌸",
          createdAt: new Date(Date.now() - 3600000),
        },
      ]);
    }
  }, [storageKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error("Nama dan pesan harus diisi");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    
    setName("");
    setMessage("");
    setIsSubmitting(false);
    toast.success("Ucapan berhasil dikirim! 🎉");
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 7) return `${days} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
        <h3 className="text-2xl font-serif font-semibold">Buku Tamu</h3>
        <p className="text-muted-foreground">Kirimkan ucapan & doa untuk kedua mempelai</p>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </div>
            <div>
              <Textarea
                placeholder="Tulis ucapan & doa Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Mengirim..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Ucapan
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg) => (
          <Card key={msg.id} className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium truncate">{msg.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Belum ada ucapan. Jadilah yang pertama! 💌
        </p>
      )}
    </div>
  );
};

export default GuestBook;
