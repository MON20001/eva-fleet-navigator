import { useAuth, UserRole } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Bus, Truck, User, Shield, ArrowRight, MapPin, Bell, BarChart3 } from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import WorkerDashboard from "./WorkerDashboard";
import BusDriverDashboard from "./BusDriverDashboard";
import TruckDriverDashboard from "./TruckDriverDashboard";
import AdminDashboard from "./AdminDashboard";

const roles: { role: UserRole; label: string; desc: string; icon: React.ElementType }[] = [
  { role: "worker", label: "Worker", desc: "Track buses & communicate with drivers", icon: User },
  { role: "bus-driver", label: "Bus Driver", desc: "Manage routes & worker pickups", icon: Bus },
  { role: "truck-driver", label: "Truck Driver", desc: "Handle deliveries & logistics", icon: Truck },
  { role: "admin", label: "Admin", desc: "Full system control & analytics", icon: Shield },
];

const features = [
  { icon: MapPin, label: "Live GPS Tracking", desc: "Real-time bus and truck locations" },
  { icon: Bell, label: "Smart Notifications", desc: "Instant alerts and updates" },
  { icon: BarChart3, label: "Analytics Dashboard", desc: "Performance insights and reports" },
];

const Landing = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">E</span>
          </div>
          <span className="font-display font-bold text-xl">EVA Transport</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-12 lg:pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Smart Employee
            <br />
            <span className="text-gradient">Transportation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            Real-time tracking, intelligent routing, and seamless communication for your entire fleet.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {features.map((f, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <f.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-sm mb-1">{f.label}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-display text-xl font-semibold mb-6">Select your role to continue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {roles.map((r, i) => (
              <motion.button
                key={r.role}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => login(r.role)}
                className="glass-card-hover p-6 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">{r.label}</h3>
                <p className="text-xs text-muted-foreground mb-4">{r.desc}</p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium">
                  Enter <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground border-t border-border">
        © 2026 EVA Transport. All rights reserved.
      </footer>
    </div>
  );
};

const Index = () => {
  const { user } = useAuth();

  if (!user) return <Landing />;

  switch (user.role) {
    case "worker": return <WorkerDashboard />;
    case "bus-driver": return <BusDriverDashboard />;
    case "truck-driver": return <TruckDriverDashboard />;
    case "admin": return <AdminDashboard />;
  }
};

export default Index;
