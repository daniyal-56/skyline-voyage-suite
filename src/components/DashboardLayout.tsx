import { Link, useRouterState } from "@tanstack/react-router";
import { Plane, LayoutDashboard, Search, BookOpen, CreditCard, Settings, LogOut, Ticket, Users, BarChart3, FileText, Radio, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitials, signOutDemoUser, useDemoAuth } from "@/lib/demo-auth";

type SidebarItem = { label: string; to: string; icon: React.ComponentType<{ className?: string }> };

const passengerLinks: SidebarItem[] = [
  { label: "Dashboard", to: "/flights", icon: LayoutDashboard },
  { label: "Search Flights", to: "/flights", icon: Search },
  { label: "My Bookings", to: "/bookings", icon: BookOpen },
  { label: "Boarding Pass", to: "/ticket", icon: Ticket },
  { label: "Payment History", to: "/payment", icon: CreditCard },
  { label: "Settings", to: "/settings", icon: Settings },
];

const adminLinks: SidebarItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Flights", to: "/admin", icon: Plane },
  { label: "Passengers", to: "/admin", icon: Users },
  { label: "Bookings", to: "/admin", icon: BookOpen },
  { label: "Revenue", to: "/admin", icon: BarChart3 },
  { label: "Reports", to: "/admin", icon: FileText },
  { label: "Settings", to: "/settings", icon: Settings },
];

const staffLinks: SidebarItem[] = [
  { label: "Dashboard", to: "/staff", icon: LayoutDashboard },
  { label: "Flight Status", to: "/staff", icon: Radio },
  { label: "Check-In", to: "/staff", icon: UserCheck },
  { label: "Passengers", to: "/staff", icon: Users },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function DashboardSidebar({ variant = "passenger" }: { variant?: "passenger" | "admin" | "staff" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const links = variant === "admin" ? adminLinks : variant === "staff" ? staffLinks : passengerLinks;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-navy min-h-screen p-4">
      <Link to="/" className="flex items-center gap-2.5 px-3 py-4 mb-6">
        <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center">
          <Plane className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-primary-foreground tracking-tight">
          SkyLine
        </span>
      </Link>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active = pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-teal/15 text-teal"
                  : "text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button onClick={signOutDemoUser} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/50 hover:text-error hover:bg-error/10 transition-all mt-4">
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </aside>
  );
}

export function DashboardHeader() {
  const { user } = useDemoAuth();
  const displayName = user?.name || "Guest Passenger";

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
            <Plane className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-foreground">{displayName}</p>
          <p className="text-xs text-muted-foreground">{user ? "Successfully logged in" : "Demo session"}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center text-teal text-sm font-semibold cursor-pointer hover:bg-teal/20 transition-colors">
          {getInitials(displayName)}
        </div>
      </div>
    </header>
  );
}
