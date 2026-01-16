import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  LayoutTemplate,
  CreditCard,
  MessageSquare,
  BarChart3,
  Music,
  FileEdit,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

const userNavItems = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "invitations", label: "Undangan Saya", icon: FileText },
  { id: "guests", label: "Daftar Tamu", icon: Users },
  { id: "messages", label: "Ucapan & Doa", icon: MessageSquare },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

const adminNavItems = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "templates", label: "Kelola Template", icon: LayoutTemplate },
  { id: "music", label: "Library Musik", icon: Music },
  { id: "default-content", label: "Konten Default", icon: FileEdit },
  { id: "users", label: "Kelola User", icon: Users },
  { id: "orders", label: "Pesanan", icon: CreditCard },
  { id: "analytics", label: "Statistik", icon: BarChart3 },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

const DashboardSidebar = ({ activeTab, onTabChange, onLogout, isAdmin = false }: DashboardSidebarProps) => {
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block z-40">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-10">
        <Heart className="h-6 w-6 text-primary fill-primary" />
        <span className="font-display text-xl font-semibold text-foreground">
          WeddingKu
        </span>
      </Link>

      {/* Role Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isAdmin 
            ? "bg-primary/20 text-primary" 
            : "bg-secondary text-muted-foreground"
        }`}>
          {isAdmin ? "Admin" : "User"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
