import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function LaunchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["#020617", "#000000"]
  );
  
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, 800]);

  // Local rocket shoot up
  const rocketY = useTransform(scrollYProgress, [0, 1], [600, -800]); 
  const rocketOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative h-[150vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Rocket shoots up during this section */}
      <motion.div 
        style={{ y: rocketY, opacity: rocketOpacity }}
        className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        <div className="relative flex flex-col items-center">
          <img 
            src="/rr.png" 
            alt="Rocket" 
            className="w-20 md:w-32 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] z-10"
          />
          <motion.div 
            className="absolute -bottom-12 w-4 h-24 bg-gradient-to-t from-transparent via-orange-500 to-yellow-200 blur-md rounded-full mix-blend-screen opacity-90 animate-pulse z-0"
          />
        </div>
      </motion.div>
      {/* Passing Clouds to simulate speed */}
      <motion.div 
        style={{ y: cloudY }}
        className="absolute inset-0 z-0 opacity-10"
      >
        <div className="absolute w-96 h-96 bg-white rounded-full blur-[100px] -left-20 top-10" />
        <div className="absolute w-[600px] h-[600px] bg-white rounded-full blur-[120px] -right-40 top-1/3" />
        <div className="absolute w-80 h-80 bg-blue-300 rounded-full blur-[90px] left-1/4 bottom-20" />
      </motion.div>
      
      <motion.div
         style={{ y: textY, opacity: textOpacity }}
         className="relative z-10 text-center px-4"
      >
        <span className="text-orange-400 font-mono tracking-[0.3em] text-sm md:text-base mb-4 block uppercase font-semibold">Stage 1</span>
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tight pb-4">
          Leaving Atmosphere
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          The sky rapidly darkens. The roar of the engines fades into the silent abyss of space. Earth's gravity loses its grip.
        </p>

        <button 
          onClick={() => window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' })}
          className="group relative px-8 py-4 bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/50 backdrop-blur-md rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Launch to Deep Space
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
