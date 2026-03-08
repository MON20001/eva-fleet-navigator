import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, UserIcon, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";
import ParticleField from "@/components/ParticleField";

const roleLabelMap: Record<string, string> = {
  worker: "Worker",
  "bus-driver": "Bus Driver",
  "truck-driver": "Truck Driver",
  admin: "Supervisor",
};

const LoginPage = () => {
  const { pendingRole, login } = useAuth();
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

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isRegister && !name) {
      setError("Please enter your full name.");
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setIsSuccess(true);

    // Show success state briefly, then redirect
    await new Promise((r) => setTimeout(r, 800));
    login(isRegister ? name : email.split("@")[0], email);
    navigate("/");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  const formVariants = {
    enter: { opacity: 0, x: isRegister ? 40 : -40, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: isRegister ? -40 : 40, scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      <ParticleField count={15} />

      {/* ── Left side - Visual ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />

        {/* Animated glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            left: '20%', top: '40%',
            background: 'radial-gradient(circle, hsl(43 100% 58% / 0.08), transparent 60%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            src={evaLogo}
            alt="EVA Transport"
            className="h-14 w-auto rounded-lg"
          />
        </div>

        {/* Text overlay */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <h2 className="font-display text-4xl font-bold leading-tight mb-4">
              Excellence in<br />
              <span className="text-gradient-wide italic">Transportation</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Managing the world's finest fleet operations with precision,
              reliability, and uncompromising standards of service.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-12 z-10">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © 2026 EVA Transportation Group
          </p>
        </div>
      </div>

      {/* ── Right side - Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10">
        {/* Success overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center" style={{ boxShadow: "0 0 40px hsl(142 71% 45% / 0.2)" }}>
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <p className="font-display font-semibold text-lg">Welcome aboard!</p>
                <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
            <span className="font-display font-bold text-lg">EVA Transport</span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2"
          >
            Welcome back
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={isRegister ? "register" : "signin"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-display text-3xl font-bold mb-1"
            >
              {isRegister ? "Create Account" : "Sign In"}
            </motion.h1>
          </AnimatePresence>

          <div className="w-10 h-0.5 bg-primary mt-3 mb-8" />

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Your Role</p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/5" style={{ boxShadow: "0 0 20px hsl(var(--glow-primary))" }}>
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="text-sm font-medium text-primary">{roleLabelMap[pendingRole]}</span>
            </div>
          </motion.div>

          {/* Animated form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isRegister ? "register-form" : "login-form"}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {isRegister && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Full Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-border pl-7 pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-300 input-glow"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-border pl-7 pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-300 input-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-border pl-7 pr-8 pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-300 input-glow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-border pl-7 pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-300 input-glow"
                    />
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-destructive"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="btn-premium w-full flex items-center justify-center gap-3 mt-4 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isRegister ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {isRegister ? "Already have an account? " : "Don't have an account? "}
              <span className="text-primary hover:underline font-medium">
                {isRegister ? "Sign in" : "Create one"}
              </span>
            </button>
          </div>

          {/* Back link */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              ← Back to role selection
            </button>
          </div>

          {/* Desktop footer */}
          <div className="hidden lg:block mt-16">
            <p className="text-xs text-muted-foreground/50 tracking-widest uppercase">
              Fleet Management System
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
