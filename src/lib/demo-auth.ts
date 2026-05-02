import { useEffect, useState } from "react";

export type DemoUser = {
  name: string;
  email: string;
};

const AUTH_KEY = "skyline-demo-user";
const AUTH_EVENT = "skyline-auth-change";

const fallbackUser: DemoUser = {
  name: "John Doe",
  email: "john.doe@skyline.demo",
};

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    window.localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function signInDemoUser(email: string, name?: string) {
  const cleanEmail = email.trim().toLowerCase();
  const derivedName = cleanEmail
    ? cleanEmail
        .split("@")[0]
        .split(/[._-]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : fallbackUser.name;

  const user = {
    name: name?.trim() || derivedName || fallbackUser.name,
    email: cleanEmail || fallbackUser.email,
  };
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
  return user;
}

export function signOutDemoUser() {
  window.localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "SL"
  );
}

export function useDemoAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const refresh = () => setUser(getDemoUser());

    refresh();
    window.addEventListener(AUTH_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(AUTH_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { user, isLoggedIn: Boolean(user) };
}
