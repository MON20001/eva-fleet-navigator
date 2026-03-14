import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  MapPin, Bell, MessageSquare, Route, Bus, Truck, Shield,
  Navigation, Clock, AlertTriangle, Package, BarChart3,
  Users, CheckCircle, ArrowRight, Zap, Eye, Send, Map
} from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";
import FloatingShapes from "@/components/FloatingShapes";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

/* ── feature route mapping for intro features ── */
const introFeatureRouteMap: Record<string, string> = {
  "role.worker.f1": "live-tracking",
  "role.worker.f2": "smart-routing",
  "role.worker.f3": "driver-notifications",
  "role.bus.f1": "live-tracking",
  "role.bus.f2": "smart-routing",
  "role.bus.f3": "driver-notifications",
  "role.truck.f1": "smart-routing",
  "role.truck.f2": "driver-notifications",
  "role.truck.f3": "live-tracking",
  "role.admin.f1": "tracking",
  "role.admin.f2": "analytics",
  "role.admin.f3": "live-tracking",
};

/* ── role content with translation keys ── */
interface RoleContent {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  heroDescKey: TranslationKey;
  icon: React.ElementType;
  features: { icon: React.ElementType; titleKey: TranslationKey; descKey: TranslationKey }[];
  demoTitleKey: TranslationKey;
  demoDescKey: TranslationKey;
  benefitKeys: TranslationKey[];
}

const roleContent: Record<UserRole, RoleContent> = {
  worker: {
    titleKey: "role.worker.title",
    subtitleKey: "role.worker.subtitle",
    heroDescKey: "role.worker.heroDesc",
    icon: Users,
    features: [
      { icon: Map, titleKey: "role.worker.f1", descKey: "role.worker.f1.desc" },
      { icon: Route, titleKey: "role.worker.f2", descKey: "role.worker.f2.desc" },
      { icon: MessageSquare, titleKey: "role.worker.f3", descKey: "role.worker.f3.desc" },
      { icon: MapPin, titleKey: "role.worker.f4", descKey: "role.worker.f4.desc" },
      { icon: Bell, titleKey: "role.worker.f5", descKey: "role.worker.f5.desc" },
      { icon: AlertTriangle, titleKey: "role.worker.f6", descKey: "role.worker.f6.desc" },
    ],
    demoTitleKey: "role.worker.demo",
    demoDescKey: "role.worker.demoDesc",
    benefitKeys: ["role.worker.b1", "role.worker.b2", "role.worker.b3", "role.worker.b4"],
  },
  "bus-driver": {
    titleKey: "role.bus.title",
    subtitleKey: "role.bus.subtitle",
    heroDescKey: "role.bus.heroDesc",
    icon: Bus,
    features: [
      { icon: Eye, titleKey: "role.bus.f1", descKey: "role.bus.f1.desc" },
      { icon: Route, titleKey: "role.bus.f2", descKey: "role.bus.f2.desc" },
      { icon: Clock, titleKey: "role.bus.f3", descKey: "role.bus.f3.desc" },
      { icon: AlertTriangle, titleKey: "role.bus.f4", descKey: "role.bus.f4.desc" },
      { icon: MessageSquare, titleKey: "role.bus.f5", descKey: "role.bus.f5.desc" },
      { icon: Navigation, titleKey: "role.bus.f6", descKey: "role.bus.f6.desc" },
    ],
    demoTitleKey: "role.bus.demo",
    demoDescKey: "role.bus.demoDesc",
    benefitKeys: ["role.bus.b1", "role.bus.b2", "role.bus.b3", "role.bus.b4"],
  },
  "truck-driver": {
    titleKey: "role.truck.title",
    subtitleKey: "role.truck.subtitle",
    heroDescKey: "role.truck.heroDesc",
    icon: Truck,
    features: [
      { icon: Route, titleKey: "role.truck.f1", descKey: "role.truck.f1.desc" },
      { icon: CheckCircle, titleKey: "role.truck.f2", descKey: "role.truck.f2.desc" },
      { icon: AlertTriangle, titleKey: "role.truck.f3", descKey: "role.truck.f3.desc" },
      { icon: MessageSquare, titleKey: "role.truck.f4", descKey: "role.truck.f4.desc" },
      { icon: Package, titleKey: "role.truck.f5", descKey: "role.truck.f5.desc" },
      { icon: Navigation, titleKey: "role.truck.f6", descKey: "role.truck.f6.desc" },
    ],
    demoTitleKey: "role.truck.demo",
    demoDescKey: "role.truck.demoDesc",
    benefitKeys: ["role.truck.b1", "role.truck.b2", "role.truck.b3", "role.truck.b4"],
  },
  admin: {
    titleKey: "role.admin.title",
    subtitleKey: "role.admin.subtitle",
    heroDescKey: "role.admin.heroDesc",
    icon: Shield,
    features: [
      { icon: Map, titleKey: "role.admin.f1", descKey: "role.admin.f1.desc" },
      { icon: BarChart3, titleKey: "role.admin.f2", descKey: "role.admin.f2.desc" },
      { icon: Users, titleKey: "role.admin.f3", descKey: "role.admin.f3.desc" },
      { icon: Bell, titleKey: "role.admin.f4", descKey: "role.admin.f4.desc" },
      { icon: MessageSquare, titleKey: "role.admin.f5", descKey: "role.admin.f5.desc" },
      { icon: Zap, titleKey: "role.admin.f6", descKey: "role.admin.f6.desc" },
    ],
    demoTitleKey: "role.admin.demo",
    demoDescKey: "role.admin.demoDesc",
    benefitKeys: ["role.admin.b1", "role.admin.b2", "role.admin.b3", "role.admin.b4"],
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

/* ── animated map visualization ── */
const MapVisualization = ({ role }: { role: UserRole }) => {
  const { t } = useLanguage();
  const isWorker = role === "worker" || role === "bus-driver";
  const vehicleIcon = role === "truck-driver" ? "🚛" : "🚌";

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-border/30" style={{ background: "hsla(var(--glass-bg))" }}>
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(10)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
      </svg>

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

      <motion.div
        className="absolute text-2xl sm:text-3xl"
        animate={{ x: ["5%", "80%"], y: ["75%", "15%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {vehicleIcon}
      </motion.div>

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
              <span className="text-[10px] text-primary/70 mt-1">{t("map.stop")} {i + 1}</span>
            </motion.div>
          ))}
        </>
      )}

      {role === "truck-driver" && (
        <>
          {[
            { left: "20%", top: "65%", labelKey: "map.pickup" as TranslationKey },
            { left: "50%", top: "42%", labelKey: "map.checkpoint" as TranslationKey },
            { left: "78%", top: "22%", labelKey: "map.delivery" as TranslationKey },
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
              <span className="text-[10px] text-primary/70 mt-1">{t(m.labelKey)}</span>
            </motion.div>
          ))}
        </>
      )}

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

      <motion.div
        className="absolute right-4 top-4 glass-card px-3 py-2 flex items-center gap-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: [0, 1, 1, 0], x: [30, 0, 0, 30] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Bell className="w-3 h-3 text-primary" />
        <span className="text-xs text-foreground/80">{t("intro.notification")}</span>
      </motion.div>
    </div>
  );
};

/* ── main page ── */
const RoleIntroduction = () => {
  const { pendingRole } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    if (!pendingRole) navigate("/");
    else window.scrollTo(0, 0);
  }, [pendingRole, navigate]);

  if (!pendingRole) return null;
  const content = roleContent[pendingRole];
  const Icon = content.icon;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-mesh relative">
      <ParticleField count={20} />
      <FloatingShapes />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* ── fixed top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(180deg, hsl(210 11% 4%), transparent)" }}>
        <div className="flex items-center gap-3">
          <img src={evaLogo} alt="EVA" className="h-10 w-auto rounded-lg" />
          <span className="font-display font-bold text-sm hidden sm:block">{t("eva.transport")}</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => navigate("/login")}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            {t("intro.skip")}
          </button>
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-primary/5 blur-[80px] sm:blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6 sm:mb-8"
            style={{ boxShadow: "0 0 40px hsl(var(--glow-primary))" }}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {t(content.subtitleKey)}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 whitespace-pre-line"
          >
            {t(content.titleKey).split("\n").map((line, i) => (
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
            {t(content.heroDescKey)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm animate-bounce"
          >
            <span>{t("intro.scroll")}</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════ FEATURES ══════════ */}
      <Section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("intro.features")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("intro.features.title")}</h2>
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
                className="glass-card-premium p-6 group cursor-default transition-all duration-500"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  style={{ boxShadow: "0 0 20px hsl(var(--glow-primary))" }}
                >
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ LIVE DEMO ══════════ */}
      <Section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6" delay={0.1}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("intro.preview")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t(content.demoTitleKey)}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t(content.demoDescKey)}</p>
          </div>

          <MapVisualization role={pendingRole} />
        </div>
      </Section>

      {/* ══════════ BENEFITS ══════════ */}
      <Section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6" delay={0.1}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{t("intro.benefits")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("intro.benefits.title")}</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.benefitKeys.map((bKey, i) => (
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
                <p className="font-display font-medium">{t(bKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ CTA ══════════ */}
      <Section className="relative py-20 sm:py-24 md:py-36 px-4 sm:px-6" delay={0.1}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-8 sm:p-10 md:p-16"
            style={{ boxShadow: "0 0 80px hsl(var(--glow-primary-strong))" }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("intro.cta.title")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("intro.cta.desc")}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              className="btn-premium inline-flex items-center gap-3"
            >
              {t("intro.cta.button")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* ── footer ── */}
      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground border-t border-border/30">
        {t("footer.copyright")}
      </footer>
    </div>
  );
};

export default RoleIntroduction;
