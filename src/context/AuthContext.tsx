"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getRoleFromToken } from "@/lib/auth";

interface AuthUser {
  role: string;
  email?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get role from cookie (non-httpOnly) or from /me endpoint
    const cookieToken = getCookieValue("accessToken");
    if (cookieToken) {
      const role = getRoleFromToken(cookieToken);
      if (role) setUser({ role });
    }
    setLoading(false);
  }, []);

  async function logout() {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}