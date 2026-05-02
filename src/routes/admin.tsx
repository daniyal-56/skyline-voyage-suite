import { createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Plane, Users, CreditCard, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — SkyLine Airways" }] }),
  component: AdminPage,
});

const revenueData = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 48000 }, { month: "Mar", revenue: 55000 },
  { month: "Apr", revenue: 51000 }, { month: "May", revenue: 62000 }, { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 68000 }, { month: "Aug", revenue: 75000 }, { month: "Sep", revenue: 69000 },
  { month: "Oct", revenue: 72000 }, { month: "Nov", revenue: 78000 }, { month: "Dec", revenue: 85000 },
];

const bookingData = [
  { month: "Jan", bookings: 320 }, { month: "Feb", bookings: 380 }, { month: "Mar", bookings: 420 },
  { month: "Apr", bookings: 395 }, { month: "May", bookings: 460 }, { month: "Jun", bookings: 520 },
];

const destData = [
  { name: "London", value: 35 }, { name: "Paris", value: 25 }, { name: "Dubai", value: 20 }, { name: "Tokyo", value: 20 },
];
const COLORS = ["#00A8A8", "#0A2540", "#FFB703", "#16A34A"];

const recentBookings = [
  { id: "SL-78542", passenger: "John Doe", route: "JFK → LHR", date: "Jun 15", amount: "$736.50", status: "Confirmed" },
  { id: "SL-78543", passenger: "Sarah Kim", route: "LAX → NRT", date: "Jun 14", amount: "$1,249.00", status: "Confirmed" },
  { id: "SL-78544", passenger: "Mike Chen", route: "ORD → CDG", date: "Jun 14", amount: "$589.00", status: "Pending" },
  { id: "SL-78545", passenger: "Emma Wilson", route: "SFO → DXB", date: "Jun 13", amount: "$899.00", status: "Confirmed" },
  { id: "SL-78546", passenger: "Alex Brown", route: "JFK → IST", date: "Jun 13", amount: "$449.00", status: "Cancelled" },
];

const statColor: Record<string, string> = {
  Confirmed: "text-success bg-success/10",
  Pending: "text-gold bg-gold/10",
  Cancelled: "text-error bg-error/10",
};

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar variant="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Bookings", value: "12,453", change: "+12.5%", up: true, icon: BarChart3, color: "bg-teal/10 text-teal" },
                { label: "Active Flights", value: "284", change: "+3.2%", up: true, icon: Plane, color: "bg-navy/10 text-navy" },
                { label: "Revenue (MTD)", value: "$847K", change: "+18.7%", up: true, icon: CreditCard, color: "bg-gold/10 text-gold" },
                { label: "Cancellation Rate", value: "2.4%", change: "-0.8%", up: false, icon: TrendingUp, color: "bg-success/10 text-success" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-2xl p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-success" : "text-error"}`}>
                      {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {s.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Analytics</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00A8A8" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00A8A8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#00A8A8" fill="url(#revGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Destinations</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={destData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                      {destData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2 justify-center">
                  {destData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs text-muted-foreground">{d.name} {d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent bookings table */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-muted-foreground">Booking ID</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Passenger</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Route</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 font-mono text-foreground">{b.id}</td>
                        <td className="py-3 text-foreground">{b.passenger}</td>
                        <td className="py-3 text-muted-foreground">{b.route}</td>
                        <td className="py-3 text-muted-foreground">{b.date}</td>
                        <td className="py-3 font-semibold text-foreground">{b.amount}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statColor[b.status]}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
