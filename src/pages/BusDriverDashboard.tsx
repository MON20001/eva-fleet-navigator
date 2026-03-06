import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import ActivityFeed from "@/components/ActivityFeed";
import { motion } from "framer-motion";
import { Users, Navigation, Clock, CheckCircle, AlertTriangle, CloudRain, Wrench } from "lucide-react";
import { toast } from "sonner";

const statusOptions = [
  { label: "On Time", icon: CheckCircle, color: "bg-success/10 text-success border-success/20" },
  { label: "Delayed", icon: Clock, color: "bg-warning/10 text-warning border-warning/20" },
  { label: "Road Blocked", icon: AlertTriangle, color: "bg-destructive/10 text-destructive border-destructive/20" },
  { label: "Heavy Traffic", icon: CloudRain, color: "bg-muted text-muted-foreground border-border" },
  { label: "Breakdown", icon: Wrench, color: "bg-destructive/10 text-destructive border-destructive/20" },
];

const workers = [
  { name: "Ahmed Hassan", stop: "Station 3", status: "Waiting" },
  { name: "Mona Ali", stop: "Station 5", status: "Late" },
  { name: "Karim Youssef", stop: "Station 7", status: "Picked Up" },
  { name: "Fatma Said", stop: "Station 9", status: "Waiting" },
];

const BusDriverDashboard = () => (
  <DashboardLayout>
    {(tab) => {
      if (tab === "map") return <LiveMap height="h-[calc(100vh-10rem)]" />;
      if (tab === "workers") return (
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4">Worker Pickup List</h3>
          <div className="space-y-3">
            {workers.map((w, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.stop}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  w.status === "Picked Up" ? "bg-success/10 text-success" :
                  w.status === "Late" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                }`}>
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
      if (tab === "status") return (
        <div className="glass-card p-5 max-w-lg">
          <h3 className="font-display font-semibold mb-4">Update Bus Status</h3>
          <div className="grid grid-cols-1 gap-3">
            {statusOptions.map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toast.success(`Status updated: ${s.label}`)}
                className={`flex items-center gap-3 p-4 rounded-lg border ${s.color} transition-all`}
              >
                <s.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      );
      if (tab === "messages") return <ActivityFeed />;
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Workers Assigned" value={12} delay={0} />
            <StatCard icon={Navigation} label="Stops Remaining" value={5} delay={0.1} />
            <StatCard icon={Clock} label="Route Progress" value="65%" change="+12%" positive delay={0.2} />
            <StatCard icon={CheckCircle} label="Status" value="On Time" delay={0.3} />
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

export default BusDriverDashboard;
