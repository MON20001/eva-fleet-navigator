import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bus, Truck, User, Shield, ArrowRight, MapPin, Bell, BarChart3, Route, Zap, ChevronDown } from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";
import FloatingShapes from "@/components/FloatingShapes";
import WorkerDashboard from "./WorkerDashboard";
import BusDriverDashboard from "./BusDriverDashboard";
import TruckDriverDashboard from "./TruckDriverDashboard";
import AdminDashboard from "./AdminDashboard";

const roles: { role: UserRole; label: string; desc: string; icon: React.ElementType; gradient: string }[] = [
  { role: "worker", label: "Worker", desc: "Track buses & communicate with drivers", icon: User, gradient: "from-primary/20 to-primary/5" },
  { role: "bus-driver", label: "Bus Driver", desc: "Manage routes & worker pickups", icon: Bus, gradient: "from-primary/20 to-primary/5" },
  { role: "truck-driver", label: "Truck Driver", desc: "Handle deliveries & logistics", icon: Truck, gradient: "from-primary/20 to-primary/5" },
  { role: "admin", label: "Supervisor", desc: "Full system control & analytics", icon: Shield, gradient: "from-primary/20 to-primary/5" },
];

const features = [
  { icon: MapPin, label: "Real-Time Tracking", desc: "Live GPS positions for your entire fleet updated every second" },
  { icon: Route, label: "Smart Routing", desc: "AI-optimized routes that save fuel and reduce travel time" },
  { icon: BarChart3, label: "Advanced Analytics", desc: "Deep insights into fleet performance and efficiency metrics" },
  { icon: Bell, label: "Instant Alerts", desc: "Real-time notifications for arrivals, delays, and emergencies" },
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "50K+", label: "Trips Daily" },
  { value: "<2s", label: "GPS Refresh" },
  { value: "30%", label: "Cost Savings" },
];

/* ── Scroll-reveal section ── */
const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/* ── 3D Tilt Card ── */
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`);
  };

  return (
    <div
      className={className}
      style={{ transform, transition: "transform 0.2s ease-out" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)")}
    >
      {children}
    </div>
  );
};

const Landing = () => {
  const { setPendingRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setPendingRole(role);
    navigate("/intro");
  };

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      <ParticleField count={25} />
      <FloatingShapes />

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* ── Header ── */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <img src={evaLogo} alt="EVA Transport" className="h-12 w-auto rounded-lg" />
          <span className="font-display font-bold text-xl">EVA Transport</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="hidden sm:flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-xs text-muted-foreground">System Online</span>
          </div>
        </motion.div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 lg:pt-28 pb-20 text-center">
        {/* Radial glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary mb-8"
          >
            <Zap className="w-3 h-3" />
            Next-Gen Fleet Management
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block"
            >
              Smart Employee
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block text-gradient-wide"
            >
              Transportation
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Real-time tracking, intelligent routing, and seamless communication for your entire fleet.
            Powered by precision technology.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2 text-muted-foreground mt-12"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <RevealSection className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-32">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Platform Capabilities</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">Built for the Future</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card-premium p-8 h-full group cursor-default transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0"
                      style={{ boxShadow: "0 0 30px hsl(var(--glow-primary))" }}
                    >
                      <f.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{f.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ══════════ ROLE SELECTION ══════════ */}
      <RevealSection className="relative z-10 max-w-5xl mx-auto px-6 py-20 sm:py-32">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Get Started</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">Select Your Role</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Choose your role to explore the platform and get started with your personalized experience.</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoleSelect(r.role)}
                  className="glass-card-premium p-7 text-left w-full group transition-all duration-500 hover:border-primary/40"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-5"
                    style={{ boxShadow: "0 0 25px hsl(var(--glow-primary))" }}
                  >
                    <r.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{r.label}</h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{r.desc}</p>
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Enter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center py-10 text-xs text-muted-foreground border-t border-border/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <span className="tracking-widest uppercase">EVA Transport</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
        © 2026 All rights reserved. Built with precision.
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
