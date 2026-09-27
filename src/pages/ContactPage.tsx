import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserCheck,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Check,
  Share2,
  QrCode,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle2,
  Globe,
  MapPin,
  Clock,
  Download,
  Building2,
  FolderGit2,
} from 'lucide-react';
import { BRAND_INFO, PROJECTS_DATA, SERVICE_PILLARS } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';
import { SimporaIsotype } from '../components/SimporaIsotype';
import { GeminiChatModal } from '../components/GeminiChatModal';

interface ContactPageProps {
  onNavigateHome: () => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xppakyed';

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [vcfSaved, setVcfSaved] = useState(false);
  const [showPillars, setShowPillars] = useState(false);

  // Micro form state
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const contactUrl = 'https://simpora.dev/contact';

  // Ensure canonical digital card title and instant scroll reset
  useEffect(() => {
    document.title =
      language === 'en'
        ? 'Jonathan A. Dubón | Digital Business Card & Presentation | SIMPORA'
        : 'Jonathan A. Dubón | Tarjeta Digital & Presentación | SIMPORA';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [language]);

  // Generate and download standard vCard 3.0 (.vcf)
  const handleDownloadVCard = () => {
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Dubón;Jonathan;A.;;',
      'FN:Jonathan A. Dubón',
      'ORG:SIMPORA;',
      'TITLE:Ing. en Sistemas & Fundador',
      'TEL;TYPE=CELL,VOICE;VALUE=uri:tel:+50498700953',
      'EMAIL;TYPE=INTERNET,WORK,PREF:simporatech@gmail.com',
      'URL;TYPE=WORK:https://simpora.dev',
      'URL;TYPE=PREF:https://simpora.dev/contact',
      'NOTE:SIMPORA - Consultoría en Sistemas e Inteligencia Artificial Aplicada. Simple. Poderosa. Avanzada.',
      'X-SOCIALPROFILE;TYPE=Instagram:https://instagram.com/simporatech',
      'END:VCARD',
    ];

    const vCardString = vCardLines.join('\r\n');
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jonathan_Dubon_SIMPORA.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setVcfSaved(true);
    setTimeout(() => setVcfSaved(false), 3500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(contactUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim() || !formMessage.trim()) return;

    setFormSending(true);
    setFormError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          contact: formContact,
          message: formMessage,
          _subject: `Tarjeta NFC SIMPORA: Mensaje de ${formName}`,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormName('');
        setFormContact('');
        setFormMessage('');
      } else {
        const data = await response.json();
        throw new Error(data?.error || 'Error al enviar');
      }
    } catch (err: any) {
      console.error('NFC Form submit error:', err);
      setFormError(
        language === 'en'
          ? 'Failed to send message. Please reach out directly on WhatsApp or Email.'
          : 'No se pudo enviar el mensaje. Por favor contáctanos directamente por WhatsApp o Correo.'
      );
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-[#97F2CC] selection:text-[#121212] relative overflow-x-hidden font-body">
      {/* Ambient background glows matching SIMPORA design language */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#97F2CC]/15 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -right-28 w-72 h-72 bg-[#97F2CC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-zinc-200/50 rounded-full blur-3xl" />
      </div>

      {/* Main Single-Column Mobile-First Container */}
      <div className="relative z-10 max-w-md mx-auto w-full px-4 py-5 sm:py-8 flex flex-col min-h-screen justify-between">
        {/* Top Minimalist Header */}
        <header className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-[#121212] hover:opacity-80 transition-opacity cursor-pointer group"
            title={t.contactPage.backToHome}
          >
            <div className="w-8 h-8 rounded-xl bg-[#121212] flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform">
              <SimporaIsotype size={20} color="#97F2CC" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-sm tracking-tight leading-none text-[#121212]">
                SIMPORA
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                simpora.dev
              </span>
            </div>
          </button>

          <div className="flex items-center space-x-2">
            {/* Share / QR Modal Toggle */}
            <button
              onClick={() => setIsQrOpen(true)}
              className="w-8 h-8 rounded-full bg-[#F5F7F8] border border-black/5 flex items-center justify-center text-zinc-700 hover:text-black hover:bg-white hover:border-[#97F2CC] transition-all cursor-pointer shadow-2xs"
              title={t.contactPage.shareCard}
              aria-label={t.contactPage.shareCard}
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full bg-[#F5F7F8] border border-black/5 hover:border-[#97F2CC] text-[11px] font-mono font-bold text-zinc-700 hover:text-black transition-all cursor-pointer shadow-2xs flex items-center gap-1"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-3 h-3 text-zinc-500" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="space-y-5 flex-1">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-3xl bg-[#F5F7F8] border border-black/[0.06] shadow-xs text-center relative overflow-hidden"
          >
            {/* Ambient inner mint flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#97F2CC]/25 rounded-full blur-2xl pointer-events-none" />

            {/* Portrait with Mint Ring & Status Beacon */}
            <div className="relative inline-block mx-auto mb-3.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-br from-[#97F2CC] via-[#97F2CC]/70 to-[#121212]/20 shadow-[0_0_24px_rgba(151,242,204,0.35)]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-zinc-900 relative">
                  <img
                    src="/assets/jonathan-dubon.jpg"
                    alt={BRAND_INFO.founder}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-display font-black text-2xl text-[#97F2CC] bg-[#121212] -z-10">
                    JD
                  </div>
                </div>
              </div>

              {/* Active Pulse Pill */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#121212] border border-white/20 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#97F2CC] animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-[#97F2CC]">
                  {t.contactPage.availability}
                </span>
              </div>
            </div>

            {/* Founder Info */}
            <div className="space-y-1 mt-2">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#97F2CC]/25 border border-[#97F2CC]/50 text-[#121212] text-[10px] font-mono font-bold tracking-tight">
                <UserCheck className="w-3 h-3 text-[#121212]" />
                <span>{t.contactPage.verifiedBadge}</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl text-[#121212] tracking-tight">
                {BRAND_INFO.founder}
              </h1>

              <p className="text-xs sm:text-sm font-display font-bold text-zinc-700">
                {t.contactPage.founderRole} @{' '}
                <span className="text-[#121212] font-black">SIMPORA</span>
              </p>

              <p className="text-xs text-zinc-600 font-body max-w-xs mx-auto pt-1 leading-relaxed">
                "{BRAND_INFO.slogan}"
              </p>
            </div>

            {/* Badges Bar: Location & SLA */}
            <div className="pt-3.5 mt-3.5 border-t border-black/5 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {t.contactPage.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#97F2CC]" />
                {t.contactPage.slaResponse}
              </span>
            </div>
          </motion.div>

          {/* Quick Action Trio: Save vCard, WhatsApp, Call, Email */}
          <div className="space-y-2.5">
            {/* Primary Action: Guardar en Contactos (.vcf) */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadVCard}
              className="w-full btn-primary py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2.5 text-sm font-extrabold shadow-md cursor-pointer transition-all"
            >
              {vcfSaved ? (
                <>
                  <Check className="w-4 h-4 text-[#121212]" />
                  <span>{t.contactPage.saveContactSuccess}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#121212]" />
                  <span>{t.contactPage.saveContact}</span>
                </>
              )}
            </motion.button>

            {/* Direct Connect Grid (WhatsApp, Call, Email) */}
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#121212] text-white hover:bg-black transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-3.5 h-3.5 text-[#97F2CC]" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-tight">
                  {t.contactPage.whatsappAction}
                </span>
              </a>

              {/* Call */}
              <a
                href={`tel:${BRAND_INFO.phone.replace(/[^+\d]/g, '')}`}
                className="p-3 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] text-[#121212] hover:bg-white hover:border-[#97F2CC] transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-[#121212]" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-tight">
                  {t.contactPage.callAction}
                </span>
              </a>

              {/* Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-3 rounded-2xl bg-[#F5F7F8] border border-black/[0.06] text-[#121212] hover:bg-white hover:border-[#97F2CC] transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Mail className="w-3.5 h-3.5 text-[#121212]" />
                  )}
                </div>
                <span className="text-[11px] font-mono font-bold tracking-tight">
                  {copiedEmail ? t.contactPage.copiedEmail : t.contactPage.emailAction}
                </span>
              </button>
            </div>
          </div>

          {/* Links Section (Linktree-Style Action Cards) */}
          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-1">
              {t.contactPage.linksTitle}
            </div>

            {/* 1. Official Website Link */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={onNavigateHome}
              className="p-3.5 rounded-2xl bg-white border border-black/[0.08] hover:border-[#97F2CC] hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center p-2 shrink-0">
                  <SimporaIsotype size={24} color="#97F2CC" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-xs sm:text-sm text-[#121212] group-hover:text-black flex items-center gap-1.5">
                    <span>{t.contactPage.exploreWebsiteTitle}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-body line-clamp-1">
                    {t.contactPage.exploreWebsiteDesc}
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F5F7F8] flex items-center justify-center text-zinc-400 group-hover:text-[#121212] group-hover:bg-[#97F2CC]/30 transition-colors shrink-0 ml-2">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* 2. Interactive AI Consultant Card */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setIsChatOpen(true)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#121212] to-zinc-900 text-white border border-zinc-800 hover:border-[#97F2CC] hover:shadow-md transition-all flex items-center justify-between cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#97F2CC]/15 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#97F2CC]/20 border border-[#97F2CC]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#97F2CC]" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <span>{t.contactPage.aiAssistantTitle}</span>
                    <span className="text-[9px] font-mono uppercase bg-[#97F2CC] text-[#121212] px-1.5 py-0.2 rounded font-black">
                      AI Live
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-300 font-body line-clamp-1">
                    {t.contactPage.aiAssistantDesc}
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#97F2CC] group-hover:bg-white/20 transition-colors shrink-0 ml-2 relative z-10">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* 3. Featured Projects Showcase (Growy & Hotel La Posada) */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-1 flex items-center justify-between">
                <span>{t.contactPage.projectsTitle}</span>
                <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
              </div>

              {PROJECTS_DATA.map((proj) => (
                <a
                  key={proj.id}
                  href={proj.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-[#F5F7F8] border border-black/[0.05] hover:bg-white hover:border-[#97F2CC] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                      <img
                        src={proj.logo}
                        alt={proj.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-display font-bold text-xs sm:text-sm text-[#121212] truncate">
                        {proj.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 truncate">
                        {proj.displayUrl} • {proj.badge[language]}
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:border-[#97F2CC] transition-colors shrink-0 ml-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>

            {/* 4. Collapsible 6 Pillars Overview */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowPillars(!showPillars)}
                className="w-full p-3 rounded-2xl bg-[#F5F7F8] border border-black/[0.05] hover:bg-white hover:border-black/15 transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-black/5 flex items-center justify-center text-[#121212]">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs sm:text-sm text-[#121212]">
                      {t.contactPage.servicesTitle}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {t.contactPage.servicesSubtitle}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    showPillars ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {showPillars && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pt-2 space-y-1.5"
                  >
                    {SERVICE_PILLARS.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-xl bg-white border border-black/[0.06] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] text-zinc-400 font-bold">
                            {p.number}
                          </span>
                          <span className="font-display font-semibold text-[#121212]">
                            {p.title}
                          </span>
                        </div>
                        {p.highlight && (
                          <span className="text-[9px] font-mono bg-[#97F2CC]/30 text-[#121212] px-1.5 py-0.5 rounded font-bold">
                            Core
                          </span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Micro Contact Form */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-3xl bg-[#F5F7F8] border border-black/[0.06] shadow-2xs">
                <div className="mb-3 text-left">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    <Send className="w-3 h-3 text-[#121212]" />
                    <span>{t.contactPage.quickMessageTitle}</span>
                  </div>
                  <p className="text-xs text-zinc-600 font-body mt-0.5">
                    {t.contactPage.quickMessageSubtitle}
                  </p>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#97F2CC]/30 border border-[#97F2CC] text-[#121212] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5 text-[#121212]" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-[#121212]">
                      {t.contactPage.formSuccess}
                    </h3>
                    <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                      {t.contactPage.formSuccessDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-xs font-mono font-bold text-zinc-600 hover:text-black underline cursor-pointer"
                    >
                      {language === 'en' ? 'Send another message' : 'Enviar otro mensaje'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t.contactPage.formName}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs font-body text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] focus:ring-1 focus:ring-[#97F2CC]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                        placeholder={t.contactPage.formEmailOrPhone}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs font-body text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] focus:ring-1 focus:ring-[#97F2CC]"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={2}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder={t.contactPage.formMessage}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] text-xs font-body text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] focus:ring-1 focus:ring-[#97F2CC] resize-none"
                      />
                    </div>

                    {formError && (
                      <div className="text-[11px] text-rose-600 font-mono">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formSending}
                      className="w-full btn-secondary py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                    >
                      {formSending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{t.contactPage.formSending}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.contactPage.formSend}</span>
                          <Send className="w-3 h-3 text-[#97F2CC]" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pt-8 pb-3 text-center border-t border-black/[0.05] mt-6 space-y-2">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-mono text-zinc-500">
            <span>© {new Date().getFullYear()} SIMPORA</span>
            <span>•</span>
            <button
              onClick={onNavigateHome}
              className="text-[#121212] font-semibold hover:underline cursor-pointer"
            >
              simpora.dev
            </button>
          </div>
          <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
            {BRAND_INFO.tagline}
          </p>
        </footer>
      </div>

      {/* QR Code Presentation Modal */}
      <AnimatePresence>
        {isQrOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl border border-black/10 relative"
            >
              <button
                onClick={() => setIsQrOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F7F8] flex items-center justify-center text-zinc-500 hover:text-black cursor-pointer transition-colors"
                title={t.contactPage.close}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#121212] flex items-center justify-center mx-auto mb-3 p-2.5">
                <SimporaIsotype size={28} color="#97F2CC" />
              </div>

              <h3 className="font-display font-bold text-lg text-[#121212]">
                {t.contactPage.qrModalTitle}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs mx-auto leading-relaxed">
                {t.contactPage.qrModalSubtitle}
              </p>

              {/* QR Image Box */}
              <div className="my-5 p-4 rounded-2xl bg-[#F5F7F8] border border-black/5 inline-block mx-auto shadow-inner">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    contactUrl
                  )}&color=121212&bgcolor=F5F7F8&margin=1`}
                  alt="QR Code simpora.dev/contact"
                  className="w-44 h-44 rounded-lg object-contain mx-auto"
                />
              </div>

              <div className="text-[11px] font-mono text-zinc-500 mb-4">
                {contactUrl}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 btn-primary py-2.5 text-xs font-bold cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.contactPage.linkCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.contactPage.copyLink}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsQrOpen(false)}
                  className="btn-outline py-2.5 px-4 text-xs font-semibold cursor-pointer"
                >
                  {t.contactPage.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Gemini AI Chat Modal */}
      <GeminiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
