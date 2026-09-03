import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Google AI Studio API Key (strictly from environment variables)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";

// In-memory cache for dynamic models
interface ModelCache {
  models: string[];
  lastFetched: number;
}

let modelCache: ModelCache = {
  models: [
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-2.5-pro",
    "gemini-pro-latest"
  ],
  lastFetched: 0,
};

let currentModelIndex = 0;

// Dynamic model discovery: Query Google AI Studio API to retrieve ALL available generateContent models
async function getDynamicModels(apiKey: string): Promise<string[]> {
  const now = Date.now();
  // Refresh cache every 30 minutes
  if (modelCache.models.length > 0 && now - modelCache.lastFetched < 30 * 60 * 1000) {
    return modelCache.models;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.models)) {
        const candidates = data.models
          .filter((m: any) => {
            const supportsGeneration = Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent");
            if (!supportsGeneration) return false;
            const name = (m.name || "").toLowerCase();
            // Filter out non-chat specialized models (tts, image, audio, robotics, etc.)
            const isSpecialized = /tts|image|clip|music|lyria|robotics|transcribe|computer-use|banana/i.test(name);
            return !isSpecialized;
          })
          .map((m: any) => m.name.replace(/^models\//, ""));

        // Prioritize ultra-fast flash and flash-lite models for lightning speed, then pro
        candidates.sort((a: string, b: string) => {
          const aFlash = /flash/i.test(a);
          const bFlash = /flash/i.test(b);
          const aLite = /lite/i.test(a);
          const bLite = /lite/i.test(b);
          if (aLite && !bLite) return -1;
          if (!aLite && bLite) return 1;
          if (aFlash && !bFlash) return -1;
          if (!aFlash && bFlash) return 1;
          return 0;
        });

        if (candidates.length > 0) {
          modelCache = {
            models: candidates,
            lastFetched: now,
          };
          console.log(`[LoadBalancer] Dynamic model discovery updated with ${candidates.length} active models:`, candidates);
          return candidates;
        }
      }
    }
  } catch (err) {
    console.warn("[LoadBalancer] Dynamic discovery warning, using active pool:", err);
  }

  return modelCache.models;
}

// Load-balanced execution with automatic failover and switching across all available models
async function executeWithLoadBalancing(
  apiKey: string,
  contents: any[],
  systemInstruction: string,
  isJson: boolean = false
): Promise<{ text: string; model: string }> {
  const models = await getDynamicModels(apiKey);
  const totalModels = models.length;

  // Round-robin index progression
  const startIndex = currentModelIndex % totalModels;
  currentModelIndex = (currentModelIndex + 1) % totalModels;

  const maxAttempts = Math.min(totalModels, 5);
  let lastError: any = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidateIndex = (startIndex + attempt) % totalModels;
    const modelName = models[candidateIndex];

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const payload: any = {
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: isJson ? 0.3 : 0.7,
        }
      };

      if (isJson) {
        payload.generationConfig.responseMimeType = "application/json";
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout per candidate model

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "simpora-load-balancer/1.0"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorBody = await res.text();
        console.warn(`[LoadBalancer] Model "${modelName}" returned HTTP ${res.status}: ${errorBody.substring(0, 120)}... Switching immediately to next available model.`);
        lastError = new Error(`HTTP ${res.status}: ${errorBody}`);
        continue; // Immediate seamless switch to next model
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 0) {
        console.log(`[LoadBalancer] Request successfully answered via model: "${modelName}"`);
        return { text, model: modelName };
      }

      console.warn(`[LoadBalancer] Model "${modelName}" returned empty output. Switching to next model.`);
    } catch (err: any) {
      console.warn(`[LoadBalancer] Model "${modelName}" encountered error (${err.message}). Switching to next model.`);
      lastError = err;
    }
  }

  throw lastError || new Error("All dynamic models exhausted during failover.");
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// SIMPORA System Prompt for AI Consultant
const getSimporaSystemInstruction = (lang: string = "es") => {
  const isEn = lang === "en";
  if (isEn) {
    return `You are the Senior Technology Consultant and Solutions Architect at SIMPORA (simpora.dev).
Led by Jonathan A. Dubón (Systems Engineer), SIMPORA is an engineering and AI consultancy firm.
Brand mottos and core values:
- "SIMPLE. POWERFUL. ADVANCED."
- "We will make technology work for you."
- Vision: To become the leading technology partner in intelligent digital solutions, simplifying technology so any company can harness its maximum potential.
- Mission: Deliver accessible, efficient, and advanced technology solutions, uniting systems engineering and applied AI to optimize processes and drive genuine digital transformation.
- Values: Innovation (creative problem solving), Efficiency (maximizing resources for rapid outcomes), Commitment (client sustained success).

SIMPORA's 6 Solution Pillars:
1. Artificial Intelligence: Workflow automation, bespoke conversational agents, computer vision, embeddings, and LLM integrations.
2. Tech Consulting: Digital maturity assessments, cybersecurity audits, workflow digitization, and scalable cloud architecture.
3. Development: Custom software, ultra-fast web platforms, complex API integrations, and customized CRMs/ERPs.
4. Maintenance: Deep OS optimization, critical hardware repairs, malware shielding, and data recovery.
5. Products: High-performance components (RAM, NVMe SSDs), corporate licensing, and custom-tuned workstation builds.
6. Training: Executive AI workshops for business teams, modern digital tooling training, and cybersecurity awareness.

Tone: Professional, visionary, concise, articulate, and confident (Stripe / Apple / Linear engineering caliber).
Respond in English using clean lightweight markdown (bullet points, bold highlights) and guide the user towards high-impact solutions, encouraging contact with Jonathan A. Dubón at simporatech@gmail.com or WhatsApp (+504 9870-0953).`;
  }

  return `Eres el Consultor Tecnológico Senior y Arquitecto de Soluciones de SIMPORA (simpora.dev).
Liderado por Jonathan A. Dubón (Ing. en Sistemas), SIMPORA es una consultoría de alta gama en tecnología e inteligencia artificial.
Lemas y valores de la marca:
- "SIMPLE. PODEROSA. AVANZADA."
- "Haremos que la tecnología trabaje para ti."
- Visión: Convertirse en el aliado tecnológico líder en innovación y soluciones digitales inteligentes, simplificando la tecnología para que cualquier persona o empresa pueda aprovechar su máximo potencial.
- Misión: Brindar soluciones tecnológicas accesibles, eficientes y avanzadas, combinando ingeniería en sistemas e inteligencia artificial aplicada para optimizar procesos y promover la verdadera transformación digital.
- Valores: Innovación (formas creativas de resolver problemas), Eficiencia (maximizar recursos para resultados rápidos), Compromiso (éxito sostenido del cliente).

Los 6 Pilares de Soluciones de SIMPORA son:
1. Inteligencia Artificial: Automatización de procesos, asistentes conversacionales a medida, visión artificial, embeddings e integración de LLMs en flujos empresariales.
2. Consultoría Tech: Diagnósticos de madurez digital, auditorías de ciberseguridad, digitalización de flujos y arquitectura de infraestructura escalable.
3. Desarrollo: Software a medida, plataformas web ultra rápidas, integración de APIs complejas y CRMs/ERPs adaptados al negocio.
4. Mantenimiento: Optimización de sistemas operativos, soporte crítico de hardware, blindaje contra malware y recuperación de datos.
5. Productos: Componentes especializados de alto rendimiento (RAM, NVMe SSDs), licenciamiento corporativo y ensamblaje de estaciones de trabajo optimizadas.
6. Capacitación: Talleres ejecutivos de IA para negocios, capacitación en herramientas digitales de vanguardia y concienciación en ciberseguridad.

Tono: Profesional, visionario, directo, conciso, ultra educado y seguro. Hablas con elegancia técnica (estilo Apple / Stripe / Linear).
Responde en español de forma estructurada con markdown ligero (puntos clave, negritas) y orienta siempre al usuario a una solución de alto impacto y a coordinar con Jonathan A. Dubón o contactar por simporatech@gmail.com o WhatsApp (+504 9870-0953).`;
};

// Chat API endpoint (Multi-turn Gemini chatbot with Dynamic Load Balancing & Automatic Failover)
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, message, lang = "es" } = req.body;
  const isEn = lang === "en";

  try {
    // Format conversation history for Gemini API
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages) {
        if (!m.content) continue;
        contents.push({
          role: m.role === "model" ? "model" : "user",
          parts: [{ text: m.content }]
        });
      }
      if (message && (!messages.length || messages[messages.length - 1].content !== message)) {
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });
      }
    } else if (message) {
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });
    } else {
      contents.push({
        role: "user",
        parts: [{ text: isEn ? "Hello, tell me about SIMPORA's engineering and AI services." : "Hola, cuéntame sobre los servicios de ingeniería e IA de SIMPORA." }]
      });
    }

    // Call dynamic multi-model load balancer with automatic failover
    const result = await executeWithLoadBalancing(
      GEMINI_API_KEY,
      contents,
      getSimporaSystemInstruction(lang),
      false
    );

    return res.json({ text: result.text, model: result.model });
  } catch (error) {
    console.error("[ChatAPI] Error after failover attempts:", error);

    // High quality intelligent native fallback response
    const query = (message || (messages && messages[messages.length - 1]?.content) || "").toLowerCase();
    let responseText = "";

    if (isEn) {
      if (query.includes("ai") || query.includes("artificial") || query.includes("automat") || query.includes("agent") || query.includes("assistant")) {
        responseText = `At **SIMPORA**, we transform your operations by embedding **Applied Artificial Intelligence** directly into your day-to-day workflows.\n\n` +
          `• **Process Automation:** We cut up to 70% of repetitive operational overhead.\n` +
          `• **Custom AI Agents:** Bespoke conversational assistants connected to your databases and CRMs.\n` +
          `• **Predictive Models & Vision:** Automated visual inspection and real-time decision pipelines.\n\n` +
          `Would you like us to evaluate your company's technical readiness or schedule a strategy consultation with Jonathan Dubón?`;
      } else {
        responseText = `Welcome to **SIMPORA**. Our mission is to *make technology work for you* through simple, powerful, and advanced engineering.\n\n` +
          `We assist organizations across our 6 core pillars: Applied AI, Tech Consulting, Custom Development, Maintenance, Hardware Products, and Executive Training.\n\n` +
          `Connect directly with our founder Jonathan Dubón via **simporatech@gmail.com** or WhatsApp at **+504 9870-0953**.`;
      }
    } else {
      if (query.includes("ia") || query.includes("inteligencia") || query.includes("automatiz") || query.includes("asistente")) {
        responseText = `En **SIMPORA**, transformamos tus operaciones integrando **Inteligencia Artificial aplicada** directamente a tus flujos diarios.\n\n` +
          `• **Automatización de Procesos:** Reducimos hasta un 70% del tiempo operativo en tareas repetitivas.\n` +
          `• **Asistentes Personalizados:** Diseñamos agentes inteligentes conectados a tus bases de datos y CRMs.\n` +
          `• **Visión y Modelos Predictivos:** Análisis visual y toma de decisiones en tiempo real.\n\n` +
          `¿Te gustaría que evaluemos el nivel de madurez técnica de tu empresa o prefieres agendar una sesión con Jonathan Dubón?`;
      } else {
        responseText = `Bienvenido a **SIMPORA**. Nuestra misión es *hacer que la tecnología trabaje para ti* con soluciones simples, poderosas y avanzadas.\n\n` +
          `Podemos asistirte en cualquiera de nuestros 6 pilares: IA Aplicada, Consultoría Tech, Desarrollo de Software, Mantenimiento Crítico, Productos y Capacitación.\n\n` +
          `Puedes contactar directamente a Jonathan Dubón vía **simporatech@gmail.com** o por WhatsApp al **+504 9870-0953**.`;
      }
    }

    return res.json({ text: responseText, model: "simpora-native-resilience" });
  }
});

// SIMPORA AI Solution Finder / Diagnosis Endpoint (Multi-model Load Balanced)
app.post("/api/gemini/diagnose", async (req, res) => {
  const { problemText, industry, priority, lang = "es" } = req.body;
  const isEn = lang === "en";

  try {
    const prompt = isEn
      ? `Analyze the following business need or challenge of a prospective client of SIMPORA (Engineering & AI Consultancy):
Problem: "${problemText}"
Industry: "${industry || "General / Enterprise"}"
Priority: "${priority || "High"}"

Respond with a JSON object in English:
{
  "recommendedPillar": "One of SIMPORA's 6 pillars (Artificial Intelligence, Tech Consulting, Development, Maintenance, Products, or Training)",
  "summary": "Crisp executive summary of the recommended solution (2-3 sentences, Stripe/Linear engineering caliber)",
  "timeEstimate": "Estimated implementation timeframe",
  "roiProjection": "Key anticipated business ROI or efficiency gain",
  "technologies": ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
  "actionPlan": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "leadEngineer": "Jonathan A. Dubón (Systems Engineer)"
}`
      : `Analiza la siguiente necesidad o problema de negocio de un cliente potencial de SIMPORA (Consultoría Tecnológica):
Problema: "${problemText}"
Industria: "${industry || "General / Empresarial"}"
Prioridad: "${priority || "Alta"}"

Devuelve un JSON con:
{
  "recommendedPillar": "Uno de los 6 pilares de SIMPORA (Inteligencia Artificial, Consultoría Tech, Desarrollo, Mantenimiento, Productos, o Capacitación)",
  "summary": "Resumen ejecutivo claro de la solución propuesta (2-3 oraciones estilo Stripe/Linear)",
  "timeEstimate": "Tiempo estimado de implementación",
  "roiProjection": "Beneficio o retorno clave esperado",
  "technologies": ["Tecnología 1", "Tecnología 2", "Tecnología 3", "Tecnología 4"],
  "actionPlan": ["Paso 1", "Paso 2", "Paso 3", "Paso 4"],
  "leadEngineer": "Jonathan A. Dubón (Ing. en Sistemas)"
}`;

    const result = await executeWithLoadBalancing(
      GEMINI_API_KEY,
      [{ role: "user", parts: [{ text: prompt }] }],
      getSimporaSystemInstruction(lang) + "\nStrictly reply in valid JSON format.",
      true
    );

    const cleanedText = result.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleanedText);
    return res.json({ diagnosis: parsed, model: result.model });
  } catch (error) {
    console.error("[DiagnoseAPI] Error after failover attempts:", error);

    const lower = (problemText || "").toLowerCase();
    let pillar = isEn ? "Artificial Intelligence" : "Inteligencia Artificial";
    let summary = isEn
      ? "Implementation of language models, automated agent pipelines, and enterprise process hyperautomation."
      : "Implementación de modelos de lenguaje e hiperautomatización de procesos.";
    let timeEstimate = isEn ? "2 to 4 weeks" : "2 a 4 semanas";
    let roi = isEn ? "300% ROI in saved human operational hours" : "300% de retorno en horas hombre ahorradas";
    let stack = ["Python", "Applied AI", "Node.js", "Docker"];
    let steps = isEn
      ? [
          "Bottleneck mapping & data ingestion assessment",
          "Custom agent & intelligent automation pipeline design",
          "Database integration with enterprise-grade security validation",
          "Team enablement and zero-downtime deployment",
        ]
      : [
          "Mapeo de cuellos de botella y evaluación de ingesta de datos",
          "Diseño de agentes a medida y pipelines de automatización",
          "Integración de base de datos y validación de seguridad",
          "Capacitación del equipo y despliegue sin tiempo de inactividad",
        ];

    return res.json({
      diagnosis: {
        recommendedPillar: pillar,
        summary,
        timeEstimate,
        roiProjection: roi,
        technologies: stack,
        actionPlan: steps,
        leadEngineer: isEn ? "Jonathan A. Dubón (Systems Engineer)" : "Jonathan A. Dubón (Ing. en Sistemas)",
      },
      model: "simpora-native-resilience"
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIMPORA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
