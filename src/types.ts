export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  gradient: string;
  highlight?: boolean;
}

export interface BusinessValue {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  metric: string;
  metricLabel: string;
}

export interface DiagnosisResult {
  recommendedPillar: string;
  summary: string;
  timeEstimate: string;
  roiProjection: string;
  technologies: string[];
  actionPlan: string[];
  leadEngineer?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category: {
    es: string;
    en: string;
  };
  whatWeDid: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: {
    es: string;
    en: string;
  };
  category: {
    es: string;
    en: string;
  };
  badge: {
    es: string;
    en: string;
  };
  logo: string;
  website: string;
  displayUrl: string;
  description: {
    es: string;
    en: string;
  };
  features: {
    es: string[];
    en: string[];
  };
  metrics?: {
    label: { es: string; en: string };
    value: string;
  };
}
