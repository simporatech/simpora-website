import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAiButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingAiButton: React.FC<FloatingAiButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="relative group flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#121212] text-white border border-white/10 shadow-2xl hover:border-[#97F2CC] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Abrir asistente de IA de SIMPORA"
      >
        {/* Pulsing mint glow aura */}
        <span className="absolute -inset-1 rounded-full bg-[#97F2CC]/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />

        <div className="relative w-6 h-6 rounded-full bg-[#97F2CC] text-[#121212] flex items-center justify-center font-bold">
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <div className="relative text-left pr-1">
          <div className="text-xs font-display font-semibold text-white flex items-center gap-1.5">
            <span>Consultor IA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
          </div>
          <div className="text-[10px] font-mono text-zinc-400">
            SIMPORA • Online
          </div>
        </div>
      </button>
    </div>
  );
};
