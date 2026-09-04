import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Shield, Zap, Terminal } from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { NpuChip } from './NpuChip';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenConsultant: () => void;
  isRevealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultant,
  isRevealed = true,
}) => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  // Subtle GPU-accelerated scroll parallax (y: [0, 30]) and progressive fadeout
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const chipY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const chipOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // 60 FPS Lightweight Staggered Animation Sequence (GPU accelerated only)
  const easeCurve = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const badgeVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeCurve },
    },
  };

  const h1Variant = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 0.75,
      y: 0,
      transition: { duration: 0.5, ease: easeCurve },
    },
  };

  const ctaVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: easeCurve },
    },
  };

  const proofVariant = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeCurve },
    },
  };

  const chipVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, delay: 0.35, ease: easeCurve },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-10 min-h-screen min-h-[calc(100dvh-5rem)] pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden flex flex-col justify-center bg-transparent scroll-mt-20 lg:scroll-mt-24"
    >
      {/* Subtle Dot-Grid Canvas Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.25px,transparent_1.25px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_50%,transparent_100%)] opacity-35 pointer-events-none -z-10" />

      {/* Subtle Bottom Fade to White for Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Text Column: Staggered sequence for Badge -> H1 -> Subheading -> CTAs -> Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-left"
          >
            {/* 1. Top Brand Badge */}
            <motion.div
              variants={badgeVariant}
              style={{ willChange: 'transform, opacity' }}
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#F5F7F8] border border-black/5 text-[11px] sm:text-xs font-mono text-[#121212] max-w-full"
            >
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#97F2CC] animate-pulse shrink-0" />
              <Sparkles className="w-3.5 h-3.5 text-[#97F2CC] shrink-0" />
              <span className="font-semibold tracking-wide text-[#121212]">SIMPORA</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600 uppercase tracking-wider text-[10px] sm:text-[11px] font-medium truncate">
                {t.hero.tagline}
              </span>
            </motion.div>

            {/* 2. Main Headline with Smooth Upward Slide */}
            <motion.h1
              variants={h1Variant}
              style={{ willChange: 'transform, opacity' }}
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.035em] text-[#121212] leading-[1.1]"
            >
              {language === 'en' ? (
                <>
                  We make technology{' '}
                  <span className="text-[#121212] relative inline-block">
                    <span className="relative z-10">work</span>
                    <span className="absolute left-0 bottom-1 w-full h-2.5 sm:h-3 bg-[#97F2CC]/50 -z-0 rounded-sm" />
                  </span>{' '}
                  for you.
                </>
              ) : (
                <>
                  Haremos que la tecnología{' '}
                  <span className="text-[#121212] relative inline-block">
                    <span className="relative z-10">trabaje</span>
                    <span className="absolute left-0 bottom-1 w-full h-2.5 sm:h-3 bg-[#97F2CC]/50 -z-0 rounded-sm" />
                  </span>{' '}
                  para ti.
                </>
              )}
            </motion.h1>

            {/* 3. Subtitle / Mission Statement */}
            <motion.p
              variants={textVariant}
              style={{ willChange: 'transform, opacity' }}
              className="font-body text-sm sm:text-lg text-[#121212] max-w-xl leading-relaxed font-normal"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* 4. CTA Action Buttons (Full width stack on small screens) */}
            <motion.div
              variants={ctaVariant}
              style={{ willChange: 'transform, opacity' }}
              className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto"
            >
              <a
                href="#solution-finder"
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-full bg-[#121212] hover:bg-black text-white font-semibold text-xs tracking-tight transition-all shadow-xs hover:shadow group cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#97F2CC]" />
                <span>{t.hero.ctaAi}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#97F2CC] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#F5F7F8] hover:bg-white border border-black/5 text-[#121212] font-semibold text-xs transition-all hover:border-[#97F2CC] cursor-pointer"
              >
                <span>{t.hero.ctaServices}</span>
              </a>
            </motion.div>

            {/* 5. Micro Proof Stats (Responsive grid) */}
            <motion.div
              variants={proofVariant}
              style={{ willChange: 'transform, opacity' }}
              className="pt-5 sm:pt-6 border-t border-black/5 grid grid-cols-3 gap-2.5 sm:gap-4 text-left max-w-xl"
            >
              <div>
                <div className="flex items-center space-x-1 text-[#121212] font-display font-bold text-base sm:text-xl">
                  <span>100%</span>
                  <span className="text-zinc-400 text-[10px] sm:text-xs font-mono font-normal">{t.hero.badgeCode}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-body leading-tight">{t.hero.badgeCodeSub}</p>
              </div>

              <div>
                <div className="flex items-center space-x-1 text-[#121212] font-display font-bold text-base sm:text-xl">
                  <span>&lt;24h</span>
                  <span className="text-[#97F2CC] text-[10px] sm:text-xs font-mono font-bold bg-[#121212] px-1 py-0.2 rounded">SLA</span>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-body leading-tight">{t.hero.badgeSlaSub}</p>
              </div>

              <div>
                <div className="flex items-center space-x-1 text-[#121212] font-display font-bold text-base sm:text-xl">
                  <span>{t.hero.badgePillars}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-body leading-tight">{t.hero.badgePillarsSub}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Settling Interactive NPU Silicon Visual with Mint Aura and Scroll Parallax */}
          <motion.div
            variants={chipVariant}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
            style={{
              y: chipY,
              opacity: chipOpacity,
              willChange: 'transform, opacity',
            }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
          >
            {/* Ambient silicon aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#97F2CC]/25 via-transparent to-[#97F2CC]/15 rounded-3xl blur-2xl pointer-events-none -z-10 animate-pulse" />
            <NpuChip isRevealed={isRevealed} />

            {/* Floating feature tags */}
            <div className="w-full max-w-[440px] flex flex-wrap items-center justify-center sm:justify-between gap-2.5 mt-3 sm:mt-4 px-2 text-[10px] sm:text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-[#97F2CC]" /> Next-Gen Architecture
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> High Performance
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" /> Enterprise Grade
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

