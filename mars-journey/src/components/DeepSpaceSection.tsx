import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function DeepSpaceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const starsBgRef = useRef<HTMLDivElement>(null);
  const starsMidRef = useRef<HTMLDivElement>(null);
  const starsFgRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const marsRef = useRef<HTMLDivElement>(null);
  
  const distRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  // Generate stable random stars
  const starsBg = useMemo(() => Array.from({ length: 50 }).map(() => ({ left: Math.random() * 100, top: Math.random() * 100 })), []);
  const starsMid = useMemo(() => Array.from({ length: 40 }).map(() => ({ left: Math.random() * 100, top: Math.random() * 100 })), []);
  const starsFg = useMemo(() => Array.from({ length: 30 }).map(() => ({ left: Math.random() * 100, top: Math.random() * 100 })), []);

  useGSAP(() => {
    // Parallax scrolling timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: 1.5, // Smooth scrubbing
      }
    });

    // Animate star layers at different speeds (parallax)
    tl.to(starsBgRef.current, { y: 150, ease: "none" }, 0);
    tl.to(starsMidRef.current, { y: 300, ease: "none" }, 0);
    tl.to(starsFgRef.current, { y: 600, ease: "none" }, 0);

    // Planets horizontal parallax
    // Earth fades away left
    tl.fromTo(earthRef.current, 
      { x: "-5vw", y: "20vh", scale: 1.2, opacity: 0.8 }, 
      { x: "-30vw", y: "0vh", scale: 0.8, opacity: 0, ease: "none" }, 0
    );
    // Mars creeps in from the right
    tl.fromTo(marsRef.current, 
      { x: "80vw", y: "60vh", scale: 0.3, opacity: 0 }, 
      { x: "40vw", y: "40vh", scale: 0.7, opacity: 1, ease: "none" }, 0
    );

    // Trigger stats animation when the section hits the center of viewport
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      once: true,
      onEnter: () => {
        // We use a dummy object to hold the numeric values and let GSAP tween them
        const stats = { dist: 0, time: 0, speed: 0 };
        gsap.to(stats, {
          dist: 225000000,
          time: 210,
          speed: 24.6,
          duration: 3,
          ease: "power3.out",
          onUpdate: () => {
            if (distRef.current) distRef.current.innerText = Math.round(stats.dist).toLocaleString();
            if (timeRef.current) timeRef.current.innerText = Math.round(stats.time).toString();
            if (speedRef.current) speedRef.current.innerText = stats.speed.toFixed(1);
          }
        });
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] w-full overflow-hidden bg-[#020617] border-t border-white/10"
    >
      {/* Star layers */}
      <div ref={starsBgRef} className="absolute inset-0 z-0 opacity-30">
        {starsBg.map((s, i) => <div key={`bg-${i}`} className="absolute w-1 h-1 bg-white rounded-full blur-[1px]" style={{ left: `${s.left}%`, top: `${s.top}%` }} />)}
      </div>
      <div ref={starsMidRef} className="absolute inset-0 z-0 opacity-50">
        {starsMid.map((s, i) => <div key={`mid-${i}`} className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full blur-[1px]" style={{ left: `${s.left}%`, top: `${s.top}%` }} />)}
      </div>
      <div ref={starsFgRef} className="absolute inset-0 z-0 opacity-80">
        {starsFg.map((s, i) => <div key={`fg-${i}`} className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]" style={{ left: `${s.left}%`, top: `${s.top}%` }} />)}
      </div>

      {/* Planets */}
      <div ref={earthRef} className="absolute z-10 w-[400px] h-[400px] rounded-full" 
           style={{ background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8, #020617)', boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.9)' }}>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      <div ref={marsRef} className="absolute z-10 w-[200px] h-[200px] rounded-full" 
           style={{ background: 'radial-gradient(circle at 30% 30%, #e77d11, #c1440e, #1a0802)', boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.9), 0 0 30px rgba(231,125,17,0.3)' }}>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Main Content: Stats and Title */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-30 pointer-events-none px-4">
        
        <div className="text-center mb-16">
          <span className="text-blue-400 font-mono tracking-[0.3em] text-sm uppercase block mb-4 glow">Phase 02</span>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-gray-500 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Deep Space Transit
          </h2>
        </div>

        {/* Futuristic Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center text-center">
            <span className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Distance</span>
            <div className="flex items-baseline gap-2 text-white">
              <span ref={distRef} className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">0</span>
              <span className="text-blue-400 font-bold">km</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0">
            <span className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Est. Time</span>
            <div className="flex items-baseline gap-2 text-white">
              <span ref={timeRef} className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">0</span>
              <span className="text-blue-400 font-bold">days</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0">
            <span className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Velocity</span>
            <div className="flex items-baseline gap-2 text-white">
              <span ref={speedRef} className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">0</span>
              <span className="text-blue-400 font-bold">km/s</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
