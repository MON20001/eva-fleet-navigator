import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { toast } from "sonner";
import evaLogo from "@/assets/eva-logo.png";

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: "user@evatransport.com",
    phone: "+966 50 123 4567",
    age: "32",
    address: "Riyadh, Saudi Arabia",
    nationalId: "1234567890",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success(t("profile.saved"));
  };

  const roleLabelKeys = {
    worker: "role.worker",
    "bus-driver": "role.bus",
    "truck-driver": "role.truck",
    admin: "role.admin",
  } as const;

  if (!user) return null;

  const fields = [
    { key: "fullName", label: t("profile.fullname"), type: "text" },
    { key: "email", label: t("profile.email"), type: "email" },
    { key: "phone", label: t("profile.phone"), type: "tel" },
    { key: "age", label: t("profile.age"), type: "number" },
    { key: "address", label: t("profile.address"), type: "text" },
    { key: "nationalId", label: t("profile.nationalid"), type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center gap-4 px-6 lg:px-12 py-6 border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src={evaLogo} alt="EVA Transport" className="h-8 w-auto rounded-lg" />
        <h1 className="font-display font-bold text-lg">{t("profile.title")}</h1>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-premium p-6 sm:p-8"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-3xl font-display font-bold text-primary"
                style={{ boxShadow: "0 0 30px hsl(var(--glow-primary))" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="font-display font-semibold text-xl mt-4">{user.name}</h2>
            <span className="text-xs text-primary tracking-wider uppercase mt-1">{t(roleLabelKeys[user.role])}</span>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </motion.div>
            ))}

            {/* Role (read-only) */}
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {t("profile.role")}
              </label>
              <div className="px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                {t(roleLabelKeys[user.role])}
              </div>
            </div>
          </div>

          {/* Save */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSave}
            className="btn-premium w-full flex items-center justify-center gap-3 mt-8"
          >
            <Save className="w-4 h-4" />
            {t("profile.save")}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
