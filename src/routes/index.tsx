import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FlightSearchWidget } from "@/components/FlightSearchWidget";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Shield, Clock, CreditCard, Headphones, Star, ArrowRight, Plane, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyLine Airways — Book Your Journey With Comfort & Confidence" },
      { name: "description", content: "Search, reserve, and manage flights effortlessly with SkyLine Airways. Premium airline booking platform." },
    ],
  }),
  component: Index,
});

const destinations = [
  { city: "Paris", country: "France", price: 349, rating: 4.8, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" },
  { city: "Dubai", country: "UAE", price: 499, rating: 4.9, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
  { city: "Istanbul", country: "Turkey", price: 299, rating: 4.7, img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop" },
  { city: "Tokyo", country: "Japan", price: 599, rating: 4.9, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop" },
  { city: "New York", country: "USA", price: 279, rating: 4.6, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop" },
  { city: "Bali", country: "Indonesia", price: 449, rating: 4.8, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop" },
];

const features = [
  { icon: Clock, title: "Fast Booking", desc: "Book your flight in under 2 minutes with our streamlined process." },
  { icon: Shield, title: "Secure Payments", desc: "Your transactions are protected with bank-level encryption." },
  { icon: Plane, title: "Real-Time Updates", desc: "Get instant notifications about flight status and gate changes." },
  { icon: Headphones, title: "24/7 Support", desc: "Our team is always available to assist you anytime, anywhere." },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Frequent Flyer", text: "SkyLine Airways makes booking so effortless. The interface is beautiful and intuitive. Highly recommend!", rating: 5 },
  { name: "James Rodriguez", role: "Business Traveler", text: "The best airline booking platform I've used. Seamless experience from search to boarding pass.", rating: 5 },
  { name: "Emily Chen", role: "Travel Blogger", text: "I love the real-time updates and the premium feel. It truly feels like flying first class from the start.", rating: 5 },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-6">
              <Plane className="w-4 h-4" />
              Premium Air Travel Experience
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight tracking-tight">
              Book Your Journey With
              <br />
              <span className="text-teal">Comfort & Confidence</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Search, reserve, and manage flights effortlessly with SkyLine Airways.
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <FlightSearchWidget />
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Popular Destinations</h2>
            <p className="mt-3 text-muted-foreground text-lg">Explore trending destinations loved by our travelers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <div key={d.city} className="group bg-card rounded-2xl overflow-hidden card-hover" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={d.img} alt={d.city} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-navy/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    {d.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {d.country}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{d.city}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <p className="text-xl font-bold text-teal">${d.price}</p>
                    </div>
                    <Button variant="teal" size="sm" asChild>
                      <Link to="/flights">Explore</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Choose SkyLine</h2>
            <p className="mt-3 text-muted-foreground text-lg">Premium features for the modern traveler</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-7 card-hover text-center" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What Travelers Say</h2>
            <p className="mt-3 text-muted-foreground text-lg">Trusted by thousands of happy passengers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-7 card-hover" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-semibold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">Ready to Take Off?</h2>
          <p className="text-lg text-primary-foreground/60 mb-10 max-w-2xl mx-auto">
            Join millions of travelers who trust SkyLine Airways for a seamless booking experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/flights">
                Search Flights
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating chat button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-teal text-primary-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 z-50">
        <Headphones className="w-6 h-6" />
      </button>
    </div>
  );
}
