import { ServicePillar, BusinessValue, ClientItem, ProjectItem } from '../types';

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

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'profesionales-culinarios',
    name: 'Profesionales Culinarios',
    logo: '/assets/clients/profesionales-culinarios.png',
    website: 'https://profesionalesculinarios.com/',
    category: {
      es: 'Consultoría Gastronómica Regional',
      en: 'Regional Culinary Consulting',
    },
    whatWeDid: {
      es: 'Digitalización de Procesos',
      en: 'Process Digitization & Operational Workflows',
    },
    description: {
      es: 'Firma de consultoría culinaria líder en Centroamérica, especializada en estandarización de costos, capacitación de brigadas de cocina y diseño de experiencias gastronómicas de alto nivel.',
      en: 'Premier culinary consulting firm in Central America, specializing in food cost standardization, kitchen team enablement, and high-caliber gastronomic management.',
    },
    tags: ['Consultoría HORECA', 'Optimización Operativa', 'Estandarización'],
  },
  {
    id: 'donut-heaven',
    name: 'Donut Heaven',
    logo: '/assets/clients/donut-heaven.jpg',
    category: {
      es: 'Repostería Artesanal & Retail',
      en: 'Artisanal Bakery & Food Retail',
    },
    whatWeDid: {
      es: 'Digitalización de Procesos',
      en: 'Process Digitization & Order Flow Systems',
    },
    description: {
      es: 'Cadena boutique de venta de donas artesanales y repostería gourmet con alta afluencia de pedidos diarios y rotación rápida de producto en mostrador y delivery.',
      en: 'Boutique gourmet donut and artisanal pastry brand with high-volume daily orders, rapid retail turnaround, and dynamic fulfillment channels.',
    },
    tags: ['Flujo de Pedidos', 'Control Operativo', 'Digitalización Comercial'],
  },
  {
    id: 'hotel-marina-copan',
    name: 'Hotel Marina Copán',
    logo: '/assets/clients/hotel-marina-copan.png',
    website: 'https://hotelmarinacopan.com',
    category: {
      es: 'Hospitalidad & Turismo Histórico (4 Estrellas)',
      en: 'Historic Hospitality & Tourism (4-Star)',
    },
    whatWeDid: {
      es: 'Ingeniería y Soporte IT de Tiempo Completo',
      en: 'Full-Time Critical IT Engineering & Infrastructure',
    },
    description: {
      es: 'Emblemático hotel histórico 4 estrellas fundado en 1945 en el corazón de Copán Ruinas, Honduras. Referente de hospitalidad colonial y sede principal para visitantes del parque arqueológico maya.',
      en: 'Iconic 4-star historic hotel established in 1945 in the heart of Copán Ruinas, Honduras. A world-class heritage retreat and premier hub for global travelers to the ancient Mayan ruins.',
    },
    tags: ['Infraestructura Crítica', 'Redes de Alta Disponibilidad', 'Soporte 24/7'],
  },
  {
    id: 'hotel-la-posada-copan',
    name: 'Hotel La Posada de Copán',
    logo: '/assets/clients/hotel-la-posada.png',
    website: 'https://laposadacopan.com',
    category: {
      es: 'Hotel Boutique Colonial',
      en: 'Colonial Boutique Hotel',
    },
    whatWeDid: {
      es: 'Desarrollo de Plataforma Web & Presencia Digital',
      en: 'Full Web Platform Engineering & Digital Presence',
    },
    description: {
      es: 'Acogedor hotel boutique de arquitectura colonial propiedad del prestigioso Hotel Marina Copán en Copán Ruinas. Diseñado para ofrecer tranquilidad, descanso auténtico y cercanía al parque central.',
      en: 'Charming colonial boutique hotel owned by the prestigious Hotel Marina Copán family in Copán Ruinas. Built for tranquil stays, authentic local warmth, and steps from the central plaza.',
    },
    tags: ['Ingeniería Web', 'Optimización de Reservas', 'Diseño Moderno'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'growy',
    title: 'Growy by SIMPORA',
    tagline: {
      es: 'Ecosistema Inteligente de Finanzas Personales & Patrimonio',
      en: 'Intelligent Personal Finance & Wealth Analytics Ecosystem',
    },
    category: {
      es: 'SaaS Propietario • Fintech & Analítica',
      en: 'Proprietary SaaS • Fintech & Analytics',
    },
    badge: {
      es: 'Producto Propietario',
      en: 'Proprietary Product',
    },
    logo: '/assets/projects/growy-logo.svg',
    website: 'https://growy.simpora.dev',
    displayUrl: 'growy.simpora.dev',
    description: {
      es: 'Plataforma integral diseñada y desarrollada desde cero por SIMPORA para transformar la gestión del dinero: presupuestos dinámicos, flujo de caja predictivo, métricas patrimoniales y categorización de gastos en tiempo real.',
      en: 'All-in-one financial intelligence system engineered from scratch by SIMPORA: dynamic budgeting, predictive cash flow analytics, net worth tracking, and real-time transaction intelligence.',
    },
    features: {
      es: [
        'Métricas patrimoniales y balances en tiempo real',
        'Presupuestos dinámicos y analítica predictiva de flujo de caja',
        'Arquitectura cloud ultra rápida con cifrado de nivel bancario',
        'Experiencia de usuario fluida y diseño minimalista de alta gama',
      ],
      en: [
        'Real-time net worth and liquid asset balance tracking',
        'Dynamic budgeting and predictive cash-flow forecasting',
        'Ultra-fast cloud microservices with bank-grade encryption',
        'Fluid user experience with clean, high-conviction ergonomics',
      ],
    },
    metrics: {
      label: {
        es: 'Disponibilidad Cloud',
        en: 'Cloud SLA Uptime',
      },
      value: '99.99%',
    },
  },
  {
    id: 'la-posada-copan',
    title: 'Hotel La Posada de Copán',
    tagline: {
      es: 'Portal Web de Alta Velocidad y Motor de Reservas Directas',
      en: 'High-Performance Web Portal & Direct Booking Engine',
    },
    category: {
      es: 'Ingeniería Web • Hotelería & Turismo',
      en: 'Web Engineering • Hospitality & Travel',
    },
    badge: {
      es: 'Caso de Éxito',
      en: 'Case Study',
    },
    logo: '/assets/projects/laposada-logo.png',
    website: 'https://laposadacopan.com',
    displayUrl: 'laposadacopan.com',
    description: {
      es: 'Sitio web oficial de alta fidelidad para el hotel boutique en Copán Ruinas. Desarrollado con tiempos de carga instantáneos, experiencia visual inmersiva, SEO local para turismo internacional e integración fluida de reservas directas.',
      en: 'Official high-fidelity web platform for the colonial boutique hotel in Copán Ruinas. Engineered for instant page transitions, immersive visual storytelling, international SEO, and frictionless direct reservation flows.',
    },
    features: {
      es: [
        'Carga instantánea (<1s) y rendimiento Lighthouse superior a 95',
        'Experiencia visual inmersiva de habitaciones y servicios',
        'Estrategia de SEO técnico enfocada en viajeros globales',
        'Canales de reserva directa integrados con WhatsApp y formulario',
      ],
      en: [
        'Sub-second instant load times with 95+ Lighthouse performance',
        'Immersive gallery showcases for rooms, courtyards, and amenities',
        'Technical SEO architecture targeted at international travelers',
        'Direct booking conversion channels integrated with WhatsApp and forms',
      ],
    },
    metrics: {
      label: {
        es: 'Velocidad de Carga',
        en: 'Page Load Speed',
      },
      value: '< 0.8s',
    },
  },
];
