import { createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardLayout";
import { DollarSign, TrendingUp, Ticket, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("skyline_token")}`
      }
    }).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
          Calculating Executive Data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Executive Dashboard</h2>
              <p className="text-muted-foreground mt-1">Live system overview and financial metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Total Revenue" value={stats?.totalRevenue || "$0"} icon={<DollarSign className="w-5 h-5" />} trend="Live" />
              <KpiCard title="Tickets Sold" value={stats?.ticketsSold || "0"} icon={<Ticket className="w-5 h-5" />} trend="Live" />
              <KpiCard title="Active Flights" value={stats?.activeFlights || "0"} icon={<Activity className="w-5 h-5" />} trend="Live" />
              <KpiCard title="Load Factor" value={stats?.loadFactor || "0%"} icon={<TrendingUp className="w-5 h-5" />} trend="Live" />
            </div>

            <div className="bg-card rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="font-semibold text-lg text-foreground mb-6">Calculated Weekly Revenue</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.weeklyRevenue || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                    <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">{icon}</div>
        <span className="text-xs font-medium px-2 py-1 rounded-full text-emerald-500 bg-emerald-500/10">{trend}</span>
      </div>
      <div>
        <h4 className="text-muted-foreground text-sm font-medium">{title}</h4>
        <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
      </div>
    </div>
  );
}