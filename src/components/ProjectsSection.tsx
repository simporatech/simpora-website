import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2, ArrowUpRight, Zap, Shield, Sparkles, Layers, Globe } from 'lucide-react';
import { PROJECTS_DATA } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';

export const ProjectsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="proyectos" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-black/5 relative z-10 overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight mb-2">
            {t.projects.heading}
          </h2>
          <p className="font-body text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Showcase: 2 High-Caliber Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PROJECTS_DATA.map((project, idx) => {
            const isGrowy = project.id === 'growy';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                  isGrowy
                    ? 'bg-[#0c0d0e] text-white border border-white/10'
                    : 'bg-[#F5F7F8] text-[#121212] border border-black/[0.06]'
                }`}
              >
                {/* Ambient Radial Accent Glow */}
                {isGrowy && (
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(151,242,204,0.14)_0%,transparent_70%)] pointer-events-none" />
                )}

                <div className="relative z-10">
                  {/* Top Bar: Brand Logo & Status Metric */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`h-14 sm:h-16 px-4 py-2 rounded-2xl flex items-center justify-center ${
                        isGrowy
                          ? 'bg-white/5 border border-white/10'
                          : 'bg-white border border-black/5 shadow-xs'
                      }`}
                    >
                      <img
                        src={project.logo}
                        alt={project.title}
                        loading="lazy"
                        className="max-h-9 sm:max-h-10 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="flex flex-col items-end">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider ${
                          isGrowy
                            ? 'bg-[#97F2CC]/15 text-[#97F2CC] border border-[#97F2CC]/30'
                            : 'bg-[#121212] text-white'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC] animate-ping mr-1.5" />
                        {project.badge[language]}
                      </span>

                      {project.metrics && (
                        <span
                          className={`text-[10px] font-mono mt-1 ${
                            isGrowy ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          {project.metrics.label[language]}:{' '}
                          <strong className={isGrowy ? 'text-white' : 'text-[#121212]'}>
                            {project.metrics.value}
                          </strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Category & Title */}
                  <div className="mb-4">
                    <span
                      className={`text-xs font-mono font-medium ${
                        isGrowy ? 'text-[#97F2CC]' : 'text-emerald-700'
                      }`}
                    >
                      {project.category[language]}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight mt-1">
                      {project.title}
                    </h3>
                    <p
                      className={`font-body text-xs sm:text-sm font-medium mt-1 ${
                        isGrowy ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {project.tagline[language]}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    className={`font-body text-xs sm:text-sm leading-relaxed mb-6 ${
                      isGrowy ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {project.description[language]}
                  </p>

                  {/* Features Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    <span
                      className={`block text-[11px] font-mono uppercase tracking-wider font-semibold ${
                        isGrowy ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {t.projects.keyHighlights}
                    </span>
                    <ul className="space-y-2">
                      {project.features[language].map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2 text-xs sm:text-sm font-body">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isGrowy ? 'text-[#97F2CC]' : 'text-emerald-600'
                            }`}
                          />
                          <span className={isGrowy ? 'text-zinc-300' : 'text-zinc-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button: Direct to Live Platform */}
                <div className="relative z-10 pt-6 border-t border-black/5 sm:flex sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-4 sm:mb-0">
                    <Globe className="w-3.5 h-3.5 text-[#97F2CC]" />
                    <span>{project.displayUrl}</span>
                  </div>

                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${isGrowy ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <span>{t.projects.liveDemo}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
