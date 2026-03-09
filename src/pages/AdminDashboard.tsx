import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import ActivityFeed from "@/components/ActivityFeed";
import { Users, Bus, Truck, AlertTriangle, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const users = [
  { name: "Ahmed Hassan", role: "Worker", status: "Active" },
  { name: "Omar Khalil", role: "Bus Driver", status: "Active" },
  { name: "Youssef Ali", role: "Truck Driver", status: "On Leave" },
  { name: "Fatma Said", role: "Worker", status: "Active" },
  { name: "Nour Ibrahim", role: "Bus Driver", status: "Active" },
];

const reports = [
  { title: "Bus A-02 breakdown reported", severity: "High", time: "30 min ago" },
  { title: "Route B traffic congestion", severity: "Medium", time: "1 hr ago" },
  { title: "Worker complaint - Driver behavior", severity: "Low", time: "2 hrs ago" },
];

const AdminDashboard = () => {
  const { t } = useLanguage();
  const dayKeys = ["day.mon", "day.tue", "day.wed", "day.thu", "day.fri", "day.sat", "day.sun"] as const;

  return (
    <DashboardLayout>
      {(tab) => {
        if (tab === "map") return <LiveMap height="h-[calc(100vh-10rem)]" />;
        if (tab === "users") return (
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">{t("admin.users")}</h3>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                {t("admin.adduser")}
              </button>
            </div>
            <div className="space-y-3">
              {users.map((u, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{u.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.role}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    u.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                  }`}>
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        if (tab === "analytics") return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={BarChart3} label={t("admin.ontimerate")} value="92%" change="+3%" positive delay={0} />
              <StatCard icon={Bus} label={t("admin.avgtrip")} value="42 min" delay={0.1} />
              <StatCard icon={Users} label={t("admin.activeworkers")} value={85} change="+5" positive delay={0.2} />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">{t("admin.performance")}</h3>
              <div className="grid grid-cols-7 gap-2 h-40 items-end">
                {[65, 78, 90, 85, 92, 88, 95].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary/20 rounded-t-md relative overflow-hidden"
                      style={{ height: `${v}%` }}
                    >
                      <div className="absolute inset-0 bg-primary rounded-t-md" style={{ height: `${v}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {t(dayKeys[i])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        if (tab === "reports") return (
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">{t("admin.reports")}</h3>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 ${
                      r.severity === "High" ? "text-destructive" :
                      r.severity === "Medium" ? "text-warning" : "text-muted-foreground"
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    r.severity === "High" ? "bg-destructive/10 text-destructive" :
                    r.severity === "Medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                  }`}>
                    {r.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        if (tab === "notifications" || tab === "settings") return <ActivityFeed />;
        // Dashboard
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label={t("admin.totalworkers")} value={120} change="+8" positive delay={0} />
              <StatCard icon={Bus} label={t("admin.activebuses")} value={15} delay={0.1} />
              <StatCard icon={Truck} label={t("admin.activetrucks")} value={8} delay={0.2} />
              <StatCard icon={AlertTriangle} label={t("admin.openreports")} value={3} change="-2" positive delay={0.3} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveMap />
              </div>
              <div className="space-y-6">
                <ActivityFeed />
                <div className="glass-card p-5">
                  <h3 className="font-display font-semibold mb-3">{t("admin.quickactions")}</h3>
                  <div className="space-y-2">
                    {([
                      "admin.sendreplacement",
                      "admin.broadcast",
                      "admin.viewreports",
                    ] as const).map((key, i) => (
                      <button key={i} className="w-full text-left p-3 rounded-lg bg-secondary/50 text-sm hover:bg-secondary transition-colors">
                        {t(key)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </DashboardLayout>
  );
};

export default AdminDashboard;
