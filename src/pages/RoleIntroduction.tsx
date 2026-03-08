import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  MapPin, Bell, MessageSquare, Route, Bus, Truck, Shield,
  Navigation, Clock, AlertTriangle, Package, BarChart3,
  Users, CheckCircle, ArrowRight, Zap, Eye, Send, Map
} from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";

/* ── role content ── */
interface RoleContent {
  title: string;
  subtitle: string;
  heroDesc: string;
  icon: React.ElementType;
  features: { icon: React.ElementType; title: string; desc: string }[];
  demoTitle: string;
  demoDesc: string;
  benefits: string[];
}

const roleContent: Record<UserRole, RoleContent> = {
  worker: {
    title: "Your Commute,\nReimagined",
    subtitle: "Worker Platform",
    heroDesc: "Track buses in real-time, know exact arrival times, and communicate directly with drivers — all from your phone.",
    icon: Users,
    features: [
      { icon: Map, title: "Live Bus Tracking", desc: "See every bus on an interactive real-time map with GPS accuracy." },
      { icon: Route, title: "Routes & Arrivals", desc: "Know your bus route, stops, and estimated arrival times instantly." },
      { icon: MessageSquare, title: "Quick Messages", desc: "Send messages to your driver — request stops or report issues." },
      { icon: MapPin, title: "Nearby Stop Requests", desc: "Request the driver to stop at the nearest location to you." },
      { icon: Bell, title: "Smart Notifications", desc: "Get alerts when your bus is approaching or there's a delay." },
      { icon: AlertTriangle, title: "Report Problems", desc: "Report issues directly and get immediate admin attention." },
    ],
    demoTitle: "Watch Your Bus Arrive",
    demoDesc: "The live map shows buses moving in real-time along their routes. Workers at each stop see arrival countdowns and can interact with drivers.",
    benefits: ["Save 30+ minutes daily with live ETAs", "Never miss your ride with smart alerts", "Direct driver communication", "Instant issue resolution"],
  },
  "bus-driver": {
    title: "Drive Smarter,\nNot Harder",
    subtitle: "Bus Driver Platform",
    heroDesc: "View worker locations, follow optimized routes, manage pickups, and stay connected with your team in real-time.",
    icon: Bus,
    features: [
      { icon: Eye, title: "Worker Locations", desc: "See all workers waiting at assigned pickup points on your route." },
      { icon: Route, title: "Optimized Routes", desc: "Follow AI-optimized routes that minimize travel time and fuel." },
      { icon: Clock, title: "Pickup Schedules", desc: "Manage your pickup schedule with real-time adjustments." },
      { icon: AlertTriangle, title: "Status Updates", desc: "Notify workers and admin about traffic delays or breakdowns." },
      { icon: MessageSquare, title: "Team Communication", desc: "Chat with workers and supervisors directly from the app." },
      { icon: Navigation, title: "Turn-by-Turn Nav", desc: "Built-in navigation with route guidance and live traffic." },
    ],
    demoTitle: "Your Route, Your Dashboard",
    demoDesc: "Watch as worker markers appear along your route. Status updates flow in real-time, and your schedule adapts dynamically to conditions.",
    benefits: ["Reduce route time by 25%", "Zero missed pickups", "Instant admin support", "Stress-free driving experience"],
  },
  "truck-driver": {
    title: "Deliver With\nConfidence",
    subtitle: "Truck Driver Platform",
    heroDesc: "Follow delivery routes, update statuses in real-time, report issues, and keep the logistics chain running smoothly.",
    icon: Truck,
    features: [
      { icon: Route, title: "Delivery Routes", desc: "Optimized delivery routes with multiple checkpoint support." },
      { icon: CheckCircle, title: "Status Updates", desc: "Update delivery status at each checkpoint with one tap." },
      { icon: AlertTriangle, title: "Traffic Reports", desc: "Report road conditions and traffic to help reroute logistics." },
      { icon: MessageSquare, title: "Admin Communication", desc: "Direct line to supervisors for urgent delivery decisions." },
      { icon: Package, title: "Cargo Tracking", desc: "Track cargo details, quantities, and delivery requirements." },
      { icon: Navigation, title: "Route Guidance", desc: "GPS navigation optimized for truck-specific road restrictions." },
    ],
    demoTitle: "Track Every Delivery",
    demoDesc: "See your truck moving along logistics routes with delivery checkpoints lighting up as you progress. Cargo status updates flow in real-time.",
    benefits: ["On-time delivery rate 98%+", "Fewer route deviations", "Instant issue escalation", "Complete cargo visibility"],
  },
  admin: {
    title: "Command Your\nEntire Fleet",
    subtitle: "Supervisor Platform",
    heroDesc: "Full visibility over every bus, truck, driver, and worker. Analytics, communications, and control — all in one dashboard.",
    icon: Shield,
    features: [
      { icon: Map, title: "Fleet Overview", desc: "See every vehicle on a live map with real-time status indicators." },
      { icon: BarChart3, title: "Analytics Dashboard", desc: "Performance metrics, route efficiency, and operational insights." },
      { icon: Users, title: "Team Management", desc: "Manage drivers, workers, routes, and schedules from one place." },
      { icon: Bell, title: "Alert Center", desc: "Receive and manage all alerts, reports, and notifications." },
      { icon: MessageSquare, title: "Broadcast Messages", desc: "Send messages to individuals, groups, or the entire fleet." },
      { icon: Zap, title: "Quick Actions", desc: "Reassign routes, respond to emergencies, and approve requests." },
    ],
    demoTitle: "Your Fleet at a Glance",
    demoDesc: "The command center shows every vehicle, worker, and route in real-time. Drill into any metric, communicate with anyone, and make decisions instantly.",
    benefits: ["100% fleet visibility", "50% faster incident response", "Data-driven decisions", "Unified communication hub"],
  },
};

/* ── animated section wrapper ── */
const Section = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

/* ── floating particle ── */
const Particle = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay }}
  />
);

/* ── animated map visualization ── */
const MapVisualization = ({ role }: { role: UserRole }) => {
  const isWorker = role === "worker" || role === "bus-driver";
  const vehicleIcon = role === "truck-driver" ? "🚛" : "🚌";

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-border/30" style={{ background: "hsla(var(--glass-bg))" }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(10)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Route line */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 10% 80% Q 30% 50%, 50% 45% T 90% 20%"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      {/* Moving vehicle */}
      <motion.div
        className="absolute text-3xl"
        animate={{ x: ["5%", "80%"], y: ["75%", "15%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {vehicleIcon}
      </motion.div>

      {/* Worker/stop markers */}
      {isWorker && (
        <>
          {[
            { left: "25%", top: "55%", delay: 0.8 },
            { left: "45%", top: "42%", delay: 1.2 },
            { left: "65%", top: "30%", delay: 1.6 },
          ].map((m, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: m.left, top: m.top }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: m.delay, duration: 0.5, type: "spring" }}
            >
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              <span className="text-[10px] text-primary/70 mt-1">Stop {i + 1}</span>
            </motion.div>
          ))}
        </>
      )}

      {/* Checkpoint markers for truck */}
      {role === "truck-driver" && (
        <>
          {[
            { left: "20%", top: "65%", label: "Pickup" },
            { left: "50%", top: "42%", label: "Checkpoint" },
            { left: "78%", top: "22%", label: "Delivery" },
          ].map((m, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: m.left, top: m.top }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.5, type: "spring" }}
            >
              <div className="w-4 h-4 rounded-sm bg-primary/80 border border-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              <span className="text-[10px] text-primary/70 mt-1">{m.label}</span>
            </motion.div>
          ))}
        </>
      )}

      {/* Admin fleet dots */}
      {role === "admin" && (
        <>
          {[
            { left: "15%", top: "60%", emoji: "🚌" },
            { left: "35%", top: "35%", emoji: "🚌" },
            { left: "55%", top: "55%", emoji: "🚛" },
            { left: "75%", top: "25%", emoji: "🚛" },
            { left: "60%", top: "70%", emoji: "🚌" },
          ].map((m, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{ left: m.left, top: m.top }}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ delay: 0.5 + i * 0.3, duration: 2, repeat: Infinity }}
            >
              {m.emoji}
            </motion.div>
          ))}
        </>
      )}

      {/* Notification popup */}
      <motion.div
        className="absolute right-4 top-4 glass-card px-3 py-2 flex items-center gap-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: [0, 1, 1, 0], x: [30, 0, 0, 30] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Bell className="w-3 h-3 text-primary" />
        <span className="text-xs text-foreground/80">Bus arriving in 2 min</span>
      </motion.div>
    </div>
  );
};

/* ── main page ── */
const RoleIntroduction = () => {
  const { pendingRole } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    if (!pendingRole) navigate("/");
  }, [pendingRole, navigate]);

  if (!pendingRole) return null;
  const content = roleContent[pendingRole];
  const Icon = content.icon;

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* ── particles ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Particle x="10%" y="20%" size={6} delay={0} />
        <Particle x="80%" y="15%" size={4} delay={1} />
        <Particle x="60%" y="60%" size={8} delay={2} />
        <Particle x="25%" y="70%" size={5} delay={0.5} />
        <Particle x="90%" y="45%" size={6} delay={1.5} />
        <Particle x="45%" y="85%" size={4} delay={3} />
      </div>

      {/* ── fixed top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(180deg, hsl(210 11% 4%), transparent)" }}>
        <div className="flex items-center gap-3">
          <img src={evaLogo} alt="EVA" className="h-10 w-auto rounded-lg" />
          <span className="font-display font-bold text-sm hidden sm:block">EVA Transport</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          Skip to Login →
        </button>
      </div>

      {/* ══════════ HERO ══════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8"
            style={{ boxShadow: "0 0 40px hsl(var(--glow-primary))" }}
          >
            <Icon className="w-10 h-10 text-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {content.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 whitespace-pre-line"
          >
            {content.title.split("\n").map((line, i) => (
              <span key={i}>
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
                {i === 0 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {content.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm animate-bounce"
          >
            <span>Scroll to explore</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════ FEATURES ══════════ */}
      <Section className="relative py-20 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Features</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Everything You Need</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card p-6 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  style={{ boxShadow: "0 0 20px hsl(var(--glow-primary))" }}
                >
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ LIVE DEMO ══════════ */}
      <Section className="relative py-20 sm:py-32 px-6" delay={0.1}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Live Preview</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{content.demoTitle}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{content.demoDesc}</p>
          </div>

          <MapVisualization role={pendingRole} />
        </div>
      </Section>

      {/* ══════════ BENEFITS ══════════ */}
      <Section className="relative py-20 sm:py-32 px-6" delay={0.1}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Benefits</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Why EVA Transport?</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <p className="font-display font-medium">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ CTA ══════════ */}
      <Section className="relative py-24 sm:py-36 px-6" delay={0.1}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-16"
            style={{ boxShadow: "0 0 60px hsl(var(--glow-primary))" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Sign in or create your account to access your personalized dashboard.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-shadow"
              style={{ boxShadow: "0 0 30px hsl(var(--glow-primary)), 0 4px 20px hsl(var(--primary) / 0.3)" }}
            >
              Continue to Login
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.button>
        </div>
      </Section>

      {/* ── footer ── */}
      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground border-t border-border/30">
        © 2026 EVA Transport. All rights reserved.
      </footer>
    </div>
  );
};

export default RoleIntroduction;
