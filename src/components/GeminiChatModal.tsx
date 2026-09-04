import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Trash2,
  Minimize2,
  Maximize2,
  ArrowUpRight,
  Bot,
  User,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { BRAND_INFO } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPillarFromChat?: (pillarName: string) => void;
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  onSelectPillarFromChat,
}) => {
  const { language } = useLanguage();

  const getInitialWelcome = (lang: 'es' | 'en') =>
    lang === 'en'
      ? `Hello. I am SIMPORA's **AI Solutions Consultant**.\n\nOur mission is to make technology work for you through systems engineering and applied artificial intelligence.\n\nWhat technological challenge or project can we assist you with today?`
      : `Hola. Soy el **Consultor de Soluciones de SIMPORA**.\n\nNuestra misión es hacer que la tecnología trabaje para ti mediante ingeniería en sistemas e inteligencia artificial aplicada.\n\n¿En qué reto o proyecto tecnológico podemos asistirte hoy?`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      content: getInitialWelcome(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If conversation is just initial welcome message and language changes, update it
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

  const quickQuestions =
    language === 'en'
      ? [
          'How do you apply AI to operational processes?',
          'What is included in custom software development?',
          'How does a cybersecurity audit work?',
          'I want a quote with Jonathan Dubón',
        ]
      : [
          '¿Cómo aplican IA a procesos operativos?',
          '¿Qué incluye el desarrollo de software a medida?',
          '¿Cómo es una auditoría de ciberseguridad?',
          'Quiero cotizar un proyecto con Jonathan Dubón',
        ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

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
        // Continue to secondary fallback
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
                          ? 'You are the Senior AI Solutions Consultant at SIMPORA (simpora.dev) led by Jonathan A. Dubón. Provide articulate, concise, high-caliber advice on custom software and applied AI solutions.'
                          : 'Eres el Consultor Senior de Soluciones de SIMPORA (simpora.dev) liderado por Jonathan A. Dubón. Proporciona asesoramiento de alto calibre en software a medida e inteligencia artificial.',
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
          // Continue to tertiary fallback
        }
      }

      if (!modelText) {
        modelText =
          language === 'en'
            ? 'Thank you for reaching out to SIMPORA. We combine high-level systems engineering with applied AI.\n\nYou can reach our lead engineer Jonathan A. Dubón directly at **info@simpora.dev** or on WhatsApp at **+504 9877-4561**.'
            : 'Gracias por contactar a SIMPORA. Combinamos ingeniería de sistemas de alto nivel con inteligencia artificial aplicada.\n\nPuedes escribirnos directamente a **info@simpora.dev** o por WhatsApp al **+504 9877-4561** para una respuesta en menos de 24 horas.';
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: modelText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.warn('Chat request failed, utilizing client fallback response:', err);
      const fallbackMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content:
          language === 'en'
            ? 'Thank you for reaching out to SIMPORA. We combine high-level systems engineering with applied AI.\n\nYou can reach us directly at **info@simpora.dev** or on WhatsApp at **+504 9877-4561**.'
            : 'Gracias por contactar a SIMPORA. Combinamos ingeniería de sistemas de alto nivel con inteligencia artificial aplicada.\n\nPuedes escribirnos directamente a **info@simpora.dev** o por WhatsApp al **+504 9877-4561**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content:
          language === 'en'
            ? `History cleared. I am ready to evaluate your technology needs in AI, software development, or infrastructure.`
            : `Historial reiniciado. Estoy listo para ayudarte a evaluar tus necesidades tecnológicas en IA, desarrollo o infraestructura.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop on mobile only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 overflow-hidden flex flex-col bg-[#111214] text-white border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-300 ${
              isExpanded
                ? 'inset-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[680px] sm:h-[85vh] rounded-2xl sm:rounded-3xl'
                : 'inset-x-0 bottom-0 h-[85vh] sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[620px] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl'
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] bg-[#161616] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#97F2CC] text-[#121212] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-sm text-white">
                      SIMPORA AI Assistant
                    </span>
                    <span className="flex items-center text-[10px] font-mono text-[#97F2CC] bg-[#97F2CC]/10 border border-[#97F2CC]/30 px-2 py-0.5 rounded-full">
                      Gemini 3.8 Flash
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {language === 'en'
                      ? 'Solutions Architect & Technical Consulting'
                      : 'Arquitecto de Soluciones & Consultoría'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title={language === 'en' ? 'Clear conversation' : 'Limpiar conversación'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:block p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title={
                    language === 'en'
                      ? isExpanded
                        ? 'Restore size'
                        : 'Maximize'
                      : isExpanded
                      ? 'Restaurar tamaño'
                      : 'Maximizar'
                  }
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title={language === 'en' ? 'Close' : 'Cerrar'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
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
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isUser
                          ? 'bg-zinc-700 text-white'
                          : 'bg-[#97F2CC] text-[#121212] font-semibold'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[82%] sm:max-w-[78%] rounded-2xl p-3.5 text-xs sm:text-sm font-body leading-relaxed ${
                        isUser
                          ? 'bg-zinc-800 text-white border border-white/10'
                          : 'bg-zinc-900 text-zinc-200 border border-white/5'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div
                        className={`text-[9px] font-mono mt-1.5 text-right ${
                          isUser ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#97F2CC] text-[#121212] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-400 flex items-center space-x-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#97F2CC]" />
                    <span>
                      {language === 'en'
                        ? 'SIMPORA AI is analyzing your inquiry...'
                        : 'SIMPORA AI está analizando tu consulta...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-[#161616]/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                {language === 'en' ? 'Suggestions:' : 'Sugerencias:'}
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="shrink-0 text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#161616]">
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
                      ? 'Type your technological inquiry or project idea...'
                      : 'Escribe tu consulta tecnológica o proyecto...'
                  }
                  disabled={isLoading}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#97F2CC] font-body"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2.5 rounded-full bg-[#97F2CC] hover:bg-[#85e2bc] text-[#121212] disabled:opacity-40 transition-all cursor-pointer"
                  title={language === 'en' ? 'Send' : 'Enviar'}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>
                  {language === 'en'
                    ? 'SIMPORA: "We make technology work for you"'
                    : 'SIMPORA: "Haremos que la tecnología trabaje para ti"'}
                </span>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#97F2CC] flex items-center gap-0.5"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
