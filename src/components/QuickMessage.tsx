import { motion } from "framer-motion";
import { Send, Clock, XCircle, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const messages = [
  { icon: Clock, label: "I will be late", color: "bg-warning/10 text-warning" },
  { icon: XCircle, label: "I will not come today", color: "bg-destructive/10 text-destructive" },
  { icon: MapPin, label: "Please stop here", color: "bg-primary/10 text-primary" },
  { icon: AlertTriangle, label: "Report an issue", color: "bg-muted text-muted-foreground" },
];

const QuickMessage = () => (
  <div className="glass-card p-5">
    <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
      <Send className="w-4 h-4 text-primary" />
      Quick Messages
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {messages.map((msg, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toast.success(`Message sent: "${msg.label}"`)}
          className={`flex items-center gap-3 p-4 rounded-lg ${msg.color} transition-all duration-200 text-left`}
        >
          <msg.icon className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{msg.label}</span>
        </motion.button>
      ))}
    </div>
  </div>
);

export default QuickMessage;
