import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail, Plane, QrCode } from "lucide-react";

export const Route = createFileRoute("/ticket")({
  head: () => ({ meta: [{ title: "E-Ticket Confirmation — SkyLine Airways" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    seats: ((search.seats as string) || undefined) as string | undefined,
    classes: ((search.classes as string) || undefined) as string | undefined,
    total: ((search.total as string) || undefined) as string | undefined,
  }),
  component: TicketPage,
});

function TicketPage() {
  const search = Route.useSearch();
  const seats = search.seats || "12A";
  const classes = search.classes || "Economy";
  const total = search.total || "736.50";

  const seatList = seats.split(",");
  const classList = classes.split(",");
  const seatDisplay = seatList.map((s: string, i: number) => `${s} · ${classList[i] || "Economy"}`).join("  |  ");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-2">Your e-ticket has been generated. Have a great flight!</p>
        </div>

        <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="bg-navy p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground font-bold">SkyLine Airways</p>
                <p className="text-primary-foreground/60 text-xs">Boarding Pass</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/60 text-xs">Booking ID</p>
              <p className="text-primary-foreground font-mono font-bold text-lg">SL-2026-78542</p>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Passenger</p>
                <p className="text-sm font-semibold text-foreground">John Doe</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Flight</p>
                <p className="text-sm font-semibold text-foreground">SL-101</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="text-sm font-semibold text-foreground">Jun 15, 2026</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Gate</p>
                <p className="text-sm font-semibold text-foreground">B24</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-5 mb-8">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-2xl font-bold text-foreground">JFK</p>
                <p className="text-xs text-muted-foreground">New York</p>
              </div>
              <div className="flex flex-col items-center">
                <Plane className="w-5 h-5 text-teal rotate-90 mb-1" />
                <div className="w-20 h-px bg-border" />
                <p className="text-xs text-teal mt-1">7h 15m</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">To</p>
                <p className="text-2xl font-bold text-foreground">LHR</p>
                <p className="text-xs text-muted-foreground">London</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Departure</p>
                <p className="text-sm font-semibold text-foreground">08:30 AM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Arrival</p>
                <p className="text-sm font-semibold text-foreground">08:45 PM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Seat(s)</p>
                <p className="text-sm font-semibold text-foreground">{seatDisplay}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                <p className="text-sm font-semibold text-gold">${parseFloat(total).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col items-center py-6 border-t border-dashed border-border">
              <div className="w-32 h-32 rounded-2xl bg-foreground/5 flex items-center justify-center mb-3">
                <QrCode className="w-16 h-16 text-foreground/30" />
              </div>
              <p className="text-xs text-muted-foreground">Scan at boarding gate</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button variant="hero" size="lg" className="flex-1">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <Mail className="w-4 h-4" />
            Email Ticket
          </Button>
        </div>

        <div className="text-center mt-8">
          <Link to="/bookings" className="text-teal text-sm font-medium hover:underline">
            View All Bookings →
          </Link>
        </div>
      </main>
    </div>
  );
}
