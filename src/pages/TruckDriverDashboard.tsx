import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import ActivityFeed from "@/components/ActivityFeed";
import { Package, Navigation, Clock, CheckCircle } from "lucide-react";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";

const TruckDriverDashboard = () => {
  const { t } = useLanguage();

  const deliveries = [
    { id: "DEL-001", dest: "Warehouse A", statusKey: "delivery.intransit" as TranslationKey, eta: "10:30 AM" },
    { id: "DEL-002", dest: "Factory B", statusKey: "delivery.pending" as TranslationKey, eta: "12:00 PM" },
    { id: "DEL-003", dest: "Office C", statusKey: "delivery.delivered" as TranslationKey, eta: "—" },
    { id: "DEL-004", dest: "Site D", statusKey: "delivery.pending" as TranslationKey, eta: "2:30 PM" },
  ];

  return (
    <DashboardLayout>
      {(tab) => {
        if (tab === "map") return <LiveMap showWorkers={false} height="h-[calc(100vh-10rem)]" />;
        if (tab === "deliveries") return (
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">{t("truck.deliveries")}</h3>
            <div className="space-y-3">
              {deliveries.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">{d.dest}</p>
                    <p className="text-xs text-muted-foreground">{d.id} · ETA: {d.eta}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    d.statusKey === "delivery.delivered" ? "bg-success/10 text-success" :
                    d.statusKey === "delivery.intransit" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {t(d.statusKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        if (tab === "reports" || tab === "messages") return <ActivityFeed />;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Package} label={t("truck.today")} value={4} delay={0} />
              <StatCard icon={CheckCircle} label={t("truck.completed")} value={1} change="25%" positive delay={0.1} />
              <StatCard icon={Navigation} label={t("truck.distance")} value="45 km" delay={0.2} />
              <StatCard icon={Clock} label={t("truck.nextstop")} value="10:30" delay={0.3} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveMap showWorkers={false} />
              </div>
              <ActivityFeed />
            </div>
          </div>
        );
      }}
    </DashboardLayout>
  );
};

export default TruckDriverDashboard;
