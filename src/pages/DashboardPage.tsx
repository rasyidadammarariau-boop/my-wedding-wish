import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for invitations
const dummyInvitations = [
  {
    id: "1",
    title: "Pernikahan John & Jane",
    template: "Elegant Rose",
    date: "15 Feb 2026",
    status: "published",
    views: 245,
    rsvp: 89,
  },
  {
    id: "2",
    title: "Pernikahan Michael & Sarah",
    template: "Minimalist White",
    date: "28 Mar 2026",
    status: "draft",
    views: 0,
    rsvp: 0,
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [invitations] = useState(dummyInvitations);

  const handleLogout = () => {
    toast.success("Berhasil logout!");
    navigate("/");
  };

  const stats = [
    { label: "Total Undangan", value: "2", icon: FileText },
    { label: "Total Views", value: "245", icon: Eye },
    { label: "Total RSVP", value: "89", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-10">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-display text-xl font-semibold text-foreground">
            WeddingKu
          </span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <FileText className="h-5 w-5" />
            Undangan Saya
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Users className="h-5 w-5" />
            Daftar Tamu
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Settings className="h-5 w-5" />
            Pengaturan
          </a>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Selamat datang kembali!</p>
          </div>
          <Button variant="hero" onClick={() => navigate("/templates")}>
            <Plus className="h-5 w-5 mr-2" />
            Buat Undangan Baru
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Invitations List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Undangan Saya</CardTitle>
          </CardHeader>
          <CardContent>
            {invitations.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Anda belum memiliki undangan. Buat undangan pertama Anda!
                </p>
                <Button variant="hero" className="mt-4" onClick={() => navigate("/templates")}>
                  <Plus className="h-5 w-5 mr-2" />
                  Buat Undangan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation, index) => (
                  <motion.div
                    key={invitation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-secondary/50 rounded-xl gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {invitation.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {invitation.template}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {invitation.date}
                        </span>
                        <span className="flex items-center gap-1">
                          {invitation.status === "published" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-600">Published</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span className="text-amber-600">Draft</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{invitation.views} views</span>
                      <span>•</span>
                      <span>{invitation.rsvp} RSVP</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
