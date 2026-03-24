import { motion } from "framer-motion";
import { useMemo } from "react";

export function FallingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      width: Math.random() * 2 + 1 + "px",
      height: Math.random() * 2 + 1 + "px",
      left: Math.random() * 100 + "%",
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 15
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none select-none overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: star.width,
            height: star.height,
            left: star.left,
            top: "-5%",
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.4)"
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
