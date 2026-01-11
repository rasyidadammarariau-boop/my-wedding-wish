import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Search, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";

const initialTemplates = [
  { id: "1", name: "Elegant Rose", category: "Premium", price: 299000, status: "active", users: 234, color: "#f43f5e" },
  { id: "2", name: "Minimalist White", category: "Basic", price: 0, status: "active", users: 567, color: "#ffffff" },
  { id: "3", name: "Modern Dark", category: "Premium", price: 349000, status: "active", users: 123, color: "#1a1a2e" },
  { id: "4", name: "Rustic Garden", category: "Pro", price: 199000, status: "active", users: 89, color: "#4a7c59" },
  { id: "5", name: "Floral Dream", category: "Premium", price: 299000, status: "active", users: 156, color: "#f0c6d3" },
  { id: "6", name: "Classic Gold", category: "Pro", price: 199000, status: "inactive", users: 45, color: "#d4af37" },
];

const TemplatesManagementTab = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<typeof initialTemplates[0] | null>(null);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template berhasil dihapus!");
  };

  const handleToggleStatus = (id: string) => {
    setTemplates(templates.map(t =>
      t.id === id ? { ...t, status: t.status === "active" ? "inactive" : "active" } : t
    ));
    toast.success("Status template diubah!");
  };

  const handleSave = () => {
    toast.success(editingTemplate ? "Template berhasil diperbarui!" : "Template baru berhasil ditambahkan!");
    setIsDialogOpen(false);
    setEditingTemplate(null);
  };

  return (
    <div className="space-y-6">
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
            <Button variant="hero" onClick={() => setEditingTemplate(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Template" : "Tambah Template Baru"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Nama Template</Label>
                <Input id="name" placeholder="Nama template..." defaultValue={editingTemplate?.name} />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select defaultValue={editingTemplate?.category || "Basic"}>
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
                <Input id="price" type="number" placeholder="0" defaultValue={editingTemplate?.price} />
              </div>
              <div>
                <Label htmlFor="color">Warna Utama</Label>
                <Input id="color" type="color" defaultValue={editingTemplate?.color || "#f43f5e"} className="h-10 w-full" />
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
                    <Badge variant="outline" className="mt-1">{template.category}</Badge>
                  </div>
                  <p className="font-semibold text-primary">
                    {template.price === 0 ? "Gratis" : `Rp ${template.price.toLocaleString()}`}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.users} pengguna
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingTemplate(template);
                      setIsDialogOpen(true);
                    }}
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
    </div>
  );
};

export default TemplatesManagementTab;
