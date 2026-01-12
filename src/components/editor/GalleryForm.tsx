import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Image, GripVertical } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface GalleryFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const dummyImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=400&fit=crop",
];

const GalleryForm = ({ data, updateData }: GalleryFormProps) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const addImage = (url: string) => {
    if (url && !data.galleryImages.includes(url)) {
      updateData({ galleryImages: [...data.galleryImages, url] });
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    const newImages = data.galleryImages.filter((_, i) => i !== index);
    updateData({ galleryImages: newImages });
  };

  const addDummyImages = () => {
    updateData({ galleryImages: [...data.galleryImages, ...dummyImages] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Image className="h-4 w-4 text-primary" />
            Foto Galeri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Masukkan URL gambar atau upload..."
              className="flex-1"
            />
            <Button onClick={() => addImage(newImageUrl)} disabled={!newImageUrl}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addDummyImages}>
              <Image className="mr-2 h-4 w-4" />
              Tambah Foto Contoh
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Tip: Untuk hasil terbaik, gunakan foto dengan rasio 1:1 atau 4:3
          </p>

          {/* Gallery Grid */}
          {data.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-lg overflow-hidden border bg-muted"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <div className="cursor-grab">
                      <GripVertical className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
              <Image className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Belum ada foto di galeri
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Tambahkan foto prewedding atau foto kenangan Anda
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Love Story Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            💕 Kisah Cinta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.loveStory.map((story, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Kisah {index + 1}</Label>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={() => {
                    const newStory = data.loveStory.filter((_, i) => i !== index);
                    updateData({ loveStory: newStory });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={story.title}
                  onChange={(e) => {
                    const newStory = [...data.loveStory];
                    newStory[index] = { ...newStory[index], title: e.target.value };
                    updateData({ loveStory: newStory });
                  }}
                  placeholder="Judul kisah"
                />
                <Input
                  value={story.date}
                  onChange={(e) => {
                    const newStory = [...data.loveStory];
                    newStory[index] = { ...newStory[index], date: e.target.value };
                    updateData({ loveStory: newStory });
                  }}
                  placeholder="Waktu (mis: Januari 2024)"
                />
              </div>
              <Input
                value={story.description}
                onChange={(e) => {
                  const newStory = [...data.loveStory];
                  newStory[index] = { ...newStory[index], description: e.target.value };
                  updateData({ loveStory: newStory });
                }}
                placeholder="Deskripsi kisah..."
              />
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              updateData({
                loveStory: [...data.loveStory, { title: "", date: "", description: "" }],
              });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kisah
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryForm;
