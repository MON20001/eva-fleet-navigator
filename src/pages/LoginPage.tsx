import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, UserIcon, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const roleLabelKeys: Record<string, "role.worker" | "role.bus" | "role.truck" | "role.admin"> = {
  worker: "role.worker",
  "bus-driver": "role.bus",
  "truck-driver": "role.truck",
  admin: "role.admin",
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LoginPage = () => {
  const { pendingRole, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!pendingRole) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError(t("login.error.fields")); return; }
    if (isRegister && !name) { setError(t("login.error.name")); return; }
    if (isRegister && password !== confirmPassword) { setError(t("login.error.password")); return; }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setIsSuccess(true);
    await new Promise((r) => setTimeout(r, 800));
    login(isRegister ? name : email.split("@")[0], email);
    navigate("/");
  };

  const toggleMode = () => { setIsRegister(!isRegister); setError(""); };

  const formVariants = {
    enter: { opacity: 0, x: isRegister ? 40 : -40, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: isRegister ? -40 : 40, scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      <ParticleField count={12} />

      {/* ── Left side - Visual ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.05))" }} />
        <div className="absolute inset-0 bg-gradient-mesh" />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ left: '30%', top: '30%', background: 'radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 60%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute top-8 left-8 z-10">
          <motion.img initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} src={evaLogo} alt="EVA Transport" className="h-12 w-auto rounded-lg" />
        </div>

        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <h2 className="font-display text-3xl font-bold leading-tight mb-4">
              {t("login.visual.title1")}<br />
              <span className="text-gradient-wide italic">{t("login.visual.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">{t("login.visual.desc")}</p>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-12 z-10">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">{t("login.visual.footer")}</p>
        </div>
      </div>

      {/* ── Right side - Form ── */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-5 sm:p-8 lg:p-16 relative z-10">
        <div className="absolute top-5 end-5 z-20 flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }} className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center" style={{ boxShadow: "0 0 40px hsl(var(--success) / 0.2)" }}>
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <p className="font-display font-semibold text-lg">{t("login.success.title")}</p>
                <p className="text-sm text-muted-foreground">{t("login.success.desc")}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
            <span className="font-display font-bold text-lg">{t("eva.transport")}</span>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
            {t("login.welcome")}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={isRegister ? "register" : "signin"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-display text-2xl sm:text-3xl font-bold mb-1"
            >
              {isRegister ? t("login.create") : t("login.signin")}
            </motion.h1>
          </AnimatePresence>

          <div className="w-10 h-0.5 bg-primary mt-3 mb-6" />

          {/* Role badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="mb-6">
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">{t("login.role")}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="text-sm font-medium text-primary">{t(roleLabelKeys[pendingRole])}</span>
            </div>
          </motion.div>

          {/* Google Sign-in */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn-google mb-5"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => { setIsLoading(false); setIsSuccess(true); setTimeout(() => { login("Google User", "user@gmail.com"); navigate("/"); }, 800); }, 1200);
            }}
          >
            <GoogleIcon />
            <span>{t("login.google")}</span>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("login.or")}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Animated form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isRegister ? "register-form" : "login-form"}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {isRegister && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2.5">{t("login.name")}</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder={t("login.name.placeholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2.5">{t("login.email")}</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder={t("login.email.placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2.5">{t("login.password")}</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2.5">{t("login.confirm")}</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-destructive">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="btn-premium w-full flex items-center justify-center gap-3 mt-2 disabled:opacity-70 min-h-[48px]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {isRegister ? t("login.submit.create") : t("login.submit.signin")}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <button type="button" onClick={toggleMode} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {isRegister ? t("login.has.account") : t("login.no.account")}
              <span className="text-primary hover:underline font-medium">{isRegister ? t("login.switch.signin") : t("login.switch.create")}</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <button type="button" onClick={() => navigate("/")} className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              {t("login.back")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;