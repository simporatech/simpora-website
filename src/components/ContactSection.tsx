import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  AtSign,
  Send,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Code2,
  Wrench,
  Cpu,
  GraduationCap,
  Loader2,
} from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

interface ContactSectionProps {
  initialMessage?: string;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xppakyed';

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage = '' }) => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: t.contact.servicesList[0].value,
    message: initialMessage,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Update default service if language changes
  useEffect(() => {
    const exists = t.contact.servicesList.some((s) => s.value === formData.service);
    if (!exists) {
      setFormData((prev) => ({ ...prev, service: t.contact.servicesList[0].value }));
    }
  }, [language]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || (language === 'en' ? 'Not specified' : 'No especificado'),
          service: formData.service,
          message: formData.message,
          _subject: `Nuevo contacto web SIMPORA: ${formData.name} (${formData.service})`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: t.contact.servicesList[0].value,
          message: '',
        });
      } else {
        const data = await response.json();
        throw new Error(data?.error || 'Error al enviar');
      }
    } catch (err: any) {
      console.error('Formspree submission error:', err);
      setErrorMsg(
        language === 'en'
          ? 'Failed to send message. Please try again or reach us via WhatsApp.'
          : 'No se pudo enviar el mensaje. Por favor intenta de nuevo o escríbenos por WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Pillar icons for custom dropdown
  const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Inteligencia Artificial': Sparkles,
    'Artificial Intelligence': Sparkles,
    'Consultoría Tech': TrendingUp,
    'Tech Consultancy': TrendingUp,
    'Desarrollo de Software': Code2,
    'Software Development': Code2,
    'Mantenimiento & Rescate': Wrench,
    'Maintenance & Rescue': Wrench,
    'Productos & Hardware': Cpu,
    'Hardware & Products': Cpu,
    'Capacitación en IA': GraduationCap,
    'AI Corporate Training': GraduationCap,
  };

  const serviceOptions: DropdownOption[] = t.contact.servicesList.map((srv) => ({
    value: srv.value,
    label: srv.label,
    icon: serviceIcons[srv.value] || Sparkles,
  }));

  return (
    <section id="contacto" className="section-standard-screen flex flex-col justify-center py-4 sm:py-6 lg:py-6 bg-white/85 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full my-auto">
        {/* Section Header with Motto */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97F2CC]" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#121212] tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-1.5 font-body text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Contact Info Pill Bar (Clean Minimalism) */}
        <div className="max-w-4xl mx-auto mb-3 sm:mb-4 p-2.5 sm:p-3.5 rounded-2xl bg-[#F5F7F8] border border-black/[0.04] shadow-xs flex flex-col sm:flex-row items-center justify-around gap-3 text-center sm:text-left">
          {/* Email */}
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-[#121212] group-hover:bg-[#97F2CC]/30 transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">
                {t.contact.emailContactLabel}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs sm:text-sm font-mono font-semibold text-[#121212] hover:text-black flex items-center gap-1.5 cursor-pointer"
              >
                <span>{BRAND_INFO.email}</span>
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-400 group-hover:text-black" />
                )}
              </button>
            </div>
          </div>

          <div className="hidden sm:block w-px h-7 bg-black/5" />

          {/* WhatsApp / Phone */}
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-[#121212] group-hover:bg-[#97F2CC]/30 transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">
                {t.contact.whatsappLabel}
              </div>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-mono font-semibold text-[#121212] hover:text-black flex items-center gap-1"
              >
                <span>{BRAND_INFO.phone}</span>
                <ArrowUpRight className="w-3 h-3 text-[#97F2CC]" />
              </a>
            </div>
          </div>

          <div className="hidden sm:block w-px h-7 bg-black/5" />

          {/* Social */}
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-[#121212] group-hover:bg-[#97F2CC]/30 transition-colors">
              <AtSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">
                {t.contact.channelsTitle}
              </div>
              <div className="text-xs sm:text-sm font-mono font-semibold text-[#121212]">
                {BRAND_INFO.socialHandle}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-3xl mx-auto bg-[#F5F7F8] border border-black/[0.04] rounded-2xl p-4 sm:p-6 shadow-xs">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#97F2CC]/30 border border-[#97F2CC] text-[#121212] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#121212]">
                {t.contact.sentSuccess}
              </h3>
              <p className="font-body text-[#121212] opacity-70 text-xs sm:text-sm max-w-md mx-auto">
                {language === 'en'
                  ? 'Our engineering team will review your specifications and reply via email or WhatsApp in under 24 hours.'
                  : 'El equipo técnico liderado por Jonathan A. Dubón revisará los detalles de tu solicitud y te contactará en menos de 24 horas.'}
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-[#97F2CC]" />
                  <span>WhatsApp Directo</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-full bg-white border border-black/5 text-xs font-medium text-[#121212] hover:bg-zinc-100 cursor-pointer"
                >
                  {language === 'en' ? 'Send another message' : 'Enviar otro mensaje'}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-medium text-zinc-500 uppercase mb-1">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] transition-all font-body"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium text-zinc-500 uppercase mb-1">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] transition-all font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-medium text-zinc-500 uppercase mb-1">
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] transition-all font-body"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium text-zinc-500 uppercase mb-1">
                    {t.contact.serviceLabel}
                  </label>
                  {/* Modern Custom Dropdown */}
                  <CustomDropdown
                    value={formData.service}
                    onChange={(val) => setFormData({ ...formData, service: val })}
                    options={serviceOptions}
                    placeholder={t.contact.servicePlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-medium text-zinc-500 uppercase mb-1">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full p-3 rounded-xl bg-white border border-black/[0.08] text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] transition-all resize-none font-body"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-mono text-center">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-[11px] font-mono text-zinc-400">
                  {t.contact.confidentialBadge} • {t.contact.slaBadge}
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto py-2.5 px-6 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#18181B]" />
                      <span>{language === 'en' ? 'Sending...' : 'Enviando...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.submitBtn}</span>
                      <Send className="w-3.5 h-3.5 text-[#18181B] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

