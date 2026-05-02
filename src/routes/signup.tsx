import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plane, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { useState } from "react";
import authBg from "@/assets/auth-bg.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — SkyLine Airways" },
      { name: "description", content: "Create your SkyLine Airways account and start booking." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy/70" />
        <div className="relative z-10 p-16 max-w-lg">
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground tracking-tight">
              SkyLine <span className="font-light">Airways</span>
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
            Start Your<br />Journey Today.
          </h2>
          <p className="text-primary-foreground/60 leading-relaxed">
            Create an account to unlock exclusive deals and manage your flights with ease.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">SkyLine Airways</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">Fill in your details to get started</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <User className="w-4 h-4 text-muted-foreground" />
                <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="you@example.com" type="email" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="••••••••" type={showPw ? "text" : "password"} />
                <button onClick={() => setShowPw(!showPw)} className="text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input className="w-full text-sm bg-transparent focus:outline-none" placeholder="••••••••" type="password" />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-teal focus:ring-teal mt-0.5" />
              <span className="text-xs text-muted-foreground">
                I agree to the <a href="#" className="text-teal hover:underline">Terms of Service</a> and <a href="#" className="text-teal hover:underline">Privacy Policy</a>
              </span>
            </label>

            <Button variant="hero" size="lg" className="w-full">Create Account</Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-4 text-xs text-muted-foreground">Or sign up with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">Google</Button>
              <Button variant="outline" size="lg">Apple</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-teal font-semibold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
