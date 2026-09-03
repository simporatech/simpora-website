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
