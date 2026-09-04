import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  Loader2,
  Trash2,
  ArrowUpRight,
  Bot,
  User,
  MessageSquare,
} from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SolutionFinderProps {
  onApplyDiagnosisToContact: (diagnosisText: string) => void;
  externalPreset?: string;
}

export const SolutionFinder: React.FC<SolutionFinderProps> = ({
  onApplyDiagnosisToContact,
  externalPreset,
}) => {
  const { t, language } = useLanguage();

  const getInitialWelcome = (lang: 'es' | 'en') =>
    lang === 'en'
      ? `Hello! I am SIMPORA's **AI Systems Consultant**.\n\nOur mission is to make technology work for you through systems engineering and applied AI. What technological challenge, automation or custom software project can I help you evaluate today?`
      : `¡Hola! Soy el **Consultor de IA de SIMPORA**.\n\nNuestra misión es hacer que la tecnología trabaje para ti mediante ingeniería en sistemas e inteligencia artificial. ¿Qué reto tecnológico, automatización o software a medida te gustaría evaluar para tu empresa?`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      content: getInitialWelcome(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // When language toggles and only welcome is present, update welcome message
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [
          {
            ...prev[0],
            content: getInitialWelcome(language),
          },
        ];
      }
      return prev;
    });
  }, [language]);

  // When externalPreset changes (e.g. user clicked "Diagnosticar necesidad" on a service card)
  useEffect(() => {
    if (externalPreset) {
      handleSendMessage(externalPreset);
    }
  }, [externalPreset]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts =
    language === 'en'
      ? [
          'How do you apply AI to automate operations?',
          'We need custom software development for our business',
          'How does a server and cybersecurity audit work?',
          'I want an estimate with Jonathan Dubón',
        ]
      : [
          '¿Cómo aplican IA para automatizar operaciones?',
          'Necesitamos desarrollo de software a medida',
          '¿Cómo es una auditoría de servidores y seguridad?',
          'Quiero cotizar un proyecto con Jonathan Dubón',
        ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setLoading(true);

    try {
      let modelText = '';

      // 1. Primary: Try Vercel Serverless Function or local server
      try {
        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
            lang: language,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text) {
            modelText = data.text;
          }
        }
      } catch (e) {
        // Fallback to secondary
      }

      // 2. Secondary: Direct Gemini API fallback using client-side VITE_GEMINI_API_KEY
      const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!modelText && clientApiKey) {
        try {
          const directRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${clientApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text }] }],
                systemInstruction: {
                  parts: [
                    {
                      text:
                        language === 'en'
                          ? 'You are the Senior AI Solutions Consultant at SIMPORA (simpora.dev) founded by Jonathan A. Dubón. Provide articulate, concise, high-caliber advice on custom software, applied AI solutions, and systems architecture.'
                          : 'Eres el Consultor Senior de Soluciones de SIMPORA (simpora.dev) fundado por Jonathan A. Dubón. Proporciona asesoramiento de alto calibre en software a medida, IA aplicada y arquitectura de sistemas.',
                    },
                  ],
                },
              }),
            }
          );
          if (directRes.ok) {
            const directData = await directRes.json();
            modelText = directData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          }
        } catch (e) {
          // Fallback to tertiary
        }
      }

      // 3. Tertiary: Local intelligent contextual fallback
      if (!modelText) {
        const lower = text.toLowerCase();
        if (lower.includes('seguridad') || lower.includes('security') || lower.includes('auditor')) {
          modelText =
            language === 'en'
              ? 'At SIMPORA, our cybersecurity audits involve zero-trust server hardening, vulnerability scans, credential leak detection, and kernel optimization. We guarantee direct engineer communication with Jonathan A. Dubón.'
              : 'En SIMPORA realizamos auditorías de seguridad perimetral, escaneo de vulnerabilidades, arquitectura zero-trust y optimización de servidores. Todo con respuesta directa en menos de 24 horas.';
        } else if (lower.includes('software') || lower.includes('web') || lower.includes('plataforma') || lower.includes('crm')) {
          modelText =
            language === 'en'
              ? 'We engineer custom fullstack software platforms using high-performance stacks (React, TypeScript, Node.js, PostgreSQL). Clean architecture without templates or tech debt.'
              : 'Desarrollamos software web y plataformas a la medida con arquitectura limpia (React, TypeScript, Node.js, PostgreSQL), 100% código propio sin plantillas ni deuda técnica.';
        } else if (lower.includes('cotiz') || lower.includes('precio') || lower.includes('cost') || lower.includes('jonathan')) {
          modelText =
            language === 'en'
              ? 'You can request a direct technical quote with lead engineer Jonathan A. Dubón through our contact form below or on official WhatsApp: +504 9877-4561.'
              : 'Puedes cotizar tu proyecto directamente con el Ing. Jonathan A. Dubón a través de nuestro formulario de contacto o vía WhatsApp al +504 9877-4561.';
        } else {
          modelText =
            language === 'en'
              ? 'Thank you for your message. At SIMPORA, we combine systems engineering with applied AI to make technology work for your business.\n\nFeel free to ask any technical question or contact us directly at info@simpora.dev.'
              : 'Gracias por tu consulta. En SIMPORA combinamos ingeniería de sistemas e inteligencia artificial aplicada para hacer que la tecnología trabaje para ti.\n\nPuedes consultarme cualquier detalle técnico o escribirnos a info@simpora.dev.';
        }
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: modelText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.warn('Chat request failed, fallback response used:', err);
      const fallbackMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content:
          language === 'en'
            ? 'Thank you for reaching out to SIMPORA. You can contact our lead engineer Jonathan A. Dubón directly at info@simpora.dev or on WhatsApp at +504 9877-4561.'
            : 'Gracias por escribir a SIMPORA. Puedes contactar directamente al Ing. Jonathan A. Dubón al correo info@simpora.dev o por WhatsApp al +504 9877-4561.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: getInitialWelcome(language),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <section
      id="solution-finder"
      className="section-standard-screen w-full flex flex-col justify-between bg-white text-[#121212] relative z-10 px-3 sm:px-6 md:px-12 py-3 sm:py-4 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        {/* Section Header with 100% Crisp Contrast */}
        <div className="flex items-center justify-between gap-3 pb-2 sm:pb-3 border-b border-black/5 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 bg-[#97F2CC]/30 border border-[#97F2CC] text-[#121212] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#121212]" />
                <span>{language === 'en' ? 'AI CHATBOT' : 'CHATBOT DE IA'}</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                {language === 'en' ? 'Core: Gemini 3.8 Flash • Systems Architecture' : 'Motor: Gemini 3.8 Flash • Arquitectura de Sistemas'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-[#121212] tracking-tight">
              SIMPORA <span className="text-[#121212] underline decoration-[#97F2CC] decoration-4">AI Chatbot</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-xl text-zinc-500 hover:text-[#121212] hover:bg-zinc-100 transition-colors cursor-pointer"
              title={language === 'en' ? 'Clear conversation' : 'Limpiar chat'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3 h-3 text-[#97F2CC]" />
            </a>
          </div>
        </div>

        {/* Pure Chat Container: Fills remaining height of the 100vh container */}
        <div className="flex-1 min-h-0 bg-[#F5F7F8] border border-black/10 rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden shadow-xs mt-2.5 sm:mt-3">
          {/* Top Status Bar inside Chat */}
          <div className="px-4 py-2.5 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#97F2CC] text-[#121212] flex items-center justify-center font-bold">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-display font-bold text-[#121212]">
                  SIMPORA AI Consultant
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              {language === 'en' ? 'Direct systems engineering advisory' : 'Asesoría técnica de ingeniería directa'}
            </span>
          </div>

          {/* Scrollable Message History */}
          <div ref={chatContainerRef} className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-5 space-y-3.5">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-2.5 ${
                    isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-[#121212] text-white'
                        : 'bg-[#97F2CC] text-[#121212] font-semibold shadow-xs'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-body leading-relaxed ${
                      isUser
                        ? 'bg-[#121212] text-white rounded-tr-none'
                        : 'bg-white text-[#121212] border border-black/5 shadow-xs rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`text-[9px] font-mono mt-1 text-right ${
                        isUser ? 'text-zinc-400' : 'text-zinc-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {loading && (
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#97F2CC] text-[#121212] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-black/5 text-xs font-mono text-zinc-500 flex items-center space-x-2 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#121212]" />
                  <span>
                    {language === 'en'
                      ? 'SIMPORA AI is analyzing your inquiry...'
                      : 'SIMPORA AI está analizando tu consulta...'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Clickable Suggestions */}
          <div className="px-3.5 py-2 bg-white/70 border-t border-black/5 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] font-mono text-zinc-400 shrink-0 hidden sm:inline">
              {language === 'en' ? 'Quick questions:' : 'Sugerencias:'}
            </span>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="shrink-0 text-[11px] font-mono px-3 py-1 rounded-full bg-white border border-black/10 hover:border-[#97F2CC] hover:bg-[#97F2CC]/10 text-[#121212] transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-black/5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Ask about software development, AI automation, or custom systems...'
                    : 'Pregunta sobre software, automatización con IA o sistemas a la medida...'
                }
                disabled={loading}
                className="flex-1 bg-[#F5F7F8] border border-black/10 rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#97F2CC] font-body"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2.5 rounded-full bg-[#121212] hover:bg-black text-[#97F2CC] disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                title={language === 'en' ? 'Send' : 'Enviar'}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>
                {language === 'en'
                  ? 'SIMPORA: "We make technology work for you"'
                  : 'SIMPORA: "Haremos que la tecnología trabaje para ti"'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById('contacto');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#121212] transition-colors cursor-pointer underline"
              >
                {language === 'en' ? 'Request formal quote' : 'Cotizar proyecto'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
