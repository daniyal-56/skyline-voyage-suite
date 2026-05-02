import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — SkyLine Airways" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-muted-foreground text-center mb-12">We'd love to hear from you</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, label: "Email", value: "support@skylineairways.com" },
            { icon: Phone, label: "Phone", value: "+1 (800) 555-0199" },
            { icon: MapPin, label: "Address", value: "New York, NY 10001" },
          ].map((c) => (
            <div key={c.label} className="bg-card rounded-2xl p-6 text-center card-hover" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-3">
                <c.icon className="w-6 h-6 text-teal" />
              </div>
              <p className="text-sm font-semibold text-foreground">{c.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-2xl p-8 max-w-lg mx-auto" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="space-y-4">
            <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal" placeholder="Your Name" />
            <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal" placeholder="Your Email" />
            <textarea className="w-full h-32 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal resize-none" placeholder="Your Message" />
            <Button variant="hero" size="lg" className="w-full">Send Message</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
