import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowUpRight, UserCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';
import { TextScrubHeading } from './TextScrubHeading';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="section-standard-screen flex flex-col justify-center py-4 sm:py-6 lg:py-8 bg-white/85 border-y border-black/5 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-4 sm:mb-6 text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
            <span>{t.about.badge}</span>
          </div>
          <TextScrubHeading
            text={t.about.heading}
            className="text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight"
            accentWord="SIMPORA"
          />
          <p className="mt-2 font-body text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
            {t.about.description}
          </p>
        </div>

        {/* Grid: 3 Core Pillars of About + Founder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: 3 Core Foundations */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
            {[
              {
                title: t.about.rigorousTitle,
                badge: '100% Code',
                desc: t.about.rigorousDesc,
              },
              {
                title: t.about.humanTitle,
                badge: '<24h SLA',
                desc: t.about.humanDesc,
              },
              {
                title: t.about.vanguardTitle,
                badge: 'Applied AI',
                desc: t.about.vanguardDesc,
              },
            ].map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-3 sm:p-4 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] hover:bg-white hover:border-[#97F2CC] transition-all group shadow-xs"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-black/5 group-hover:bg-[#97F2CC]/30 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#121212]" />
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#121212]">
                      {point.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded-md border border-black/5 shrink-0 ml-2">
                    {point.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 font-body leading-relaxed pl-9.5">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Lead Engineer Card (Jonathan A. Dubón) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#121212] text-white flex flex-col justify-between relative overflow-hidden shadow-sm border border-white/5"
          >
            {/* Ambient mint glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#97F2CC]/12 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#97F2CC] font-semibold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#97F2CC]" /> {t.about.leaderBadge}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 border border-zinc-800 px-2 sm:px-2.5 py-0.5 rounded-full">
                  {t.about.leadTitle}
                </span>
              </div>

              {/* Founder Profile Details with Portrait Container */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-3.5">
                {/* Professional Photo Container with Circular Mask & Mint Border */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] bg-gradient-to-br from-[#97F2CC] via-[#97F2CC]/60 to-transparent shadow-[0_0_16px_rgba(151,242,204,0.25)]">
                    <div className="w-full h-full rounded-full overflow-hidden border border-[#97F2CC]/50 bg-zinc-900 relative">
                      <img
                        src="/assets/jonathan-dubon.jpg"
                        alt={BRAND_INFO.founder}
                        className="w-full h-full object-cover object-top transition-all duration-300 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {/* Initials fallback in case image fails to load */}
                      <div className="absolute inset-0 flex items-center justify-center font-display font-black text-lg text-[#97F2CC] bg-[#1a1a1a] -z-10">
                        JD
                      </div>
                    </div>
                  </div>
                  {/* Active status pulse indicator */}
                  <span
                    className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-[#121212] flex items-center justify-center"
                    title={language === 'en' ? 'Available' : 'Activo y Disponible'}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#97F2CC] animate-pulse" />
                  </span>
                </div>

                {/* Typography Block */}
                <div className="space-y-0.5">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-snug">
                    {BRAND_INFO.founder}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#97F2CC]/15 border border-[#97F2CC]/30 text-[#97F2CC] text-[10px] font-mono font-medium">
                      {t.about.role}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {t.about.founderTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder Statement */}
              <blockquote className="space-y-1.5 text-zinc-300 text-xs sm:text-sm leading-relaxed font-body">
                <p className="italic text-zinc-200 border-l-2 border-[#97F2CC] pl-3 py-0.5">
                  "{t.about.quote}"
                </p>
                <p className="text-zinc-400 text-xs pl-3.5">
                  {t.about.bio}
                </p>
              </blockquote>
            </div>

            {/* Direct contact with Jonathan */}
            <div className="relative z-10 pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="text-[11px] font-mono text-zinc-400">
                {t.about.directLeadership}
              </div>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2 px-4 shadow-xs hover:shadow"
              >
                <span>{t.about.connectBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

