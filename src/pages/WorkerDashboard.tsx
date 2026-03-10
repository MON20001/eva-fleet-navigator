import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import QuickMessage from "@/components/QuickMessage";
import ActivityFeed from "@/components/ActivityFeed";
import { Bus, Clock, MapPin, Bell, CalendarDays, XCircle, Route } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const WorkerDashboard = () => {
  const { t } = useLanguage();

  const schedule = [
    { time: "7:30 AM", labelKey: "schedule.pickup" as const, statusKey: "schedule.confirmed" as const },
    { time: "8:00 AM", labelKey: "schedule.arrive" as const, statusKey: "schedule.ontrack" as const },
    { time: "5:00 PM", labelKey: "schedule.departure" as const, statusKey: "schedule.pending" as const },
    { time: "5:45 PM", labelKey: "schedule.dropoff" as const, statusKey: "schedule.pending" as const },
  ];

  return (
    <DashboardLayout>
      {(tab) => {
        if (tab === "map") return <LiveMap height="h-[calc(100vh-10rem)]" />;
        if (tab === "messages") return <QuickMessage />;
        if (tab === "notifications") return <ActivityFeed />;
        if (tab === "schedule") return (
          <div className="space-y-6 max-w-2xl">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-5 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                {t("worker.schedule.title")}
              </h3>
              <div className="space-y-4">
                {schedule.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="text-sm font-mono font-medium text-primary min-w-[70px]">{s.time}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t(s.labelKey)}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      s.statusKey === "schedule.confirmed" ? "bg-success/10 text-success" :
                      s.statusKey === "schedule.ontrack" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>{t(s.statusKey)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">{t("worker.quickactions")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { labelKey: "worker.action.absence" as const, icon: XCircle, color: "bg-destructive/10 text-destructive" },
                  { labelKey: "worker.action.schedule" as const, icon: CalendarDays, color: "bg-primary/10 text-primary" },
                  { labelKey: "worker.action.route" as const, icon: Route, color: "bg-accent/10 text-accent-foreground" },
                ]).map((action, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success(t(action.labelKey))}
                    className={`flex items-center gap-3 p-4 rounded-xl ${action.color} transition-all text-left min-h-[48px]`}
                  >
                    <action.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{t(action.labelKey)}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );
        if (tab === "report") return (
          <div className="glass-card p-6 max-w-lg">
            <h3 className="font-display font-semibold mb-4">{t("worker.report.title")}</h3>
            <textarea
              className="w-full bg-secondary rounded-xl p-4 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border"
              placeholder={t("worker.report.placeholder")}
            />
            <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity min-h-[44px]">
              {t("worker.report.submit")}
            </button>
          </div>
        );
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Bus} label={t("worker.nextbus")} value="Bus A-01" change="3 min" positive delay={0} />
              <StatCard icon={Clock} label={t("worker.eta")} value="7:45 AM" delay={0.1} />
              <StatCard icon={MapPin} label={t("worker.stop")} value="Station 5" delay={0.2} />
              <StatCard icon={Bell} label={t("worker.alerts")} value={2} change="New" positive delay={0.3} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveMap />
              </div>
              <div className="space-y-6">
                <QuickMessage />
                <ActivityFeed />
              </div>
            </div>
          </div>
        );
      }}
    </DashboardLayout>
  );
};

export default WorkerDashboard;