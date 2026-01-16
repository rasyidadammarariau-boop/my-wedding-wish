import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Users, Calendar, MapPin, CreditCard, Heart, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getDefaultContent, saveDefaultContent, DefaultContent } from "@/stores/adminSettingsStore";

const DefaultContentTab = () => {
  const [content, setContent] = useState<DefaultContent>(getDefaultContent());
  const [activeTab, setActiveTab] = useState("couple");

  useEffect(() => {
    setContent(getDefaultContent());
  }, []);

  const handleSave = () => {
    saveDefaultContent(content);
    toast.success("Konten default berhasil disimpan!");
  };

  const updateGroomParent = (key: "father" | "mother", value: string) => {
    setContent({
      ...content,
      groomParents: { ...content.groomParents, [key]: value },
    });
  };

  const updateBrideParent = (key: "father" | "mother", value: string) => {
    setContent({
      ...content,
      brideParents: { ...content.brideParents, [key]: value },
    });
  };

  const updateBankAccount = (key: "bank" | "number" | "name", value: string) => {
    setContent({
      ...content,
      bankAccount: { ...content.bankAccount, [key]: value },
    });
  };

  const updateLoveStory = (index: number, key: "title" | "date" | "content", value: string) => {
    const updated = [...content.loveStory];
    updated[index] = { ...updated[index], [key]: value };
    setContent({ ...content, loveStory: updated });
  };

  const addLoveStoryItem = () => {
    setContent({
      ...content,
      loveStory: [
        ...content.loveStory,
        { title: "", date: "", content: "" },
      ],
    });
  };

  const removeLoveStoryItem = (index: number) => {
    const updated = content.loveStory.filter((_, i) => i !== index);
    setContent({ ...content, loveStory: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Konten Default Template</h2>
          <p className="text-sm text-muted-foreground">
            Atur konten contoh yang akan ditampilkan di preview template
          </p>
        </div>
        <Button variant="hero" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Simpan Semua
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="couple" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Mempelai</span>
          </TabsTrigger>
          <TabsTrigger value="event" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Acara</span>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Lokasi</span>
          </TabsTrigger>
          <TabsTrigger value="gift" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Hadiah</span>
          </TabsTrigger>
          <TabsTrigger value="story" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Love Story</span>
          </TabsTrigger>
        </TabsList>

        {/* Couple Tab */}
        <TabsContent value="couple" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mempelai Pria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Nama Panggilan</Label>
                    <Input
                      value={content.groomName}
                      onChange={(e) => setContent({ ...content, groomName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Nama Lengkap</Label>
                    <Input
                      value={content.groomFullName}
                      onChange={(e) => setContent({ ...content, groomFullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Nama Ayah</Label>
                    <Input
                      value={content.groomParents.father}
                      onChange={(e) => updateGroomParent("father", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Nama Ibu</Label>
                    <Input
                      value={content.groomParents.mother}
                      onChange={(e) => updateGroomParent("mother", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Anak Ke</Label>
                    <Input
                      value={content.groomChild}
                      onChange={(e) => setContent({ ...content, groomChild: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mempelai Wanita</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Nama Panggilan</Label>
                    <Input
                      value={content.brideName}
                      onChange={(e) => setContent({ ...content, brideName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Nama Lengkap</Label>
                    <Input
                      value={content.brideFullName}
                      onChange={(e) => setContent({ ...content, brideFullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Nama Ayah</Label>
                    <Input
                      value={content.brideParents.father}
                      onChange={(e) => updateBrideParent("father", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Nama Ibu</Label>
                    <Input
                      value={content.brideParents.mother}
                      onChange={(e) => updateBrideParent("mother", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Anak Ke</Label>
                    <Input
                      value={content.brideChild}
                      onChange={(e) => setContent({ ...content, brideChild: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Event Tab */}
        <TabsContent value="event" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detail Acara</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tanggal Pernikahan</Label>
                    <Input
                      value={content.date}
                      onChange={(e) => setContent({ ...content, date: e.target.value })}
                      placeholder="Sabtu, 15 Februari 2026"
                    />
                  </div>
                  <div>
                    <Label>Waktu Akad</Label>
                    <Input
                      value={content.akadTime}
                      onChange={(e) => setContent({ ...content, akadTime: e.target.value })}
                      placeholder="08:00 WIB"
                    />
                  </div>
                  <div>
                    <Label>Waktu Resepsi</Label>
                    <Input
                      value={content.resepsiTime}
                      onChange={(e) => setContent({ ...content, resepsiTime: e.target.value })}
                      placeholder="11:00 WIB"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lokasi Acara</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nama Venue</Label>
                  <Input
                    value={content.venue}
                    onChange={(e) => setContent({ ...content, venue: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Alamat Lengkap</Label>
                  <Textarea
                    value={content.address}
                    onChange={(e) => setContent({ ...content, address: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Link Google Maps</Label>
                  <Input
                    value={content.mapsUrl}
                    onChange={(e) => setContent({ ...content, mapsUrl: e.target.value })}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Gift Tab */}
        <TabsContent value="gift" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Love Gift / Amplop Digital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nama Bank</Label>
                  <Input
                    value={content.bankAccount.bank}
                    onChange={(e) => updateBankAccount("bank", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Nomor Rekening</Label>
                  <Input
                    value={content.bankAccount.number}
                    onChange={(e) => updateBankAccount("number", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Atas Nama</Label>
                  <Input
                    value={content.bankAccount.name}
                    onChange={(e) => updateBankAccount("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Alamat Pengiriman Hadiah</Label>
                  <Textarea
                    value={content.giftAddress}
                    onChange={(e) => setContent({ ...content, giftAddress: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Love Story Tab */}
        <TabsContent value="story" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Timeline Love Story</h3>
              <Button variant="outline" onClick={addLoveStoryItem}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Item
              </Button>
            </div>

            {content.loveStory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm text-muted-foreground">Item #{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeLoveStoryItem(index)}
                        disabled={content.loveStory.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Judul</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateLoveStory(index, "title", e.target.value)}
                          placeholder="💼 Awal Pertemuan"
                        />
                      </div>
                      <div>
                        <Label>Tanggal</Label>
                        <Input
                          value={item.date}
                          onChange={(e) => updateLoveStory(index, "date", e.target.value)}
                          placeholder="Januari 2024"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Label>Cerita</Label>
                        <Textarea
                          value={item.content}
                          onChange={(e) => updateLoveStory(index, "content", e.target.value)}
                          placeholder="Ceritakan momen ini..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end pt-4 border-t">
        <Button variant="hero" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Simpan Semua Perubahan
        </Button>
      </div>
    </div>
  );
};

export default DefaultContentTab;
