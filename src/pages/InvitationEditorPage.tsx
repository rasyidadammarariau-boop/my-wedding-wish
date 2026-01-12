import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Save, Eye, Users, Calendar, MapPin, 
  Image, Music, Palette, Link2, Heart
} from "lucide-react";
import CoupleInfoForm from "@/components/editor/CoupleInfoForm";
import EventDetailsForm from "@/components/editor/EventDetailsForm";
import GalleryForm from "@/components/editor/GalleryForm";
import MusicForm from "@/components/editor/MusicForm";
import GuestLinksForm from "@/components/editor/GuestLinksForm";
import TemplateCustomizationForm from "@/components/editor/TemplateCustomizationForm";
import InvitationPreview from "@/components/editor/InvitationPreview";
import { toast } from "@/hooks/use-toast";

export interface InvitationData {
  // Couple Info
  groomName: string;
  groomFullName: string;
  groomParentFather: string;
  groomParentMother: string;
  groomChildOrder: string;
  groomPhoto: string;
  brideName: string;
  brideFullName: string;
  brideParentFather: string;
  brideParentMother: string;
  brideChildOrder: string;
  bridePhoto: string;
  // Event Details
  akadDate: string;
  akadTime: string;
  resepsiDate: string;
  resepsiTime: string;
  venue: string;
  address: string;
  mapsUrl: string;
  dressCode: string;
  // Gallery
  galleryImages: string[];
  // Music
  musicUrl: string;
  musicTitle: string;
  // Template
  templateId: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  // Guest Links
  guestLinks: { id: string; name: string; slug: string; hasOpened: boolean }[];
  // Love Story
  loveStory: { title: string; date: string; description: string }[];
  // Gift
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  giftAddress: string;
  giftPhone: string;
}

const defaultInvitationData: InvitationData = {
  groomName: "Wahyu",
  groomFullName: "Wahyu Prasetyo",
  groomParentFather: "Bapak Sudarmo",
  groomParentMother: "Ibu Siti Aminah",
  groomChildOrder: "Putra pertama",
  groomPhoto: "",
  brideName: "Riski",
  brideFullName: "Riski Amelia",
  brideParentFather: "Bapak Ahmad",
  brideParentMother: "Ibu Fatimah",
  brideChildOrder: "Putri kedua",
  bridePhoto: "",
  akadDate: "2026-02-15",
  akadTime: "08:00",
  resepsiDate: "2026-02-15",
  resepsiTime: "11:00",
  venue: "Gedung Serbaguna Mawar",
  address: "Jl. Bunga Mawar No. 123, Jakarta Selatan",
  mapsUrl: "https://maps.google.com/?q=-6.2088,106.8456",
  dressCode: "Formal - Batik",
  galleryImages: [],
  musicUrl: "",
  musicTitle: "Beautiful In White",
  templateId: "elegant-rose",
  primaryColor: "#be123c",
  secondaryColor: "#fda4af",
  fontFamily: "Playfair Display",
  guestLinks: [
    { id: "1", name: "Budi Santoso", slug: "budi-santoso", hasOpened: false },
    { id: "2", name: "Ani Wijaya", slug: "ani-wijaya", hasOpened: true },
  ],
  loveStory: [
    { title: "Pertama Bertemu", date: "Januari 2024", description: "Kami bertemu di sebuah acara kantor..." },
    { title: "Mulai Dekat", date: "Maret 2024", description: "Kami mulai sering berkomunikasi..." },
    { title: "Lamaran", date: "Desember 2025", description: "Wahyu melamar Riski di hadapan keluarga..." },
  ],
  bankName: "Bank Central Asia",
  bankAccount: "1234567890",
  bankHolder: "Riski Amelia",
  giftAddress: "Jl. Bunga Mawar No. 123, Jakarta Selatan",
  giftPhone: "081234567890",
};

const InvitationEditorPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("couple");
  const [invitationData, setInvitationData] = useState<InvitationData>(defaultInvitationData);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateData = (updates: Partial<InvitationData>) => {
    setInvitationData(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Berhasil Disimpan!",
      description: "Data undangan Anda telah tersimpan.",
    });
  };

  const tabs = [
    { id: "couple", label: "Mempelai", icon: Users },
    { id: "event", label: "Acara", icon: Calendar },
    { id: "gallery", label: "Galeri", icon: Image },
    { id: "music", label: "Musik", icon: Music },
    { id: "guests", label: "Tamu", icon: Link2 },
    { id: "template", label: "Kustomisasi", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Editor Undangan</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Editor Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Pengaturan Undangan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5">
                        <tab.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="couple">
                    <CoupleInfoForm data={invitationData} updateData={updateData} />
                  </TabsContent>

                  <TabsContent value="event">
                    <EventDetailsForm data={invitationData} updateData={updateData} />
                  </TabsContent>

                  <TabsContent value="gallery">
                    <GalleryForm data={invitationData} updateData={updateData} />
                  </TabsContent>

                  <TabsContent value="music">
                    <MusicForm data={invitationData} updateData={updateData} />
                  </TabsContent>

                  <TabsContent value="guests">
                    <GuestLinksForm data={invitationData} updateData={updateData} />
                  </TabsContent>

                  <TabsContent value="template">
                    <TemplateCustomizationForm data={invitationData} updateData={updateData} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="hidden lg:block">
            <Card className="sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="aspect-[9/16] overflow-hidden rounded-lg border bg-muted">
                  <InvitationPreview data={invitationData} miniView />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md h-[90vh] bg-background rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full overflow-y-auto">
              <InvitationPreview data={invitationData} />
            </div>
            <Button 
              className="absolute top-4 right-4" 
              variant="secondary"
              onClick={() => setShowPreview(false)}
            >
              Tutup
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InvitationEditorPage;
