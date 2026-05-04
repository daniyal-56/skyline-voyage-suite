import { createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardLayout";
import { PlaneTakeoff, Users, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/staff")({
  component: StaffPage,
});

function StaffPage() {
  // 👇 Look! The useQuery is INSIDE the StaffPage function! 👇
  const { data: flights = [], isLoading } = useQuery({
    queryKey: ["staffFlights"],
    queryFn: () => fetch("http://localhost:5000/api/staff/flights", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("skyline_token")}`
      }
    }).then(res => res.json()),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time": return "text-emerald-500 bg-emerald-500/10";
      case "Boarding": return "text-blue-500 bg-blue-500/10";
      case "Delayed": return "text-red-500 bg-red-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Time": return <CheckCircle2 className="w-4 h-4" />;
      case "Boarding": return <Users className="w-4 h-4" />;
      case "Delayed": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
          Loading Departure Board...
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
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Gate Agent Portal</h2>
              <p className="text-muted-foreground mt-1">Manage today's live departures and passenger manifests.</p>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="p-6 border-b border-border bg-muted/30">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <PlaneTakeoff className="w-5 h-5 text-teal" />
                  Live Departures
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-sm text-muted-foreground bg-muted/10">
                      <th className="p-4 font-medium">Flight</th>
                      <th className="p-4 font-medium">Destination</th>
                      <th className="p-4 font-medium">Time</th>
                      <th className="p-4 font-medium">Gate</th>
                      <th className="p-4 font-medium">Passengers</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight: any) => (
                      <tr key={flight.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                        <td className="p-4 font-semibold text-foreground">{flight.id}</td>
                        <td className="p-4 text-foreground">{flight.dest}</td>
                        <td className="p-4 text-muted-foreground">{flight.time}</td>
                        <td className="p-4 font-medium text-foreground">{flight.gate}</td>
                        <td className="p-4 text-muted-foreground">
                           <span className="font-medium text-foreground">{flight.passengers}</span> / {flight.capacity}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                            {getStatusIcon(flight.status)}
                            {flight.status}
                          </span>
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