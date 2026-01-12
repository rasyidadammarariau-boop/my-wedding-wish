import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, User } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface CoupleInfoFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const CoupleInfoForm = ({ data, updateData }: CoupleInfoFormProps) => {
  const handlePhotoUpload = (type: "groom" | "bride") => {
    // In real app, this would open file picker and upload
    const dummyUrl = `https://images.unsplash.com/photo-${type === "groom" ? "1507003211169-0a1dd7228f2d" : "1494790108377-be9c29b29330"}?w=200&h=200&fit=crop`;
    updateData(type === "groom" ? { groomPhoto: dummyUrl } : { bridePhoto: dummyUrl });
  };

  return (
    <div className="space-y-6">
      {/* Groom Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            Data Mempelai Pria
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={data.groomPhoto} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={() => handlePhotoUpload("groom")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Foto
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="groomName">Nama Panggilan</Label>
              <Input
                id="groomName"
                value={data.groomName}
                onChange={(e) => updateData({ groomName: e.target.value })}
                placeholder="Contoh: Wahyu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groomFullName">Nama Lengkap</Label>
              <Input
                id="groomFullName"
                value={data.groomFullName}
                onChange={(e) => updateData({ groomFullName: e.target.value })}
                placeholder="Contoh: Wahyu Prasetyo, S.T."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="groomChildOrder">Anak ke-</Label>
            <Input
              id="groomChildOrder"
              value={data.groomChildOrder}
              onChange={(e) => updateData({ groomChildOrder: e.target.value })}
              placeholder="Contoh: Putra pertama"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="groomParentFather">Nama Ayah</Label>
              <Input
                id="groomParentFather"
                value={data.groomParentFather}
                onChange={(e) => updateData({ groomParentFather: e.target.value })}
                placeholder="Contoh: Bapak Sudarmo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groomParentMother">Nama Ibu</Label>
              <Input
                id="groomParentMother"
                value={data.groomParentMother}
                onChange={(e) => updateData({ groomParentMother: e.target.value })}
                placeholder="Contoh: Ibu Siti Aminah"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bride Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-pink-500" />
            Data Mempelai Wanita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={data.bridePhoto} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={() => handlePhotoUpload("bride")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Foto
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brideName">Nama Panggilan</Label>
              <Input
                id="brideName"
                value={data.brideName}
                onChange={(e) => updateData({ brideName: e.target.value })}
                placeholder="Contoh: Riski"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brideFullName">Nama Lengkap</Label>
              <Input
                id="brideFullName"
                value={data.brideFullName}
                onChange={(e) => updateData({ brideFullName: e.target.value })}
                placeholder="Contoh: Riski Amelia, S.Pd."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brideChildOrder">Anak ke-</Label>
            <Input
              id="brideChildOrder"
              value={data.brideChildOrder}
              onChange={(e) => updateData({ brideChildOrder: e.target.value })}
              placeholder="Contoh: Putri kedua"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brideParentFather">Nama Ayah</Label>
              <Input
                id="brideParentFather"
                value={data.brideParentFather}
                onChange={(e) => updateData({ brideParentFather: e.target.value })}
                placeholder="Contoh: Bapak Ahmad"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brideParentMother">Nama Ibu</Label>
              <Input
                id="brideParentMother"
                value={data.brideParentMother}
                onChange={(e) => updateData({ brideParentMother: e.target.value })}
                placeholder="Contoh: Ibu Fatimah"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoupleInfoForm;
