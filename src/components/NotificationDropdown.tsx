import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Bus, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";

interface Notification {
  id: number;
  icon: React.ElementType;
  textKey: TranslationKey;
  timeKey: TranslationKey;
  color: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, icon: Bus, textKey: "activity.1", timeKey: "time.2min", color: "text-primary", read: false },
  { id: 2, icon: CheckCircle, textKey: "activity.2", timeKey: "time.8min", color: "text-success", read: false },
  { id: 3, icon: AlertTriangle, textKey: "activity.3", timeKey: "time.15min", color: "text-warning", read: false },
  { id: 4, icon: Clock, textKey: "activity.4", timeKey: "time.20min", color: "text-muted-foreground", read: true },
  { id: 5, icon: User, textKey: "activity.5", timeKey: "time.1hr", color: "text-primary", read: true },
];

const NotificationDropdown = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [bellAnimate, setBellAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleBellClick = () => {
    setBellAnimate(true);
    setOpen(!open);
    setTimeout(() => setBellAnimate(false), 800);
  };

  return (
    <div ref={ref} className="relative z-[3000]">
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <Bell className={`w-5 h-5 text-muted-foreground ${bellAnimate ? "animate-bell-ring" : ""}`} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-[3000] mt-2 w-[calc(100vw-2rem)] max-w-96 glass-card-premium overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <h4 className="font-display font-semibold text-sm">{t("notif.title")}</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  {t("notif.markall")}
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer ${
                    !n.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                    )
                  }
                >
                  <div className={`mt-0.5 ${n.color}`}>
                    <n.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? "font-medium" : ""}`}>{t(n.textKey)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(n.timeKey)}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
