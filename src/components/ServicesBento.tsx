import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  Code2,
  Wrench,
  Cpu,
  GraduationCap,
  ArrowRight,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TextScrubHeading } from './TextScrubHeading';

interface ServicesBentoProps {
  onSelectServiceForDiagnosis: (pillarTitle: string) => void;
}

// Interactive 3D Holographic Bento Card (Apple Wallet / Stripe Press style)
const HolographicBentoCard: React.FC<{
  pillar: any;
  idx: number;
  isFeatured: boolean;
  onSelect: (title: string) => void;
  getIcon: (id: string, isFeatured: boolean) => React.ReactNode;
  diagnoseBtnText: string;
  quoteTitleText: string;
}> = ({ pillar, idx, isFeatured, onSelect, getIcon, diagnoseBtnText, quoteTitleText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Smooth gyroscopic tilt range (±9 degrees)
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 9;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({ x: percentX, y: percentY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 group shadow-sm hover:shadow-2xl overflow-hidden will-change-transform ${
          isFeatured
            ? 'bg-[#121212] text-white border border-zinc-800 hover:border-[#97F2CC]'
            : 'bg-[#F5F7F8] text-[#121212] border border-slate-200/80 hover:bg-white hover:border-[#97F2CC]'
        }`}
      >
        {/* Holographic Reactive Glare Shader (Follows mouse position) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl z-10"
          style={{
            opacity: glarePos.opacity,
            background: isFeatured
              ? `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(151,242,204,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`
              : `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(151,242,204,0.28) 0%, rgba(18,18,18,0.03) 45%, transparent 70%)`,
          }}
        />

        {/* Dynamic Holographic Mint Border Refraction */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, #97F2CC 0%, transparent 60%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1.5px',
          }}
        />

        {/* Z-Lifted Main Content (3D Depth Layering) */}
        <div style={{ transform: 'translateZ(24px)' }} className="relative z-20">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-xs ${
                isFeatured
                  ? 'bg-[#97F2CC] text-[#121212] shadow-[0_0_12px_rgba(151,242,204,0.4)]'
                  : 'bg-white border border-slate-200/80 text-[#121212] group-hover:bg-[#97F2CC] group-hover:border-[#97F2CC]'
              }`}
            >
              {getIcon(pillar.id, isFeatured)}
            </div>
            <span
              className={`text-xs font-mono font-bold tracking-widest ${
                isFeatured ? 'text-zinc-500 group-hover:text-[#97F2CC]' : 'text-zinc-400 group-hover:text-zinc-600'
              }`}
            >
              {pillar.number}
            </span>
          </div>

          <h3
            className={`font-display font-bold text-lg sm:text-xl mb-2 transition-colors ${
              isFeatured ? 'text-[#97F2CC]' : 'text-[#121212] group-hover:text-black'
            }`}
          >
            {pillar.title}
          </h3>

          <p
            className={`font-body text-xs sm:text-sm leading-relaxed mb-5 ${
              isFeatured ? 'text-zinc-300 opacity-80' : 'text-[#121212] opacity-65'
            }`}
          >
            {pillar.shortDesc}
          </p>

          {/* Bullet Deliverables */}
          <ul className="space-y-2 mb-6">
            {pillar.deliverables.map((item: string, itemIdx: number) => (
              <li
                key={itemIdx}
                className={`flex items-start space-x-2 text-xs leading-normal ${
                  isFeatured ? 'text-zinc-300' : 'text-[#121212] opacity-75'
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                    isFeatured ? 'text-[#97F2CC]' : 'text-[#121212]'
                  }`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Z-Lifted Bottom Actions */}
        <div
          style={{ transform: 'translateZ(18px)' }}
          className={`relative z-20 pt-4 border-t flex items-center justify-between ${
            isFeatured ? 'border-zinc-800' : 'border-slate-200/80'
          }`}
        >
          <button
            type="button"
            onClick={() => onSelect(pillar.title)}
            className={`text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isFeatured
                ? 'text-[#97F2CC] hover:text-white'
                : 'text-[#121212] hover:text-black'
            }`}
          >
            <span>{diagnoseBtnText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <a
            href="#contacto"
            className={`p-2 rounded-xl transition-all ${
              isFeatured
                ? 'bg-zinc-800 text-white hover:bg-[#97F2CC] hover:text-[#121212]'
                : 'bg-white border border-slate-200/80 text-[#121212] hover:bg-[#121212] hover:text-white hover:border-[#121212]'
            }`}
            title={quoteTitleText}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectServiceForDiagnosis,
}) => {
  const { t, language } = useLanguage();

  const getIcon = (id: string, isSpanned: boolean) => {
    const iconClass = `w-4 h-4 ${isSpanned ? 'text-[#121212]' : 'text-[#121212]'}`;
    switch (id) {
      case 'ai':
        return <Sparkles className={iconClass} />;
      case 'consultoria':
        return <TrendingUp className={iconClass} />;
      case 'desarrollo':
        return <Code2 className={iconClass} />;
      case 'mantenimiento':
        return <Wrench className={iconClass} />;
      case 'productos':
        return <Cpu className={iconClass} />;
      case 'capacitacion':
        return <GraduationCap className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 lg:py-24 bg-white/85 relative z-10 overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
              <span>{t.services.badge}</span>
            </div>
            <TextScrubHeading
              text={t.services.heading}
              className="text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight"
              accentWord="Pilares"
            />
            <p className="mt-2 font-body text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
              {t.services.subtitle}
            </p>
          </div>

          <div className="text-left md:text-right">
            <a
              href="#solution-finder"
              className="btn-outline text-xs"
            >
              <span>{t.services.diagnoseBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97F2CC]" />
            </a>
          </div>
        </div>

        {/* Holographic Reactive 3D Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {t.services.pillars.map((pillar, idx) => (
            <HolographicBentoCard
              key={pillar.id}
              pillar={pillar}
              idx={idx}
              isFeatured={idx === 0}
              onSelect={onSelectServiceForDiagnosis}
              getIcon={getIcon}
              diagnoseBtnText={t.services.diagnoseBtn}
              quoteTitleText={language === 'en' ? `Quote ${pillar.title}` : `Cotizar ${pillar.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
