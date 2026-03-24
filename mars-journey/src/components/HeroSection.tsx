import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Fade out hero text as we scroll down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--color-space-900)] pt-20"
    >


      {/* Earth Background Graphic */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transform-gpu drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 300]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) 
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
      >
        <img 
          src="/e.png" 
          alt="Earth" 
          className="w-[90vw] md:w-[60vw] max-h-[80vh] object-contain opacity-90 mt-[10vh]"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, y: yText }}
        className="relative z-30 flex flex-col items-center text-center px-4 mt-[-10vh]"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-blue-400 font-mono tracking-[0.2em] text-sm md:text-base uppercase mb-4 block">Orbital Departure</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 drop-shadow-2xl pb-4">
            Journey to Mars <br/>Begins
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
            Strap in for a scroll-driven timeline of humanity's greatest achievement. Leave the cradle of Earth and step onto the Red Planet.
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Mission
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </motion.div>


    </section>
  );
}
