import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "worker" | "bus-driver" | "truck-driver" | "admin";

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  worker: { id: "1", name: "Ahmed Hassan", role: "worker" },
  "bus-driver": { id: "2", name: "Omar Khalil", role: "bus-driver" },
  "truck-driver": { id: "3", name: "Youssef Ali", role: "truck-driver" },
  admin: { id: "4", name: "Sara Mohamed", role: "admin" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
