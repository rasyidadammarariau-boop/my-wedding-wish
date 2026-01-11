import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Search, Eye, Ban, CheckCircle, Mail, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const initialUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", plan: "Premium", status: "active", invitations: 2, joinDate: "12 Jan 2026", avatar: "" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", plan: "Pro", status: "active", invitations: 1, joinDate: "10 Jan 2026", avatar: "" },
  { id: "3", name: "Michael Johnson", email: "michael@example.com", plan: "Basic", status: "active", invitations: 0, joinDate: "8 Jan 2026", avatar: "" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", plan: "Premium", status: "suspended", invitations: 3, joinDate: "5 Jan 2026", avatar: "" },
  { id: "5", name: "David Brown", email: "david@example.com", plan: "Pro", status: "active", invitations: 1, joinDate: "3 Jan 2026", avatar: "" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", plan: "Basic", status: "active", invitations: 0, joinDate: "1 Jan 2026", avatar: "" },
  { id: "7", name: "Robert Miller", email: "robert@example.com", plan: "Premium", status: "active", invitations: 4, joinDate: "28 Dec 2025", avatar: "" },
  { id: "8", name: "Lisa Wilson", email: "lisa@example.com", plan: "Pro", status: "inactive", invitations: 1, joinDate: "25 Dec 2025", avatar: "" },
];

const UsersManagementTab = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || user.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleToggleStatus = (id: string, newStatus: string) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: newStatus } : u
    ));
    toast.success(`Status user diubah ke ${newStatus}!`);
  };

  const handleSendEmail = (email: string) => {
    toast.success(`Email terkirim ke ${email}`);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium": return "bg-primary/20 text-primary";
      case "Pro": return "bg-blue-100 text-blue-700";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "suspended": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Plan</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Undangan</TableHead>
                <TableHead>Bergabung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b last:border-0"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(user.plan)} variant="secondary">
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)} variant="secondary">
                      {user.status === "active" ? "Aktif" : user.status === "suspended" ? "Suspended" : "Tidak Aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{user.invitations}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Melihat detail ${user.name}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Kirim Email
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(user.id, "suspended")}
                            className="text-destructive"
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id, "active")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aktifkan User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
            <p className="text-sm text-muted-foreground">Total User</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === "active").length}</p>
            <p className="text-sm text-muted-foreground">User Aktif</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{users.filter(u => u.plan === "Premium").length}</p>
            <p className="text-sm text-muted-foreground">Premium</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.plan === "Pro").length}</p>
            <p className="text-sm text-muted-foreground">Pro</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersManagementTab;
