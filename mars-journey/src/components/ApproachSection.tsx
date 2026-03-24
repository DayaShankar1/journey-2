import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ApproachSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0]);

  // Mars approaching and growing
  const marsScale = useTransform(scrollYProgress, [0, 1], [0.1, 4]);
  const marsY = useTransform(scrollYProgress, [0, 1], [-200, 300]);
  const marsOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={ref}
      className="relative h-[200vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Approaching Mars */}
      <motion.div 
        style={{ scale: marsScale, y: marsY, opacity: marsOpacity }}
        className="absolute top-1/4 z-0 rounded-full"
      >
        <div 
          className="w-40 h-40 md:w-64 md:h-64 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #e77d11, #c1440e, #5c1a06, #1a0802)",
            boxShadow: "0 0 50px 10px rgba(193, 68, 14, 0.4), inset -20px -20px 50px rgba(0,0,0,0.8)"
          }}
        >
          {/* Surface texture */}
          <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
               }}>
          </div>
        </div>
      </motion.div>

      <motion.div
         style={{ y: textY, opacity: textOpacity }}
         className="relative z-10 text-center px-4"
      >
        <span className="text-[#e77d11] font-mono tracking-[0.3em] text-sm md:text-base mb-4 block uppercase font-semibold">Arrival</span>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-[0_0_20px_rgba(231,125,17,0.5)]">
          Approaching Mars
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A pale red dot grows into a massive, rusty world. Preparing for entry, descent, and landing.
        </p>
      </motion.div>
    </section>
  );
}
