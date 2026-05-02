import { createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { User, Lock, Bell, CreditCard, Plane, Camera, Save } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Profile & Settings — SkyLine Airways" }] }),
  component: SettingsPage,
});

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payments", label: "Payment Methods", icon: CreditCard },
  { id: "travel", label: "Travel Preferences", icon: Plane },
];

function SettingsPage() {
  const [tab, setTab] = useState("personal");

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6">Profile & Settings</h1>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    tab === t.id ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-6 lg:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              {tab === "personal" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-teal/10 flex items-center justify-center text-teal text-2xl font-bold">
                        JD
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-teal flex items-center justify-center text-primary-foreground">
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">John Doe</h3>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "First Name", value: "John" },
                      { label: "Last Name", value: "Doe" },
                      { label: "Email", value: "john.doe@example.com" },
                      { label: "Phone", value: "+1 (555) 000-0000" },
                      { label: "Date of Birth", value: "1990-01-15" },
                      { label: "Nationality", value: "United States" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                        <input
                          className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                          defaultValue={f.value}
                        />
                      </div>
                    ))}
                  </div>

                  <Button variant="hero" size="lg">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}

              {tab === "security" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Current Password</label>
                      <input type="password" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
                      <input type="password" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm New Password</label>
                      <input type="password" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
                    </div>
                    <Button variant="hero" size="lg">Update Password</Button>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">Enable 2FA</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <button className="w-12 h-7 rounded-full bg-muted relative transition-colors">
                        <div className="w-5 h-5 rounded-full bg-card shadow absolute top-1 left-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {tab === "notifications" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Notification Preferences</h3>
                  {[
                    { label: "Email Notifications", desc: "Receive booking confirmations and updates via email", on: true },
                    { label: "SMS Alerts", desc: "Get text messages for flight status changes", on: true },
                    { label: "Push Notifications", desc: "Browser notifications for real-time updates", on: false },
                    { label: "Marketing Emails", desc: "Receive deals and promotional offers", on: false },
                    { label: "Price Alerts", desc: "Get notified when prices drop for saved routes", on: true },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <button className={`w-12 h-7 rounded-full relative transition-colors ${n.on ? "bg-teal" : "bg-muted"}`}>
                        <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-1 transition-transform ${n.on ? "left-6" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {tab === "payments" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Saved Payment Methods</h3>
                  <div className="space-y-3">
                    {[
                      { type: "Visa", last4: "4242", exp: "12/27" },
                      { type: "Mastercard", last4: "8888", exp: "06/26" },
                    ].map((card) => (
                      <div key={card.last4} className="flex items-center justify-between p-4 rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-navy" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{card.type} •••• {card.last4}</p>
                            <p className="text-xs text-muted-foreground">Expires {card.exp}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-error hover:text-error">Remove</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="lg">+ Add Payment Method</Button>
                </div>
              )}

              {tab === "travel" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Travel Preferences</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Class</label>
                      <select className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal appearance-none">
                        <option>Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Seat Preference</label>
                      <select className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal appearance-none">
                        <option>Window</option>
                        <option>Aisle</option>
                        <option>Middle</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Meal Preference</label>
                      <select className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal appearance-none">
                        <option>Standard</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Halal</option>
                        <option>Kosher</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Home Airport</label>
                      <input className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" defaultValue="JFK — New York" />
                    </div>
                  </div>
                  <Button variant="hero" size="lg">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
