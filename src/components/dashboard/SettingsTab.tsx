import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Bell, Shield, Palette } from "lucide-react";
import { toast } from "sonner";

interface SettingsTabProps {
  isAdmin?: boolean;
}

const SettingsTab = ({ isAdmin = false }: SettingsTabProps) => {
  const [profile, setProfile] = useState({
    name: isAdmin ? "Admin WeddingKu" : "John Doe",
    email: isAdmin ? "admin@weddingku.id" : "john@example.com",
    phone: "081234567890",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    rsvp: true,
    marketing: false,
  });

  const handleSaveProfile = () => {
    toast.success("Profil berhasil disimpan!");
  };

  const handleSaveNotifications = () => {
    toast.success("Pengaturan notifikasi disimpan!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Profil
          </CardTitle>
          <CardDescription>Kelola informasi profil Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Ganti Foto
              </Button>
              <p className="text-xs text-muted-foreground mt-2">JPG, PNG max 2MB</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>

          <Button variant="hero" onClick={handleSaveProfile}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Perubahan
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifikasi
          </CardTitle>
          <CardDescription>Kelola preferensi notifikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Notifikasi Email</p>
              <p className="text-sm text-muted-foreground">Terima update via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Push Notification</p>
              <p className="text-sm text-muted-foreground">Notifikasi browser</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Notifikasi RSVP</p>
              <p className="text-sm text-muted-foreground">Pemberitahuan saat ada RSVP baru</p>
            </div>
            <Switch
              checked={notifications.rsvp}
              onCheckedChange={(checked) => setNotifications({ ...notifications, rsvp: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Marketing</p>
              <p className="text-sm text-muted-foreground">Promo dan penawaran khusus</p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
            />
          </div>

          <Button variant="outline" onClick={handleSaveNotifications} className="mt-4">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Keamanan
          </CardTitle>
          <CardDescription>Kelola keamanan akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Password Baru</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>

          <Button variant="outline" onClick={() => toast.success("Password berhasil diubah!")}>
            Ubah Password
          </Button>
        </CardContent>
      </Card>

      {/* Admin-only Settings */}
      {isAdmin && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Pengaturan Sistem
            </CardTitle>
            <CardDescription>Pengaturan khusus admin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Mode Maintenance</p>
                <p className="text-sm text-muted-foreground">Nonaktifkan sementara website</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Registrasi Baru</p>
                <p className="text-sm text-muted-foreground">Izinkan user baru mendaftar</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Template Gratis</p>
                <p className="text-sm text-muted-foreground">Aktifkan template gratis</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SettingsTab;
