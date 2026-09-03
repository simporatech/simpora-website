import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollCircuitSpine: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const pathRef = useRef<SVGPathElement>(null);
  const [photonPos, setPhotonPos] = useState({ x: 24, y: 10 });

  // Smooth scroll progression with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.0005,
  });

  // Smoothly dissolve spine before the footer
  const spineOpacity = useTransform(smoothProgress, [0, 0.9, 0.96], [1, 1, 0]);

  // PCB Circuit main conductive trace with authentic 45-degree jogs
  const circuitPathData =
    'M 24 0 L 24 80 L 38 105 L 38 200 L 14 225 L 14 340 L 34 365 L 34 480 L 16 505 L 16 620 L 36 645 L 36 760 L 20 785 L 20 890 L 30 915 L 30 1000';

  // Secondary ground plane bus trace
  const secondaryTraceData =
    'M 10 0 L 10 160 L 20 180 L 20 380 L 8 400 L 8 680 L 18 700 L 18 940 L 10 960 L 10 1000';

  // Calculate exact position of photon along the angled circuit path
  useEffect(() => {
    const updatePosition = (val: number) => {
      if (pathRef.current) {
        try {
          const totalLen = pathRef.current.getTotalLength();
          const targetLen = Math.max(0, Math.min(1, val)) * totalLen;
          const point = pathRef.current.getPointAtLength(targetLen);
          setPhotonPos({ x: point.x, y: point.y });
        } catch {
          // Fallback if SVG not yet rendered
        }
      }
    };

    updatePosition(smoothProgress.get());
    const unsubscribe = smoothProgress.on('change', updatePosition);
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <motion.aside
      aria-hidden="true"
      style={{ opacity: spineOpacity }}
      className="fixed hidden md:flex right-2 sm:right-4 md:right-6 lg:right-8 top-0 bottom-0 pointer-events-none z-20 w-12 flex-col items-center justify-center select-none"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* SVG Integrated PCB Cybernetic Track */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 48 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="spine-glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#97F2CC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#97F2CC" stopOpacity="1" />
              <stop offset="100%" stopColor="#97F2CC" stopOpacity="0.9" />
            </linearGradient>

            <filter id="spine-neon" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#97F2CC" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* 1. Secondary Ground Bus Track (Dashed subtle companion line) */}
          <path
            d={secondaryTraceData}
            fill="none"
            stroke="#121212"
            strokeOpacity="0.08"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />

          {/* 2. Micro Circuit Solder Pads & Surface-Mount (SMD) nodes */}
          {[
            { x: 38, y: 105 },
            { x: 14, y: 225 },
            { x: 34, y: 365 },
            { x: 16, y: 505 },
            { x: 36, y: 645 },
            { x: 20, y: 785 },
            { x: 30, y: 915 },
          ].map((pad, idx) => (
            <g key={idx}>
              {/* Outer copper pad ring */}
              <circle
                cx={pad.x}
                cy={pad.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#121212"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              {/* Inner conductive through-hole via */}
              <circle
                cx={pad.x}
                cy={pad.y}
                r="2"
                fill="#97F2CC"
              />
            </g>
          ))}

          {/* 3. Micro Branch Traces leading to test points */}
          <path d="M 38 200 L 44 200" stroke="#121212" strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
          <circle cx="44" cy="200" r="2" fill="#121212" fillOpacity="0.2" />

          <path d="M 14 340 L 6 340" stroke="#121212" strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="340" r="2" fill="#121212" fillOpacity="0.2" />

          <path d="M 16 620 L 8 620" stroke="#121212" strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="620" r="2" fill="#121212" fillOpacity="0.2" />

          {/* 4. Underlying Main PCB Circuit Track Guide */}
          <path
            d={circuitPathData}
            fill="none"
            stroke="#121212"
            strokeOpacity="0.15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. Active Energized Mint Conductor Line (#97F2CC) with 45° bends */}
          <motion.path
            ref={pathRef}
            d={circuitPathData}
            fill="none"
            stroke="url(#spine-glow-gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#spine-neon)"
            style={{
              pathLength: smoothProgress,
              willChange: 'stroke-dashoffset',
            }}
          />

          {/* 6. Glowing Photon Traveling the 45° Circuit Track */}
          <g
            transform={`translate(${photonPos.x}, ${photonPos.y})`}
            className="transition-transform duration-75 ease-out"
          >
            {/* Outer high-energy pulse aura */}
            <circle r="7" fill="#97F2CC" fillOpacity="0.35" className="animate-ping origin-center" />
            {/* Secondary radiant halo */}
            <circle r="5" fill="#97F2CC" fillOpacity="0.75" />
            {/* Core intense white photon */}
            <circle r="2.5" fill="#FFFFFF" stroke="#97F2CC" strokeWidth="1" />
          </g>
        </svg>
      </div>
    </motion.aside>
  );
};
