import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-secondary/50 backdrop-blur-sm text-xs font-medium tracking-wider uppercase hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 min-h-[40px] ${className}`}
      title={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <Globe className="w-4 h-4 text-primary" />
      <span>{language === "en" ? "عربي" : "EN"}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
