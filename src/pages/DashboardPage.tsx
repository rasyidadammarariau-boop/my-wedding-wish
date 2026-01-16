import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { toast } from "sonner";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import TemplatesManagementTab from "@/components/dashboard/TemplatesManagementTab";
import UsersManagementTab from "@/components/dashboard/UsersManagementTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import AnalyticsTab from "@/components/dashboard/AnalyticsTab";
import InvitationsTab from "@/components/dashboard/InvitationsTab";
import GuestsTab from "@/components/dashboard/GuestsTab";
import MessagesTab from "@/components/dashboard/MessagesTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import MusicLibraryTab from "@/components/dashboard/MusicLibraryTab";
import DefaultContentTab from "@/components/dashboard/DefaultContentTab";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Simulated admin check - in production this would come from auth
  const [isAdmin] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("role") === "admin";
  });

  const handleLogout = () => {
    toast.success("Berhasil logout!");
    navigate("/");
  };

  const getTabTitle = () => {
    const titles: Record<string, string> = {
      overview: "Dashboard",
      templates: "Kelola Template",
      music: "Library Musik",
      "default-content": "Konten Default",
      users: "Kelola User",
      orders: "Pesanan",
      analytics: "Statistik",
      invitations: "Undangan Saya",
      guests: "Daftar Tamu",
      messages: "Ucapan & Doa",
      settings: "Pengaturan",
    };
    return titles[activeTab] || "Dashboard";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab isAdmin={isAdmin} />;
      case "templates":
        return <TemplatesManagementTab />;
      case "music":
        return <MusicLibraryTab />;
      case "default-content":
        return <DefaultContentTab />;
      case "users":
        return <UsersManagementTab />;
      case "orders":
        return <OrdersTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "invitations":
        return <InvitationsTab />;
      case "guests":
        return <GuestsTab />;
      case "messages":
        return <MessagesTab />;
      case "settings":
        return <SettingsTab isAdmin={isAdmin} />;
      default:
        return <OverviewTab isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-display text-lg font-semibold text-foreground">WeddingKu</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-6 pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              onLogout={handleLogout}
              isAdmin={isAdmin}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-foreground"
          >
            {getTabTitle()}
          </motion.h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Panel Admin WeddingKu" : "Selamat datang kembali!"}
          </p>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
