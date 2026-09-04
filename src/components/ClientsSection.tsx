import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { CLIENTS_DATA } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';

export const ClientsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="clientes" className="py-20 sm:py-24 bg-[#F5F7F8] border-t border-black/5 relative z-10 overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC] shadow-[0_0_8px_#97F2CC]" />
            <span>{t.clients.badge}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#121212] tracking-tight mb-4">
            {t.clients.heading}
          </h2>
          <p className="font-body text-zinc-600 text-sm sm:text-base leading-relaxed">
            {t.clients.subtitle}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CLIENTS_DATA.map((client, idx) => {
            const isMarinaOrPosada = client.id.includes('copan');
            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] hover:border-[#97F2CC] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                {/* Top Bar: Logo & Industry Pill */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Logo Container with High Contrast & Protection */}
                    <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-2xl bg-zinc-50 border border-black/5 p-2.5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter contrast-105"
                        onError={(e) => {
                          // Fallback to building icon if image fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-[11px] font-mono font-medium text-zinc-700 border border-black/5">
                        {client.category[language]}
                      </span>
                    </div>
                  </div>

                  {/* Client Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121212] mb-2 tracking-tight group-hover:text-zinc-900">
                    {client.name}
                  </h3>

                  {/* What Simpora Did (Badge de Alto Impacto) */}
                  <div className="mb-4">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#97F2CC]/15 border border-[#97F2CC]/40 text-[#121212] text-xs font-semibold font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                      <span>{client.whatWeDid[language]}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {client.description[language]}
                  </p>
                </div>

                {/* Bottom Footer: Tags & Website CTA */}
                <div className="pt-5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  {/* Scope Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-md border border-black/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Link */}
                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold font-body text-[#121212] hover:text-emerald-700 transition-colors shrink-0 group/link"
                    >
                      <span>{t.clients.visitWeb}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{t.clients.directImpact}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
