import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, Users, CreditCard, TrendingUp, Calendar } from "lucide-react";

interface OverviewTabProps {
  isAdmin?: boolean;
}

const userStats = [
  { label: "Total Undangan", value: "2", icon: FileText, change: "+1" },
  { label: "Total Views", value: "1,245", icon: Eye, change: "+124" },
  { label: "Total RSVP", value: "89", icon: Users, change: "+12" },
];

const adminStats = [
  { label: "Total User", value: "1,234", icon: Users, change: "+56" },
  { label: "Total Undangan", value: "3,456", icon: FileText, change: "+234" },
  { label: "Pendapatan Bulan Ini", value: "Rp 45.6 Jt", icon: CreditCard, change: "+12%" },
  { label: "Template Aktif", value: "6", icon: TrendingUp, change: "0" },
];

const recentActivities = [
  { id: 1, action: "User baru mendaftar", user: "John Doe", time: "5 menit lalu" },
  { id: 2, action: "Undangan baru dibuat", user: "Jane Smith", time: "15 menit lalu" },
  { id: 3, action: "Pembayaran diterima", user: "Mike Johnson", time: "1 jam lalu" },
  { id: 4, action: "Template dipilih", user: "Sarah Williams", time: "2 jam lalu" },
  { id: 5, action: "RSVP diterima", user: "Guest #123", time: "3 jam lalu" },
];

const upcomingWeddings = [
  { id: 1, couple: "John & Jane", date: "15 Feb 2026", template: "Elegant Rose" },
  { id: 2, couple: "Michael & Sarah", date: "28 Mar 2026", template: "Minimalist White" },
  { id: 3, couple: "David & Emily", date: "10 Apr 2026", template: "Modern Dark" },
];

const OverviewTab = ({ isAdmin = false }: OverviewTabProps) => {
  const stats = isAdmin ? adminStats : userStats;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${isAdmin ? '4' : '3'} gap-6`}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Weddings */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Pernikahan Mendatang
            </h3>
            <div className="space-y-4">
              {upcomingWeddings.map((wedding) => (
                <div key={wedding.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{wedding.couple}</p>
                    <p className="text-xs text-muted-foreground">{wedding.template}</p>
                  </div>
                  <span className="text-sm text-primary font-medium">{wedding.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
