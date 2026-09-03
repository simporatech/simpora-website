// Vercel Serverless Function: /api/gemini/chat
export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

  const { messages, message, lang = 'es' } = req.body || {};
  const isEn = lang === 'en';

  if (!apiKey) {
    return res.status(200).json({
      text: isEn
        ? "Welcome to SIMPORA. Please set GEMINI_API_KEY in your Vercel Environment Variables to activate live AI consultant responses. In the meantime, you can reach out directly to Jonathan A. Dubón via WhatsApp or info@simpora.dev."
        : "Bienvenido a SIMPORA. Por favor configura GEMINI_API_KEY en las variables de entorno de Vercel para activar respuestas de IA en tiempo real. Puedes comunicarte directamente con Jonathan A. Dubón vía WhatsApp o a info@simpora.dev.",
      model: "simpora-fallback"
    });
  }

  // System prompt
  const systemInstruction = isEn
    ? `You are the Senior Technology Consultant and Solutions Architect at SIMPORA (simpora.dev).
Led by Jonathan A. Dubón (Systems Engineer), SIMPORA is an engineering and AI consultancy firm.
Brand mottos:
- "SIMPLE. POWERFUL. ADVANCED."
- "We will make technology work for you."
Vision: To become the leading technology partner in intelligent digital solutions, simplifying technology so any company can harness its maximum potential.
6 Solution Pillars:
1. Artificial Intelligence: Workflow automation, bespoke conversational agents, computer vision, embeddings, LLM integrations.
2. Tech Consulting: Digital maturity assessments, cybersecurity audits, workflow digitization, scalable cloud architecture.
3. Development: Custom software, ultra-fast web platforms, complex API integrations, customized CRMs/ERPs.
4. Maintenance: Deep OS optimization, critical hardware repairs, malware shielding, data recovery.
5. Products: High-performance components, corporate licensing, custom workstations.
6. Training: Executive AI workshops for business teams, digital tooling training, cybersecurity awareness.
Tone: Professional, visionary, concise, articulate, confident (Stripe / Apple / Linear engineering caliber).
Respond in English using clean lightweight markdown and guide the user to schedule a consultation with Jonathan A. Dubón via WhatsApp (+504 9877-4561) or info@simpora.dev.`
    : `Eres el Consultor Tecnológico Senior y Arquitecto de Soluciones de SIMPORA (simpora.dev).
Liderado por Jonathan A. Dubón (Ing. en Sistemas), SIMPORA es una consultoría de alta gama en tecnología e inteligencia artificial.
Lemas y valores de la marca:
- "SIMPLE. PODEROSA. AVANZADA."
- "Haremos que la tecnología trabaje para ti."
Visión: Convertirse en el aliado tecnológico líder en innovación y soluciones digitales inteligentes.
Los 6 Pilares de Soluciones de SIMPORA son:
1. Inteligencia Artificial: Automatización de procesos, asistentes conversacionales a medida, visión artificial, embeddings e integración de LLMs en flujos empresariales.
2. Consultoría Tech: Diagnósticos de madurez digital, auditorías de ciberseguridad, digitalización de flujos y arquitectura de infraestructura escalable.
3. Desarrollo: Software a medida, plataformas web ultra rápidas, integración de APIs complejas y CRMs/ERPs adaptados al negocio.
4. Mantenimiento: Optimización de sistemas operativos, soporte crítico de hardware, blindaje contra malware y recuperación de datos.
5. Productos: Componentes especializados de alto rendimiento (RAM, NVMe SSDs), licenciamiento corporativo y ensamblaje de estaciones de trabajo.
6. Capacitación: Talleres ejecutivos de IA para negocios, capacitación en herramientas digitales y concienciación en ciberseguridad.
Tono: Profesional, visionario, directo, conciso, educado y seguro (estilo Apple / Stripe / Linear).
Responde en español de forma estructurada con markdown ligero y orienta siempre al usuario a una solución de alto impacto y a coordinar con Jonathan A. Dubón por WhatsApp (+504 9877-4561) o info@simpora.dev.`;

  // Format contents
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  if (Array.isArray(messages) && messages.length > 0) {
    for (const m of messages) {
      if (!m.content) continue;
      contents.push({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }]
      });
    }
    if (message && (!messages.length || messages[messages.length - 1].content !== message)) {
      contents.push({ role: 'user', parts: [{ text: message }] });
    }
  } else if (message) {
    contents.push({ role: 'user', parts: [{ text: message }] });
  } else {
    contents.push({ role: 'user', parts: [{ text: isEn ? 'Hello, tell me about SIMPORA services.' : 'Hola, cuéntame sobre los servicios de SIMPORA.' }] });
  }

  // Model cascade list
  const models = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-pro',
    'gemini-pro-latest'
  ];

  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.7 }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 0) {
        return res.status(200).json({ text, model });
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  // Fallback response if all models fail
  return res.status(200).json({
    text: isEn
      ? "At **SIMPORA**, we build high-impact custom software and applied AI solutions. Our engineering team led by Jonathan A. Dubón is ready to assist you. Contact us directly at **info@simpora.dev** or via WhatsApp at **+504 9877-4561**."
      : "En **SIMPORA**, desarrollamos ingeniería de software a medida y soluciones de inteligencia artificial aplicada. Nuestro equipo liderado por Jonathan A. Dubón está listo para asesorarte. Contáctanos directamente a **info@simpora.dev** o vía WhatsApp al **+504 9877-4561**.",
    model: "simpora-native-resilience"
  });
}
