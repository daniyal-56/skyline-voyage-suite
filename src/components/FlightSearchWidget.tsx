import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search, ChevronDown } from "lucide-react";

export function FlightSearchWidget({ compact = false }: { compact?: boolean }) {
  const [tripType, setTripType] = useState<"round" | "one-way">("round");
  const [values, setValues] = useState({
    from: "New York (JFK)",
    to: "London (LHR)",
    departure: "",
    returnDate: "",
    passengers: "1 Adult",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.from.trim() || !values.to.trim()) {
      setError("Enter both origin and destination.");
      return;
    }

    if (values.from.trim().toLowerCase() === values.to.trim().toLowerCase()) {
      setError("Origin and destination must be different.");
      return;
    }

    if (!values.departure) {
      setError("Select a departure date.");
      return;
    }

    if (tripType === "round" && values.returnDate && values.returnDate < values.departure) {
      setError("Return date must be after departure.");
      return;
    }

    setError("");
    navigate({ to: "/flights" });
  };

  return (
    <form
      className={`bg-card rounded-2xl shadow-xl ${compact ? "p-4" : "p-6 lg:p-8"}`}
      style={{ boxShadow: "var(--shadow-elevated)" }}
      onSubmit={handleSubmit}
      noValidate
    >
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

      <div
        className={`grid gap-3 ${compact ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-6"}`}
      >
        <div className="lg:col-span-1 relative">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <MapPin className="w-4 h-4 text-teal shrink-0" />
            <input
              className="w-full text-sm font-medium bg-transparent focus:outline-none"
              placeholder="City or airport"
              value={values.from}
              onChange={(event) => setValues((prev) => ({ ...prev, from: event.target.value }))}
            />
          </div>
        </div>

        <div className="lg:col-span-1 flex items-end">
          <div className="w-full relative">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To</label>
            <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
              <MapPin className="w-4 h-4 text-teal shrink-0" />
              <input
                className="w-full text-sm font-medium bg-transparent focus:outline-none"
                placeholder="City or airport"
                value={values.to}
                onChange={(event) => setValues((prev) => ({ ...prev, to: event.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Departure
          </label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Calendar className="w-4 h-4 text-teal shrink-0" />
            <input
              type="date"
              className="w-full text-sm font-medium bg-transparent focus:outline-none"
              value={values.departure}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, departure: event.target.value }))
              }
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Return</label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Calendar className="w-4 h-4 text-teal shrink-0" />
            <input
              type="date"
              className="w-full text-sm font-medium bg-transparent focus:outline-none"
              value={values.returnDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, returnDate: event.target.value }))
              }
              disabled={tripType === "one-way"}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Passengers
          </label>
          <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-background">
            <Users className="w-4 h-4 text-teal shrink-0" />
            <select
              className="w-full text-sm font-medium bg-transparent focus:outline-none appearance-none"
              value={values.passengers}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, passengers: event.target.value }))
              }
            >
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        </div>

        <div className="lg:col-span-1 flex items-end">
          <Button variant="hero" size="lg" className="w-full h-12" type="submit">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
      {error && <p className="mt-3 text-xs font-medium text-error">{error}</p>}
    </form>
  );
}
