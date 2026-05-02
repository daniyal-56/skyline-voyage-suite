import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/seats")({
  head: () => ({ meta: [{ title: "Select Your Seat — SkyLine Airways" }] }),
  component: SeatsPage,
});

type SeatStatus = "available" | "occupied" | "selected";

const seatPrices: Record<string, number> = { First: 1800, Business: 600, Economy: 0 };
const baseFare = 649;

const generateSeats = () => {
  const rows: { row: number; seats: { id: string; status: SeatStatus; cls: string }[] }[] = [];
  for (let r = 1; r <= 30; r++) {
    const cls = r <= 3 ? "First" : r <= 8 ? "Business" : "Economy";
    const cols = cls === "First" ? ["A", "C", "D", "F"] : ["A", "B", "C", "D", "E", "F"];
    rows.push({
      row: r,
      seats: cols.map((c) => ({
        id: `${r}${c}`,
        status: Math.random() > 0.7 ? "occupied" : "available",
        cls,
      })),
    });
  }
  return rows;
};

const initialSeats = generateSeats();

function SeatsPage() {
  const [seats, setSeats] = useState(initialSeats);
  const [selectionError, setSelectionError] = useState("");
  const navigate = useNavigate({ from: "/seats" });
  const selected = seats.flatMap((r) => r.seats).filter((s) => s.status === "selected");

  const seatSurcharge = useMemo(
    () => selected.reduce((sum, s) => sum + seatPrices[s.cls], 0),
    [selected],
  );
  const taxes = useMemo(
    () => Math.round((baseFare + seatSurcharge) * 0.1348 * 100) / 100,
    [seatSurcharge],
  );
  const total = useMemo(() => baseFare + seatSurcharge + taxes, [seatSurcharge, taxes]);

  const toggleSeat = (seatId: string) => {
    setSelectionError("");
    setSeats((prev) =>
      prev.map((row) => ({
        ...row,
        seats: row.seats.map((s) =>
          s.id === seatId && s.status !== "occupied"
            ? { ...s, status: s.status === "selected" ? "available" : "selected" }
            : s,
        ),
      })),
    );
  };

  const seatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-success/20 border-success/40 hover:bg-success/30 cursor-pointer";
      case "selected":
        return "bg-teal border-teal cursor-pointer";
      case "occupied":
        return "bg-muted border-border cursor-not-allowed opacity-50";
    }
  };

  const paymentSearch = {
    seats: selected.map((s) => s.id).join(","),
    classes: selected.map((s) => s.cls).join(","),
    baseFare: String(baseFare),
    seatSurcharge: String(seatSurcharge),
    taxes: String(taxes),
    total: String(total),
  };

  const continueToPayment = () => {
    if (selected.length === 0) {
      setSelectionError("Select at least one available seat before continuing.");
      return;
    }

    navigate({ to: "/payment", search: paymentSearch });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Select Your Seat</h1>
        <p className="text-muted-foreground mb-8">Flight SL-101 · New York → London</p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-6 mb-6">
              {[
                { label: "Available", color: "bg-success/20 border-success/40" },
                { label: "Selected", color: "bg-teal border-teal" },
                { label: "Occupied", color: "bg-muted border-border opacity-50" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg border ${l.color}`} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>

            <div
              className="bg-card rounded-2xl p-6 overflow-x-auto"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="min-w-[320px] mx-auto max-w-md">
                {seats.map((row) => {
                  const isFCOrBiz = row.seats.length === 4;
                  return (
                    <div key={row.row} className="flex items-center gap-1 mb-1.5">
                      <span className="w-6 text-xs text-muted-foreground text-right">
                        {row.row}
                      </span>
                      <div
                        className={`flex-1 flex ${isFCOrBiz ? "justify-center gap-8" : "justify-center gap-1"}`}
                      >
                        {row.seats.map((seat, i) => (
                          <div key={seat.id}>
                            {!isFCOrBiz && i === 3 && <div className="inline-block w-4" />}
                            <button
                              onClick={() => toggleSeat(seat.id)}
                              disabled={seat.status === "occupied"}
                              className={`w-8 h-8 rounded-lg border text-xs font-medium transition-all ${seatColor(seat.status)} ${seat.status === "selected" ? "text-primary-foreground" : "text-foreground/70"}`}
                            >
                              {seat.id.slice(-1)}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div
              className="bg-card rounded-2xl p-6 sticky top-24"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Selected Seats</h3>
              {selected.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No seats selected yet. Click on an available seat to select it.
                </p>
              ) : (
                <div className="space-y-3 mb-4">
                  {selected.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-teal/5 border border-teal/20"
                    >
                      <div>
                        <span className="text-sm font-semibold text-foreground">Seat {s.id}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{s.cls}</span>
                      </div>
                      <span className="text-sm font-semibold text-teal">
                        {seatPrices[s.cls] > 0
                          ? `+$${seatPrices[s.cls].toLocaleString()}`
                          : "Included"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selected.length > 0 && (
                <div className="space-y-2 text-sm border-t border-border pt-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="text-foreground">${baseFare.toFixed(2)}</span>
                  </div>
                  {seatSurcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat Upgrade</span>
                      <span className="text-foreground">+${seatSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-foreground">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-xl text-gold">${total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {selectionError && (
                <p className="mb-3 text-xs font-medium text-error">{selectionError}</p>
              )}
              <Button variant="hero" size="lg" className="w-full" onClick={continueToPayment}>
                Continue to Payment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
