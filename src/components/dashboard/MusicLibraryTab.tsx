import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search, Music, Play, Pause, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getMusicLibrary, saveMusicLibrary, MusicTrack } from "@/stores/adminSettingsStore";

const MusicLibraryTab = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<MusicTrack | null>(null);
  const [formData, setFormData] = useState({ title: "", artist: "", url: "" });

  useEffect(() => {
    setTracks(getMusicLibrary());
  }, []);

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const updated = tracks.filter(t => t.id !== id);
    setTracks(updated);
    saveMusicLibrary(updated);
    toast.success("Lagu berhasil dihapus!");
  };

  const handleToggleStatus = (id: string) => {
    const updated = tracks.map(t =>
      t.id === id ? { ...t, status: t.status === "active" ? "inactive" as const : "active" as const } : t
    );
    setTracks(updated);
    saveMusicLibrary(updated);
    toast.success("Status lagu diubah!");
  };

  const handleSave = () => {
    if (!formData.title || !formData.artist || !formData.url) {
      toast.error("Semua field harus diisi!");
      return;
    }

    let updated: MusicTrack[];
    if (editingTrack) {
      updated = tracks.map(t =>
        t.id === editingTrack.id
          ? { ...t, title: formData.title, artist: formData.artist, url: formData.url }
          : t
      );
      toast.success("Lagu berhasil diperbarui!");
    } else {
      const newTrack: MusicTrack = {
        id: Date.now().toString(),
        title: formData.title,
        artist: formData.artist,
        url: formData.url,
        status: "active",
      };
      updated = [...tracks, newTrack];
      toast.success("Lagu baru berhasil ditambahkan!");
    }

    setTracks(updated);
    saveMusicLibrary(updated);
    setIsDialogOpen(false);
    setEditingTrack(null);
    setFormData({ title: "", artist: "", url: "" });
  };

  const openAddDialog = () => {
    setEditingTrack(null);
    setFormData({ title: "", artist: "", url: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (track: MusicTrack) => {
    setEditingTrack(track);
    setFormData({ title: track.title, artist: track.artist, url: track.url });
    setIsDialogOpen(true);
  };

  const activeCount = tracks.filter(t => t.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tracks.length}</p>
                <p className="text-sm text-muted-foreground">Total Lagu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Play className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Lagu Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Pause className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tracks.length - activeCount}</p>
                <p className="text-sm text-muted-foreground">Lagu Nonaktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari lagu atau artis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Lagu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTrack ? "Edit Lagu" : "Tambah Lagu Baru"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Judul Lagu</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Perfect"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="artist">Artis</Label>
                <Input
                  id="artist"
                  placeholder="Contoh: Ed Sheeran"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="url">URL Lagu</Label>
                <Input
                  id="url"
                  placeholder="Contoh: /music/perfect.mp3"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Masukkan path file musik atau URL streaming
                </p>
              </div>
              <Button variant="hero" className="w-full" onClick={handleSave}>
                {editingTrack ? "Simpan Perubahan" : "Tambah Lagu"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Music List */}
      <div className="space-y-3">
        {filteredTracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="shadow-card hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
                      <Badge variant={track.status === "active" ? "default" : "secondary"}>
                        {track.status === "active" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{track.url}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(track.url, "_blank")}
                      title="Preview"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(track)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleStatus(track.id)}
                      title={track.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                    >
                      {track.status === "active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(track.id)}
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredTracks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Tidak ada lagu ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicLibraryTab;
