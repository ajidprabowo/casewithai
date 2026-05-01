// ─── Case Interview Types ────────────────────────────────────────────────────

export type CaseFirm = 'McKinsey' | 'BCG' | 'Bain' | 'Deloitte' | 'PwC' | 'LEK' | 'Oliver Wyman' | 'General';

export type CaseType =
  | 'Profitability'
  | 'Market Entry'
  | 'Market Sizing'
  | 'M&A'
  | 'Growth Strategy'
  | 'Operations'
  | 'Pricing'
  | 'Competitive Response';

export type CaseMode = 'interviewer-led' | 'interviewee-led' | 'progressive';

export type CaseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CaseScenario {
  id: string;
  title: string;
  firm: CaseFirm;
  type: CaseType;
  difficulty: CaseDifficulty;
  industry: string;
  description: string;
  prompt: string;
  estimatedMinutes: number;
  tags: string[];
}

// ─── Scoring Types ────────────────────────────────────────────────────────────

export interface ScoreDimension {
  name: string;
  score: number; // 0–100
  feedback: string;
}

export interface SessionScore {
  structure: ScoreDimension;
  analysis: ScoreDimension;
  communication: ScoreDimension;
  math: ScoreDimension;
  overall: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}

// ─── Chat Types ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface InterviewSession {
  id: string;
  scenario: CaseScenario;
  mode: CaseMode;
  messages: ChatMessage[];
  score?: SessionScore;
  startedAt: Date;
  endedAt?: Date;
  status: 'active' | 'completed';
}

// ─── Drill Types ──────────────────────────────────────────────────────────────

export type DrillCategory =
  | 'Mental Math'
  | 'Chart Interpretation'
  | 'Framework Building'
  | 'Market Sizing'
  | 'Brainstorming';

export interface DrillQuestion {
  id: string;
  category: DrillCategory;
  difficulty: CaseDifficulty;
  question: string;
  hint?: string;
  timeLimit: number; // seconds
}

export interface DrillResult {
  questionId: string;
  userAnswer: string;
  aiFeedback: string;
  score: number;
  timeTaken: number;
}

// ─── Course Types ─────────────────────────────────────────────────────────────

export interface CourseModule {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  videoUrl?: string;
  isPremium: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  totalDuration: string;
  level: CaseDifficulty;
  modules: CourseModule[];
}

// ─── Assessment Types ─────────────────────────────────────────────────────────

export interface AssessmentResult {
  strengths: string[];
  weaknesses: string[];
  overallScore: number;
  recommendations: string[];
  suggestedDrills: DrillCategory[];
  suggestedCases: CaseType[];
}

// ─── Pricing Types ────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: 'flex' | 'unlimited' | 'coaching';
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  isFeatured?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiChatRequest {
  messages: { role: 'user' | 'model'; parts: [{ text: string }] }[];
  systemPrompt: string;
}

export interface ApiChatResponse {
  reply: string;
  error?: string;
}

export interface ApiAssessmentRequest {
  transcript: string;
  scenario: CaseScenario;
}

export interface ApiAssessmentResponse {
  score: SessionScore;
  error?: string;
}
