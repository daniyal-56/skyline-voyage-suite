import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plane, Clock, Luggage, Wifi, UtensilsCrossed, Monitor, ArrowRight, ChevronRight, Shield } from "lucide-react";

export const Route = createFileRoute("/flight-details")({
  head: () => ({ meta: [{ title: "Flight Details — SkyLine Airways" }] }),
  component: FlightDetailsPage,
});

function FlightDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-navy rounded-2xl p-8 lg:p-10 mb-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-teal/20 flex items-center justify-center">
                <Plane className="w-7 h-7 text-teal" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">New York → London</h1>
                <p className="text-primary-foreground/60 mt-1">Flight SL-101 · Boeing 787 Dreamliner</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold">08:30</p>
                <p className="text-sm text-primary-foreground/60">JFK · New York</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-teal mb-1" />
                <div className="w-24 h-px bg-primary-foreground/20" />
                <p className="text-xs text-teal mt-1">7h 15m · Non-stop</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">20:45</p>
                <p className="text-sm text-primary-foreground/60">LHR · London</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Amenities */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Amenities & Services</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Wifi, label: "Free Wi-Fi" },
                  { icon: UtensilsCrossed, label: "Meal Included" },
                  { icon: Monitor, label: "Entertainment" },
                  { icon: Luggage, label: "2x23kg Baggage" },
                ].map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
                    <a.icon className="w-5 h-5 text-teal" />
                    <span className="text-xs font-medium text-muted-foreground">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class comparison */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Seat Class Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-muted-foreground">Feature</th>
                      <th className="text-center py-3 font-medium text-muted-foreground">Economy</th>
                      <th className="text-center py-3 font-medium text-muted-foreground">Business</th>
                      <th className="text-center py-3 font-medium text-foreground bg-teal/5 rounded-t-lg">First Class</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      ["Seat Pitch", "32\"", "42\"", "78\""],
                      ["Baggage", "1x23kg", "2x32kg", "3x32kg"],
                      ["Meal", "Standard", "Premium", "Gourmet"],
                      ["Wi-Fi", "Paid", "Free", "Free"],
                      ["Lounge", "No", "Yes", "Yes"],
                      ["Price", "$649", "$1,249", "$2,499"],
                    ].map(([feature, eco, biz, first]) => (
                      <tr key={feature} className="border-b border-border/50">
                        <td className="py-3 text-foreground font-medium">{feature}</td>
                        <td className="py-3 text-center text-muted-foreground">{eco}</td>
                        <td className="py-3 text-center text-muted-foreground">{biz}</td>
                        <td className="py-3 text-center font-semibold text-teal bg-teal/5">{first}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Refund policy */}
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-3">Refund & Cancellation Policy</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-success mt-0.5 shrink-0" /> Free cancellation up to 24 hours before departure</li>
                <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-success mt-0.5 shrink-0" /> 50% refund for cancellations within 24 hours</li>
                <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-success mt-0.5 shrink-0" /> Date change available with $50 fee</li>
              </ul>
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Flight</span><span className="font-medium text-foreground">SL-101</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="font-medium text-foreground">JFK → LHR</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">Jun 15, 2026</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Class</span><span className="font-medium text-foreground">Economy</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Passengers</span><span className="font-medium text-foreground">1 Adult</span></div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-muted-foreground">Base Fare</span><span className="font-medium text-foreground">$649.00</span>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">Taxes & Fees</span><span className="font-medium text-foreground">$87.50</span></div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-gold">$736.50</span>
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full mt-6" asChild>
                <Link to="/seats">
                  Select Seats
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
