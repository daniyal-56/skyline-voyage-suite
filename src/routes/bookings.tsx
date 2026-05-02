import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plane, Download, X, Search, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "My Bookings — SkyLine Airways" }] }),
  component: BookingsPage,
});

const bookings = [
  { id: "SL-2026-78542", from: "JFK", to: "LHR", fromCity: "New York", toCity: "London", date: "Jun 15, 2026", seat: "12A", status: "upcoming", price: "$736.50" },
  { id: "SL-2026-65231", from: "LHR", to: "CDG", fromCity: "London", toCity: "Paris", date: "May 20, 2026", seat: "4B", status: "completed", price: "$289.00" },
  { id: "SL-2026-41923", from: "DXB", to: "NRT", fromCity: "Dubai", toCity: "Tokyo", date: "Apr 10, 2026", seat: "8C", status: "completed", price: "$1,149.00" },
  { id: "SL-2026-33810", from: "JFK", to: "IST", fromCity: "New York", toCity: "Istanbul", date: "Mar 5, 2026", seat: "22F", status: "cancelled", price: "$549.00" },
];

const statusColor: Record<string, string> = {
  upcoming: "bg-teal/10 text-teal",
  completed: "bg-success/10 text-success",
  cancelled: "bg-error/10 text-error",
};

function BookingsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
                <p className="text-muted-foreground text-sm mt-1">{bookings.length} total bookings</p>
              </div>
              <div className="flex gap-2">
                {["all", "upcoming", "completed", "cancelled"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                      filter === f ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filtered.map((b) => (
                <div key={b.id} className="bg-card rounded-2xl p-5 lg:p-6 card-hover flex flex-col lg:flex-row lg:items-center gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center gap-3 lg:w-44">
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                      <Plane className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.fromCity} → {b.toCity}</p>
                      <p className="text-xs text-muted-foreground">{b.id}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{b.from}</p>
                      </div>
                      <div className="w-12 h-px bg-border" />
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{b.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{b.date}</span>
                    <span>·</span>
                    <span>Seat {b.seat}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor[b.status]}`}>
                    {b.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{b.price}</span>
                    {b.status === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/ticket"><Download className="w-3.5 h-3.5" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-error hover:text-error">
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                    {b.status === "completed" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/ticket"><Download className="w-3.5 h-3.5" /></Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
