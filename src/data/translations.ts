export type Language = 'es' | 'en';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    ai: string;
    solutionFinder: string;
    philosophy: string;
    contact: string;
    techStack: string;
    letsTalk: string;
    contactBtn: string;
    mobileTag: string;
  };
  hero: {
    tagline: string;
    headlinePart1: string;
    headlineFocus: string;
    headlinePart2: string;
    subtitle: string;
    ctaAi: string;
    ctaServices: string;
    badgeCode: string;
    badgeCodeSub: string;
    badgeSla: string;
    badgeSlaSub: string;
    badgePillars: string;
    badgePillarsSub: string;
    npuTitle: string;
    npuLatency: string;
    npuArchitecture: string;
    npuClickToToggle: string;
    npuLiveDemo: string;
  };
  about: {
    badge: string;
    heading: string;
    description: string;
    rigorousTitle: string;
    rigorousDesc: string;
    humanTitle: string;
    humanDesc: string;
    vanguardTitle: string;
    vanguardDesc: string;
    leaderBadge: string;
    leadTitle: string;
    role: string;
    founderTitle: string;
    quote: string;
    bio: string;
    directLeadership: string;
    connectBtn: string;
  };
  services: {
    badge: string;
    heading: string;
    subtitle: string;
    diagnoseBtn: string;
    quoteBtn: string;
    deliverablesLabel: string;
    featuredBadge: string;
    pillars: Array<{
      id: string;
      number: string;
      title: string;
      shortDesc: string;
      deliverables: string[];
      highlight?: boolean;
    }>;
  };
  solutionFinder: {
    badge: string;
    pill: string;
    heading: string;
    description: string;
    step1: string;
    step2: string;
    charCount: string;
    placeholder: string;
    industryLabel: string;
    generateBtn: string;
    generatingBtn: string;
    engineLabel: string;
    latencyLabel: string;
    evaluatingTitle: string;
    evaluatingSubtitle: string;
    resultPillarLabel: string;
    resultSummaryLabel: string;
    resultRoiLabel: string;
    resultTimelineLabel: string;
    resultStackLabel: string;
    resultPlanLabel: string;
    quoteSolutionBtn: string;
    resetBtn: string;
    presets: Array<{
      label: string;
      prompt: string;
    }>;
    industries: Array<{
      value: string;
      label: string;
    }>;
  };
  philosophy: {
    badge: string;
    heading: string;
    description: string;
    visionTitle: string;
    visionDesc: string;
    missionTitle: string;
    missionDesc: string;
    values: Array<{
      title: string;
      subtitle: string;
      description: string;
      metric: string;
      metricLabel: string;
    }>;
  };
  techStack: {
    badge: string;
    heading: string;
    description: string;
  };
  contact: {
    badge: string;
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    sentSuccess: string;
    slaBadge: string;
    confidentialBadge: string;
    advisoryBadge: string;
    channelsTitle: string;
    whatsappLabel: string;
    emailContactLabel: string;
    phoneContactLabel: string;
    servicesList: Array<{
      value: string;
      label: string;
    }>;
  };
  footer: {
    description: string;
    navigation: string;
    contactHeading: string;
    rights: string;
    allRightsReserved: string;
    domain: string;
    scrollTop: string;
    location: string;
    leadBy: string;
    sloganText: string;
  };
  chat: {
    floatingBtn: string;
    onlineStatus: string;
    assistantTitle: string;
    welcomeMessage: string;
    suggestionsLabel: string;
    inputPlaceholder: string;
    analyzing: string;
    quickPrompts: string[];
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre SIMPORA',
      services: 'Servicios',
      ai: 'IA',
      solutionFinder: 'AI Solution Finder',
      philosophy: 'Filosofía',
      contact: 'Contacto',
      techStack: 'Stack Tecnológico',
      letsTalk: 'Contacto',
      contactBtn: 'Contacto',
      mobileTag: 'Contacto',
    },
    hero: {
      tagline: 'SIMPLE. PODEROSA. AVANZADA.',
      headlinePart1: 'Haremos que la tecnología ',
      headlineFocus: 'trabaje',
      headlinePart2: ' para ti.',
      subtitle:
        'Consultoría tecnológica de alto rendimiento. Combinamos la precisión de la ingeniería en sistemas con inteligencia artificial aplicada para escalar y proteger el núcleo digital de tu negocio.',
      ctaAi: 'Diagnosticar mi Proyecto con IA',
      ctaServices: 'Explorar los 6 Pilares',
      badgeCode: '100% Código',
      badgeCodeSub: 'A la medida sin plantillas',
      badgeSla: '<24h SLA',
      badgeSlaSub: 'Respuesta técnica directa',
      badgePillars: '6 Pilares',
      badgePillarsSub: 'IA, DevOps, Software y Hardware',
      npuTitle: 'UNIDAD DE PROCESAMIENTO NEURAL',
      npuLatency: 'Latencia',
      npuArchitecture: 'Arquitectura',
      npuClickToToggle: 'Haz clic para alternar modo',
      npuLiveDemo: 'DEMOSTRACIÓN INTERACTIVA NPU',
    },
    about: {
      badge: 'SIMPORA Tech • Ingeniería de Alto Impacto',
      heading: '¿Quiénes somos y qué nos impulsa?',
      description:
        'Nacemos para eliminar la fricción técnica que frena el crecimiento corporativo. Diseñamos ecosistemas donde el software robusto y la IA generativa trabajan en perfecta sincronía con tu equipo.',
      rigorousTitle: 'Ingeniería Rigurosa',
      rigorousDesc:
        'No vendemos soluciones genéricas. Cada arquitectura es concebida con estándares de ingeniería de software, seguridad de datos y alta disponibilidad.',
      humanTitle: 'Enfoque Humano & Directo',
      humanDesc:
        'Sin burocracias ni intermediarios. Comunicación técnica clara, diagnósticos honestos y acompañamiento directo en cada etapa del despliegue.',
      vanguardTitle: 'Vanguardia en IA',
      vanguardDesc:
        'Integramos modelos de lenguaje de última generación (LLMs), visión computacional y agentes autónomos para maximizar tu ventaja competitiva.',
      leaderBadge: 'Equipo SIMPORA',
      leadTitle: 'Liderazgo Técnico',
      role: 'Ing. en Sistemas',
      founderTitle: 'Fundador & Tech Lead',
      quote:
        '"Apasionado por la tecnología, la máxima eficiencia y la constante innovación digital en todas sus formas."',
      bio:
        'Jonathan lidera cada despliegue con un compromiso inquebrantable: hacer que la arquitectura tecnológica más avanzada sea comprensible, accesible y de verdadero impacto para las empresas.',
      directLeadership: 'Atención y dirección directa',
      connectBtn: 'Conectar',
    },
    services: {
      badge: 'Arquitectura Integral',
      heading: 'Nuestros 6 Pilares de Servicio',
      subtitle:
        'Desde inteligencia artificial aplicada hasta ingeniería de hardware y ciberseguridad. Una cobertura 360° diseñada para resolver retos complejos con máxima eficiencia.',
      diagnoseBtn: 'Diagnosticar necesidad',
      quoteBtn: 'Cotizar',
      deliverablesLabel: 'Entregables clave:',
      featuredBadge: 'Pilar Estrella',
      pillars: [
        {
          id: 'ia',
          number: '01',
          title: 'Inteligencia Artificial',
          shortDesc:
            'Automatización de procesos, asistentes conversacionales, visión artificial e integración de LLMs en flujos de trabajo.',
          deliverables: [
            'Automatización robótica y cognitiva de procesos',
            'Asistentes de IA y chatbots conversacionales',
            'Modelos de visión artificial y clasificación',
            'Integración de LLMs en bases de datos internas',
          ],
          highlight: true,
        },
        {
          id: 'consultoria',
          number: '02',
          title: 'Consultoría Tech',
          shortDesc:
            'Diagnósticos empresariales, auditorías de ciberseguridad, digitalización de procesos y planificación de infraestructura.',
          deliverables: [
            'Diagnósticos y auditorías empresariales 360°',
            'Auditorías y blindaje de ciberseguridad',
            'Digitalización y optimización de flujos de trabajo',
            'Planificación de arquitectura e infraestructura Cloud',
          ],
        },
        {
          id: 'desarrollo',
          number: '03',
          title: 'Desarrollo de Software',
          shortDesc:
            'Software a la medida, plataformas web reactivas, integración de APIs complejas y sistemas de gestión interna (CRMs).',
          deliverables: [
            'Plataformas web de alto rendimiento e interfaces fluidas',
            'Sistemas de gestión interna y CRMs personalizados',
            'Integración y orquestación de APIs complejas',
            'Arquitecturas basadas en microservicios y serverless',
          ],
          highlight: true,
        },
        {
          id: 'mantenimiento',
          number: '04',
          title: 'Mantenimiento & Rescate',
          shortDesc:
            'Reparación profunda de hardware, optimización de SO a bajo nivel, eliminación de malware y recuperación de datos.',
          deliverables: [
            'Optimización fina de sistemas operativos y Kernel',
            'Reparación y diagnóstico de hardware a nivel componente',
            'Eliminación avanzada de malware y mitigación',
            'Recuperación forense de datos e integridad de backups',
          ],
        },
        {
          id: 'productos',
          number: '05',
          title: 'Productos & Hardware',
          shortDesc:
            'Venta de componentes certificados de alta velocidad (RAM, SSD), licencias y ensamblaje de estaciones de trabajo a medida.',
          deliverables: [
            'Componentes certificados de alta velocidad (RAM, NVMe SSD)',
            'Estaciones de trabajo de ingeniería ensambladas a medida',
            'Licenciamiento oficial y gestión de software corporativo',
            'Garantía técnica y soporte de sustitución rápida',
          ],
        },
        {
          id: 'capacitacion',
          number: '06',
          title: 'Capacitación en IA',
          shortDesc:
            'Talleres ejecutivos de herramientas digitales, formación práctica en IA para negocios y concienciación en ciberseguridad.',
          deliverables: [
            'Talleres ejecutivos de Inteligencia Artificial para negocios',
            'Capacitación práctica en automatización y prompts',
            'Concienciación y buenas prácticas en ciberseguridad',
            'Programas in-company adaptados a la realidad operativa',
          ],
        },
      ],
    },
    solutionFinder: {
      badge: 'AI Solution',
      pill: '¿Qué desafío enfrentas hoy?',
      heading: 'SIMPORA AI Solution Finder',
      description:
        'Describe el problema operativo o la meta digital de tu empresa. Nuestro motor de IA analizará la viabilidad y generará un diagnóstico de arquitectura al instante.',
      step1: '1. Opciones rápidas de ejemplo',
      step2: '2. Describe tu reto o necesidad técnica',
      charCount: 'caracteres',
      placeholder:
        'Ej: Mi sistema de inventario es lento o necesito automatizar la atención a clientes con WhatsApp y sincronizar pedidos...',
      industryLabel: 'Industria / Sector',
      generateBtn: 'Generar Diagnóstico',
      generatingBtn: 'Analizando con IA...',
      engineLabel: 'Motor: Gemini 3.8 Flash',
      latencyLabel: 'Análisis: ~0.8s',
      evaluatingTitle: 'Evaluando Arquitectura Tecnológica...',
      evaluatingSubtitle:
        'Mapeando problemas hacia los 6 pilares de SIMPORA y estimando ROI de implementación.',
      resultPillarLabel: 'Pilar SIMPORA Recomendado',
      resultSummaryLabel: 'Resumen Arquitectónico',
      resultRoiLabel: 'Proyección de ROI',
      resultTimelineLabel: 'Tiempo Estimado',
      resultStackLabel: 'Stack Tecnológico Sugerido',
      resultPlanLabel: 'Plan de Acción Inmediato',
      quoteSolutionBtn: 'Cotizar esta solución técnica',
      resetBtn: 'Hacer otra consulta',
      presets: [
        {
          label: 'Automatización con IA',
          prompt:
            'Quiero automatizar la atención a mis clientes por WhatsApp y sincronizar los pedidos con nuestro CRM sin trabajo manual.',
        },
        {
          label: 'Software Web a Medida',
          prompt:
            'Necesitamos renovar nuestra plataforma de operaciones interna con una web rápida, segura y accesible desde móviles.',
        },
        {
          label: 'Ciberseguridad y Auditoría',
          prompt:
            'Queremos auditar la seguridad de nuestros servidores, prevenir filtración de datos y optimizar la infraestructura cloud.',
        },
        {
          label: 'Capacitación en IA para Negocios',
          prompt:
            'Queremos que nuestro equipo administrativo y técnico domine herramientas de IA para duplicar su productividad.',
        },
      ],
      industries: [
        { value: 'General / Empresarial', label: 'General / Empresarial' },
        { value: 'Comercio / E-commerce', label: 'Comercio / E-commerce' },
        { value: 'Servicios Profesionales', label: 'Servicios Profesionales' },
        { value: 'Salud y Clínicas', label: 'Salud y Clínicas' },
        { value: 'Educación / Academias', label: 'Educación / Academias' },
        { value: 'Industria & Logística', label: 'Industria & Logística' },
      ],
    },
    philosophy: {
      badge: 'Fundamentos de SIMPORA',
      heading: 'Filosofía & Valores de Marca',
      description:
        'Nuestros principios rectores no son retórica decorativa; son los parámetros matemáticos y de ingeniería con los que diseñamos, auditamos y desplegamos cada sistema.',
      visionTitle: 'Visión',
      visionDesc:
        'Convertirse en el aliado tecnológico líder en innovación y soluciones digitales inteligentes, simplificando la tecnología para que cualquier persona o empresa pueda aprovechar su máximo potencial.',
      missionTitle: 'Misión',
      missionDesc:
        'Brindar soluciones tecnológicas accesibles, eficientes y avanzadas, combinando la ingeniería en sistemas con la inteligencia artificial aplicada para optimizar procesos y promover la verdadera transformación digital.',
      values: [
        {
          title: 'Innovación',
          subtitle: 'Nuevas formas creativas',
          description:
            'Buscamos constantemente nuevas formas creativas y avanzadas de resolver los problemas de siempre mediante ingeniería aplicada.',
          metric: '100%',
          metricLabel: 'Soluciones pioneras',
        },
        {
          title: 'Eficiencia',
          subtitle: 'Resultados acelerados',
          description:
            'Optimizamos cada uno de los recursos disponibles para lograr los mejores y más rápidos resultados posibles en cada despliegue.',
          metric: '<24h',
          metricLabel: 'Tiempo de respuesta técnica',
        },
        {
          title: 'Compromiso',
          subtitle: 'Crecimiento sostenido',
          description:
            'Estamos 100% dedicados al éxito y al crecimiento sostenido de todos los clientes que confían en nosotros como su socio de tecnología.',
          metric: '99.9%',
          metricLabel: 'Satisfacción y disponibilidad',
        },
      ],
    },
    techStack: {
      badge: 'Infraestructura & Stack',
      heading: 'Tecnologías y Estándares de Clase Mundial',
      description:
        'Herramientas modernas, lenguajes probados en producción y arquitecturas cloud de baja latencia.',
    },
    contact: {
      badge: 'Hablemos de tu futuro',
      heading: 'Inicia la Transformación Digital de tu Negocio',
      description:
        'Déjanos tus datos o describe tu reto. Jonathan A. Dubón y nuestro equipo técnico analizarán tu caso con respuesta en menos de 24 horas.',
      nameLabel: 'Nombre Completo *',
      namePlaceholder: 'Ej: Carlos Ramos / Tech Corp',
      emailLabel: 'Correo Electrónico *',
      emailPlaceholder: 'carlos@empresa.com',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+504 9870-0953',
      serviceLabel: 'Pilar o Servicio de Interés',
      servicePlaceholder: 'Selecciona una categoría...',
      messageLabel: 'Mensaje o Requerimiento Técnico *',
      messagePlaceholder:
        'Describe tu proyecto o pega el diagnóstico generado por la IA...',
      submitBtn: 'Enviar Solicitud',
      sentSuccess: '¡Mensaje recibido! Nos comunicaremos en menos de 24 horas.',
      slaBadge: 'SLA < 24 Horas',
      confidentialBadge: '100% Confidencialidad',
      advisoryBadge: 'Asesoría Directa',
      channelsTitle: 'Canales de Contacto Directo',
      whatsappLabel: 'WhatsApp Oficial',
      emailContactLabel: 'Correo Electrónico',
      phoneContactLabel: 'Teléfono Directo',
      servicesList: [
        { value: 'Inteligencia Artificial', label: 'Inteligencia Artificial' },
        { value: 'Consultoría Tech', label: 'Consultoría Tech' },
        { value: 'Desarrollo de Software', label: 'Desarrollo de Software' },
        { value: 'Mantenimiento & Rescate', label: 'Mantenimiento & Rescate' },
        { value: 'Productos & Hardware', label: 'Productos & Hardware' },
        { value: 'Capacitación en IA', label: 'Capacitación en IA' },
      ],
    },
    footer: {
      description:
        'Consultoría integral en ingeniería de sistemas e inteligencia artificial aplicada. Simplificando la tecnología para que cualquier empresa aproveche su máximo potencial.',
      navigation: 'Navegación',
      contactHeading: 'Contacto Directo',
      rights: 'SIMPORA. Todos los derechos reservados.',
      allRightsReserved: 'Diseñado bajo estándares de ingeniería limpia y alto rendimiento.',
      domain: 'simpora.dev',
      scrollTop: 'Subir al inicio',
      location: 'Honduras • Atención Global',
      leadBy: 'Liderado por',
      sloganText: 'Haremos que la tecnología trabaje para ti',
    },
    chat: {
      floatingBtn: 'Consultor IA',
      onlineStatus: 'SIMPORA • En línea',
      assistantTitle: 'SIMPORA AI Assistant',
      welcomeMessage:
        '¡Hola! Soy el asistente virtual inteligente de SIMPORA. ¿Cómo puedo ayudarte a optimizar, automatizar o transformar tecnológicamente tu negocio hoy?',
      suggestionsLabel: 'Sugerencias:',
      inputPlaceholder: 'Escribe tu consulta tecnológica o proyecto...',
      analyzing: 'SIMPORA AI está analizando tu consulta...',
      quickPrompts: [
        '¿Cómo ayuda la IA a mi empresa?',
        'Cotizar software a medida',
        'Auditoría de ciberseguridad',
        'Hablar con Jonathan Dubón',
      ],
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About SIMPORA',
      services: 'Services',
      ai: 'AI',
      solutionFinder: 'AI Solution Finder',
      philosophy: 'Philosophy',
      contact: 'Contact',
      techStack: 'Tech Stack',
      letsTalk: 'Contact',
      contactBtn: 'Contact',
      mobileTag: 'Contact',
    },
    hero: {
      tagline: 'SIMPLE. POWERFUL. ADVANCED.',
      headlinePart1: 'We make technology ',
      headlineFocus: 'work',
      headlinePart2: ' for you.',
      subtitle:
        'High-performance technology consultancy. We combine systems engineering precision with applied artificial intelligence to scale, modernize, and protect your digital core.',
      ctaAi: 'Diagnose My Project with AI',
      ctaServices: 'Explore the 6 Pillars',
      badgeCode: '100% Code',
      badgeCodeSub: 'Bespoke, no generic templates',
      badgeSla: '<24h SLA',
      badgeSlaSub: 'Direct technical response',
      badgePillars: '6 Pillars',
      badgePillarsSub: 'AI, DevOps, Software & Hardware',
      npuTitle: 'NEURAL PROCESSING UNIT',
      npuLatency: 'Latency',
      npuArchitecture: 'Architecture',
      npuClickToToggle: 'Click to toggle mode',
      npuLiveDemo: 'INTERACTIVE NPU DEMO',
    },
    about: {
      badge: 'SIMPORA Tech • High-Impact Engineering',
      heading: 'Who We Are & What Drives Us',
      description:
        'We were founded to eliminate the technical friction that stalls business growth. We architect ecosystems where robust software engineering and applied AI work seamlessly alongside your team.',
      rigorousTitle: 'Rigorous Engineering',
      rigorousDesc:
        'We never sell generic fixes. Every architecture is engineered against rigorous software standards, data isolation, and enterprise reliability.',
      humanTitle: 'Human & Direct Approach',
      humanDesc:
        'No middlemen or corporate bureaucracy. Transparent technical dialogue, honest feasibility audits, and dedicated guidance through every deployment phase.',
      vanguardTitle: 'AI Vanguard',
      vanguardDesc:
        'We implement state-of-the-art LLMs, computer vision algorithms, and autonomous agents engineered to multiply your operational efficiency.',
      leaderBadge: 'SIMPORA Team',
      leadTitle: 'Technical Leadership',
      role: 'Systems Engineer',
      founderTitle: 'Founder & Tech Lead',
      quote:
        '"Passionate about technology, maximum efficiency, and constant digital innovation in all its forms."',
      bio:
        'Jonathan leads every engagement with an unwavering commitment: transforming complex technological architectures into accessible, scalable, and high-impact business solutions.',
      directLeadership: 'Direct advisory & execution',
      connectBtn: 'Connect',
    },
    services: {
      badge: 'Full-Spectrum Architecture',
      heading: 'Our 6 Service Pillars',
      subtitle:
        'From applied artificial intelligence and bespoke platforms to bare-metal hardware and cybersecurity. A 360° technical perimeter built for operational excellence.',
      diagnoseBtn: 'Diagnose Need',
      quoteBtn: 'Get a Quote',
      deliverablesLabel: 'Key Deliverables:',
      featuredBadge: 'Flagship Pillar',
      pillars: [
        {
          id: 'ia',
          number: '01',
          title: 'Artificial Intelligence',
          shortDesc:
            'Workflow automation, conversational agents, computer vision models, and enterprise LLM integration.',
          deliverables: [
            'Robotic & cognitive process automation (RPA/CPA)',
            'Custom AI assistants & conversational pipelines',
            'Computer vision & intelligent classification models',
            'Private LLM integration with internal company databases',
          ],
          highlight: true,
        },
        {
          id: 'consultoria',
          number: '02',
          title: 'Tech Consultancy',
          shortDesc:
            'Enterprise digital maturity diagnostics, cybersecurity posture audits, workflow digitizing, and cloud infrastructure planning.',
          deliverables: [
            '360° enterprise system diagnostics & tech maturity audits',
            'Cybersecurity hardening & penetration vulnerability reviews',
            'Workflow digitalization and process optimization',
            'Scalable cloud architecture & DevOps cost-reduction strategies',
          ],
        },
        {
          id: 'desarrollo',
          number: '03',
          title: 'Software Development',
          shortDesc:
            'Fully bespoke software, reactive web apps, high-throughput API integrations, and customized internal management platforms (CRMs).',
          deliverables: [
            'High-performance web platforms with fluid, modern interfaces',
            'Custom internal ERPs and sales management CRMs',
            'Complex API orchestration & webhook microservices',
            'Serverless, microservices, and resilient cloud architectures',
          ],
          highlight: true,
        },
        {
          id: 'mantenimiento',
          number: '04',
          title: 'Maintenance & Rescue',
          shortDesc:
            'Deep hardware repairs, kernel-level OS optimization, advanced malware eradication, and forensic data recovery.',
          deliverables: [
            'Fine-grained OS kernel tuning & resource optimization',
            'Component-level hardware diagnostics & motherboard repair',
            'Advanced malware eradication & persistence mitigation',
            'Forensic data recovery & automated backup integrity systems',
          ],
        },
        {
          id: 'productos',
          number: '05',
          title: 'Hardware & Products',
          shortDesc:
            'Certified high-speed components (RAM, NVMe SSDs), corporate software licenses, and tailor-built engineering workstations.',
          deliverables: [
            'Certified high-speed components (RAM, PCIe Gen4/5 NVMe SSDs)',
            'Custom-assembled engineering & AI inference workstations',
            'Official software licensing and corporate seat governance',
            'Technical warranty and rapid-replacement hardware coverage',
          ],
        },
        {
          id: 'capacitacion',
          number: '06',
          title: 'AI Corporate Training',
          shortDesc:
            'Executive digital tooling workshops, hands-on enterprise AI training, and practical cybersecurity awareness.',
          deliverables: [
            'Executive-level applied Artificial Intelligence bootcamps',
            'Hands-on prompt engineering & workflow automation training',
            'Practical corporate cybersecurity hygiene & threat awareness',
            'Tailored in-company programs mapped to your daily workflows',
          ],
        },
      ],
    },
    solutionFinder: {
      badge: 'AI Solution',
      pill: 'What challenge are you facing?',
      heading: 'SIMPORA AI Solution Finder',
      description:
        'Describe your operational bottleneck or digital ambition. Our AI systems engine will analyze feasibility and generate an instant architectural diagnosis.',
      step1: '1. Quick example presets',
      step2: '2. Describe your technical challenge or need',
      charCount: 'characters',
      placeholder:
        'E.g., Our multi-branch inventory is slow, and we need to automate client WhatsApp support synced with our central database...',
      industryLabel: 'Industry / Vertical',
      generateBtn: 'Generate Diagnosis',
      generatingBtn: 'Analyzing with AI...',
      engineLabel: 'Engine: Gemini 3.8 Flash',
      latencyLabel: 'Latency: ~0.8s',
      evaluatingTitle: 'Evaluating Systems Architecture...',
      evaluatingSubtitle:
        'Mapping technical bottlenecks against SIMPORA 6 pillars and projecting implementation ROI.',
      resultPillarLabel: 'Recommended SIMPORA Pillar',
      resultSummaryLabel: 'Architectural Summary',
      resultRoiLabel: 'Projected ROI',
      resultTimelineLabel: 'Estimated Timeline',
      resultStackLabel: 'Suggested Technology Stack',
      resultPlanLabel: 'Immediate Action Roadmap',
      quoteSolutionBtn: 'Quote this technical solution',
      resetBtn: 'Run another diagnosis',
      presets: [
        {
          label: 'AI Automation',
          prompt:
            'I want to automate customer support via WhatsApp and automatically sync orders with our CRM without manual work.',
        },
        {
          label: 'Custom Web Platform',
          prompt:
            'We need to rebuild our internal operations system into a fast, secure, and mobile-ready web platform.',
        },
        {
          label: 'Cybersecurity & Audit',
          prompt:
            'We want to audit server security, prevent data breaches, and optimize cloud infrastructure costs.',
        },
        {
          label: 'Corporate AI Training',
          prompt:
            'We want our administrative and engineering teams to master applied generative AI to double operational throughput.',
        },
      ],
      industries: [
        { value: 'General / Corporate', label: 'General / Corporate' },
        { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
        { value: 'Professional Services', label: 'Professional Services' },
        { value: 'Healthcare & Clinics', label: 'Healthcare & Clinics' },
        { value: 'Education & Academies', label: 'Education & Academies' },
        { value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' },
      ],
    },
    philosophy: {
      badge: 'SIMPORA Foundations',
      heading: 'Brand Philosophy & Values',
      description:
        'Our governing principles are not decorative slogans; they are the engineering axioms by which we architect, audit, and deploy every system.',
      visionTitle: 'Vision',
      visionDesc:
        'To become the leading technological ally in intelligent digital solutions and applied innovation, making technology clean and accessible so any enterprise can harness its maximum potential.',
      missionTitle: 'Mission',
      missionDesc:
        'To deliver accessible, ultra-efficient, and cutting-edge tech solutions by combining systems engineering with applied artificial intelligence, eliminating friction and driving genuine transformation.',
      values: [
        {
          title: 'Innovation',
          subtitle: 'Novel creative vectors',
          description:
            'We constantly pioneer creative and advanced methodologies to resolve long-standing operational problems through applied engineering.',
          metric: '100%',
          metricLabel: 'Pioneering solutions',
        },
        {
          title: 'Efficiency',
          subtitle: 'Accelerated delivery',
          description:
            'We optimize every compute and human resource to deliver the fastest, leanest, and most reliable outcomes on every rollout.',
          metric: '<24h',
          metricLabel: 'Direct technical response',
        },
        {
          title: 'Commitment',
          subtitle: 'Sustained growth',
          description:
            'We are 100% committed to the sustained long-term expansion of every organization that trusts us as their core technical partner.',
          metric: '99.9%',
          metricLabel: 'Client satisfaction & uptime',
        },
      ],
    },
    techStack: {
      badge: 'Infrastructure & Stack',
      heading: 'World-Class Technologies & Standards',
      description:
        'Modern toolchains, battle-tested languages in production, and low-latency cloud architectures.',
    },
    contact: {
      badge: "Let's build your future",
      heading: 'Ignite Your Company’s Digital Transformation',
      description:
        'Send us your details or outline your challenge. Jonathan A. Dubón and our technical team will evaluate your case with a direct response in under 24 hours.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. Carlos Ramos / Tech Corp',
      emailLabel: 'Business Email *',
      emailPlaceholder: 'carlos@company.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+1 (555) 000-0000',
      serviceLabel: 'Service Pillar of Interest',
      servicePlaceholder: 'Select a category...',
      messageLabel: 'Message or Technical Requirements *',
      messagePlaceholder:
        'Describe your project or paste your AI-generated diagnosis...',
      submitBtn: 'Send Inquiry',
      sentSuccess: "Message received! We'll reply within 24 hours.",
      slaBadge: 'SLA < 24 Hours',
      confidentialBadge: '100% Confidentiality',
      advisoryBadge: 'Direct Advisory',
      channelsTitle: 'Direct Contact Channels',
      whatsappLabel: 'Official WhatsApp',
      emailContactLabel: 'Direct Email',
      phoneContactLabel: 'Phone Line',
      servicesList: [
        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
        { value: 'Tech Consultancy', label: 'Tech Consultancy' },
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Maintenance & Rescue', label: 'Maintenance & Rescue' },
        { value: 'Hardware & Products', label: 'Hardware & Products' },
        { value: 'AI Corporate Training', label: 'AI Corporate Training' },
      ],
    },
    footer: {
      description:
        'Comprehensive consultancy in systems engineering and applied artificial intelligence. Simplifying technology so any business can unleash its full potential.',
      navigation: 'Navigation',
      contactHeading: 'Direct Contact',
      rights: 'SIMPORA. All rights reserved.',
      allRightsReserved: 'Engineered with clean architectural standards and high performance.',
      domain: 'simpora.dev',
      scrollTop: 'Back to top',
      location: 'Honduras • Global Coverage',
      leadBy: 'Led by',
      sloganText: 'We make technology work for you',
    },
    chat: {
      floatingBtn: 'AI Consultant',
      onlineStatus: 'SIMPORA • Online',
      assistantTitle: 'SIMPORA AI Assistant',
      welcomeMessage:
        "Hello! I am SIMPORA's senior AI consultant. How can I help you automate, optimize, or technologically scale your business operations today?",
      suggestionsLabel: 'Suggestions:',
      inputPlaceholder: 'Type your technical question or project goal...',
      analyzing: 'SIMPORA AI is analyzing your inquiry...',
      quickPrompts: [
        'How can AI optimize my company?',
        'Quote custom software',
        'Cybersecurity & audit process',
        'Connect with Jonathan Dubón',
      ],
    },
  },
};
