import { Bus, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { useLanguage, TranslationKey } from "@/contexts/LanguageContext";

const activities: { icon: React.ElementType; textKey: TranslationKey; timeKey: TranslationKey; color: string }[] = [
  { icon: Bus, textKey: "activity.1", timeKey: "time.2min", color: "text-primary" },
  { icon: CheckCircle, textKey: "activity.2", timeKey: "time.8min", color: "text-success" },
  { icon: AlertTriangle, textKey: "activity.3", timeKey: "time.15min", color: "text-warning" },
  { icon: Clock, textKey: "activity.4", timeKey: "time.20min", color: "text-muted-foreground" },
  { icon: User, textKey: "activity.5", timeKey: "time.1hr", color: "text-primary" },
];

const ActivityFeed = () => {
  const { t } = useLanguage();
  return (
    <div className="glass-card p-5">
      <h3 className="font-display font-semibold mb-4">{t("activity.title")}</h3>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 ${a.color}`}>
              <a.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{t(a.textKey)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t(a.timeKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
