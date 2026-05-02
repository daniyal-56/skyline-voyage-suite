import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Shield, Plane } from "lucide-react";

const searchSchema = {
  seats: "",
  classes: "",
  baseFare: "649",
  seatSurcharge: "0",
  taxes: "87.50",
  total: "736.50",
};

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — SkyLine Airways" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    seats: (search.seats as string) || searchSchema.seats,
    classes: (search.classes as string) || searchSchema.classes,
    baseFare: (search.baseFare as string) || searchSchema.baseFare,
    seatSurcharge: (search.seatSurcharge as string) || searchSchema.seatSurcharge,
    taxes: (search.taxes as string) || searchSchema.taxes,
    total: (search.total as string) || searchSchema.total,
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { seats, classes, baseFare, seatSurcharge, taxes, total } = Route.useSearch();

  const seatList = seats ? seats.split(",") : [];
  const classList = classes ? classes.split(",") : [];
  const seatDisplay = seatList.length > 0
    ? seatList.map((s, i) => `${s} (${classList[i] || "Economy"})`).join(", ")
    : "12A (Economy)";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h1>
        <p className="text-muted-foreground mb-8">Secure checkout for your flight booking</p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Booking summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">JFK → LHR</p>
                  <p className="text-xs text-muted-foreground">Jun 15, 2026 · SL-101</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Passenger</span><span className="text-foreground">John Doe</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Seat(s)</span><span className="text-foreground text-right max-w-[180px]">{seatDisplay}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Base Fare</span><span className="text-foreground">${parseFloat(baseFare).toFixed(2)}</span></div>
                {parseFloat(seatSurcharge) > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Seat Upgrade</span><span className="text-foreground">+${parseFloat(seatSurcharge).toFixed(2)}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Taxes & Fees</span><span className="text-foreground">${parseFloat(taxes).toFixed(2)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-xl text-gold">${parseFloat(total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-card rounded-2xl p-6 lg:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Payment Details</h3>

              <div className="flex gap-3 mb-6">
                {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((m, i) => (
                  <button key={m} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${i === 0 ? "border-teal bg-teal/5 text-teal" : "border-border text-muted-foreground hover:border-teal/50"}`}>
                    {m}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Cardholder Name</label>
                  <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Card Number</label>
                  <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="4242 4242 4242 4242" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry Date</label>
                    <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">CVV</label>
                    <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Billing Address</label>
                  <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" placeholder="123 Main St, New York, NY" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-success/5 border border-success/20">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-xs text-success font-medium">256-bit SSL encrypted · Secure payment</span>
              </div>

              <Button variant="hero" size="xl" className="w-full mt-6" asChild>
                <Link to="/ticket" search={{ seats, classes, total }}>
                  <Lock className="w-4 h-4" />
                  Confirm Payment — ${parseFloat(total).toFixed(2)}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
