import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import ActivityFeed from "@/components/ActivityFeed";
import { motion } from "framer-motion";
import { Users, Navigation, Clock, CheckCircle, AlertTriangle, CloudRain, Wrench } from "lucide-react";
import { toast } from "sonner";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";

const BusDriverDashboard = () => {
  const { t } = useLanguage();

  const statusOptions: { labelKey: TranslationKey; icon: React.ElementType; color: string }[] = [
    { labelKey: "bus.ontime", icon: CheckCircle, color: "bg-success/10 text-success border-success/20" },
    { labelKey: "bus.delayed", icon: Clock, color: "bg-warning/10 text-warning border-warning/20" },
    { labelKey: "bus.blocked", icon: AlertTriangle, color: "bg-destructive/10 text-destructive border-destructive/20" },
    { labelKey: "bus.traffic", icon: CloudRain, color: "bg-muted text-muted-foreground border-border" },
    { labelKey: "bus.breakdown", icon: Wrench, color: "bg-destructive/10 text-destructive border-destructive/20" },
  ];

  const workers = [
    { name: "Ahmed Hassan", stop: "Station 3", statusKey: "status.waiting" as TranslationKey },
    { name: "Mona Ali", stop: "Station 5", statusKey: "status.late" as TranslationKey },
    { name: "Karim Youssef", stop: "Station 7", statusKey: "status.pickedup" as TranslationKey },
    { name: "Fatma Said", stop: "Station 9", statusKey: "status.waiting" as TranslationKey },
  ];

  return (
    <DashboardLayout>
      {(tab) => {
        if (tab === "map") return <LiveMap height="h-[calc(100vh-10rem)]" />;
        if (tab === "workers") return (
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">{t("bus.picklist")}</h3>
            <div className="space-y-3">
              {workers.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">{w.name}</p>
                    <p className="text-xs text-muted-foreground">{w.stop}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    w.statusKey === "status.pickedup" ? "bg-success/10 text-success" :
                    w.statusKey === "status.late" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                  }`}>
                    {t(w.statusKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        if (tab === "status") return (
          <div className="glass-card p-5 max-w-lg">
            <h3 className="font-display font-semibold mb-4">{t("bus.update.title")}</h3>
            <div className="grid grid-cols-1 gap-3">
              {statusOptions.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toast.success(`${t("bus.status.updated")} ${t(s.labelKey)}`)}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${s.color} transition-all`}
                >
                  <s.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{t(s.labelKey)}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
        if (tab === "messages") return <ActivityFeed />;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label={t("bus.assigned")} value={12} delay={0} />
              <StatCard icon={Navigation} label={t("bus.stops")} value={5} delay={0.1} />
              <StatCard icon={Clock} label={t("bus.progress")} value="65%" change="+12%" positive delay={0.2} />
              <StatCard icon={CheckCircle} label={t("bus.status")} value={t("bus.ontime")} delay={0.3} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveMap showWorkers />
              </div>
              <ActivityFeed />
            </div>
          </div>
        );
      }}
    </DashboardLayout>
  );
};

export default BusDriverDashboard;
