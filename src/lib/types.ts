export interface ResumeData {
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  completenessScore: number;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface QuizResult {
  sector: Sector;
  role: string;
  confidence: number;
  preferences: string[];
}

export type Sector = 'healthcare' | 'agritech' | 'smartcities';

export interface CareerMatch {
  sector: Sector;
  role: string;
  confidence: number;
  explanation: string;
  matchingSkills: string[];
}

export interface SkillGap {
  requiredSkills: string[];
  userSkills: string[];
  missingSkills: string[];
  readinessScore: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  skills: string[];
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  resources: Resource[];
  completed: boolean;
}

export interface Resource {
  title: string;
  url: string;
  type: 'course' | 'article' | 'video' | 'book';
}

export interface UserProfile {
  resumeData?: ResumeData;
  quizResult?: QuizResult;
  careerMatch?: CareerMatch;
  skillGap?: SkillGap;
  roadmap?: RoadmapStep[];
  readinessScore: number;
}

export interface SectorInfo {
  id: Sector;
  name: string;
  description: string;
  keySkills: string[];
  roles: string[];
  growthRate: string;
  avgSalary: string;
  trends: string[];
}
