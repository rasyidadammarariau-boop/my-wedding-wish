import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, CheckCircle, XCircle, HelpCircle, Send, Plus } from "lucide-react";
import { toast } from "sonner";

const initialGuests = [
  { id: "1", name: "Ahmad Rizki", phone: "081234567890", attendance: "hadir", message: "Selamat menempuh hidup baru!", invitation: "John & Jane" },
  { id: "2", name: "Siti Nurhaliza", phone: "081234567891", attendance: "hadir", message: "Semoga menjadi keluarga sakinah", invitation: "John & Jane" },
  { id: "3", name: "Budi Santoso", phone: "081234567892", attendance: "tidak_hadir", message: "Maaf tidak bisa hadir, semoga bahagia selalu", invitation: "John & Jane" },
  { id: "4", name: "Dewi Lestari", phone: "081234567893", attendance: "belum_konfirmasi", message: "", invitation: "John & Jane" },
  { id: "5", name: "Eko Prasetyo", phone: "081234567894", attendance: "hadir", message: "Barakallah!", invitation: "John & Jane" },
  { id: "6", name: "Fitri Handayani", phone: "081234567895", attendance: "hadir", message: "Happy wedding day!", invitation: "Michael & Sarah" },
];

const GuestsTab = () => {
  const [guests] = useState(initialGuests);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("all");

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.includes(searchQuery);
    const matchesAttendance = filterAttendance === "all" || guest.attendance === filterAttendance;
    return matchesSearch && matchesAttendance;
  });

  const getAttendanceBadge = (attendance: string) => {
    switch (attendance) {
      case "hadir":
        return (
          <Badge className="bg-green-100 text-green-700" variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Hadir
          </Badge>
        );
      case "tidak_hadir":
        return (
          <Badge className="bg-red-100 text-red-700" variant="secondary">
            <XCircle className="h-3 w-3 mr-1" />
            Tidak Hadir
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700" variant="secondary">
            <HelpCircle className="h-3 w-3 mr-1" />
            Belum Konfirmasi
          </Badge>
        );
    }
  };

  const handleSendReminder = (name: string) => {
    toast.success(`Pengingat terkirim ke ${name}`);
  };

  const stats = {
    total: guests.length,
    hadir: guests.filter(g => g.attendance === "hadir").length,
    tidakHadir: guests.filter(g => g.attendance === "tidak_hadir").length,
    belumKonfirmasi: guests.filter(g => g.attendance === "belum_konfirmasi").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Tamu</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.hadir}</p>
            <p className="text-sm text-muted-foreground">Hadir</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.tidakHadir}</p>
            <p className="text-sm text-muted-foreground">Tidak Hadir</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{stats.belumKonfirmasi}</p>
            <p className="text-sm text-muted-foreground">Belum Konfirmasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau nomor telepon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAttendance} onValueChange={setFilterAttendance}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Kehadiran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="hadir">Hadir</SelectItem>
                <SelectItem value="tidak_hadir">Tidak Hadir</SelectItem>
                <SelectItem value="belum_konfirmasi">Belum Konfirmasi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => toast.success("Data diexport!")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Tamu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guests Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>No. Telepon</TableHead>
                <TableHead>Undangan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest, index) => (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b last:border-0"
                >
                  <TableCell className="font-medium text-foreground">{guest.name}</TableCell>
                  <TableCell className="text-muted-foreground">{guest.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{guest.invitation}</TableCell>
                  <TableCell>{getAttendanceBadge(guest.attendance)}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {guest.message || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {guest.attendance === "belum_konfirmasi" && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSendReminder(guest.name)}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Ingatkan
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestsTab;
