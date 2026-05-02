import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, ArrowRightLeft, Search, ChevronDown } from "lucide-react";

export function FlightSearchWidget({ compact = false }: { compact?: boolean }) {
  const [tripType, setTripType] = useState<"round" | "one-way">("round");

  return (
    <div className={`bg-card rounded-2xl shadow-xl ${compact ? "p-4" : "p-6 lg:p-8"}`} style={{ boxShadow: "var(--shadow-elevated)" }}>
      {!compact && (
        <div className="flex gap-4 mb-6">
          {(["round", "one-way"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTripType(t)}
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                tripType === t
                  ? "bg-navy text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t === "round" ? "Round Trip" : "One Way"}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-3 ${compact ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-6"}`}>
        <div className="lg:col-span-1 relative">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <MapPin className="w-4 h-4 text-teal shrink-0" />
            <input className="w-full text-sm font-medium bg-transparent focus:outline-none" placeholder="City or airport" defaultValue="New York (JFK)" />
          </div>
        </div>

        <div className="lg:col-span-1 flex items-end">
          <div className="w-full relative">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To</label>
            <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
              <MapPin className="w-4 h-4 text-teal shrink-0" />
              <input className="w-full text-sm font-medium bg-transparent focus:outline-none" placeholder="City or airport" defaultValue="London (LHR)" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Departure</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Calendar className="w-4 h-4 text-teal shrink-0" />
            <input type="date" className="w-full text-sm font-medium bg-transparent focus:outline-none" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Return</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Calendar className="w-4 h-4 text-teal shrink-0" />
            <input type="date" className="w-full text-sm font-medium bg-transparent focus:outline-none" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Passengers</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Users className="w-4 h-4 text-teal shrink-0" />
            <select className="w-full text-sm font-medium bg-transparent focus:outline-none appearance-none">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        </div>

        <div className="lg:col-span-1 flex items-end">
          <Button variant="hero" size="lg" className="w-full h-12" asChild>
            <Link to="/flights">
              <Search className="w-4 h-4" />
              Search
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
