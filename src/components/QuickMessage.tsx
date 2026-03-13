import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, XCircle, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";

const messages: { icon: React.ElementType; labelKey: TranslationKey; color: string }[] = [
  { icon: Clock, labelKey: "qm.late", color: "bg-warning/10 text-warning" },
  { icon: XCircle, labelKey: "qm.absent", color: "bg-destructive/10 text-destructive" },
  { icon: MapPin, labelKey: "qm.stop", color: "bg-primary/10 text-primary" },
  { icon: AlertTriangle, labelKey: "qm.issue", color: "bg-muted text-muted-foreground" },
];

const QuickMessage = () => {
  const { t } = useLanguage();
  const [confirmMsg, setConfirmMsg] = useState<TranslationKey | null>(null);

  const handleSend = (key: TranslationKey) => {
    toast.success(`${t("qm.sent")} "${t(key)}"`);
    setConfirmMsg(null);
  };

  return (
    <div className="glass-card p-5">
      <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
        <Send className="w-4 h-4 text-primary" />
        {t("qm.title")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {messages.map((msg, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConfirmMsg(msg.labelKey)}
            className={`flex items-center gap-3 p-4 rounded-lg ${msg.color} transition-all duration-200 text-left`}
          >
            <msg.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{t(msg.labelKey)}</span>
          </motion.button>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm"
            onClick={() => setConfirmMsg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-premium p-6 sm:p-8 max-w-sm w-full mx-4"
            >
              <h4 className="font-display font-semibold text-lg mb-2">{t("qm.confirm.title")}</h4>
              <p className="text-sm text-muted-foreground mb-2">{t("qm.confirm.desc")}</p>
              <div className="glass-card p-3 mb-6">
                <p className="text-sm font-medium text-primary">"{t(confirmMsg)}"</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmMsg(null)}
                  className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  {t("qm.confirm.no")}
                </button>
                <button
                  onClick={() => handleSend(confirmMsg)}
                  className="flex-1 btn-premium py-3 text-center"
                >
                  {t("qm.confirm.yes")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickMessage;
