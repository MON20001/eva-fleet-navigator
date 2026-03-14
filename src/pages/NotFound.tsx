import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import ParticleField from "@/components/ParticleField";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-mesh relative overflow-hidden">
      <ParticleField count={10} />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center glass-card-premium p-10 sm:p-16"
      >
        <h1 className="mb-4 text-6xl font-display font-bold text-gradient">{t("notfound.title")}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{t("notfound.desc")}</p>
        <Link to="/" className="btn-premium inline-flex items-center gap-2">
          {t("notfound.back")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
