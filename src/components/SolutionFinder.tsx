import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
  Code,
  AlertCircle,
  RotateCcw,
  MessageSquare,
  Building2,
  ShoppingBag,
  Briefcase,
  Stethoscope,
  GraduationCap,
  Truck,
} from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { DiagnosisResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CustomDropdown, DropdownOption } from './CustomDropdown';
import { TextScrubHeading } from './TextScrubHeading';

interface SolutionFinderProps {
  onApplyDiagnosisToContact: (diagnosisText: string) => void;
  externalPreset?: string;
}

export const SolutionFinder: React.FC<SolutionFinderProps> = ({
  onApplyDiagnosisToContact,
  externalPreset,
}) => {
  const { t, language } = useLanguage();
  const [problemInput, setProblemInput] = useState(
    externalPreset || t.solutionFinder.presets[0].prompt
  );
  const [industry, setIndustry] = useState(t.solutionFinder.industries[0].value);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update default prompt if externalPreset changed or if user switched language and hasn't heavily modified it
  useEffect(() => {
    if (externalPreset) {
      setProblemInput(externalPreset);
    }
  }, [externalPreset]);

  // Industry options with icons
  const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'General / Empresarial': Building2,
    'General / Corporate': Building2,
    'Comercio / E-commerce': ShoppingBag,
    'Retail & E-commerce': ShoppingBag,
    'Servicios Profesionales': Briefcase,
    'Professional Services': Briefcase,
    'Salud y Clínicas': Stethoscope,
    'Healthcare & Clinics': Stethoscope,
    'Educación / Academias': GraduationCap,
    'Education & Academies': GraduationCap,
    'Industria & Logística': Truck,
    'Logistics & Supply Chain': Truck,
  };

  const dropdownOptions: DropdownOption[] = t.solutionFinder.industries.map((ind) => ({
    value: ind.value,
    label: ind.label,
    icon: industryIcons[ind.value] || Building2,
  }));

  // Ensure selected industry value exists in the current language
  useEffect(() => {
    const exists = t.solutionFinder.industries.some((ind) => ind.value === industry);
    if (!exists) {
      setIndustry(t.solutionFinder.industries[0].value);
    }
  }, [language]);

  const handleDiagnose = async (overrideText?: string) => {
    const textToSend = overrideText || problemInput;
    if (!textToSend.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: textToSend,
          industry,
          priority: 'Alta',
          lang: language,
        }),
      });

      const data = await res.json();
      if (data.diagnosis) {
        setDiagnosis(data.diagnosis);
      } else if (data.fallback) {
        setDiagnosis(data.fallback);
      } else {
        throw new Error('Formato no reconocido');
      }
    } catch (err) {
      console.warn('Diagnose fetch failed, applying graceful client fallback:', err);
      // Client-side fallback if network or dev environment hiccup
      setDiagnosis({
        recommendedPillar:
          language === 'en'
            ? 'Artificial Intelligence & Automation'
            : 'Inteligencia Artificial & Automatización',
        summary:
          language === 'en'
            ? 'Autonomous software agent architecture and enterprise LLM integration to automate repetitive tasks and synchronize business data streams.'
            : 'Arquitectura de agentes de software e integración de LLMs para optimizar procesos repetitivos y sincronizar datos.',
        timeEstimate: language === 'en' ? '2 to 3 weeks' : '2 a 3 semanas',
        roiProjection:
          language === 'en'
            ? '3x reduction in operational overhead hours'
            : '3x reducción en horas operativas manuales',
        technologies: ['Gemini 3.8 Flash', 'Python', 'Node.js', 'PostgreSQL'],
        actionPlan:
          language === 'en'
            ? [
                'Current workflow bottlenecks & data source mapping audit',
                'Rapid agent & API pipeline prototyping in sandbox',
                'Zero-trust secure integration with company systems',
                'Production rollout and hands-on team enablement',
              ]
            : [
                'Auditoría y mapeo de flujos operativos actuales',
                'Prototipado rápido del agente o pipeline en sandbox',
                'Integración segura con los sistemas del negocio',
                'Despliegue y capacitación práctica del equipo',
              ],
        leadEngineer: `${BRAND_INFO.founder} (${t.about.role})`,
      });
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (prompt: string) => {
    setProblemInput(prompt);
    handleDiagnose(prompt);
  };

  return (
    <section id="solution-finder" className="min-h-screen flex flex-col justify-center py-20 lg:py-24 bg-white/85 text-[#121212] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Main p-ai-finder Container (Clean Minimalism Theme) */}
        <div className="p-ai-finder bg-[#F5F7F8] border border-black/[0.04] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle radial graphic */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(151,242,204,0.18)_0%,transparent_70%)] pointer-events-none -z-0" />

          {/* Section Header */}
          <div className="max-w-3xl mb-12 relative z-10 text-left">
            <div className="ai-header flex items-center gap-3 mb-3">
              <span className="ai-pill bg-[#97F2CC] text-[#121212] px-3.5 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider">
                {t.solutionFinder.badge}
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                {t.solutionFinder.pill}
              </span>
            </div>
            <TextScrubHeading
              text={t.solutionFinder.heading}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#121212]"
              accentWord="IA"
            />
            <p className="mt-3 font-body text-[#121212] opacity-70 text-base sm:text-lg">
              {t.solutionFinder.description}
            </p>
          </div>

          {/* Interactive Workspace: Input Left + Diagnosis Output Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
            {/* Form and Presets Column */}
            <div className="lg:col-span-6 bg-white border border-black/[0.06] p-4.5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  {t.solutionFinder.step1}
                </label>
                <div className="ai-suggestions flex flex-wrap gap-1.5 sm:gap-2">
                  {t.solutionFinder.presets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => applyPreset(preset.prompt)}
                      className="suggest-btn text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-black/5 text-[#121212] hover:border-[#97F2CC] hover:bg-[#F5F7F8] transition-all text-left cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    {t.solutionFinder.step2}
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    {problemInput.length} {t.solutionFinder.charCount}
                  </span>
                </div>
                <div className="ai-input-box">
                  <textarea
                    value={problemInput}
                    onChange={(e) => setProblemInput(e.target.value)}
                    rows={4}
                    placeholder={t.solutionFinder.placeholder}
                    className="ai-input w-full rounded-xl bg-white border border-black/[0.08] p-3.5 sm:p-4 text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] transition-colors resize-none font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    {t.solutionFinder.industryLabel}
                  </label>
                  {/* Modern Custom Dropdown */}
                  <CustomDropdown
                    value={industry}
                    onChange={setIndustry}
                    options={dropdownOptions}
                    placeholder={t.solutionFinder.industryLabel}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => handleDiagnose()}
                    disabled={loading || !problemInput.trim()}
                    className="w-full min-h-[46px] flex items-center justify-center space-x-2 py-3 px-5 rounded-xl sm:rounded-2xl bg-[#97F2CC] hover:bg-[#84e2bc] text-[#121212] font-bold text-xs sm:text-sm tracking-tight transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                        <span>{t.solutionFinder.generatingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#121212]" />
                        <span>{t.solutionFinder.generateBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{t.solutionFinder.engineLabel}</span>
                <span>{t.solutionFinder.latencyLabel}</span>
              </div>
            </div>

            {/* Diagnosis Results Column */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-10 rounded-2xl bg-white border border-black/[0.06] flex flex-col items-center justify-center text-center min-h-[380px] shadow-xs"
                  >
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-full border-2 border-zinc-200 border-t-[#97F2CC] animate-spin" />
                      <Sparkles className="w-5 h-5 text-[#121212] absolute inset-0 m-auto" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-[#121212]">
                      {t.solutionFinder.evaluatingTitle}
                    </h4>
                    <p className="text-zinc-500 text-xs font-mono mt-2 max-w-sm">
                      {t.solutionFinder.evaluatingSubtitle}
                    </p>
                  </motion.div>
                ) : diagnosis ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.06] shadow-sm relative overflow-hidden"
                  >
                    {/* Top Recommended Pillar Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-black/5 pb-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                          {t.solutionFinder.resultPillarLabel}
                        </span>
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#97F2CC]/30 border border-[#97F2CC] text-[#121212] font-mono text-xs font-bold break-words">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#121212] shrink-0" />
                          <span>{diagnosis.recommendedPillar}</span>
                        </span>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                          {t.about.leadTitle}
                        </span>
                        <span className="text-xs font-mono font-medium text-[#121212]">
                          {diagnosis.leadEngineer || BRAND_INFO.founder}
                        </span>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="mb-5">
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        {t.solutionFinder.resultSummaryLabel}
                      </h4>
                      <p className="font-body text-[#121212] text-xs sm:text-sm leading-relaxed">
                        {diagnosis.summary}
                      </p>
                    </div>

                    {/* Key Metrics: Timeline & ROI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                      <div className="p-3.5 rounded-xl bg-[#F5F7F8] border border-black/[0.04]">
                        <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-mono mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#121212]" />
                          <span>{t.solutionFinder.resultTimelineLabel}</span>
                        </div>
                        <div className="font-display font-bold text-[#121212] text-xs sm:text-sm">
                          {diagnosis.timeEstimate}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F5F7F8] border border-black/[0.04]">
                        <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-mono mb-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.solutionFinder.resultRoiLabel}</span>
                        </div>
                        <div className="font-display font-bold text-[#121212] text-xs sm:text-sm break-words">
                          {diagnosis.roiProjection}
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    {diagnosis.technologies && diagnosis.technologies.length > 0 && (
                      <div className="mb-5">
                        <h5 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Code className="w-3 h-3 text-zinc-700" /> {t.solutionFinder.resultStackLabel}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {diagnosis.technologies.map((tItem, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-mono bg-[#F5F7F8] border border-black/5 text-[#121212] px-2.5 py-1 rounded-lg"
                            >
                              {tItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Plan */}
                    {diagnosis.actionPlan && diagnosis.actionPlan.length > 0 && (
                      <div className="mb-5">
                        <h5 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                          {t.solutionFinder.resultPlanLabel}
                        </h5>
                        <ol className="space-y-1.5">
                          {diagnosis.actionPlan.map((step, sIdx) => (
                            <li
                              key={sIdx}
                              className="text-xs text-[#121212] opacity-80 font-body flex items-start space-x-2"
                            >
                              <span className="text-[#121212] font-mono text-[11px] font-bold">
                                0{sIdx + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const summaryText =
                            language === 'en'
                              ? `Hello SIMPORA, I used the AI Solution Finder for my project. Architecture Diagnosis: ${diagnosis.recommendedPillar} - "${diagnosis.summary}" (Estimated timeline: ${diagnosis.timeEstimate}). I would like to request a formal quote.`
                              : `Hola SIMPORA, utilicé el AI Solution Finder para mi proyecto. Diagnóstico: ${diagnosis.recommendedPillar} - "${diagnosis.summary}" (Tiempo estimado: ${diagnosis.timeEstimate}). Deseo cotizar formalmente.`;
                          onApplyDiagnosisToContact(summaryText);
                        }}
                        className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#121212] hover:bg-black text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                      >
                        <span>{t.solutionFinder.quoteSolutionBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#97F2CC]" />
                      </button>

                      <a
                        href={`${BRAND_INFO.whatsappUrl}%20Diagnostico:%20${encodeURIComponent(
                          diagnosis.recommendedPillar + ' - ' + diagnosis.summary
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 rounded-full bg-[#F5F7F8] hover:bg-zinc-200 border border-black/5 text-xs font-semibold text-[#121212] transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#121212]" />
                        <span>WhatsApp Directo</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white border border-dashed border-black/10 flex flex-col items-center justify-center text-center min-h-[380px] text-zinc-400">
                    <Sparkles className="w-8 h-8 text-zinc-300 mb-3" />
                    <p className="text-xs font-mono">
                      {language === 'en'
                        ? 'Select an example preset or describe your challenge to generate a diagnosis'
                        : 'Selecciona un caso o redacta tu reto para ver el diagnóstico'}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

