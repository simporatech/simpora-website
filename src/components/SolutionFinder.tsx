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
  RotateCcw,
  MessageSquare,
  Bot,
  User,
  ShieldCheck,
  Zap,
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

  const getDefaultDiagnosis = (lang: 'es' | 'en'): DiagnosisResult => ({
    recommendedPillar:
      lang === 'en'
        ? 'Artificial Intelligence & Automation'
        : 'Inteligencia Artificial & Automatización',
    summary:
      lang === 'en'
        ? 'Autonomous AI software agent architecture and enterprise LLM integration to automate repetitive tasks and synchronize business data streams in real time.'
        : 'Arquitectura de agentes de software con IA e integración de LLMs empresariales para optimizar flujos repetitivos y sincronizar datos en tiempo real.',
    timeEstimate: lang === 'en' ? '2 to 3 weeks' : '2 a 3 semanas',
    roiProjection:
      lang === 'en'
        ? '3x reduction in operational overhead hours'
        : '3x reducción en horas operativas manuales',
    technologies: ['Gemini 3.8 Flash', 'Python FastAPI', 'Node.js', 'PostgreSQL', 'Docker'],
    actionPlan:
      lang === 'en'
        ? [
            'Audit & mapping of current operational bottlenecks and data streams',
            'Rapid agent & API pipeline prototyping in an isolated sandbox',
            'Zero-trust secure integration with core company databases',
            'Production rollout and hands-on team enablement',
          ]
        : [
            'Auditoría y mapeo de cuellos de botella en flujos de trabajo actuales',
            'Prototipado rápido de agentes y APIs en entorno seguro (sandbox)',
            'Integración con bases de datos y sistemas centrales del negocio',
            'Despliegue a producción y capacitación práctica del equipo',
          ],
    leadEngineer: `${BRAND_INFO.founder} (${lang === 'en' ? 'Systems Engineer' : 'Ing. en Sistemas'})`,
  });

  const [problemInput, setProblemInput] = useState(
    externalPreset || t.solutionFinder.presets[0].prompt
  );
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [industry, setIndustry] = useState(t.solutionFinder.industries[0].value);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult>(() => getDefaultDiagnosis(language));

  // Update default prompt if externalPreset changed
  useEffect(() => {
    if (externalPreset) {
      setProblemInput(externalPreset);
      setActivePresetIndex(-1);
      handleDiagnose(externalPreset);
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

    try {
      let resolvedDiagnosis = null;

      // 1. Primary: Try Vercel Serverless Function or local server
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

        if (res.ok) {
          const data = await res.json();
          if (data.diagnosis) {
            resolvedDiagnosis = data.diagnosis;
          }
        }
      } catch (e) {
        // Fall through to client API fallback
      }

      // 2. Secondary: Direct Gemini API fallback using client-side VITE_GEMINI_API_KEY
      const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!resolvedDiagnosis && clientApiKey) {
        try {
          const directPrompt =
            language === 'en'
              ? `Analyze this business challenge for SIMPORA: "${textToSend}" in industry "${industry || 'General'}". Reply strictly in JSON: {"recommendedPillar": "One of SIMPORA's 6 pillars", "summary": "2-3 sentences", "timeEstimate": "e.g. 2 to 3 weeks", "roiProjection": "e.g. 300% ROI", "technologies": ["Tech 1", "Tech 2"], "actionPlan": ["Step 1", "Step 2", "Step 3", "Step 4"], "leadEngineer": "Jonathan A. Dubón (Systems Engineer)"}`
              : `Analiza esta necesidad para SIMPORA: "${textToSend}" en industria "${industry || 'General'}". Responde estrictamente en JSON: {"recommendedPillar": "Uno de los 6 pilares de SIMPORA", "summary": "2-3 oraciones", "timeEstimate": "ej. 2 a 3 semanas", "roiProjection": "ej. 300% ROI", "technologies": ["Tec 1", "Tec 2"], "actionPlan": ["Paso 1", "Paso 2", "Paso 3", "Paso 4"], "leadEngineer": "Jonathan A. Dubón (Ing. en Sistemas)"}`;

          const directRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${clientApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: directPrompt }] }],
                generationConfig: {
                  temperature: 0.3,
                  responseMimeType: 'application/json',
                },
              }),
            }
          );

          if (directRes.ok) {
            const directData = await directRes.json();
            const text = directData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
              resolvedDiagnosis = JSON.parse(cleaned);
            }
          }
        } catch (e) {
          // Fall through
        }
      }

      if (resolvedDiagnosis) {
        setDiagnosis(resolvedDiagnosis);
      } else {
        // Fallback simulation tailored to keyword matches
        const lower = textToSend.toLowerCase();
        let pillar = language === 'en' ? 'Artificial Intelligence & Automation' : 'Inteligencia Artificial & Automatización';
        let summary = language === 'en'
          ? 'Autonomous workflow automation and high-capacity LLM orchestrations.'
          : 'Automatización autónoma de flujos e integración de modelos de lenguaje de alta capacidad.';

        if (lower.includes('seguridad') || lower.includes('security') || lower.includes('auditor') || lower.includes('cloud')) {
          pillar = language === 'en' ? 'Tech Consultancy & Security' : 'Consultoría Tecnológica & Ciberseguridad';
          summary = language === 'en'
            ? 'Zero-trust server auditing, perimeter hardening, vulnerability remediation, and cloud topology optimization.'
            : 'Auditoría perimetral de servidores, remediación de vulnerabilidades, arquitectura zero-trust y optimización cloud.';
        } else if (lower.includes('software') || lower.includes('web') || lower.includes('plataforma') || lower.includes('app') || lower.includes('crm')) {
          pillar = language === 'en' ? 'Software Development' : 'Desarrollo de Software';
          summary = language === 'en'
            ? 'Fullstack custom software architecture with reactive responsive UI, high-speed API backends, and relational data persistence.'
            : 'Arquitectura de software a la medida con interfaz reactiva, APIs de alta velocidad y persistencia de datos relacional.';
        } else if (lower.includes('capacitac') || lower.includes('train') || lower.includes('equipo')) {
          pillar = language === 'en' ? 'Corporate AI Training' : 'Capacitación en IA para Negocios';
          summary = language === 'en'
            ? 'Executive hands-on training for operational teams to master generative AI, workflow prompts, and automation tooling.'
            : 'Formación práctica para directivos y equipos operativos en uso de IA generativa, prompting y automatización de procesos.';
        }

        setDiagnosis({
          recommendedPillar: pillar,
          summary: summary,
          timeEstimate: language === 'en' ? '2 to 3 weeks' : '2 a 3 semanas',
          roiProjection: language === 'en' ? '3x - 4x operational efficiency gain' : '3x a 4x aumento en eficiencia operativa',
          technologies: ['Gemini 3.8 Flash', 'Python', 'Node.js', 'PostgreSQL', 'Docker'],
          actionPlan: language === 'en'
            ? [
                'In-depth architecture audit and bottleneck identification',
                'Modular proof-of-concept testing in isolated staging',
                'Production deployment with zero-downtime pipeline',
                'Direct support SLA and operational handover',
              ]
            : [
                'Auditoría técnica de arquitectura e identificación de cuellos de botella',
                'Prueba de concepto modular en entorno de pruebas seguro',
                'Despliegue a producción con pipeline de cero caídas',
                'Soporte técnico directo bajo SLA y entrega operativa',
              ],
          leadEngineer: `${BRAND_INFO.founder} (${language === 'en' ? 'Systems Engineer' : 'Ing. en Sistemas'})`,
        });
      }
    } catch (err) {
      console.warn('Diagnose fetch fallback activated:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (index: number) => {
    setActivePresetIndex(index);
    const selected = t.solutionFinder.presets[index];
    if (selected) {
      setProblemInput(selected.prompt);
      handleDiagnose(selected.prompt);
    }
  };

  return (
    <section
      id="solution-finder"
      className="min-h-screen flex flex-col justify-center py-20 lg:py-24 bg-white/90 text-[#121212] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        {/* Main AI Chatbot & Copilot Console Container */}
        <div className="bg-[#0f1012] border border-white/10 rounded-3xl p-5 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(151,242,204,0.14)_0%,transparent_70%)] pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(151,242,204,0.08)_0%,transparent_70%)] pointer-events-none -z-0" />

          {/* Section Header */}
          <div className="max-w-3xl mb-8 relative z-10 text-left">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#97F2CC] text-[#121212] px-3 py-0.5 rounded-full text-[11px] font-mono font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#121212]" />
                <span>{language === 'en' ? 'AI COPILOT & CHATBOT' : 'CHATBOT & CONSULTOR IA'}</span>
              </span>
              <span className="text-xs font-mono font-medium text-zinc-400">
                {language === 'en'
                  ? 'Real-Time Systems Architecture Diagnostic'
                  : 'Diagnóstico de Arquitectura de Sistemas en Tiempo Real'}
              </span>
            </div>

            <TextScrubHeading
              text={t.solutionFinder.heading}
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-display font-black tracking-tight"
              accentWord="IA"
            />
            <p className="mt-3 font-body text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'en'
                ? 'Interact with SIMPORA’s AI Consultant or select a preset challenge. Our engine evaluates technical feasibility, calculates implementation timeline and projects immediate ROI.'
                : 'Conversa con el Consultor de IA de SIMPORA o selecciona un caso frecuente. Nuestro motor evalúa la viabilidad técnica, estima tiempos de desarrollo y calcula el ROI proyectado.'}
            </p>
          </div>

          {/* Top Telemetry & Interactive Prompt Pills */}
          <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative z-10">
            {/* Live Engine Status */}
            <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97F2CC] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#97F2CC]"></span>
                </span>
                <span className="text-[#97F2CC] font-bold tracking-wider">
                  {language === 'en' ? 'CORE ONLINE' : 'SISTEMA ONLINE'}
                </span>
              </div>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">Gemini 3.8 Flash</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Latencia: ~0.8s</span>
            </div>

            {/* Quick Solution Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
              <span className="text-[11px] font-mono text-zinc-400 shrink-0 mr-1 hidden sm:inline">
                {language === 'en' ? 'Quick Topics:' : 'Casos:'}
              </span>
              {t.solutionFinder.presets.map((preset, idx) => {
                const isActive = activePresetIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#97F2CC] text-[#121212] border-[#97F2CC] font-bold shadow-[0_0_12px_rgba(151,242,204,0.35)]'
                        : 'bg-white/[0.05] text-zinc-300 border-white/10 hover:border-[#97F2CC]/50 hover:bg-white/[0.08]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Dual-Console Interface: Conversational Chat (Left) + Architecture Blueprint HUD (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
            {/* Left Console: Conversational AI Chat & Inquiry Console */}
            <div className="lg:col-span-6 bg-zinc-950/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-inner">
              <div className="space-y-4">
                {/* Console Window Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#97F2CC]" />
                    <span className="text-white font-semibold">
                      {language === 'en' ? 'SIMPORA AI Consultant' : 'Consultor de IA SIMPORA'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    {language === 'en' ? 'Interactive Terminal' : 'Terminal Interactiva'}
                  </span>
                </div>

                {/* Chat Feed */}
                <div className="space-y-3.5 pt-1">
                  {/* Assistant Initial Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-[#97F2CC] text-[#121212] flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm text-zinc-200 leading-relaxed font-body">
                      {language === 'en'
                        ? 'Hello. I am SIMPORA’s AI Systems Consultant. What technological bottleneck or ambitious project does your business want to solve today?'
                        : 'Hola. Soy el Consultor de Soluciones de SIMPORA. ¿Qué cuello de botella operativo, integración de software o proyecto con IA deseas resolver en tu empresa?'}
                    </div>
                  </div>

                  {/* Active User Message */}
                  <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 text-white flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="bg-[#97F2CC]/15 border border-[#97F2CC]/40 text-white rounded-2xl rounded-tr-none p-3.5 text-xs sm:text-sm leading-relaxed font-body">
                      {problemInput || (language === 'en' ? 'Select a preset or describe your case below...' : 'Selecciona un caso o describe tu reto abajo...')}
                    </div>
                  </div>

                  {/* Loading Status Indicator */}
                  {loading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-[#97F2CC] text-[#121212] flex items-center justify-center shrink-0">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-none p-3 text-xs font-mono text-zinc-400 flex items-center space-x-2">
                        <span>
                          {language === 'en'
                            ? 'Evaluating systems architecture with Gemini 3.8...'
                            : 'Evaluando arquitectura de ingeniería con Gemini 3.8...'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Form Controls */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  {/* Industry Dropdown */}
                  <div className="sm:col-span-5">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      {t.solutionFinder.industryLabel}
                    </label>
                    <CustomDropdown
                      value={industry}
                      onChange={(newVal) => {
                        setIndustry(newVal);
                        handleDiagnose();
                      }}
                      options={dropdownOptions}
                      placeholder={t.solutionFinder.industryLabel}
                    />
                  </div>

                  {/* Custom Prompt Input */}
                  <div className="sm:col-span-7">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Custom Inquiry / Project Details' : 'Consulta Personalizada / Detalle'}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={problemInput}
                        onChange={(e) => {
                          setProblemInput(e.target.value);
                          setActivePresetIndex(-1);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleDiagnose();
                          }
                        }}
                        placeholder={
                          language === 'en'
                            ? 'E.g., Automate client WhatsApp quotes with inventory...'
                            : 'Ej: Automatizar cotizaciones en WhatsApp conectadas al inventario...'
                        }
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-3.5 pr-11 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#97F2CC] font-body"
                      />
                      <button
                        type="button"
                        onClick={() => handleDiagnose()}
                        disabled={loading || !problemInput.trim()}
                        className="absolute right-1 p-2 rounded-lg bg-[#97F2CC] hover:bg-[#85e2bc] text-[#121212] disabled:opacity-40 transition-all cursor-pointer"
                        title={language === 'en' ? 'Send' : 'Consultar'}
                      >
                        {loading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <span>
                    {language === 'en'
                      ? 'Press Enter to generate instant architecture blueprint'
                      : 'Presiona Enter o el botón para generar el diagnóstico'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(0)}
                    className="text-zinc-400 hover:text-[#97F2CC] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'en' ? 'Reset' : 'Reiniciar'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Console: Live Architectural Blueprint HUD (Always Populated, High Impact) */}
            <div className="lg:col-span-6 bg-zinc-900/90 border border-[#97F2CC]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-5">
                {/* HUD Top Bar: Pillar Badge & Lead Engineer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                      {t.solutionFinder.resultPillarLabel}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#97F2CC]/20 border border-[#97F2CC] text-[#97F2CC] font-mono text-xs font-bold shadow-[0_0_10px_rgba(151,242,204,0.2)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#97F2CC] shrink-0" />
                      <span>{diagnosis.recommendedPillar}</span>
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                      {t.about.leadTitle}
                    </span>
                    <span className="text-xs font-mono font-medium text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{diagnosis.leadEngineer || BRAND_INFO.founder}</span>
                    </span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div>
                  <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    {t.solutionFinder.resultSummaryLabel}
                  </h4>
                  <p className="font-body text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    {diagnosis.summary}
                  </p>
                </div>

                {/* Two Key Metrics Cards: Timeline & ROI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center space-x-1.5 text-zinc-400 text-xs font-mono mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{t.solutionFinder.resultTimelineLabel}</span>
                    </div>
                    <div className="font-display font-bold text-white text-sm sm:text-base">
                      {diagnosis.timeEstimate}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center space-x-1.5 text-zinc-400 text-xs font-mono mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{t.solutionFinder.resultRoiLabel}</span>
                    </div>
                    <div className="font-display font-bold text-[#97F2CC] text-sm sm:text-base">
                      {diagnosis.roiProjection}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                {diagnosis.technologies && diagnosis.technologies.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{t.solutionFinder.resultStackLabel}</span>
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {diagnosis.technologies.map((tItem, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono bg-white/[0.06] border border-white/10 text-zinc-200 px-2.5 py-1 rounded-lg"
                        >
                          {tItem}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Plan */}
                {diagnosis.actionPlan && diagnosis.actionPlan.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#97F2CC]" />
                      <span>{t.solutionFinder.resultPlanLabel}</span>
                    </h5>
                    <ol className="space-y-1.5">
                      {diagnosis.actionPlan.map((step, sIdx) => (
                        <li
                          key={sIdx}
                          className="text-xs text-zinc-300 font-body flex items-start space-x-2"
                        >
                          <span className="text-[#97F2CC] font-mono text-[11px] font-bold shrink-0">
                            0{sIdx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Action CTAs */}
              <div className="pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const summaryText =
                      language === 'en'
                        ? `Hello SIMPORA, I ran the AI Solution Finder. Diagnosis: ${diagnosis.recommendedPillar} - "${diagnosis.summary}" (Estimated timeline: ${diagnosis.timeEstimate}). I would like to request a formal quote.`
                        : `Hola SIMPORA, utilicé el AI Solution Finder. Diagnóstico: ${diagnosis.recommendedPillar} - "${diagnosis.summary}" (Tiempo estimado: ${diagnosis.timeEstimate}). Deseo cotizar formalmente este proyecto.`;
                    onApplyDiagnosisToContact(summaryText);
                  }}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#97F2CC] hover:bg-[#85e2bc] text-[#121212] font-bold text-xs tracking-tight transition-all shadow-[0_0_15px_rgba(151,242,204,0.3)] cursor-pointer"
                >
                  <span>{t.solutionFinder.quoteSolutionBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#121212]" />
                </button>

                <a
                  href={`${BRAND_INFO.whatsappUrl}%20Diagnostico:%20${encodeURIComponent(
                    diagnosis.recommendedPillar + ' - ' + diagnosis.summary
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#97F2CC]" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
