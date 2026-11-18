import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, CheckCircle2, Sparkles, X, Pause, Play, ArrowUpRight } from 'lucide-react';
import { CLIENTS_DATA } from '../data/simporaData';
import { ClientItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ClientsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openClientDialog = (client: ClientItem) => {
    setSelectedClient(client);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  const closeClientDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  };

  // Fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const doubleClients = [...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section
      id="clientes"
      className="py-16 sm:py-20 lg:py-24 bg-[#F5F7F8] border-t border-black/5 relative z-10 overflow-hidden scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
              <span>{t.clients.badge}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight mb-2">
              {t.clients.heading}
            </h2>
            <p className="font-body text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
              {t.clients.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
            <span className="text-[11px] font-mono text-zinc-500 hidden md:inline">
              {language === 'es' ? 'Haz clic para ver detalles' : 'Click any card for details'}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs font-mono font-medium text-zinc-700 hover:border-[#97F2CC] hover:text-[#121212] transition-colors shadow-xs"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>
                {isPaused
                  ? language === 'es'
                    ? 'Reanudar'
                    : 'Play'
                  : language === 'es'
                    ? 'Pausar'
                    : 'Pause'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className={`flex w-max animate-marquee space-x-4 sm:space-x-5 py-2 hover:[animation-play-state:paused] ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
        >
          {doubleClients.map((client, idx) => {
            const isDarkLogoBg = client.id === 'tonys-grill';
            return (
              <button
                key={`${client.id}-${idx}`}
                type="button"
                onClick={() => openClientDialog(client)}
                className="group w-[270px] sm:w-[310px] shrink-0 text-left flex flex-col justify-between p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-[#97F2CC] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-20 h-14 rounded-xl border p-2 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
                        isDarkLogoBg ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-black/5'
                      }`}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter contrast-105"
                      />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-zinc-400 group-hover:text-[#121212] transition-colors">
                      <span>{language === 'es' ? 'Ver info' : 'Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[#121212] mb-1.5 tracking-tight">
                    {client.name}
                  </h3>

                  <p className="text-[11px] font-mono text-zinc-500 mb-3 line-clamp-1">
                    {client.category[language]}
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#97F2CC]/15 border border-[#97F2CC]/40 text-[#121212] text-[11px] font-semibold font-mono w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#121212]" />
                  <span className="truncate">{client.whatWeDid[language]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Native Modal Dialog for Client Details */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as any)}
        aria-labelledby="client-dialog-title"
        onClose={() => setSelectedClient(null)}
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl bg-white p-0 text-[#121212] shadow-2xl border border-black/10"
      >
        {selectedClient && (
          <div className="p-6 sm:p-8">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-20 h-16 sm:w-24 sm:h-18 rounded-2xl border p-2.5 flex items-center justify-center shrink-0 ${
                    selectedClient.id === 'tonys-grill'
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-zinc-50 border-black/5'
                  }`}
                >
                  <img
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    className="max-h-full max-w-full object-contain filter contrast-105"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-100 text-[11px] font-mono font-medium text-zinc-700 border border-black/5 mb-1.5">
                    {selectedClient.category[language]}
                  </span>
                  <h3
                    id="client-dialog-title"
                    className="font-display font-bold text-xl sm:text-2xl text-[#121212] tracking-tight"
                  >
                    {selectedClient.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={closeClientDialog}
                aria-label={language === 'es' ? 'Cerrar' : 'Close'}
                className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-[#121212] transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* What SIMPORA Did */}
            <div className="mb-5 p-4 rounded-2xl bg-[#97F2CC]/15 border border-[#97F2CC]/45">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                {t.clients.whatWeDid}
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base font-display font-bold text-[#121212]">
                <Sparkles className="w-4 h-4 shrink-0 text-[#121212]" />
                <span>{selectedClient.whatWeDid[language]}</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-zinc-600 text-sm leading-relaxed mb-6">
              {selectedClient.description[language]}
            </p>

            {/* Footer: Tags & Website CTA */}
            <div className="pt-5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedClient.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md border border-black/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {selectedClient.website ? (
                <a
                  href={selectedClient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary shrink-0"
                >
                  <span>{t.clients.visitWeb}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-500 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#97F2CC]" />
                  <span>{t.clients.directImpact}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
