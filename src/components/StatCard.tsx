import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  delay?: number;
}

const StatCard = ({ icon: Icon, label, value, change, positive, delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="stat-card"
  >
    <div className="flex items-center justify-between">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {change && (
        <span className={`text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-display font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

export default StatCard;
