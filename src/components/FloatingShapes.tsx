import { motion } from "framer-motion";

const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {/* Hexagonal shape */}
    <motion.div
      className="absolute w-32 h-32 border border-primary/10 rounded-2xl"
      style={{ left: '5%', top: '20%', rotate: 45 }}
      animate={{ y: [-20, 20, -20], rotate: [45, 50, 45] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Circle ring */}
    <motion.div
      className="absolute w-48 h-48 border border-primary/5 rounded-full"
      style={{ right: '8%', top: '15%' }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Small diamond */}
    <motion.div
      className="absolute w-16 h-16 border border-primary/10 rounded-lg"
      style={{ left: '70%', top: '60%', rotate: 45 }}
      animate={{ y: [0, -30, 0], rotate: [45, 90, 45] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    {/* Gradient line */}
    <motion.div
      className="absolute w-px h-40"
      style={{
        left: '50%', top: '10%',
        background: 'linear-gradient(180deg, transparent, hsl(43 100% 58% / 0.2), transparent)',
      }}
      animate={{ opacity: [0, 0.6, 0], y: [0, 100, 200] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    {/* Large blurred orb */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full opacity-30"
      style={{
        left: '-10%', bottom: '-20%',
        background: 'radial-gradient(circle, hsl(43 100% 58% / 0.05), transparent 60%)',
      }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default FloatingShapes;
