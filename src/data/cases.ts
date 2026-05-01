import { CaseScenario } from '@/types';

export const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'case-001',
    title: 'RetailCo Revenue Decline',
    firm: 'McKinsey',
    type: 'Profitability',
    difficulty: 'Intermediate',
    industry: 'Retail',
    description: 'A global retailer has seen a 15% revenue decline YoY. The CEO wants to understand the root causes and develop a turnaround strategy.',
    prompt: `You are a McKinsey interviewer conducting a case interview. The case is:

"Our client is RetailCo, a global retailer with 500 stores across 20 countries. They have experienced a 15% revenue decline year-over-year and the CEO is alarmed. They have hired McKinsey to diagnose the problem and recommend a path forward."

Conduct a rigorous, McKinsey-style interviewer-led case. Be direct, ask follow-up questions, push the candidate to quantify their hypotheses. After each candidate response, either ask a probing follow-up question or move to the next part of the case. Give exhibits (as text descriptions) when relevant. End the case after 6-8 exchanges and provide a brief closing.`,
    estimatedMinutes: 25,
    tags: ['retail', 'profitability', 'revenue', 'McKinsey style'],
  },
  {
    id: 'case-002',
    title: 'TechBank Digital Entry',
    firm: 'BCG',
    type: 'Market Entry',
    difficulty: 'Advanced',
    industry: 'Financial Services',
    description: 'A traditional bank wants to launch a digital-only offering. Should they do it, and if so, how?',
    prompt: `You are a BCG interviewer conducting an interviewee-led case interview. The case is:

"Our client is TechBank, a top-5 traditional commercial bank in the US with $500B in assets. They are considering launching a digital-only banking product to compete with fintechs like Chime and Nubank. They want to know: should they do it, and if so, how?"

Allow the candidate to lead the structure. Ask clarifying questions when prompted. Provide data when the candidate asks for it (make up reasonable numbers). After 6-8 exchanges, ask for a recommendation.`,
    estimatedMinutes: 30,
    tags: ['banking', 'fintech', 'market entry', 'BCG style'],
  },
  {
    id: 'case-003',
    title: 'Coffee Shops in NYC',
    firm: 'General',
    type: 'Market Sizing',
    difficulty: 'Beginner',
    industry: 'Food & Beverage',
    description: 'Estimate the number of coffee shops in New York City.',
    prompt: `You are a consulting interviewer. The question is a market sizing:

"Estimate the number of coffee shops in New York City."

Guide the candidate through a structured estimation. Ask them to walk you through their approach step by step. Push for specific numbers and assumptions. After they finish, give them the real answer (~8,000-10,000) and comment on their methodology. This should take 10-15 minutes.`,
    estimatedMinutes: 12,
    tags: ['market sizing', 'estimation', 'beginner friendly'],
  },
  {
    id: 'case-004',
    title: 'PharmaCo Acquisition Decision',
    firm: 'Bain',
    type: 'M&A',
    difficulty: 'Advanced',
    industry: 'Healthcare',
    description: 'A pharmaceutical company is considering acquiring a biotech startup. Should they proceed?',
    prompt: `You are a Bain interviewer. The case is:

"Our client is PharmaCo, a Fortune 100 pharmaceutical company. They are considering acquiring BioStart, a 200-person biotech startup with a promising oncology pipeline but no approved drugs yet. The asking price is $2.5B. Should PharmaCo proceed with the acquisition?"

This is a Bain-style interviewee-led case. Let the candidate drive the structure. Provide financial data when asked: BioStart has 3 drugs in Phase 2 trials, estimated $800M revenue potential per drug if approved (60% probability), development cost of $400M per drug remaining, and PharmaCo's WACC is 8%. Guide them to an NPV analysis.`,
    estimatedMinutes: 35,
    tags: ['M&A', 'pharma', 'NPV', 'Bain style', 'advanced'],
  },
  {
    id: 'case-005',
    title: 'EV Charging Network Expansion',
    firm: 'LEK',
    type: 'Growth Strategy',
    difficulty: 'Intermediate',
    industry: 'Energy & Mobility',
    description: 'An EV charging startup wants to expand from California to the national market. How should they approach this?',
    prompt: `You are an L.E.K. Consulting interviewer. The case is:

"Our client is ChargeUp, an EV charging startup that dominates the California market with 2,000 charging stations. They want to expand nationally within 3 years. How should they approach this expansion?"

Conduct an L.E.K.-style case focusing on market attractiveness, competitive dynamics, and operational capabilities. Ask for a prioritization framework. Provide state-level data when asked: Texas (2nd largest EV market, growing 40% YoY, low current coverage), New York (mature market, high competition from ChargePoint), Florida (high tourism, rapid EV adoption, 25% YoY growth).`,
    estimatedMinutes: 28,
    tags: ['EV', 'growth strategy', 'expansion', 'operations'],
  },
  {
    id: 'case-006',
    title: 'Hospital Operational Efficiency',
    firm: 'Oliver Wyman',
    type: 'Operations',
    difficulty: 'Intermediate',
    industry: 'Healthcare',
    description: 'A hospital system wants to reduce costs by 20% without impacting patient care quality.',
    prompt: `You are an Oliver Wyman interviewer. The case is:

"MedSystem is a 10-hospital network in the Midwest struggling with rising costs. Their operating margin has fallen from 8% to 2% over the past 3 years. The CEO wants to reduce costs by 20% while maintaining current patient outcomes. How would you approach this?"

Focus on operational levers. Key data to provide when asked: Labor = 60% of costs (nurses are 40%, admin 20%), Supplies = 25%, Overhead = 15%. Benchmarking shows peer hospitals spend 15% less on supplies and 10% less on admin labor. Nurse turnover is 22% vs. industry average of 15%.`,
    estimatedMinutes: 25,
    tags: ['healthcare', 'operations', 'cost reduction', 'benchmarking'],
  },
];

export function getCaseById(id: string): CaseScenario | undefined {
  return CASE_SCENARIOS.find(c => c.id === id);
}

export function getCasesByFirm(firm: string): CaseScenario[] {
  return CASE_SCENARIOS.filter(c => c.firm === firm);
}

export function getCasesByType(type: string): CaseScenario[] {
  return CASE_SCENARIOS.filter(c => c.type === type);
}

export function getCasesByDifficulty(difficulty: string): CaseScenario[] {
  return CASE_SCENARIOS.filter(c => c.difficulty === difficulty);
}

export const FIRMS = ['All', 'McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC', 'LEK', 'Oliver Wyman', 'General'] as const;
export const CASE_TYPES = ['All', 'Profitability', 'Market Entry', 'Market Sizing', 'M&A', 'Growth Strategy', 'Operations', 'Pricing', 'Competitive Response'] as const;
export const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
