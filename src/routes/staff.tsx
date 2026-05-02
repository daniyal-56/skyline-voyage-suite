import { createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plane, Radio, Users, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/staff")({
  head: () => ({ meta: [{ title: "Staff Dashboard — SkyLine Airways" }] }),
  component: StaffPage,
});

const flights = [
  { id: "SL-101", route: "JFK → LHR", dep: "08:30", status: "On Time", gate: "B24", pax: 186, checked: 142 },
  { id: "SL-205", route: "JFK → CDG", dep: "09:15", status: "Boarding", gate: "A12", pax: 210, checked: 198 },
  { id: "SL-312", route: "JFK → DXB", dep: "10:00", status: "Delayed", gate: "C08", pax: 245, checked: 89 },
  { id: "SL-418", route: "JFK → NRT", dep: "11:30", status: "On Time", gate: "B30", pax: 198, checked: 0 },
  { id: "SL-520", route: "JFK → IST", dep: "13:45", status: "Cancelled", gate: "—", pax: 167, checked: 0 },
];

const statusIcon: Record<string, React.ReactNode> = {
  "On Time": <CheckCircle className="w-4 h-4 text-success" />,
  Boarding: <Radio className="w-4 h-4 text-teal" />,
  Delayed: <AlertTriangle className="w-4 h-4 text-gold" />,
  Cancelled: <XCircle className="w-4 h-4 text-error" />,
};

const statusColor: Record<string, string> = {
  "On Time": "bg-success/10 text-success",
  Boarding: "bg-teal/10 text-teal",
  Delayed: "bg-gold/10 text-gold",
  Cancelled: "bg-error/10 text-error",
};

function StaffPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar variant="staff" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Today's Flights", value: "24", icon: Plane, color: "bg-navy/10 text-navy" },
                { label: "Passengers", value: "4,521", icon: Users, color: "bg-teal/10 text-teal" },
                { label: "On Time Rate", value: "94.2%", icon: Clock, color: "bg-success/10 text-success" },
                { label: "Delays", value: "3", icon: AlertTriangle, color: "bg-gold/10 text-gold" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-2xl p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Flight status table */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Flight Status Management</h3>
                <Button variant="teal" size="sm">Add Announcement</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-muted-foreground">Flight</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Route</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Departure</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Gate</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Check-In</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((f) => (
                      <tr key={f.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 font-mono font-semibold text-foreground">{f.id}</td>
                        <td className="py-3 text-foreground">{f.route}</td>
                        <td className="py-3 text-muted-foreground">{f.dep}</td>
                        <td className="py-3 text-foreground font-medium">{f.gate}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[f.status]}`}>
                            {statusIcon[f.status]}
                            {f.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">{f.checked}/{f.pax}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Manage</Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Announcements</h3>
              <div className="space-y-3">
                {[
                  { time: "10:32 AM", text: "Flight SL-312 delayed by 45 minutes due to weather conditions.", type: "warning" },
                  { time: "09:45 AM", text: "Gate change for SL-205: moved from A08 to A12.", type: "info" },
                  { time: "08:00 AM", text: "Flight SL-520 cancelled. Passengers being rebooked.", type: "error" },
                ].map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                    a.type === "warning" ? "bg-gold/5 border-gold/20" :
                    a.type === "error" ? "bg-error/5 border-error/20" :
                    "bg-teal/5 border-teal/20"
                  }`}>
                    <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">{a.time}</span>
                    <p className="text-sm text-foreground">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
