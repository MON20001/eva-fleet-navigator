import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import LiveMap from "@/components/LiveMap";
import QuickMessage from "@/components/QuickMessage";
import ActivityFeed from "@/components/ActivityFeed";
import { Bus, Clock, MapPin, Bell } from "lucide-react";

const WorkerDashboard = () => (
  <DashboardLayout>
    {(tab) => {
      if (tab === "map") return <LiveMap height="h-[calc(100vh-10rem)]" />;
      if (tab === "messages") return <QuickMessage />;
      if (tab === "notifications") return <ActivityFeed />;
      if (tab === "report") return (
        <div className="glass-card p-6 max-w-lg">
          <h3 className="font-display font-semibold mb-4">Report an Issue</h3>
          <textarea
            className="w-full bg-secondary rounded-lg p-4 text-sm min-h-[120px] focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe your issue..."
          />
          <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            Submit Report
          </button>
        </div>
      );
      // Dashboard
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Bus} label="Next Bus" value="Bus A-01" change="3 min" positive delay={0} />
            <StatCard icon={Clock} label="ETA" value="7:45 AM" delay={0.1} />
            <StatCard icon={MapPin} label="Your Stop" value="Station 5" delay={0.2} />
            <StatCard icon={Bell} label="Alerts" value={2} change="New" positive delay={0.3} />
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

export default WorkerDashboard;
