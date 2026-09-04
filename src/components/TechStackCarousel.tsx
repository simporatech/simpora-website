import React from 'react';
import { TECH_STACK } from '../data/simporaData';
import { Layers, Terminal, Sparkles, Code, Server, Layout, Cpu, Database, Box, Cloud, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TechStackCarousel: React.FC = () => {
  const { t } = useLanguage();

  // Render icon based on name
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Python':
        return <Terminal className="w-4 h-4 text-zinc-900" />;
      case 'Gemini AI':
        return <Sparkles className="w-4 h-4 text-[#333333]" />;
      case 'TypeScript':
        return <Code className="w-4 h-4 text-zinc-900" />;
      case 'React 19':
        return <Layers className="w-4 h-4 text-zinc-900" />;
      case 'Node.js':
        return <Server className="w-4 h-4 text-zinc-900" />;
      case 'Tailwind CSS':
        return <Layout className="w-4 h-4 text-zinc-900" />;
      case 'PyTorch':
        return <Cpu className="w-4 h-4 text-zinc-900" />;
      case 'PostgreSQL':
        return <Database className="w-4 h-4 text-zinc-900" />;
      case 'Docker':
        return <Box className="w-4 h-4 text-zinc-900" />;
      case 'Google Cloud':
        return <Cloud className="w-4 h-4 text-zinc-900" />;
      case 'Linux':
        return <Shield className="w-4 h-4 text-zinc-900" />;
      default:
        return <Zap className="w-4 h-4 text-zinc-900" />;
    }
  };

  // Duplicate for seamless infinite loop effect
  const doubleStack = [...TECH_STACK, ...TECH_STACK];

  return (
    <section id="stack" className="py-16 sm:py-20 bg-[#F5F7F8] border-y border-black/5 relative z-10 overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-10 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
          <span>{t.techStack.badge}</span>
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121212] tracking-tight">
          {t.techStack.heading}
        </h3>
        <p className="text-[#121212] opacity-70 text-sm font-body max-w-xl mx-auto mt-2">
          {t.techStack.description}
        </p>
      </div>

      {/* Ticker Container with gradient fade edges */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee space-x-3.5 py-2 hover:[animation-play-state:paused]">
          {doubleStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center space-x-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-black/5 shadow-xs hover:border-[#97F2CC] transition-all select-none group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F5F7F8] flex items-center justify-center group-hover:bg-[#97F2CC]/40 transition-colors">
                {renderIcon(tech.name)}
              </div>
              <div className="text-left">
                <div className="font-display font-semibold text-xs sm:text-sm text-[#121212]">
                  {tech.name}
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

