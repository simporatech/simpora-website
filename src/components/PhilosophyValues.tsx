import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Zap, Handshake, Target, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TextScrubHeading } from './TextScrubHeading';

export const PhilosophyValues: React.FC = () => {
  const { t } = useLanguage();

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Lightbulb className="w-4 h-4 text-[#121212]" />;
      case 1:
        return <Zap className="w-4 h-4 text-[#121212]" />;
      case 2:
        return <Handshake className="w-4 h-4 text-[#121212]" />;
      default:
        return <Lightbulb className="w-4 h-4 text-[#121212]" />;
    }
  };

  return (
    <section id="filosofia" className="section-standard-screen flex flex-col justify-center py-4 sm:py-6 lg:py-8 bg-white/85 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-4 sm:mb-6 text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
            <span>{t.philosophy.badge}</span>
          </div>
          <TextScrubHeading
            text={t.philosophy.heading}
            className="text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight"
            accentWord="Valores"
          />
          <p className="mt-2 font-body text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
            {t.philosophy.description}
          </p>
        </div>

        {/* Visión & Misión Duo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-4 sm:p-5 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] shadow-xs relative overflow-hidden hover:bg-white hover:border-[#97F2CC] transition-all group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#97F2CC]/30 transition-colors">
                <Compass className="w-4 h-4 text-[#121212]" />
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#121212]">
                {t.philosophy.visionTitle}
              </h3>
            </div>
            <p className="font-body text-zinc-600 text-xs sm:text-sm leading-relaxed">
              {t.philosophy.visionDesc}
            </p>
          </motion.div>

          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="p-4 sm:p-5 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] shadow-xs relative overflow-hidden hover:bg-white hover:border-[#97F2CC] transition-all group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#97F2CC]/30 transition-colors">
                <Target className="w-4 h-4 text-[#121212]" />
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#121212]">
                {t.philosophy.missionTitle}
              </h3>
            </div>
            <p className="font-body text-zinc-600 text-xs sm:text-sm leading-relaxed">
              {t.philosophy.missionDesc}
            </p>
          </motion.div>
        </div>

        {/* 3 Core Values: Innovación, Eficiencia, Compromiso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.philosophy.values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] hover:bg-white hover:border-[#97F2CC] shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-[#97F2CC]/30 border border-black/5 flex items-center justify-center transition-colors">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="font-display font-bold text-base sm:text-lg text-[#121212] mb-0.5">
                  {val.title}
                </h4>
                <div className="text-[11px] font-mono text-zinc-400 mb-2">
                  {val.subtitle}
                </div>

                <p className="font-body text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3">
                  {val.description}
                </p>
              </div>

              <div className="pt-3.5 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  {val.metricLabel}
                </span>
                <span className="font-display font-semibold text-sm text-[#121212] bg-white border border-black/5 px-2.5 py-0.5 rounded-full">
                  {val.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

