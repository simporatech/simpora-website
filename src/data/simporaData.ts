import { ServicePillar, BusinessValue } from '../types';

export const BRAND_INFO = {
  name: 'SIMPORA',
  domain: 'simpora.dev',
  tagline: 'SIMPLE. PODEROSA. AVANZADA.',
  slogan: 'Haremos que la tecnología trabaje para ti.',
  founder: 'Jonathan A. Dubón',
  role: 'Ing. en Sistemas & Fundador',
  email: 'simporatech@gmail.com',
  phone: '+504 9870-0953',
  whatsappUrl: 'https://wa.me/50498700953?text=Hola%20SIMPORA,%20quisiera%20cotizar%20un%20proyecto%20tecnol%C3%B3gico.',
  socialHandle: '@simporatech',
  colors: {
    carbon: '#333333',
    white: '#FFFFFF',
    mint: '#97F2CC',
  },
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'ia',
    number: '01',
    title: 'Inteligencia Artificial',
    shortDesc: 'Automatización de procesos, asistentes personalizados, visión artificial e implementación de IA en flujos de trabajo.',
    fullDesc: 'Implementamos modelos de lenguaje de vanguardia, agentes de toma de decisiones y sistemas de visión por computadora diseñados para resolver problemas operativos reales.',
    iconName: 'Sparkles',
    deliverables: [
      'Automatización robótica y cognitiva de procesos',
      'Asistentes de IA y chatbots conversacionales',
      'Modelos de visión artificial y clasificación',
      'Integración de LLMs en bases de datos internas',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
    highlight: true,
  },
  {
    id: 'consultoria',
    number: '02',
    title: 'Consultoría Tech',
    shortDesc: 'Diagnósticos empresariales, auditorías de ciberseguridad, digitalización de procesos y planificación de infraestructura.',
    fullDesc: 'Evaluamos la madurez tecnológica de tu empresa con auditorías exhaustivas y trazamos la ruta técnica más eficiente para crecer sin deuda técnica.',
    iconName: 'TrendingUp',
    deliverables: [
      'Diagnósticos y auditorías empresariales 360°',
      'Auditorías y blindaje de ciberseguridad',
      'Digitalización y optimización de flujos de trabajo',
      'Planificación de arquitectura e infraestructura Cloud',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
  },
  {
    id: 'desarrollo',
    number: '03',
    title: 'Desarrollo de Software',
    shortDesc: 'Software completamente a medida, sitios web interactivos, integración de APIs y sistemas de gestión interna (CRMs).',
    fullDesc: 'Construimos productos digitales modernos, veloces y escalables con estándares de ingeniería de software de primer nivel y diseño refinado.',
    iconName: 'Code2',
    deliverables: [
      'Plataformas web de alto rendimiento e interfaces fluidas',
      'Sistemas de gestión interna y CRMs personalizados',
      'Integración y orquestación de APIs complejas',
      'Arquitecturas basadas en microservicios y serverless',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
    highlight: true,
  },
  {
    id: 'mantenimiento',
    number: '04',
    title: 'Mantenimiento',
    shortDesc: 'Reparación profunda de hardware, optimización de SO, eliminación de virus y recuperación de datos.',
    fullDesc: 'Garantizamos la máxima disponibilidad y rendimiento de tus activos tecnológicos mediante diagnósticos a bajo nivel y rescate crítico.',
    iconName: 'Wrench',
    deliverables: [
      'Optimización fina de sistemas operativos y Kernel',
      'Reparación y diagnóstico de hardware a nivel componente',
      'Eliminación avanzada de malware y mitigación',
      'Recuperación forense de datos e integridad de backups',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
  },
  {
    id: 'productos',
    number: '05',
    title: 'Productos & Hardware',
    shortDesc: 'Venta de componentes especializados (RAM, SSD), licencias de software y ensamblaje de equipos a medida.',
    fullDesc: 'Suministramos hardware de grado profesional y estaciones de trabajo optimizadas para flujos de alta exigencia, IA y renderizado.',
    iconName: 'Cpu',
    deliverables: [
      'Componentes certificados de alta velocidad (RAM, NVMe SSD)',
      'Estaciones de trabajo de ingeniería ensambladas a medida',
      'Licenciamiento oficial y gestión de software corporativo',
      'Garantía técnica y soporte de sustitución rápida',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
  },
  {
    id: 'capacitacion',
    number: '06',
    title: 'Capacitación',
    shortDesc: 'Cursos de herramientas digitales, talleres intensivos de IA para negocios y formación básica en ciberseguridad.',
    fullDesc: 'Capacitamos al talento humano de las organizaciones para cerrar la brecha digital y adoptar IA y herramientas modernas con seguridad.',
    iconName: 'GraduationCap',
    deliverables: [
      'Talleres ejecutivos de Inteligencia Artificial para negocios',
      'Capacitación práctica en automatización y prompts',
      'Concienciación y buenas prácticas en ciberseguridad',
      'Programas in-company adaptados a la realidad operativa',
    ],
    gradient: 'from-zinc-900 to-zinc-950',
  },
];

export const BRAND_VALUES: BusinessValue[] = [
  {
    title: 'Innovación',
    subtitle: 'Nuevas formas creativas',
    description: 'Buscamos constantemente nuevas formas creativas y avanzadas de resolver los problemas de siempre mediante ingeniería aplicada.',
    icon: 'Lightbulb',
    metric: '100%',
    metricLabel: 'Soluciones pioneras',
  },
  {
    title: 'Eficiencia',
    subtitle: 'Resultados acelerados',
    description: 'Optimizamos cada uno de los recursos disponibles para lograr los mejores y más rápidos resultados posibles en cada despliegue.',
    icon: 'Zap',
    metric: '<24h',
    metricLabel: 'Tiempo de respuesta técnica',
  },
  {
    title: 'Compromiso',
    subtitle: 'Crecimiento sostenido',
    description: 'Estamos 100% dedicados al éxito y al crecimiento sostenido de todos los clientes que confían en nosotros como su socio de tecnología.',
    icon: 'Handshake',
    metric: '99.9%',
    metricLabel: 'Satisfacción y disponibilidad',
  },
];

export const TECH_STACK = [
  { name: 'Python', category: 'AI & Data', icon: 'Terminal' },
  { name: 'Gemini AI', category: 'Intelligence', icon: 'Sparkles' },
  { name: 'TypeScript', category: 'Language', icon: 'Code' },
  { name: 'React 19', category: 'Frontend', icon: 'Layers' },
  { name: 'Node.js', category: 'Backend', icon: 'Server' },
  { name: 'Tailwind CSS', category: 'UI Architecture', icon: 'Layout' },
  { name: 'PyTorch', category: 'Machine Learning', icon: 'Cpu' },
  { name: 'PostgreSQL', category: 'Databases', icon: 'Database' },
  { name: 'Docker', category: 'Containers', icon: 'Box' },
  { name: 'Google Cloud', category: 'Cloud Infrastructure', icon: 'Cloud' },
  { name: 'Linux', category: 'OS & Systems', icon: 'Shield' },
  { name: 'FastAPI', category: 'High Speed APIs', icon: 'Zap' },
];

export const QUICK_PROMPT_PRESETS = [
  {
    label: 'Automatización con IA',
    prompt: 'Quiero automatizar la atención a mis clientes por WhatsApp y sincronizar los pedidos con nuestro CRM sin trabajo manual.',
  },
  {
    label: 'Software Web a Medida',
    prompt: 'Necesitamos renovar nuestra plataforma de operaciones interna con una web rápida, segura y accesible desde móviles.',
  },
  {
    label: 'Ciberseguridad y Auditoría',
    prompt: 'Queremos auditar la seguridad de nuestros servidores, prevenir filtración de datos y optimizar la infraestructura cloud.',
  },
  {
    label: 'Capacitación en IA para Negocios',
    prompt: 'Queremos que nuestro equipo administrativo y técnico domine herramientas de IA para duplicar su productividad.',
  },
];
