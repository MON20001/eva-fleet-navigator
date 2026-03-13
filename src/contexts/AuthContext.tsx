import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "worker" | "bus-driver" | "truck-driver" | "admin";

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  pendingRole: UserRole | null;
  setPendingRole: (role: UserRole) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("eva-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  // Persist user session
  useEffect(() => {
    if (user) {
      localStorage.setItem("eva-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("eva-user");
    }
  }, [user]);

  const login = (name: string, _email: string) => {
    if (!pendingRole) return;
    setUser({
      id: crypto.randomUUID(),
      name,
      role: pendingRole,
    });
    setPendingRole(null);
  };

  const logout = () => {
    setUser(null);
    setPendingRole(null);
    localStorage.removeItem("eva-user");
  };

  return (
    <AuthContext.Provider value={{ user, pendingRole, setPendingRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
