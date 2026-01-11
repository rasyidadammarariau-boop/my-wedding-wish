import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Heart, Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const initialMessages = [
  { id: "1", name: "Ahmad Rizki", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallah!", date: "11 Jan 2026", likes: 12 },
  { id: "2", name: "Siti Nurhaliza", message: "Happy wedding day! Wishing you a lifetime of love and happiness together 💕", date: "10 Jan 2026", likes: 8 },
  { id: "3", name: "Budi Santoso", message: "Maaf tidak bisa hadir, semoga bahagia selalu ya. Sukses untuk kalian berdua!", date: "10 Jan 2026", likes: 5 },
  { id: "4", name: "Eko Prasetyo", message: "Barakallah! Semoga Allah senantiasa memberkahi pernikahan kalian. Aamiin.", date: "9 Jan 2026", likes: 15 },
  { id: "5", name: "Dewi Lestari", message: "Congratulations! So happy for both of you. May your love grow stronger each day 🎉", date: "8 Jan 2026", likes: 10 },
  { id: "6", name: "Fitri Handayani", message: "Selamat ya! Semoga langgeng sampai kakek nenek. Best wishes!", date: "7 Jan 2026", likes: 7 },
];

const MessagesTab = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (id: string) => {
    setMessages(messages.map(m =>
      m.id === id ? { ...m, likes: m.likes + 1 } : m
    ));
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    toast.success("Pesan dihapus");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Ucapan & Doa</h2>
          <p className="text-muted-foreground text-sm">{messages.length} ucapan dari tamu undangan</p>
        </div>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ucapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages Grid */}
      {filteredMessages.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada ucapan dari tamu</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="shadow-card hover:shadow-lg transition-all h-full">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {message.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-foreground truncate">{message.name}</h3>
                        <span className="text-xs text-muted-foreground shrink-0">{message.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                        {message.message}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(message.id)}
                          className="text-primary hover:text-primary"
                        >
                          <Heart className="h-4 w-4 mr-1 fill-current" />
                          {message.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(message.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
