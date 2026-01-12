import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Music, Play, Pause, Upload, Volume2 } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface MusicFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const popularSongs = [
  { title: "Beautiful In White - Shane Filan", url: "/music/beautiful-in-white.mp3" },
  { title: "Perfect - Ed Sheeran", url: "/music/perfect.mp3" },
  { title: "A Thousand Years - Christina Perri", url: "/music/a-thousand-years.mp3" },
  { title: "All of Me - John Legend", url: "/music/all-of-me.mp3" },
  { title: "Can't Help Falling In Love - Elvis Presley", url: "/music/cant-help-falling.mp3" },
  { title: "Marry You - Bruno Mars", url: "/music/marry-you.mp3" },
  { title: "I Don't Want To Miss A Thing - Aerosmith", url: "/music/i-dont-want-to-miss.mp3" },
  { title: "Everything I Do - Bryan Adams", url: "/music/everything-i-do.mp3" },
];

const MusicForm = ({ data, updateData }: MusicFormProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const selectSong = (title: string, url: string) => {
    updateData({ musicTitle: title, musicUrl: url });
  };

  const handleCustomUrl = () => {
    if (customUrl) {
      updateData({ musicUrl: customUrl, musicTitle: "Custom Music" });
      setCustomUrl("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            Musik Latar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{data.musicTitle || "Belum dipilih"}</p>
                  <p className="text-sm text-muted-foreground">
                    {data.musicUrl ? "Musik terpilih" : "Pilih musik di bawah"}
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!data.musicUrl}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pilih dari Daftar Populer</Label>
            <RadioGroup
              value={data.musicTitle}
              onValueChange={(value) => {
                const song = popularSongs.find((s) => s.title === value);
                if (song) selectSong(song.title, song.url);
              }}
            >
              <div className="grid gap-2">
                {popularSongs.map((song) => (
                  <div
                    key={song.title}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted ${
                      data.musicTitle === song.title ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => selectSong(song.title, song.url)}
                  >
                    <RadioGroupItem value={song.title} id={song.title} />
                    <Label htmlFor={song.title} className="flex-1 cursor-pointer">
                      {song.title}
                    </Label>
                    <Music className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="h-4 w-4 text-primary" />
            Upload Musik Sendiri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Masukkan URL musik (mp3)..."
              className="flex-1"
            />
            <Button onClick={handleCustomUrl} disabled={!customUrl}>
              Gunakan
            </Button>
          </div>

          <div className="p-4 border-2 border-dashed rounded-lg text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag & drop file musik di sini
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Format: MP3, WAV, OGG (Maks. 10MB)
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              Pilih File
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            💡 Tip: Musik akan otomatis diputar saat tamu membuka undangan (setelah klik "Buka Undangan")
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicForm;
