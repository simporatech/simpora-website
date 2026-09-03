// Vercel Serverless Function: /api/gemini/diagnose
export default async function handler(req: any, res: any) {
  // CORS headers
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
  const { problemText, industry, priority, lang = 'es' } = req.body || {};
  const isEn = lang === 'en';

  const defaultFallback = {
    recommendedPillar: isEn ? "Artificial Intelligence & Automation" : "Inteligencia Artificial & Automatización",
    summary: isEn
      ? "End-to-end implementation of generative models and intelligent workflow pipelines to automate manual tasks and synchronize operational data."
      : "Implementación integral de modelos generativos y automatización de flujos para optimizar tareas manuales y sincronizar datos del negocio.",
    timeEstimate: isEn ? "2 to 3 weeks" : "2 a 3 semanas",
    roiProjection: isEn ? "300% operational time savings" : "300% de ahorro en horas operativas",
    technologies: ["Gemini 2.5 Flash", "Python", "Node.js", "PostgreSQL"],
    actionPlan: isEn
      ? [
          "Operational assessment & data bottleneck mapping",
          "Custom AI agent architecture and workflow testing",
          "Secure database integration and authorization validation",
          "Production deployment and executive enablement"
        ]
      : [
          "Mapeo de procesos y diagnóstico de cuellos de botella",
          "Diseño de agentes de IA y validación de flujos",
          "Integración de datos con estándares de seguridad",
          "Despliegue en producción y capacitación al equipo"
        ],
    leadEngineer: "Jonathan A. Dubón (Ing. en Sistemas)"
  };

  if (!apiKey) {
    return res.status(200).json({ diagnosis: defaultFallback, model: "simpora-fallback" });
  }

  const prompt = isEn
    ? `Analyze the following business need or challenge of a prospective client of SIMPORA (Engineering & AI Consultancy):
Problem: "${problemText}"
Industry: "${industry || "General / Enterprise"}"
Priority: "${priority || "High"}"

Respond strictly with a JSON object in English:
{
  "recommendedPillar": "One of SIMPORA's 6 pillars (Artificial Intelligence, Tech Consulting, Development, Maintenance, Products, or Training)",
  "summary": "Crisp executive summary of the recommended solution (2-3 sentences, Stripe/Linear engineering caliber)",
  "timeEstimate": "Estimated implementation timeframe (e.g. 2 to 3 weeks)",
  "roiProjection": "Key anticipated business ROI or efficiency gain",
  "technologies": ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
  "actionPlan": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "leadEngineer": "Jonathan A. Dubón (Systems Engineer)"
}`
    : `Analiza la siguiente necesidad o problema de negocio de un cliente potencial de SIMPORA (Consultoría Tecnológica):
Problema: "${problemText}"
Industria: "${industry || "General / Empresarial"}"
Prioridad: "${priority || "Alta"}"

Devuelve estrictamente un JSON en español con:
{
  "recommendedPillar": "Uno de los 6 pilares de SIMPORA (Inteligencia Artificial, Consultoría Tech, Desarrollo, Mantenimiento, Productos, o Capacitación)",
  "summary": "Resumen ejecutivo claro de la solución propuesta (2-3 oraciones estilo Stripe/Linear)",
  "timeEstimate": "Tiempo estimado de implementación (ej. 2 a 3 semanas)",
  "roiProjection": "Beneficio o retorno clave esperado",
  "technologies": ["Tecnología 1", "Tecnología 2", "Tecnología 3", "Tecnología 4"],
  "actionPlan": ["Paso 1", "Paso 2", "Paso 3", "Paso 4"],
  "leadEngineer": "Jonathan A. Dubón (Ing. en Sistemas)"
}`;

  const models = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro'
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json'
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) continue;

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);
        return res.status(200).json({ diagnosis: parsed, model });
      }
    } catch (err) {
      // continue to next model
    }
  }

  return res.status(200).json({ diagnosis: defaultFallback, model: "simpora-fallback" });
}
