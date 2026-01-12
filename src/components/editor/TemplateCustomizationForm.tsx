import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Palette, Type, Check, Eye } from "lucide-react";
import type { InvitationData } from "@/pages/InvitationEditorPage";

interface TemplateCustomizationFormProps {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

const templates = [
  { id: "elegant-rose", name: "Elegant Rose", color: "#be123c", preview: "🌹" },
  { id: "minimalist-white", name: "Minimalist White", color: "#1f2937", preview: "⚪" },
  { id: "modern-dark", name: "Modern Dark", color: "#0f172a", preview: "🌙" },
  { id: "rustic-garden", name: "Rustic Garden", color: "#166534", preview: "🌿" },
  { id: "floral-dream", name: "Floral Dream", color: "#9333ea", preview: "🌸" },
  { id: "classic-gold", name: "Classic Gold", color: "#ca8a04", preview: "✨" },
];

const colorPalettes = [
  { name: "Rose", primary: "#be123c", secondary: "#fda4af" },
  { name: "Blue", primary: "#1d4ed8", secondary: "#93c5fd" },
  { name: "Purple", primary: "#7c3aed", secondary: "#c4b5fd" },
  { name: "Green", primary: "#15803d", secondary: "#86efac" },
  { name: "Gold", primary: "#ca8a04", secondary: "#fef08a" },
  { name: "Teal", primary: "#0d9488", secondary: "#5eead4" },
  { name: "Pink", primary: "#db2777", secondary: "#f9a8d4" },
  { name: "Orange", primary: "#ea580c", secondary: "#fdba74" },
];

const fontOptions = [
  { value: "Playfair Display", label: "Playfair Display", style: "serif" },
  { value: "Great Vibes", label: "Great Vibes", style: "cursive" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", style: "serif" },
  { value: "Josefin Sans", label: "Josefin Sans", style: "sans-serif" },
  { value: "Lora", label: "Lora", style: "serif" },
  { value: "Dancing Script", label: "Dancing Script", style: "cursive" },
  { value: "Montserrat", label: "Montserrat", style: "sans-serif" },
  { value: "Cinzel", label: "Cinzel", style: "serif" },
];

const TemplateCustomizationForm = ({ data, updateData }: TemplateCustomizationFormProps) => {
  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Pilih Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.templateId}
            onValueChange={(value) => updateData({ templateId: value })}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {templates.map((template) => (
              <div key={template.id}>
                <RadioGroupItem
                  value={template.id}
                  id={template.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={template.id}
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <span className="text-3xl mb-2">{template.preview}</span>
                  <span className="text-sm font-medium">{template.name}</span>
                  {data.templateId === template.id && (
                    <Check className="h-4 w-4 text-primary mt-1" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <Button variant="outline" className="w-full mt-4">
            <Eye className="mr-2 h-4 w-4" />
            Lihat Semua Template
          </Button>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            🎨 Warna Tema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => updateData({ 
                  primaryColor: palette.primary, 
                  secondaryColor: palette.secondary 
                })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  data.primaryColor === palette.primary 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-muted hover:border-muted-foreground"
                }`}
              >
                <div className="flex gap-1 mb-1">
                  <div 
                    className="h-4 w-4 rounded-full" 
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div 
                    className="h-4 w-4 rounded-full" 
                    style={{ backgroundColor: palette.secondary }}
                  />
                </div>
                <p className="text-xs">{palette.name}</p>
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Warna Utama</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) => updateData({ primaryColor: e.target.value })}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={data.primaryColor}
                  onChange={(e) => updateData({ primaryColor: e.target.value })}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Warna Sekunder</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={data.secondaryColor}
                  onChange={(e) => updateData({ secondaryColor: e.target.value })}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={data.secondaryColor}
                  onChange={(e) => updateData({ secondaryColor: e.target.value })}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Type className="h-4 w-4 text-primary" />
            Font
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Pilih Font</Label>
            <Select
              value={data.fontFamily}
              onValueChange={(value) => updateData({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih font..." />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div 
            className="p-4 rounded-lg border text-center"
            style={{ fontFamily: data.fontFamily }}
          >
            <p className="text-2xl mb-1">
              {data.groomName} & {data.brideName}
            </p>
            <p className="text-sm text-muted-foreground">
              Preview dengan font {data.fontFamily}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateCustomizationForm;
