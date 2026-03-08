import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import evaLogo from "@/assets/eva-logo.png";

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
  const [error, setError] = useState("");

  if (!pendingRole) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isRegister) {
      if (!name) {
        setError("Please enter your full name.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    login(isRegister ? name : email.split("@")[0], email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/90" />

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <img src={evaLogo} alt="EVA Transport" className="h-14 w-auto rounded-lg" />
        </div>

        {/* Text overlay */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-20">
          <div className="w-12 h-0.5 bg-primary mb-6" />
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">
            Excellence in<br />
            <span className="text-gradient italic">Transportation</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Managing the world's finest fleet operations with precision,
            reliability, and uncompromising standards of service.
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-12 z-10">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © 2026 EVA Transportation Group
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
            <span className="font-display font-bold text-lg">EVA Transport</span>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
            Welcome back
          </p>
          <h1 className="font-display text-3xl font-bold mb-1">
            {isRegister ? "Create Account" : "Sign In"}
          </h1>
          <div className="w-10 h-0.5 bg-primary mt-3 mb-8" />

          {/* Role badge */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
              Your Role
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
              <span className="text-sm font-medium text-primary">
                {roleLabelMap[pendingRole]}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-lg text-sm font-semibold tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors mt-2"
            >
              {isRegister ? "Create Account" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <span className="text-primary hover:underline">
                {isRegister ? "Sign in" : "Create one"}
              </span>
            </button>
          </div>

          {/* Desktop footer */}
          <div className="hidden lg:block mt-16">
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Fleet Management System
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
