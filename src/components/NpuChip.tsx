import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Cpu, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SimporaIsotype } from './SimporaIsotype';

interface NpuChipProps {
  isRevealed?: boolean;
}

export const NpuChip: React.FC<NpuChipProps> = ({ isRevealed = true }) => {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [chipMode, setChipMode] = useState<'eco' | 'ai' | 'turbo'>('ai');
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger quantum shockwave ripple when hero explosion reveals
  useEffect(() => {
    if (isRevealed) {
      setPulseKey((prev) => prev + 1);
    }
  }, [isRevealed]);

  // 3D Tilt interaction with high-responsiveness Spring Physics (No scroll-blocking)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerPulse = () => {
    setPulseKey((prev) => prev + 1);
  };

  const pinCount = 12;

  // Pulse animation duration based on mode
  const pulseDuration = chipMode === 'turbo' ? 1.6 : chipMode === 'ai' ? 2.8 : 4.2;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={triggerPulse}
      style={{ perspective: 1200 }}
      className="relative cursor-pointer select-none w-full max-w-[440px] mx-auto p-4 group"
    >
      {/* 1. Constant Breathing Energy Pulse (Aura respirable en Verde Menta) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: chipMode === 'turbo' ? [0.45, 0.85, 0.45] : [0.25, 0.65, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: pulseDuration,
          ease: 'easeInOut',
        }}
        className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(151,242,204,0.4)_0%,rgba(151,242,204,0.1)_45%,transparent_75%)] rounded-[40px] blur-3xl pointer-events-none -z-10"
      />

      {/* Secondary Backlight Ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#97F2CC]/30 via-transparent to-[#97F2CC]/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Main 3D Container with preserve-3d (transition-colors to prevent fighting with spring transform) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-[#121212] border border-white/12 rounded-3xl p-6 shadow-2xl overflow-hidden transition-colors duration-300 hover:border-[#97F2CC]/60"
      >
        {/* Animated Perimeter Micro-Lights (Photon Circuit Tracks) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#97F2CC] to-transparent animate-[shimmer_2.5s_infinite_linear]" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#97F2CC] to-transparent animate-[shimmer_2.5s_infinite_linear] [animation-delay:1.25s]" />
          <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#97F2CC] to-transparent animate-[shimmer_3s_infinite_linear]" />
          <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#97F2CC] to-transparent animate-[shimmer_3s_infinite_linear] [animation-delay:1.5s]" />
        </div>

        {/* Top Pins with depth */}
        <div
          style={{ transform: 'translateZ(12px)' }}
          className="absolute top-0 left-8 right-8 flex justify-between -translate-y-2 pointer-events-none"
        >
          {Array.from({ length: pinCount }).map((_, i) => (
            <div
              key={`pin-t-${i}`}
              className="w-1.5 h-2.5 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-b-xs border-t border-zinc-500 shadow-xs"
            />
          ))}
        </div>

        {/* Bottom Pins with depth */}
        <div
          style={{ transform: 'translateZ(12px)' }}
          className="absolute bottom-0 left-8 right-8 flex justify-between translate-y-2 pointer-events-none"
        >
          {Array.from({ length: pinCount }).map((_, i) => (
            <div
              key={`pin-b-${i}`}
              className="w-1.5 h-2.5 bg-gradient-to-t from-zinc-300 to-zinc-600 rounded-t-xs border-b border-zinc-500 shadow-xs"
            />
          ))}
        </div>

        {/* Left Pins */}
        <div
          style={{ transform: 'translateZ(12px)' }}
          className="absolute left-0 top-8 bottom-8 flex flex-col justify-between -translate-x-2 pointer-events-none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`pin-l-${i}`}
              className="h-1.5 w-2.5 bg-gradient-to-r from-zinc-300 to-zinc-600 rounded-r-xs border-l border-zinc-500 shadow-xs"
            />
          ))}
        </div>

        {/* Right Pins */}
        <div
          style={{ transform: 'translateZ(12px)' }}
          className="absolute right-0 top-8 bottom-8 flex flex-col justify-between translate-x-2 pointer-events-none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`pin-r-${i}`}
              className="h-1.5 w-2.5 bg-gradient-to-l from-zinc-300 to-zinc-600 rounded-l-xs border-r border-zinc-500 shadow-xs"
            />
          ))}
        </div>

        {/* Header telemetry with 3D layer */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="flex items-center justify-between border-b border-zinc-800/90 pb-3 mb-4"
        >
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97F2CC] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#97F2CC]"></span>
            </span>
            <span className="text-[11px] font-mono tracking-wider text-zinc-300 font-semibold uppercase">
              AI ADVANCED CHIP
            </span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
            <Activity className="w-2.5 h-2.5 text-[#97F2CC] animate-pulse" />
            <span>NEXUS-v3.8</span>
          </div>
        </div>

        {/* Central Die & Neural Lattice */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="relative aspect-square max-h-[260px] w-full rounded-xl bg-gradient-to-br from-zinc-900 via-[#0e0e0e] to-black border border-zinc-800 p-4 flex flex-col items-center justify-center overflow-hidden shadow-inner"
        >
          {/* Circuit Lines SVG with Active Micro-Pulse Animations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#97F2CC" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#333" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#97F2CC" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Concentric neural pathways */}
            <circle cx="150" cy="150" r="120" stroke="#222" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            <circle cx="150" cy="150" r="85" stroke="#333" strokeWidth="1" fill="none" />
            <circle cx="150" cy="150" r="52" stroke="#97F2CC" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />

            {/* Main bus traces */}
            <path d="M 150 20 L 150 70 M 150 230 L 150 280" stroke="#97F2CC" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M 20 150 L 70 150 M 230 150 L 280 150" stroke="#97F2CC" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M 58 58 L 95 95 M 205 205 L 242 242" stroke="#444" strokeWidth="1" />
            <path d="M 242 58 L 205 95 M 95 205 L 58 242" stroke="#444" strokeWidth="1" />

            {/* Micro-light running pulses traversing circuits */}
            <circle cx="150" cy="45" r="2" fill="#97F2CC" className="animate-ping" />
            <circle cx="150" cy="255" r="2" fill="#97F2CC" className="animate-ping [animation-delay:0.5s]" />
            <circle cx="45" cy="150" r="2" fill="#97F2CC" className="animate-ping [animation-delay:0.8s]" />
            <circle cx="255" cy="150" r="2" fill="#97F2CC" className="animate-ping [animation-delay:1.1s]" />
          </svg>

          {/* Interactive Shockwave Ripple on Click */}
          {pulseKey > 0 && (
            <motion.div
              key={pulseKey}
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute w-28 h-28 rounded-full border-2 border-[#97F2CC] bg-[#97F2CC]/20 pointer-events-none z-20"
            />
          )}

          {/* Core Silicon Processor with high Z-elevation */}
          <motion.div
            style={{ transform: 'translateZ(38px)' }}
            animate={{
              boxShadow:
                chipMode === 'turbo'
                  ? [
                      '0 0 15px rgba(151,242,204,0.3)',
                      '0 0 35px rgba(151,242,204,0.6)',
                      '0 0 15px rgba(151,242,204,0.3)',
                    ]
                  : [
                      '0 0 10px rgba(151,242,204,0.2)',
                      '0 0 22px rgba(151,242,204,0.45)',
                      '0 0 10px rgba(151,242,204,0.2)',
                    ],
            }}
            transition={{
              repeat: Infinity,
              duration: pulseDuration,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-950 to-black border-2 border-[#97F2CC]/80 flex flex-col items-center justify-center p-2 text-center group-hover:border-[#97F2CC] transition-colors"
          >
            {/* Glowing mint core inner aura */}
            <div className="absolute inset-0 rounded-2xl bg-[#97F2CC]/15 filter blur-md pointer-events-none" />

            {/* SIMPORA Official Isotype Logo in center */}
            <div className="relative mb-1 flex items-center justify-center">
              <SimporaIsotype size={36} className="drop-shadow-[0_0_12px_rgba(151,242,204,0.75)] animate-pulse" />
            </div>
            <div className="relative text-[11px] font-bold text-white tracking-widest uppercase font-display">
              SIMPORA
            </div>
            <div className="relative text-[8px] font-mono text-[#97F2CC] tracking-tighter">
              NPU CORE v3.8
            </div>
          </motion.div>

          {/* Floating Data Nodes */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute top-3 left-3 text-[9px] font-mono text-zinc-400 bg-black/75 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-xs"
          >
            LOAD: {chipMode === 'turbo' ? '88%' : chipMode === 'ai' ? '42%' : '14%'}
          </div>
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute top-3 right-3 text-[9px] font-mono text-[#97F2CC] bg-black/75 px-2 py-0.5 rounded border border-[#97F2CC]/30 flex items-center gap-1 backdrop-blur-xs"
          >
            <Zap className="w-2.5 h-2.5" /> 4.8 GHz
          </div>
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute bottom-3 left-3 text-[9px] font-mono text-zinc-400 bg-black/75 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-xs"
          >
            LATENCY: 1.2ms
          </div>
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute bottom-3 right-3 text-[9px] font-mono text-zinc-300 bg-black/75 px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1 backdrop-blur-xs"
          >
            <ShieldCheck className="w-2.5 h-2.5 text-[#97F2CC]" /> ACTIVE
          </div>
        </div>

        {/* Footer label and mode selector */}
        <div
          style={{ transform: 'translateZ(18px)' }}
          className="mt-4 pt-3 border-t border-zinc-800/90 flex items-center justify-between"
        >
          <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            NEURAL PROCESSING UNIT
          </div>
          <div className="flex gap-1.5">
            {(['eco', 'ai', 'turbo'] as const).map((mode) => (
              <button
                key={mode}
                onClick={(e) => {
                  e.stopPropagation();
                  setChipMode(mode);
                }}
                className={`text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  chipMode === mode
                    ? 'bg-[#97F2CC] text-[#121212] font-bold shadow-xs scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive hint */}
        <p className="text-[10px] text-zinc-500 text-center mt-3 font-mono">
          {language === 'en'
            ? 'Hover to tilt in 3D • Click to emit pulse wave'
            : 'Mueve el cursor para inclinar en 3D • Clic para emitir onda cuántica'}
        </p>
      </motion.div>
    </div>
  );
};
