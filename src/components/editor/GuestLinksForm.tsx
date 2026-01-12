import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Trash2, Link2, Copy, Check, Users, Search,
  Eye, EyeOff, Download, Upload
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface GuestLinksFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const GuestLinksForm = ({ data, updateData }: GuestLinksFormProps) => {
  const [newGuestName, setNewGuestName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = "weddingku.com/u/wahyu-riski";

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const addGuest = () => {
    if (newGuestName.trim()) {
      const slug = generateSlug(newGuestName);
      const newGuest = {
        id: Date.now().toString(),
        name: newGuestName.trim(),
        slug,
        hasOpened: false,
      };
      updateData({ guestLinks: [...data.guestLinks, newGuest] });
      setNewGuestName("");
      toast({
        title: "Tamu Ditambahkan",
        description: `Link untuk ${newGuestName} berhasil dibuat`,
      });
    }
  };

  const removeGuest = (id: string) => {
    updateData({ guestLinks: data.guestLinks.filter((g) => g.id !== id) });
  };

  const copyLink = (guest: { id: string; name: string; slug: string }) => {
    const link = `${baseUrl}?to=${guest.slug}`;
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Link Disalin!",
      description: `Link undangan untuk ${guest.name} berhasil disalin`,
    });
  };

  const filteredGuests = data.guestLinks.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openedCount = data.guestLinks.filter((g) => g.hasOpened).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto text-primary mb-1" />
            <p className="text-2xl font-bold">{data.guestLinks.length}</p>
            <p className="text-xs text-muted-foreground">Total Tamu</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-6 w-6 mx-auto text-green-500 mb-1" />
            <p className="text-2xl font-bold">{openedCount}</p>
            <p className="text-xs text-muted-foreground">Sudah Dibuka</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <EyeOff className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">{data.guestLinks.length - openedCount}</p>
            <p className="text-xs text-muted-foreground">Belum Dibuka</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Guest */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            Tambah Tamu Baru
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              placeholder="Nama tamu (contoh: Budi Santoso)"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
            />
            <Button onClick={addGuest} disabled={!newGuestName.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              Tambah
            </Button>
          </div>

          {newGuestName && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Preview link:</p>
              <p className="text-sm font-mono break-all">
                {baseUrl}?to={generateSlug(newGuestName) || "..."}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Import dari Excel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export Semua Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guest List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Daftar Tamu</CardTitle>
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tamu..."
                className="pl-9 h-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredGuests.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {guest.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        ?to={guest.slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={guest.hasOpened ? "default" : "secondary"}>
                      {guest.hasOpened ? "Dibuka" : "Belum dibuka"}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => copyLink(guest)}
                    >
                      {copiedId === guest.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeGuest(guest.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                {searchQuery ? "Tidak ada tamu ditemukan" : "Belum ada tamu ditambahkan"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestLinksForm;
