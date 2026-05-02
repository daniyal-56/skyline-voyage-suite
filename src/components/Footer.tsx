import { Link } from "@tanstack/react-router";
import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SkyLine <span className="font-light">Airways</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Your premium partner for seamless air travel. Book with confidence, fly with comfort.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-primary-foreground/5 hover:bg-teal/20 flex items-center justify-center text-primary-foreground/50 hover:text-teal transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Partners"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-primary-foreground/50 hover:text-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Safety", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-primary-foreground/50 hover:text-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Newsletter</h4>
            <p className="text-sm text-primary-foreground/50 mb-4">Get exclusive deals and travel updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-teal/50"
              />
              <Button variant="teal" size="default">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/40">
            © 2026 SkyLine Airways. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
