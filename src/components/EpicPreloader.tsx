import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { SimporaIsotype } from './SimporaIsotype';

export type PreloaderPhase = 'loading' | 'surging' | 'exploding';

interface EpicPreloaderProps {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

export const EpicPreloader: React.FC<EpicPreloaderProps> = ({ onRevealStart, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('INITIALIZING NEURAL CORES [v4.2]...');
  const [hexCode, setHexCode] = useState('0x8F92B4');
  const [phase, setPhase] = useState<PreloaderPhase>('loading');

  const onRevealStartRef = useRef(onRevealStart);
  onRevealStartRef.current = onRevealStart;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 100% Flat English Boot Messages (No translations)
    const bootMessages = [
      { threshold: 0, text: 'INITIALIZING NEURAL CORES [v4.2]...' },
      { threshold: 20, text: 'CALIBRATING QUANTUM PROTOCOLS...' },
      { threshold: 45, text: 'OPTIMIZING DISTRIBUTED INFRASTRUCTURE...' },
      { threshold: 70, text: 'SYNCHRONIZING APPLIED AI PIPELINES...' },
      { threshold: 90, text: 'IGNITING PROPULSION THRUSTERS...' },
      { threshold: 100, text: 'PROPULSION ENGAGED // SIMPORA ONLINE' },
    ];

    const startTime = performance.now();
    const duration = 1850; // Strictly 2 seconds total loading sequence

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(pct);

      // Random hex memory address ticker
      if (Math.random() < 0.22) {
        setHexCode('0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0'));
      }

      for (let i = bootMessages.length - 1; i >= 0; i--) {
        if (pct >= bootMessages[i].threshold) {
          setStageText(bootMessages[i].text);
          break;
        }
      }

      if (pct < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Surge anticipation (140ms)
        setPhase('surging');
        setStageText('HYPERDRIVE ENGAGED // SIMPORA ONLINE');

        // Smooth 60 FPS SVG Shockwave & Liftoff
        const timerExplosion = setTimeout(() => {
          setPhase('exploding');

          if (onRevealStartRef.current) {
            onRevealStartRef.current();
          }

          const timerComplete = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }, 580);

          return () => clearTimeout(timerComplete);
        }, 140);

        return () => clearTimeout(timerExplosion);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  const isExploding = phase === 'exploding';
  const isSurging = phase === 'surging';

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden">
      {/* 1. Preloader Main Backdrop (Hardware accelerated opacity fade) */}
      <motion.div
        key="preloader-curtain"
        initial={{ opacity: 1 }}
        animate={isExploding ? { opacity: 0 } : { opacity: 1 }}
        transition={isExploding ? { duration: 0.48, ease: [0.16, 1, 0.3, 1] } : { duration: 0.1 }}
        style={{ willChange: 'opacity' }}
        className="absolute inset-0 bg-[#0c0d0e] flex flex-col items-center justify-center text-white pointer-events-auto"
      >
        {/* Cybernetic High-Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

        {/* Subtle, Faint Cosmic Shooting Stars (Estrellas fugaces muy tenues) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: '12%', left: '8%', delay: 0.1, dur: 2.1 },
            { top: '32%', left: '58%', delay: 0.6, dur: 2.4 },
            { top: '68%', left: '18%', delay: 1.1, dur: 1.9 },
            { top: '22%', left: '78%', delay: 1.5, dur: 2.3 },
          ].map((star, i) => (
            <motion.div
              key={i}
              initial={{ x: -40, y: -40, opacity: 0 }}
              animate={{
                x: [0, 160],
                y: [0, 160],
                opacity: [0, 0.28, 0.4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: star.dur,
                delay: star.delay,
                ease: 'easeOut',
              }}
              style={{
                top: star.top,
                left: star.left,
              }}
              className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-[#97F2CC]/50 to-transparent rotate-45 pointer-events-none"
            />
          ))}
        </div>

        {/* Ambient Radial Core Illumination */}
        <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(151,242,204,0.18)_0%,rgba(151,242,204,0.04)_50%,transparent_75%)] pointer-events-none" />

        {/* HUD Telemetry Frame Corners (100% English, Responsive for mobile) */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-xs bg-[#97F2CC]/80 animate-ping" />
          <span className="truncate max-w-[170px] sm:max-w-none">SIMPORA // v4.2</span>
        </div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 font-mono text-[9px] sm:text-[10px] text-zinc-500">
          <span>HEX: {hexCode}</span>
        </div>
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-zinc-600 hidden md:block">
          <span>LATENCY: 0.28MS • TENSORS: ACTIVE</span>
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-zinc-600 hidden md:block">
          <span>MEMORY_BUS: 1024 GB/s</span>
        </div>

        {/* Central Aerospace Rocket & Brand Assembly */}
        <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md px-4 sm:px-6 w-full text-center">
          {/* ============================================================== */}
          {/* SLEEK MINIMALIST SCI-FI ROCKET WITH EMBEDDED SIMPORA ISOTYPE   */}
          {/* ============================================================== */}
          <div className="relative mb-4 sm:mb-5 flex flex-col items-center justify-center">
            {/* Holographic Orbital Guidance Rings (Responsive scale) */}
            <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-[#97F2CC]/25 animate-spin [animation-duration:16s] pointer-events-none" />
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-white/10 border-t-[#97F2CC] border-r-[#97F2CC]/40 animate-spin [animation-duration:8s] [animation-direction:reverse] pointer-events-none" />

            {/* Ascending Rocket with Atmospheric Vibration & Hyperdrive Liftoff */}
            <motion.div
              animate={
                isExploding
                  ? { y: -550, scale: [1, 1.15, 0.35], opacity: [1, 1, 0] }
                  : isSurging
                  ? { y: [-2, -8, -3], scale: 1.05 }
                  : { y: [0, -3.5, 0], scale: 1 }
              }
              transition={
                isExploding
                  ? { duration: 0.55, ease: [0.32, 0, 0.67, 0] }
                  : { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
              }
              className="relative z-10 flex flex-col items-center"
            >
              {/* Sleek Minimalist Rocket Vector (Responsive sizing) */}
              <div className="relative w-28 h-40 sm:w-32 sm:h-44 flex items-center justify-center">
                <svg
                  className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(151,242,204,0.45)]"
                  viewBox="0 0 100 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Hull Titanium Gradient */}
                    <linearGradient id="minimalHullGrad" x1="35" y1="12" x2="65" y2="122" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#27272a" />
                      <stop offset="60%" stopColor="#0c0d0e" />
                      <stop offset="100%" stopColor="#18181b" />
                    </linearGradient>

                    {/* Integrated Wing Gradient */}
                    <linearGradient id="minimalWingGrad" x1="15" y1="90" x2="85" y2="128" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#97F2CC" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#18181b" />
                      <stop offset="100%" stopColor="#97F2CC" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Plasma Engine Jet Gradient */}
                    <linearGradient id="seamlessPlasmaFlame" x1="50" y1="122" x2="50" y2="168" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="25%" stopColor="#97F2CC" />
                      <stop offset="75%" stopColor="rgba(151,242,204,0.3)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="innerWhiteCore" x1="50" y1="122" x2="50" y2="148" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#97F2CC" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  {/* 1. Animated High-Velocity Plasma Jet (Rendered BEHIND the nozzle so it erupts from WITHIN the engine) */}
                  <motion.g
                    className="pointer-events-none"
                    style={{ transformOrigin: '50px 124px' }}
                    animate={{
                      scaleY: isSurging ? [1.3, 2.1, 1.5, 2.3, 1.6] : [1, 1.3, 0.9, 1.38, 1.05, 1.2],
                      scaleX: isSurging ? [1.08, 0.92, 1.12, 0.95] : [0.95, 1.06, 0.94, 1.04, 0.97],
                      opacity: [0.92, 1, 0.88, 1, 0.94],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.18,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Outer Plasma Flame Plume */}
                    <path
                      d="M 42 124 C 41 144 44 168 50 186 C 56 168 59 144 58 124 Z"
                      fill="url(#seamlessPlasmaFlame)"
                      filter="drop-shadow(0 0 16px rgba(151,242,204,0.85))"
                    />
                    {/* Mid High-Heat Thermal Layer */}
                    <path
                      d="M 44 124 C 45 140 47 156 50 166 C 53 156 55 140 56 124 Z"
                      fill="#97F2CC"
                      opacity="0.85"
                    />
                    {/* Inner White-Hot Combustion Core */}
                    <path
                      d="M 46.5 124 C 47.5 132 48.5 142 50 148 C 51.5 142 52.5 132 53.5 124 Z"
                      fill="#FFFFFF"
                    />
                    {/* Shock Diamond Pulse Discs */}
                    <ellipse cx="50" cy="138" rx="2.5" ry="1.5" fill="#FFFFFF" opacity="0.95" />
                    <ellipse cx="50" cy="153" rx="2" ry="1.2" fill="#97F2CC" opacity="0.85" />
                  </motion.g>

                  {/* 2. Left Blended Aerodynamic Delta Fin */}
                  <path
                    d="M 37 88 C 28 98 16 116 16 128 C 26 128 34 124 37 118 Z"
                    fill="url(#minimalWingGrad)"
                    stroke="#97F2CC"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />

                  {/* 3. Right Blended Aerodynamic Delta Fin */}
                  <path
                    d="M 63 88 C 72 98 84 116 84 128 C 74 128 66 124 63 118 Z"
                    fill="url(#minimalWingGrad)"
                    stroke="#97F2CC"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />

                  {/* 4. Sleek Aerodynamic Rocket Fuselage & Sharp Nosecone */}
                  <path
                    d="M 50 12 C 44 32 37 56 37 96 L 37 118 L 63 118 L 63 96 C 63 56 56 32 50 12 Z"
                    fill="url(#minimalHullGrad)"
                    stroke="#97F2CC"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* 5. Sleek Minimalist Cockpit Visor */}
                  <rect
                    x="42"
                    y="42"
                    width="16"
                    height="7"
                    rx="3.5"
                    fill="#0f2420"
                    stroke="#97F2CC"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="44"
                    y="43"
                    width="6"
                    height="2.5"
                    rx="1.2"
                    fill="#FFFFFF"
                    opacity="0.8"
                  />

                  {/* 6. Engine Nozzle Bell & Throat (Rendered in FRONT of the flame root, physically containing it) */}
                  <path
                    d="M 43 118 L 40 126 L 60 126 L 57 118 Z"
                    fill="#18181b"
                    stroke="#97F2CC"
                    strokeWidth="1.6"
                  />
                  {/* Glowing Nozzle Exhaust Rim Collar */}
                  <rect
                    x="39.5"
                    y="125"
                    width="21"
                    height="2"
                    rx="1"
                    fill="#97F2CC"
                  />
                </svg>

                {/* Official SIMPORA Isotype Mounted on Rocket Fuselage */}
                <div className="absolute top-[68px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                  <SimporaIsotype size={24} className="drop-shadow-[0_0_8px_rgba(151,242,204,0.9)]" />
                </div>
              </div>

              {/* Reactive Micro Ion Exhaust Sparks Falling Downwards */}
              <div className="relative w-20 flex justify-center items-center gap-2 -mt-3 pointer-events-none">
                <motion.span
                  animate={{ y: [0, 16, 32], opacity: [1, 0.8, 0], scale: [1, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.35, ease: 'easeOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-[#97F2CC] shadow-[0_0_6px_#97F2CC]"
                />
                <motion.span
                  animate={{ y: [0, 22, 40], opacity: [1, 0.9, 0], scale: [1.2, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.28, delay: 0.08, ease: 'easeOut' }}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]"
                />
                <motion.span
                  animate={{ y: [0, 18, 35], opacity: [1, 0.7, 0], scale: [1, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.38, delay: 0.15, ease: 'easeOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-[#97F2CC] shadow-[0_0_6px_#97F2CC]"
                />
              </div>
            </motion.div>
          </div>

          {/* SIMPORA Brand Monogram with High-Tech Glitch Shadow */}
          <div className="flex items-center space-x-1.5 mb-2">
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              SIMPORA
            </span>
            <span className="font-display font-bold text-2xl sm:text-3xl text-[#97F2CC] drop-shadow-[0_0_16px_rgba(151,242,204,0.8)]">
              .DEV
            </span>
          </div>

          {/* Tagline Strictly in English */}
          <p className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.32em] text-zinc-400 mb-5 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#97F2CC]" />
            SIMPLE • POWERFUL • ADVANCED
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#97F2CC]" />
          </p>

          {/* Precision Segmented Progress Bar */}
          <div className="w-full relative mb-3.5 sm:mb-4">
            <div className="w-full bg-zinc-900/90 h-[5px] rounded-full overflow-hidden p-[1px] border border-white/10 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#97F2CC]/70 via-[#97F2CC] to-white rounded-full shadow-[0_0_12px_#97F2CC]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Segment Percentage Ticks */}
            <div className="flex justify-between w-full px-1 mt-1 text-[8px] sm:text-[9px] font-mono text-zinc-600">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Telemetry Stage Terminal Stream (Responsive truncated text) */}
          <div className="w-full flex items-center justify-between text-xs font-mono bg-zinc-900/60 border border-white/5 rounded-xl px-3 sm:px-3.5 py-2">
            <span className="text-zinc-400 flex items-center gap-2 text-[10px] sm:text-[11px] min-w-0 flex-1 mr-2">
              <Terminal className="w-3.5 h-3.5 text-[#97F2CC] shrink-0" />
              <span className="truncate text-zinc-200 font-medium tracking-wide">
                {stageText}
              </span>
            </span>
            <span className="text-[#97F2CC] font-bold text-xs sm:text-sm tracking-wider font-mono shrink-0">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================== */}
      {/* 2. 60 FPS FLUID HARDWARE-ACCELERATED SHOCKWAVE RIPPLE                  */}
      {/* ====================================================================== */}
      {isExploding && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
            <defs>
              <radialGradient id="fluidShockwaveGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#97F2CC" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#97F2CC" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#97F2CC" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Fluid Shockwave Ring 1 */}
            <motion.circle
              cx="500"
              cy="500"
              initial={{ r: 40, opacity: 0.95 }}
              animate={{ r: 750, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              fill="url(#fluidShockwaveGrad)"
              stroke="#97F2CC"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Harmonic Ring 2 */}
            <motion.circle
              cx="500"
              cy="500"
              initial={{ r: 20, opacity: 0.8 }}
              animate={{ r: 600, opacity: 0 }}
              transition={{ duration: 0.58, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Outer Subtle High-Frequency Arc */}
            <motion.circle
              cx="500"
              cy="500"
              initial={{ r: 10, opacity: 0.6 }}
              animate={{ r: 850, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              fill="none"
              stroke="#97F2CC"
              strokeWidth="1"
              strokeDasharray="8 12"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
