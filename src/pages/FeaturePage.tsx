import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Route, BarChart3, Bell, Zap, Shield, Navigation, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const featureData: Record<string, { icon: React.ElementType; titleKey: string; descKey: string; color: string; demo: string }> = {
  tracking: {
    icon: MapPin,
    titleKey: "feature.tracking",
    descKey: "feature.tracking.desc",
    color: "from-primary/20 to-primary/5",
    demo: "map",
  },
  routing: {
    icon: Route,
    titleKey: "feature.routing",
    descKey: "feature.routing.desc",
    color: "from-success/20 to-success/5",
    demo: "route",
  },
  analytics: {
    icon: BarChart3,
    titleKey: "feature.analytics",
    descKey: "feature.analytics.desc",
    color: "from-warning/20 to-warning/5",
    demo: "chart",
  },
  alerts: {
    icon: Bell,
    titleKey: "feature.alerts",
    descKey: "feature.alerts.desc",
    color: "from-destructive/20 to-destructive/5",
    demo: "alerts",
  },
  "live-tracking": {
    icon: MapPin,
    titleKey: "role.worker.f1",
    descKey: "role.worker.f1.desc",
    color: "from-primary/20 to-primary/5",
    demo: "map",
  },
  "smart-routing": {
    icon: Navigation,
    titleKey: "role.bus.f2",
    descKey: "role.bus.f2.desc",
    color: "from-success/20 to-success/5",
    demo: "route",
  },
  "driver-notifications": {
    icon: Bell,
    titleKey: "role.worker.f5",
    descKey: "role.worker.f5.desc",
    color: "from-warning/20 to-warning/5",
    demo: "alerts",
  },
};

/* ── Interactive Demo Components ── */
const MapDemo = () => (
  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border/30 bg-card/50">
    <svg className="absolute inset-0 w-full h-full opacity-10">
      {[...Array(8)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={`${i * 12.5}%`} x2="100%" y2={`${i * 12.5}%`} stroke="hsl(var(--primary))" strokeWidth="0.5" />
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={`v${i}`} x1={`${i * 12.5}%`} y1="0" x2={`${i * 12.5}%`} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      ))}
    </svg>
    <svg className="absolute inset-0 w-full h-full">
      <motion.path
        d="M 10% 80% Q 30% 40%, 50% 45% T 90% 15%"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
    <motion.div
      className="absolute text-3xl"
      animate={{ x: ["5%", "80%"], y: ["75%", "10%"] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      🚌
    </motion.div>
    {[{ left: "25%", top: "55%" }, { left: "55%", top: "35%" }, { left: "75%", top: "20%" }].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
        style={pos}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ delay: 0.5 + i * 0.3, duration: 2, repeat: Infinity }}
      />
    ))}
  </div>
);

const ChartDemo = () => (
  <div className="w-full h-64 sm:h-80 rounded-2xl border border-border/30 bg-card/50 p-6 flex items-end gap-3">
    {[65, 78, 90, 45, 85, 92, 70, 88, 95, 60].map((v, i) => (
      <motion.div
        key={i}
        className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-primary/80 relative overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: `${v}%` }}
        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-primary/20"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      </motion.div>
    ))}
  </div>
);

const AlertsDemo = () => {
  const alerts = [
    { text: "Bus A-01 arriving in 2 min", type: "info" },
    { text: "Route B: Traffic delay detected", type: "warning" },
    { text: "Driver Omar completed route", type: "success" },
    { text: "Emergency: Bus A-02 breakdown", type: "error" },
  ];

  return (
    <div className="w-full space-y-3">
      {alerts.map((alert, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, duration: 0.5 }}
          className={`glass-card p-4 flex items-center gap-3 border-l-4 ${
            alert.type === "info" ? "border-l-primary" :
            alert.type === "warning" ? "border-l-warning" :
            alert.type === "success" ? "border-l-success" : "border-l-destructive"
          }`}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
          >
            <Bell className={`w-5 h-5 ${
              alert.type === "info" ? "text-primary" :
              alert.type === "warning" ? "text-warning" :
              alert.type === "success" ? "text-success" : "text-destructive"
            }`} />
          </motion.div>
          <p className="text-sm font-medium">{alert.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

const RouteDemo = () => (
  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border/30 bg-card/50">
    <svg className="absolute inset-0 w-full h-full">
      <motion.path
        d="M 5% 90% C 20% 60%, 35% 30%, 50% 50% S 80% 20%, 95% 10%"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeDasharray="0"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M 5% 90% C 25% 70%, 40% 50%, 50% 60% S 75% 30%, 95% 10%"
        fill="none" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="6 3" opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
      />
    </svg>
    <motion.div
      className="absolute text-2xl"
      animate={{ x: ["3%", "90%"], y: ["85%", "5%"] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      🚛
    </motion.div>
    <div className="absolute bottom-4 left-4 glass-card px-3 py-2 text-xs">
      <span className="text-primary font-medium">Optimized</span> vs <span className="text-muted-foreground">Original</span>
    </div>
  </div>
);

const FeaturePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const feature = featureData[id || ""];
  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-2xl font-display font-bold mb-4">Feature not found</p>
          <button onClick={() => navigate("/")} className="btn-premium">{t("notfound.back")}</button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;
  const demoMap: Record<string, React.ReactNode> = {
    map: <MapDemo />,
    chart: <ChartDemo />,
    alerts: <AlertsDemo />,
    route: <RouteDemo />,
  };

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      <ParticleField count={15} />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
          <span className="font-display font-bold text-sm hidden sm:block">EVA Transport</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8"
          style={{ boxShadow: "0 0 40px hsl(var(--glow-primary))" }}
        >
          <Icon className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-5xl font-bold mb-4"
        >
          {t(feature.titleKey as any)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-12"
        >
          {t(feature.descKey as any)}
        </motion.p>
      </section>

      {/* Interactive Demo */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("feature.demo")}</p>
          <div className="w-12 h-0.5 bg-primary mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {demoMap[feature.demo]}
        </motion.div>
      </section>

      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground border-t border-border/30">
        © 2026 EVA Transport. All rights reserved.
      </footer>
    </div>
  );
};

export default FeaturePage;
