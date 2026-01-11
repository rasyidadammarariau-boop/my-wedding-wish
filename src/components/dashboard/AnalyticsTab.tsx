import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { name: "Jul", users: 45, revenue: 12000000 },
  { name: "Aug", users: 78, revenue: 18500000 },
  { name: "Sep", users: 92, revenue: 24000000 },
  { name: "Oct", users: 134, revenue: 35000000 },
  { name: "Nov", users: 156, revenue: 42000000 },
  { name: "Dec", users: 189, revenue: 48000000 },
  { name: "Jan", users: 234, revenue: 56000000 },
];

const templateUsage = [
  { name: "Elegant Rose", value: 234, color: "#f43f5e" },
  { name: "Minimalist White", value: 189, color: "#64748b" },
  { name: "Modern Dark", value: 156, color: "#1e293b" },
  { name: "Rustic Garden", value: 123, color: "#4ade80" },
  { name: "Floral Dream", value: 98, color: "#f0abfc" },
  { name: "Classic Gold", value: 67, color: "#fbbf24" },
];

const dailyViews = [
  { name: "Sen", views: 1234 },
  { name: "Sel", views: 1567 },
  { name: "Rab", views: 1890 },
  { name: "Kam", views: 1456 },
  { name: "Jum", views: 2134 },
  { name: "Sab", views: 2890 },
  { name: "Min", views: 2567 },
];

const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
            <p className="text-2xl font-bold text-foreground">Rp 235.5 Jt</p>
            <p className="text-xs text-green-600">+12% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rata-rata Views/Hari</p>
            <p className="text-2xl font-bold text-foreground">1,962</p>
            <p className="text-xs text-green-600">+8% dari minggu lalu</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold text-foreground">24.5%</p>
            <p className="text-xs text-green-600">+2.1% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">RSVP Rate</p>
            <p className="text-2xl font-bold text-foreground">68.3%</p>
            <p className="text-xs text-green-600">+5% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Users & Revenue */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">User & Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      name === 'revenue' ? `Rp ${(value as number).toLocaleString()}` : value,
                      name === 'revenue' ? 'Pendapatan' : 'User Baru'
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Template Usage Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Penggunaan Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={templateUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {templateUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {templateUsage.map((template) => (
                  <div key={template.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="text-sm text-muted-foreground truncate">{template.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{template.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Views Line Chart */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Views Harian (Minggu Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyViews}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
