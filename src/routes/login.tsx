import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plane, Lock, Mail, UserCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";
    const body = isRegistering ? { email, password, role } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isRegistering) {
        // Automatically switch to login mode after successful registration
        setIsRegistering(false);
        setPassword("");
        setError("Registration successful! Please log in.");
      } else {
        // SUCCESSFUL LOGIN! Save the digital ID card (token) and user info
        localStorage.setItem("skyline_token", data.token);
        localStorage.setItem("skyline_user", JSON.stringify(data.user));

        // Redirect based on their real backend role
        if (data.user.role === "admin") navigate({ to: "/admin" });
        else if (data.user.role === "staff") navigate({ to: "/staff" });
        else navigate({ to: "/flights" });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
            <Plane className="w-6 h-6 text-teal" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isRegistering ? "Create an Account" : "Welcome to SkyLine"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isRegistering ? "Register your secure profile" : "Sign in to your account"}
          </p>
        </div>

        {error && (
          <div className={`p-3 rounded-lg mb-6 flex items-center gap-2 text-sm ${error.includes('successful') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-teal" />
            </div>
          </div>

          {/* Only show Role selection if creating a new account */}
          {isRegistering && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Assign Role</label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-teal appearance-none cursor-pointer">
                  <option value="customer">Customer</option>
                  <option value="staff">Gate Agent (Staff)</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-teal" />
            </div>
          </div>

          <Button type="submit" variant="teal" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Processing..." : (isRegistering ? "Register Account" : "Sign In Securely")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => { setIsRegistering(!isRegistering); setError(""); }} className="text-sm text-teal hover:underline focus:outline-none">
            {isRegistering ? "Already have an account? Sign in" : "Need an account? Register here"}
          </button>
        </div>

      </div>
    </div>
  );
}