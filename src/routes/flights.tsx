import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FlightSearchWidget } from "@/components/FlightSearchWidget";
import { Plane, Clock, ArrowRight, Filter, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/flights")({
  head: () => ({ meta: [{ title: "Search Flights — SkyLine Airways" }] }),
  component: FlightsPage,
});

const flightResults = [
  { id: "SL-101", airline: "SkyLine Airways", from: "JFK", to: "LHR", dep: "08:30", arr: "20:45", dur: "7h 15m", stops: "Non-stop", seats: 24, price: 649, cls: "Economy" },
  { id: "SL-205", airline: "SkyLine Airways", from: "JFK", to: "LHR", dep: "11:00", arr: "23:15", dur: "7h 15m", stops: "Non-stop", seats: 12, price: 789, cls: "Business" },
  { id: "SL-312", airline: "SkyLine Airways", from: "JFK", to: "LHR", dep: "14:45", arr: "03:00", dur: "7h 15m", stops: "1 stop", seats: 42, price: 529, cls: "Economy" },
  { id: "SL-418", airline: "SkyLine Airways", from: "JFK", to: "LHR", dep: "19:30", arr: "07:45", dur: "7h 15m", stops: "Non-stop", seats: 8, price: 1249, cls: "First" },
  { id: "SL-520", airline: "SkyLine Airways", from: "JFK", to: "LHR", dep: "23:00", arr: "11:15", dur: "7h 15m", stops: "Non-stop", seats: 31, price: 599, cls: "Economy" },
];

function FlightsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <FlightSearchWidget compact />

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {flightResults.length} flights found
              </h3>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="bg-card rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                  <input type="range" min="200" max="2000" className="w-full accent-teal" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$200</span><span>$2,000</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Class</label>
                  <div className="space-y-2">
                    {["Economy", "Business", "First"].map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-teal focus:ring-teal" defaultChecked />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Stops</label>
                  <div className="space-y-2">
                    {["Non-stop", "1 stop", "2+ stops"].map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-teal focus:ring-teal" defaultChecked />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {flightResults.map((f) => (
                <div key={f.id} className="bg-card rounded-2xl p-5 lg:p-6 card-hover flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center gap-3 lg:w-40">
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                      <Plane className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{f.airline}</p>
                      <p className="text-xs text-muted-foreground">{f.id}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center gap-4 lg:gap-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{f.dep}</p>
                      <p className="text-xs text-muted-foreground">{f.from}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground mb-1">{f.dur}</p>
                      <div className="w-full h-px bg-border relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal" />
                      </div>
                      <p className="text-xs text-teal mt-1 font-medium">{f.stops}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{f.arr}</p>
                      <p className="text-xs text-muted-foreground">{f.to}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground lg:w-24">
                    <Clock className="w-3.5 h-3.5" />
                    {f.seats} seats left
                  </div>

                  <div className="flex items-center gap-4 lg:w-44 justify-end">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{f.cls}</p>
                      <p className="text-2xl font-bold text-gold">${f.price}</p>
                    </div>
                    <Button variant="teal" size="sm" asChild>
                      <Link to="/flight-details">Book</Link>
                    </Button>
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
