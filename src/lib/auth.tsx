import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "staff" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@educore.io": {
    password: "admin123",
    user: {
      id: "u-admin",
      name: "Sadiq",
      email: "admin@educore.io",
      role: "admin",
      department: "Administration",
    },
  },
  "staff@educore.io": {
    password: "staff123",
    user: {
      id: "u-staff",
      name: "Prof. Michael Reed",
      email: "staff@educore.io",
      role: "staff",
      department: "Computer Science",
    },
  },
  "student@educore.io": {
    password: "student123",
    user: {
      id: "u-student",
      name: "Aisha Patel",
      email: "student@educore.io",
      role: "student",
      department: "Computer Science",
    },
  },
};

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "educore.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const entry = DEMO_USERS[email.toLowerCase().trim()];
    if (!entry || entry.password !== password) {
      throw new Error("Invalid email or password");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user));
    setUser(entry.user);
    return entry.user;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const DEMO_CREDENTIALS = [
  { role: "Admin", email: "admin@educore.io", password: "admin123" },
  { role: "Staff", email: "staff@educore.io", password: "staff123" },
  { role: "Student", email: "student@educore.io", password: "student123" },
] as const;