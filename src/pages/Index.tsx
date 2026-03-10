import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Bus, Truck, User, Shield, ArrowRight, MapPin, Bell, BarChart3,
  Route, Zap, ChevronDown, CheckCircle, Globe, Clock, Sparkles, TrendingUp
} from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";
import FloatingShapes from "@/components/FloatingShapes";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import WorkerDashboard from "./WorkerDashboard";
import BusDriverDashboard from "./BusDriverDashboard";
import TruckDriverDashboard from "./TruckDriverDashboard";
import AdminDashboard from "./AdminDashboard";

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

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
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
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setPendingRole(role);
    window.scrollTo(0, 0);
    navigate("/intro");
  };

  const roles: { role: UserRole; labelKey: "role.worker" | "role.bus" | "role.truck" | "role.admin"; descKey: "role.worker.desc" | "role.bus.desc" | "role.truck.desc" | "role.admin.desc"; icon: React.ElementType; color: string }[] = [
    { role: "worker", labelKey: "role.worker", descKey: "role.worker.desc", icon: User, color: "from-primary/15 to-primary/5" },
    { role: "bus-driver", labelKey: "role.bus", descKey: "role.bus.desc", icon: Bus, color: "from-accent/15 to-accent/5" },
    { role: "truck-driver", labelKey: "role.truck", descKey: "role.truck.desc", icon: Truck, color: "from-success/15 to-success/5" },
    { role: "admin", labelKey: "role.admin", descKey: "role.admin.desc", icon: Shield, color: "from-primary/15 to-primary/5" },
  ];

  const features = [
    { icon: MapPin, labelKey: "feature.tracking" as const, descKey: "feature.tracking.desc" as const },
    { icon: Route, labelKey: "feature.routing" as const, descKey: "feature.routing.desc" as const },
    { icon: BarChart3, labelKey: "feature.analytics" as const, descKey: "feature.analytics.desc" as const },
    { icon: Bell, labelKey: "feature.alerts" as const, descKey: "feature.alerts.desc" as const },
    { icon: Globe, labelKey: "feature.smartpickup" as const, descKey: "feature.smartpickup.desc" as const },
    { icon: TrendingUp, labelKey: "feature.heatmap" as const, descKey: "feature.heatmap.desc" as const },
  ];

  const stats = [
    { value: "99.9%", labelKey: "stat.uptime" as const },
    { value: "50K+", labelKey: "stat.trips" as const },
    { value: "<2s", labelKey: "stat.gps" as const },
    { value: "30%", labelKey: "stat.savings" as const },
  ];

  const testimonials = [
    { nameKey: "testimonial.1.name" as const, roleKey: "testimonial.1.role" as const, textKey: "testimonial.1.text" as const },
    { nameKey: "testimonial.2.name" as const, roleKey: "testimonial.2.role" as const, textKey: "testimonial.2.text" as const },
    { nameKey: "testimonial.3.name" as const, roleKey: "testimonial.3.role" as const, textKey: "testimonial.3.text" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      <ParticleField count={20} />
      <FloatingShapes />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* ── Header ── */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3">
          <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
          <span className="font-display font-bold text-lg">{t("eva.transport")}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-xs text-muted-foreground">{t("system.online")}</span>
          </div>
          <ThemeToggle />
          <LanguageSwitcher />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login")}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("login.signin")}
          </motion.button>
        </motion.div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[500px] rounded-full bg-primary/5 blur-[100px] sm:blur-[150px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t("hero.badge")}
          </motion.p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 sm:mb-8">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="block">
              {t("hero.line1")}
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="block text-gradient-wide">
              {t("hero.line2")}
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            {t("hero.desc")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-premium inline-flex items-center gap-3"
            >
              {t("hero.getstarted")}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-premium inline-flex items-center gap-3"
            >
              {t("hero.learnmore")}
            </motion.button>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-14 mb-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.1 }} className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{t(s.labelKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex flex-col items-center gap-2 text-muted-foreground mt-12">
            <span className="text-xs tracking-widest uppercase">{t("hero.explore")}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <RevealSection className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28" delay={0}>
        <div id="features" className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("features.badge")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("features.subtitle")}</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <TiltCard className="h-full">
                <div className="glass-card-premium p-7 h-full group cursor-default transition-all duration-500">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5"
                    style={{ boxShadow: "0 0 20px hsl(var(--glow-primary))" }}
                  >
                    <f.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-base mb-2 group-hover:text-primary transition-colors duration-300">{t(f.labelKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <RevealSection className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("howitworks.badge")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t("howitworks.title")}</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {([
            { step: "01", titleKey: "howitworks.1.title" as const, descKey: "howitworks.1.desc" as const, icon: User },
            { step: "02", titleKey: "howitworks.2.title" as const, descKey: "howitworks.2.desc" as const, icon: MapPin },
            { step: "03", titleKey: "howitworks.3.title" as const, descKey: "howitworks.3.desc" as const, icon: CheckCircle },
          ]).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center" style={{ boxShadow: "0 0 30px hsl(var(--glow-primary))" }}>
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{item.step}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{t(item.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <RevealSection className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("testimonials.badge")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t("testimonials.title")}</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card-premium p-7"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="w-3.5 h-3.5 text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t(item.textKey)}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t(item.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(item.roleKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ══════════ ROLE SELECTION ══════════ */}
      <RevealSection className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <div id="roles" className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("roles.badge")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t("roles.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("roles.desc")}</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((r, i) => (
            <motion.div key={r.role} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <TiltCard>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoleSelect(r.role)}
                  className="glass-card-premium p-6 text-left w-full group transition-all duration-500 hover:border-primary/40 min-h-[44px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} border border-primary/20 flex items-center justify-center mb-5`}
                    style={{ boxShadow: "0 0 20px hsl(var(--glow-primary))" }}
                  >
                    <r.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{t(r.labelKey)}</h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{t(r.descKey)}</p>
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span>{t("role.enter")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ══════════ CTA BANNER ══════════ */}
      <RevealSection className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card-premium p-8 sm:p-12 md:p-16 text-center"
          style={{ boxShadow: "0 0 60px hsl(var(--glow-primary-strong))" }}
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-premium inline-flex items-center gap-3"
            >
              {t("hero.getstarted")}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t("cta.feature1")}</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t("cta.feature2")}</div>
          </div>
        </motion.div>
      </RevealSection>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-border/30 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={evaLogo} alt="EVA" className="h-8 w-auto rounded-lg" />
            <span className="font-display font-bold text-sm">{t("eva.transport")}</span>
          </div>
          <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{t("footer.privacy")}</span>
            <span>{t("footer.terms")}</span>
          </div>
        </div>
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