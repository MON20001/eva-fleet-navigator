import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 lg:px-12 py-6">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src={evaLogo} alt="EVA Transport" className="h-10 w-auto rounded-lg" />
        <span className="font-display font-bold text-lg">EVA Transport</span>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8">
            {/* Role badge */}
            <div className="flex items-center justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {roleLabelMap[pendingRole]} Account
              </span>
            </div>

            <h1 className="font-display text-2xl font-bold text-center mb-2">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              {isRegister
                ? "Register to access your dashboard"
                : "Sign in to continue to your dashboard"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" className="w-full gap-2" size="lg">
                {isRegister ? (
                  <>
                    <UserPlus className="w-4 h-4" /> Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
