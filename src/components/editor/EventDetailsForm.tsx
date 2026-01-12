import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface EventDetailsFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const EventDetailsForm = ({ data, updateData }: EventDetailsFormProps) => {
  return (
    <div className="space-y-6">
      {/* Akad Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Akad Nikah
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="akadDate">Tanggal Akad</Label>
              <Input
                id="akadDate"
                type="date"
                value={data.akadDate}
                onChange={(e) => updateData({ akadDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="akadTime">Waktu Akad</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="akadTime"
                  type="time"
                  value={data.akadTime}
                  onChange={(e) => updateData({ akadTime: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resepsi Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Resepsi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resepsiDate">Tanggal Resepsi</Label>
              <Input
                id="resepsiDate"
                type="date"
                value={data.resepsiDate}
                onChange={(e) => updateData({ resepsiDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resepsiTime">Waktu Resepsi</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="resepsiTime"
                  type="time"
                  value={data.resepsiTime}
                  onChange={(e) => updateData({ resepsiTime: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Lokasi Acara
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venue">Nama Tempat</Label>
            <Input
              id="venue"
              value={data.venue}
              onChange={(e) => updateData({ venue: e.target.value })}
              placeholder="Contoh: Gedung Serbaguna Mawar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Textarea
              id="address"
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              placeholder="Contoh: Jl. Bunga Mawar No. 123, Kelurahan..., Kecamatan..., Kota..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapsUrl">Link Google Maps</Label>
            <Input
              id="mapsUrl"
              value={data.mapsUrl}
              onChange={(e) => updateData({ mapsUrl: e.target.value })}
              placeholder="https://maps.google.com/..."
            />
            <p className="text-xs text-muted-foreground">
              Buka Google Maps, cari lokasi, klik "Bagikan" lalu salin link
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dress Code Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shirt className="h-4 w-4 text-primary" />
            Dress Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dressCode">Ketentuan Pakaian</Label>
            <Input
              id="dressCode"
              value={data.dressCode}
              onChange={(e) => updateData({ dressCode: e.target.value })}
              placeholder="Contoh: Formal - Batik / Kebaya"
            />
          </div>
        </CardContent>
      </Card>

      {/* Gift Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            💝 Love Gift
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nama Bank</Label>
              <Input
                id="bankName"
                value={data.bankName}
                onChange={(e) => updateData({ bankName: e.target.value })}
                placeholder="Contoh: Bank Central Asia"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Nomor Rekening</Label>
              <Input
                id="bankAccount"
                value={data.bankAccount}
                onChange={(e) => updateData({ bankAccount: e.target.value })}
                placeholder="Contoh: 1234567890"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankHolder">Atas Nama</Label>
            <Input
              id="bankHolder"
              value={data.bankHolder}
              onChange={(e) => updateData({ bankHolder: e.target.value })}
              placeholder="Contoh: Riski Amelia"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="giftAddress">Alamat Pengiriman Kado</Label>
            <Textarea
              id="giftAddress"
              value={data.giftAddress}
              onChange={(e) => updateData({ giftAddress: e.target.value })}
              placeholder="Alamat untuk pengiriman kado fisik"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="giftPhone">Nomor Telepon</Label>
            <Input
              id="giftPhone"
              value={data.giftPhone}
              onChange={(e) => updateData({ giftPhone: e.target.value })}
              placeholder="Contoh: 081234567890"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailsForm;
