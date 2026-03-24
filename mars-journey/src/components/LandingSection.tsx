import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function LandingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marsRef = useRef<HTMLImageElement>(null);
  const rocketRef = useRef<HTMLImageElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2500", // The animation will last for 2500px of scrolling
        scrub: 1, // Smooth scrub
        pin: true, // Pin the section in place for the duration
      }
    });

    // 1. Mars zooms in to fill the screen
    tl.to(marsRef.current, { 
      scale: 6, 
      y: "20vh", // Move it down slightly as it scales
      duration: 3, 
      ease: "power1.inOut" 
    }, 0);

    // 2. Rocket descends and physically slows down (ease: "power3.out" on a scrub makes it decelerate!)
    tl.fromTo(rocketRef.current, 
      { y: "-80vh", scale: 0.2, opacity: 0 }, 
      { y: "5vh", scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" }, 
      0.5 // Start slightly after Mars starts zooming
    );

    // 3. Dust cloud expands exactly as rocket touches down
    tl.fromTo(dustRef.current, 
      { opacity: 0, scale: 0 }, 
      { opacity: 0.8, scale: 2.5, duration: 0.5, ease: "power2.out" }, 
      2.8 // Occurs near the end of the rocket descent
    );

    // 4. Cinematic text fades in
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      3 // At the end of the timeline
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="h-screen w-full bg-[#030308] relative flex flex-col items-center justify-center overflow-hidden border-t border-white/10"
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 z-0 opacity-40">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full w-1 h-1" 
               style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, opacity: Math.random() }} />
        ))}
      </div>

      {/* Mars Image */}
      <img 
        ref={marsRef}
        src="https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
        alt="Mars"
        className="absolute z-10 w-[30vh] h-[30vh] object-cover rounded-full drop-shadow-[0_0_60px_rgba(230,80,10,0.3)] pointer-events-none"
      />

      {/* Landing Rocket */}
      <div ref={rocketRef} className="absolute z-30 flex flex-col items-center pointer-events-none">
        <img 
          src="/rr.png" 
          alt="Rocket Landing" 
          className="w-24 md:w-36 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" 
        />
        {/* Thruster Flame */}
        <div className="absolute -bottom-12 w-3 h-20 bg-gradient-to-t from-transparent via-orange-400 to-yellow-200 blur-md rounded-full mix-blend-screen opacity-90 animate-pulse" />
      </div>

      {/* Dust/Glow Effect */}
      <div 
        ref={dustRef}
        className="absolute z-20 w-[60vw] max-w-2xl h-24 bg-gradient-to-t from-orange-700/80 to-transparent rounded-full blur-3xl pointer-events-none ml-[20vw] mr-[20vw] mt-[30vh]"
      />

      {/* Cinematic UI Footer */}
      <div ref={textRef} className="absolute bottom-[10vh] z-40 flex flex-col items-center text-center">
        <span className="text-orange-500 font-mono tracking-[0.5em] text-sm uppercase mb-4 glow">Landing Sequence Complete</span>
        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl mb-8">
          Welcome Home
        </h2>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-white font-semibold text-lg transition-transform hover:scale-105"
        >
          Restart Mission
        </button>
      </div>

    </section>
  );
}
