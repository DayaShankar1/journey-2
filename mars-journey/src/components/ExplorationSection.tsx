import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const EXPLORATION_DATA = [
  {
    id: "journey",
    title: "Flight Log",
    shortDesc: "Interactive flight record of the 7-month transit to Mars.",
    fullDesc: "Access the classified dashcam recording of the rocket separating and making its monumental transit to Mars.",
    imageUrl: "/journey/ezgif-frame-001.jpg",
    isJourney: true
  },
  {
    id: "rover",
    title: "Mars Rover",
    shortDesc: "Autonomous surface exploration vehicle designed to map uncharted terrain.",
    fullDesc: "The next-generation autonomous rover traversing the harsh Martian landscape. Equipped with advanced AI terrain mapping, ground-penetrating radar, and microscopic life-sign detection sub-systems, it clears the path for human settlement.",
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "water",
    title: "Water Discovery",
    shortDesc: "Sub-glacial liquid reservoirs critical for establishing a permanent base.",
    fullDesc: "Surveys confirm massive sub-glacial liquid lakes beneath the southern polar ice cap. Using automated thermal drills, this vital resource is extracted, purified, and utilized for both colony sustainability and preliminary terraforming efforts.",
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "colony",
    title: "Human Colony",
    shortDesc: "Mars Base Alpha: The first permanent human settlement.",
    fullDesc: "The pinnacle of aeronautical engineering. Featuring pressurized interconnected biodomes, closed-loop hydroponic agriculture, and advanced electromagnetic shielding to protect inhabitants from intense solar radiation and recurring dust storms.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  }
];

export function ExplorationSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const activeData = EXPLORATION_DATA.find(c => c.id === activeCard);

  return (
    <section className="relative min-h-screen w-full bg-[#030308] py-24 px-4 overflow-hidden border-t border-white/5 font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/30 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <span className="text-blue-400 font-mono tracking-[0.3em] text-sm uppercase block mb-4 glow">Phase 03</span>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-100 to-gray-500 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Mars Exploration
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the critical infrastructure and groundbreaking discoveries that make life on the Red Planet possible.
          </p>
        </div>

        {/* Card Grid - updated to 4 columns on large screens to fit the new Journey card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
          {EXPLORATION_DATA.map((card, idx) => (
            <ExplorationCard 
              key={card.id} 
              data={card} 
              index={idx}
              onClick={() => setActiveCard(card.id)} 
            />
          ))}
        </div>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeCard && activeData && !activeData.isJourney && (
          <StandardModal data={activeData} onClose={() => setActiveCard(null)} />
        )}
        
        {activeCard && activeData && activeData.isJourney && (
          <JourneyScrollModal onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>

    </section>
  );
}

// Reusable Card Component
function ExplorationCard({ data, index, onClick }: { data: any, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -10 }}
      onClick={onClick}
      className={`group relative flex flex-col h-96 bg-white/5 border ${data.isJourney ? 'border-orange-500/30' : 'border-white/10'} rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] ${data.isJourney ? 'hover:border-orange-500/80 shadow-[0_0_20px_rgba(234,88,12,0.2)]' : 'hover:border-blue-500/50'}`}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030308]/50" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <div className={`w-12 h-1 ${data.isJourney ? 'bg-orange-500' : 'bg-blue-500'} rounded-full mb-4 transform origin-left transition-all group-hover:w-24 group-hover:bg-white`} />
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
          {data.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
          {data.shortDesc}
        </p>
        
        <div className={`flex items-center ${data.isJourney ? 'text-orange-400' : 'text-blue-400'} font-mono text-xs uppercase tracking-widest gap-2 opacity-70 group-hover:opacity-100 transition-opacity`}>
          <span>{data.isJourney ? "Launch Sequence" : "Access Data"}</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Modal for standard cards
function StandardModal({ data, onClose }: { data: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-3xl bg-[#0a0a16] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)]"
      >
        <div className="relative h-64 md:h-80 w-full">
          <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] to-transparent" />
        </div>

        <div className="p-8 md:p-12 relative -mt-16">
          <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-xs font-mono uppercase tracking-widest mb-4">
            Classified Data
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-md">
            {data.title}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {data.fullDesc}
          </p>

          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-colors"
          >
            Close Database
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Special scrolling modal for the 240-frame image sequence
function JourneyScrollModal({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(1);

  // We are tracking scroll purely within this modal's overflow container
  const { scrollYProgress } = useScroll({ container: containerRef });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 152]);

  // Sync scroll progress to frame index
  useEffect(() => {
    return frameIndex.onChange((v) => {
      setFrame(Math.floor(v));
    });
  }, [frameIndex]);

  // Preload images logic could go here, but since it's local desktop we'll assume it's fast enough.
  // The user scrolls manually, setting `frame`.

  // Text Animations mapped to specific scroll zones
  // Fact 1: Liftoff (0 - 0.2)
  const fact1Opacity = useTransform(scrollYProgress, [0.02, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const fact1Y = useTransform(scrollYProgress, [0.02, 0.2], [20, -20]);
  
  // Fact 2: Stage Separation (0.25 - 0.45)
  const fact2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const fact2Y = useTransform(scrollYProgress, [0.25, 0.45], [20, -20]);

  // Fact 3: Orbital Burn (0.5 - 0.7)
  const fact3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const fact3Y = useTransform(scrollYProgress, [0.5, 0.7], [20, -20]);

  // Fact 4: Deep Space Coasting (0.75 - 0.95)
  const fact4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const fact4Y = useTransform(scrollYProgress, [0.75, 0.95], [20, 0]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black"
    >
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {/* Forces the container to be 400vh tall to allow rich scrolling */}
        <div className="h-[400vh] w-full">
          
          {/* Sticky Viewer */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            
            {/* The Image Sequence */}
            <img 
              src={`/journey/ezgif-frame-${String(Math.max(1, Math.min(152, frame))).padStart(3, '0')}.jpg`} 
              alt={`Frame ${frame}`}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Facts Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
              
              <motion.div style={{ opacity: fact1Opacity, y: fact1Y }} className="absolute">
                <span className="text-orange-500 font-mono tracking-widest text-sm uppercase mb-2 block glow">T-Plus 00:03:00</span>
                <h3 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4">Max-Q Passed</h3>
                <p className="text-gray-300 max-w-xl text-lg backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                  The rocket experiences maximum dynamic pressure. Escaping Earth's gravity requires immense velocity, consuming 80% of fuel reserves within the first few minutes.
                </p>
              </motion.div>

              <motion.div style={{ opacity: fact2Opacity, y: fact2Y }} className="absolute">
                <span className="text-blue-500 font-mono tracking-widest text-sm uppercase mb-2 block glow">T-Plus 00:08:30</span>
                <h3 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4">Booster Separation</h3>
                <p className="text-gray-300 max-w-xl text-lg backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                  The primary boosters detach, falling back to Earth. The second stage vac engine ignites, accelerating the payload to an orbital velocity of 28,000 km/h.
                </p>
              </motion.div>

              <motion.div style={{ opacity: fact3Opacity, y: fact3Y }} className="absolute">
                <span className="text-orange-500 font-mono tracking-widest text-sm uppercase mb-2 block glow">T-Plus 02:45:00</span>
                <h3 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4">Trans-Martian Injection</h3>
                <p className="text-gray-300 max-w-xl text-lg backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                  A massive, final engine burn pushes the spacecraft out of Earth orbit and maps its trajectory onto a 7-month collision-course with Mars.
                </p>
              </motion.div>

              <motion.div style={{ opacity: fact4Opacity, y: fact4Y }} className="absolute">
                <span className="text-blue-500 font-mono tracking-widest text-sm uppercase mb-2 block glow">Transit Coast Phase</span>
                <h3 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4">Deep Space Voyage</h3>
                <p className="text-gray-300 max-w-xl text-lg backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10 mb-8">
                  The engines fall silent. For the next seven months, the spacecraft coasts completely on inertia through the frigid vacuum of space until it intersects the Red Planet.
                </p>
                <div className="flex items-center gap-4 justify-center">
                  <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-sm text-gray-300">
                    Velocity: <span className="text-white">24.5 km/s</span>
                  </div>
                  <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-sm text-gray-300">
                    Dist: <span className="text-white">225M km</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Close button layered on top of sticky frame */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-[210] p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Scroll Indication */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white/70 font-mono text-xs tracking-widest uppercase">Scroll Down to Play</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
                <motion.div 
                  className="w-1 h-2 bg-white rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
