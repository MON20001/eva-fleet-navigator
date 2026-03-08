import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

const ParticleField = ({ count = 30, className = "" }: ParticleFieldProps) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    })), [count]
  );

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: '20%', top: '30%',
          background: 'radial-gradient(circle, hsl(43 100% 58% / 0.04) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          right: '10%', bottom: '20%',
          background: 'radial-gradient(circle, hsl(210 60% 40% / 0.03) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

export default ParticleField;
