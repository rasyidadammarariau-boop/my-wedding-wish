import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Search, LayoutTemplate, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getTemplates, saveTemplates, TemplateSettings } from "@/stores/adminSettingsStore";

const allFeatures = [
  "Countdown Timer",
  "QR Code",
  "Share Buttons",
  "Guest Book",
  "Music Player",
  "Love Story Timeline",
  "Export PDF",
  "RSVP Form",
  "Photo Gallery",
  "Google Maps",
];

const TemplatesManagementTab = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateSettings[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateSettings | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Basic" as "Basic" | "Pro" | "Premium",
    price: 0,
    color: "#f43f5e",
    demoUrl: "",
    features: [] as string[],
  });

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    saveTemplates(updated);
    toast.success("Template berhasil dihapus!");
  };

  const handleToggleStatus = (id: string) => {
    const updated = templates.map(t =>
      t.id === id ? { ...t, status: t.status === "active" ? "inactive" as const : "active" as const } : t
    );
    setTemplates(updated);
    saveTemplates(updated);
    toast.success("Status template diubah!");
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Nama template harus diisi!");
      return;
    }

    let updated: TemplateSettings[];
    if (editingTemplate) {
      updated = templates.map(t =>
        t.id === editingTemplate.id
          ? {
              ...t,
              name: formData.name,
              category: formData.category,
              price: formData.price,
              color: formData.color,
              demoUrl: formData.demoUrl,
              features: formData.features,
            }
          : t
      );
      toast.success("Template berhasil diperbarui!");
    } else {
      const newTemplate: TemplateSettings = {
        id: formData.name.toLowerCase().replace(/\s+/g, "-"),
        name: formData.name,
        category: formData.category,
        price: formData.price,
        color: formData.color,
        demoUrl: formData.demoUrl || `/demo/${formData.name.toLowerCase().replace(/\s+/g, "-")}`,
        features: formData.features,
        status: "active",
        users: 0,
      };
      updated = [...templates, newTemplate];
      toast.success("Template baru berhasil ditambahkan!");
    }

    setTemplates(updated);
    saveTemplates(updated);
    setIsDialogOpen(false);
    setEditingTemplate(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Basic",
      price: 0,
      color: "#f43f5e",
      demoUrl: "",
      features: [],
    });
  };

  const openAddDialog = () => {
    setEditingTemplate(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (template: TemplateSettings) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      price: template.price,
      color: template.color,
      demoUrl: template.demoUrl,
      features: template.features,
    });
    setIsDialogOpen(true);
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Premium":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      case "Pro":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Stats
  const activeTemplates = templates.filter(t => t.status === "active").length;
  const totalUsers = templates.reduce((sum, t) => sum + t.users, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <LayoutTemplate className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{templates.length}</p>
                <p className="text-sm text-muted-foreground">Total Template</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeTemplates}</p>
                <p className="text-sm text-muted-foreground">Template Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <LayoutTemplate className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Pengguna</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <LayoutTemplate className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {templates.filter(t => t.category === "Premium").length}
                </p>
                <p className="text-sm text-muted-foreground">Premium</p>
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
            placeholder="Cari template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Template" : "Tambah Template Baru"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Nama Template</Label>
                <Input
                  id="name"
                  placeholder="Nama template..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as "Basic" | "Pro" | "Premium" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic (Gratis)</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="color">Warna Utama</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#f43f5e"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  placeholder="/demo/template-name"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                />
              </div>
              <div>
                <Label>Fitur Template</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <label
                        htmlFor={feature}
                        className="text-sm cursor-pointer"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="hero" className="w-full" onClick={handleSave}>
                {editingTemplate ? "Simpan Perubahan" : "Tambah Template"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="shadow-card hover:shadow-lg transition-all overflow-hidden">
              {/* Color Preview */}
              <div
                className="h-24 relative"
                style={{ backgroundColor: template.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant={template.status === "active" ? "default" : "secondary"}>
                    {template.status === "active" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.users} pengguna</p>
                  </div>
                  <p className="font-semibold text-primary">
                    {template.price === 0 ? "Gratis" : `Rp ${template.price.toLocaleString()}`}
                  </p>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.features.length - 3} lagi
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(template.demoUrl)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleToggleStatus(template.id)}
                  >
                    <LayoutTemplate className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <LayoutTemplate className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Tidak ada template ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default TemplatesManagementTab;
