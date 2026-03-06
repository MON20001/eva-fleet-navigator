import { Bus, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";

const activities = [
  { icon: Bus, text: "Bus A-01 departed from Station 3", time: "2 min ago", color: "text-primary" },
  { icon: CheckCircle, text: "Driver Omar marked route complete", time: "8 min ago", color: "text-success" },
  { icon: AlertTriangle, text: "Traffic delay on Route B", time: "15 min ago", color: "text-warning" },
  { icon: Clock, text: "Bus B-01 estimated 5 min late", time: "20 min ago", color: "text-muted-foreground" },
  { icon: User, text: "New worker Ahmed joined the system", time: "1 hr ago", color: "text-primary" },
];

const ActivityFeed = () => (
  <div className="glass-card p-5">
    <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`mt-0.5 ${a.color}`}>
            <a.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">{a.text}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityFeed;
