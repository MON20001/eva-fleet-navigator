import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus, Truck, User, Shield, MapPin, MessageSquare, Bell,
  BarChart3, Settings, LogOut, Menu, X, Home, AlertTriangle,
  Navigation, Package, Users, FileText, Clock
} from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType; nav: { label: string; icon: React.ElementType; id: string }[] }> = {
  worker: {
    label: "Worker",
    icon: User,
    nav: [
      { label: "Dashboard", icon: Home, id: "dashboard" },
      { label: "Live Map", icon: MapPin, id: "map" },
      { label: "Messages", icon: MessageSquare, id: "messages" },
      { label: "Notifications", icon: Bell, id: "notifications" },
      { label: "Report Issue", icon: AlertTriangle, id: "report" },
    ],
  },
  "bus-driver": {
    label: "Bus Driver",
    icon: Bus,
    nav: [
      { label: "Dashboard", icon: Home, id: "dashboard" },
      { label: "Route Map", icon: Navigation, id: "map" },
      { label: "Workers", icon: Users, id: "workers" },
      { label: "Status Update", icon: Clock, id: "status" },
      { label: "Messages", icon: MessageSquare, id: "messages" },
    ],
  },
  "truck-driver": {
    label: "Truck Driver",
    icon: Truck,
    nav: [
      { label: "Dashboard", icon: Home, id: "dashboard" },
      { label: "Deliveries", icon: Package, id: "deliveries" },
      { label: "Route Map", icon: Navigation, id: "map" },
      { label: "Reports", icon: FileText, id: "reports" },
      { label: "Messages", icon: MessageSquare, id: "messages" },
    ],
  },
  admin: {
    label: "Admin",
    icon: Shield,
    nav: [
      { label: "Dashboard", icon: Home, id: "dashboard" },
      { label: "Live Tracking", icon: MapPin, id: "map" },
      { label: "Users", icon: Users, id: "users" },
      { label: "Analytics", icon: BarChart3, id: "analytics" },
      { label: "Reports", icon: FileText, id: "reports" },
      { label: "Notifications", icon: Bell, id: "notifications" },
      { label: "Settings", icon: Settings, id: "settings" },
    ],
  },
};

interface Props {
  children: (activeTab: string) => React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;
  const config = roleConfig[user.role];
  const RoleIcon = config.icon;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col
        bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">E</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">EVA Transport</h1>
            <p className="text-xs text-muted-foreground">{config.label} Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {config.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`sidebar-item w-full ${activeTab === item.id ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <RoleIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-8 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-display font-semibold text-lg">
            {config.nav.find((n) => n.id === activeTab)?.label || "Dashboard"}
          </h2>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children(activeTab)}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
