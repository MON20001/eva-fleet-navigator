import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus, Truck, User, Shield, MapPin, MessageSquare, Bell,
  BarChart3, Settings, LogOut, Menu, X, Home, AlertTriangle,
  Navigation, Package, Users, FileText, Clock, CalendarDays
} from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const roleConfig: Record<UserRole, { labelKey: TranslationKey; icon: React.ElementType; nav: { labelKey: TranslationKey; icon: React.ElementType; id: string }[] }> = {
  worker: {
    labelKey: "role.worker",
    icon: User,
    nav: [
      { labelKey: "nav.dashboard", icon: Home, id: "dashboard" },
      { labelKey: "nav.map", icon: MapPin, id: "map" },
      { labelKey: "nav.messages", icon: MessageSquare, id: "messages" },
      { labelKey: "nav.notifications", icon: Bell, id: "notifications" },
      { labelKey: "nav.schedule", icon: CalendarDays, id: "schedule" },
      { labelKey: "nav.report", icon: AlertTriangle, id: "report" },
    ],
  },
  "bus-driver": {
    labelKey: "role.bus",
    icon: Bus,
    nav: [
      { labelKey: "nav.dashboard", icon: Home, id: "dashboard" },
      { labelKey: "nav.routemap", icon: Navigation, id: "map" },
      { labelKey: "nav.workers", icon: Users, id: "workers" },
      { labelKey: "nav.status", icon: Clock, id: "status" },
      { labelKey: "nav.schedule", icon: CalendarDays, id: "schedule" },
      { labelKey: "nav.messages", icon: MessageSquare, id: "messages" },
    ],
  },
  "truck-driver": {
    labelKey: "role.truck",
    icon: Truck,
    nav: [
      { labelKey: "nav.dashboard", icon: Home, id: "dashboard" },
      { labelKey: "nav.deliveries", icon: Package, id: "deliveries" },
      { labelKey: "nav.routemap", icon: Navigation, id: "map" },
      { labelKey: "nav.schedule", icon: CalendarDays, id: "schedule" },
      { labelKey: "nav.reports", icon: FileText, id: "reports" },
      { labelKey: "nav.messages", icon: MessageSquare, id: "messages" },
    ],
  },
  admin: {
    labelKey: "role.admin",
    icon: Shield,
    nav: [
      { labelKey: "nav.dashboard", icon: Home, id: "dashboard" },
      { labelKey: "nav.tracking", icon: MapPin, id: "map" },
      { labelKey: "nav.users", icon: Users, id: "users" },
      { labelKey: "nav.analytics", icon: BarChart3, id: "analytics" },
      { labelKey: "nav.reports", icon: FileText, id: "reports" },
      { labelKey: "nav.notifications", icon: Bell, id: "notifications" },
      { labelKey: "nav.settings", icon: Settings, id: "settings" },
    ],
  },
};

interface Props {
  children: (activeTab: string) => React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
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
        bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <img src={evaLogo} alt="EVA Transport" className="h-9 w-auto rounded-lg" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-base text-foreground">{t("eva.transport")}</h1>
            <p className="text-xs text-muted-foreground">{t(config.labelKey)} {t("dash.portal")}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {config.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`sidebar-item w-full min-h-[44px] ${activeTab === item.id ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{t(item.labelKey)}</span>
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="px-4 py-3 flex items-center gap-2 border-t border-border">
          <ThemeToggle />
          <LanguageSwitcher className="flex-1 justify-center" />
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
              <RoleIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{t(config.labelKey)}</p>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-8 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-display font-semibold text-lg">
            {t(config.nav.find((n) => n.id === activeTab)?.labelKey || "nav.dashboard")}
          </h2>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-8">
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