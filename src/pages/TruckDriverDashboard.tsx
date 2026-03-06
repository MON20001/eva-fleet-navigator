import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import ActivityFeed from "@/components/ActivityFeed";
import { Package, Navigation, Clock, CheckCircle, Truck } from "lucide-react";

const deliveries = [
  { id: "DEL-001", dest: "Warehouse A", status: "In Transit", eta: "10:30 AM" },
  { id: "DEL-002", dest: "Factory B", status: "Pending", eta: "12:00 PM" },
  { id: "DEL-003", dest: "Office C", status: "Delivered", eta: "—" },
  { id: "DEL-004", dest: "Site D", status: "Pending", eta: "2:30 PM" },
];

const TruckDriverDashboard = () => (
  <DashboardLayout>
    {(tab) => {
      if (tab === "map") return <LiveMap showWorkers={false} height="h-[calc(100vh-10rem)]" />;
      if (tab === "deliveries") return (
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4">Deliveries</h3>
          <div className="space-y-3">
            {deliveries.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{d.dest}</p>
                  <p className="text-xs text-muted-foreground">{d.id} · ETA: {d.eta}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  d.status === "Delivered" ? "bg-success/10 text-success" :
                  d.status === "In Transit" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {d.status}
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
            <StatCard icon={Package} label="Today's Deliveries" value={4} delay={0} />
            <StatCard icon={CheckCircle} label="Completed" value={1} change="25%" positive delay={0.1} />
            <StatCard icon={Navigation} label="Distance Left" value="45 km" delay={0.2} />
            <StatCard icon={Clock} label="Next Stop" value="10:30" delay={0.3} />
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

export default TruckDriverDashboard;
