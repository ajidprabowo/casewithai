import { DrillQuestion } from '@/types';

export const DRILL_QUESTIONS: DrillQuestion[] = [
  // Mental Math
  {
    id: 'math-001',
    category: 'Mental Math',
    difficulty: 'Beginner',
    question: 'A company has $450M in revenue and a 12% operating margin. What is the operating profit?',
    hint: 'Operating Profit = Revenue × Operating Margin',
    timeLimit: 60,
  },
  {
    id: 'math-002',
    category: 'Mental Math',
    difficulty: 'Intermediate',
    question: 'If a firm grows from $2.4B to $3.6B in 3 years, what is the approximate CAGR?',
    hint: 'CAGR ≈ (Ending/Beginning)^(1/n) - 1. Approximate using the rule of 72 or logarithms.',
    timeLimit: 90,
  },
  {
    id: 'math-003',
    category: 'Mental Math',
    difficulty: 'Advanced',
    question: 'A factory runs 2 shifts of 8 hours each, 250 days/year. Each shift produces 340 units/hour with a 6% defect rate. What is the annual output of sellable units?',
    hint: 'Calculate total units first, then apply defect rate.',
    timeLimit: 120,
  },
  {
    id: 'math-004',
    category: 'Mental Math',
    difficulty: 'Beginner',
    question: 'If a product costs $35 to make and is sold for $52, what is the gross margin percentage?',
    hint: 'Gross Margin % = (Price - Cost) / Price × 100',
    timeLimit: 45,
  },
  // Chart Interpretation
  {
    id: 'chart-001',
    category: 'Chart Interpretation',
    difficulty: 'Beginner',
    question: `You see a bar chart showing market share for 5 companies:
- Company A: 38%
- Company B: 24%
- Company C: 18%
- Company D: 12%
- Company E: 8%

The chart title says "Market Share 2020-2024" and shows an arrow indicating Company C grew from 8% to 18% over this period, while Company A fell from 45% to 38%.

What are the 2 most important insights from this chart, and what would you investigate next?`,
    hint: 'Look for trends, not just current state. Who is gaining and losing share?',
    timeLimit: 120,
  },
  {
    id: 'chart-002',
    category: 'Chart Interpretation',
    difficulty: 'Intermediate',
    question: `A scatter plot shows 20 retail stores. The X-axis is "Store Size (sq ft)" ranging from 5,000 to 25,000. The Y-axis is "Revenue per sq ft" ranging from $150 to $450.

Most stores cluster between 8,000-12,000 sq ft with $280-$350 revenue/sq ft. However, there are 3 outliers:
- Store #7: 22,000 sq ft, $420/sq ft  
- Store #14: 6,000 sq ft, $190/sq ft
- Store #19: 10,500 sq ft, $430/sq ft

What story does this data tell, and what would you recommend investigating?`,
    hint: 'What makes the outliers different? Are bigger stores always better?',
    timeLimit: 150,
  },
  // Framework Building
  {
    id: 'fw-001',
    category: 'Framework Building',
    difficulty: 'Beginner',
    question: 'A coffee chain\'s profits have been declining for 2 years despite stable revenue. Build a framework to diagnose the problem in under 60 seconds, then explain it.',
    hint: 'Profit = Revenue - Costs. Break down costs into their key drivers.',
    timeLimit: 90,
  },
  {
    id: 'fw-002',
    category: 'Framework Building',
    difficulty: 'Intermediate',
    question: 'Your client is a US telecom company considering entering the Indian market. Build a market entry framework tailored to this specific situation.',
    hint: 'Think about market attractiveness AND the company\'s ability to compete. What makes India unique?',
    timeLimit: 120,
  },
  {
    id: 'fw-003',
    category: 'Framework Building',
    difficulty: 'Advanced',
    question: 'A private equity firm wants to evaluate acquiring a SaaS company with $50M ARR growing 40% YoY. Build a due diligence framework to assess whether the $500M asking price is justified.',
    hint: 'Think revenue quality, growth sustainability, unit economics, and competitive moat.',
    timeLimit: 150,
  },
  // Market Sizing
  {
    id: 'ms-001',
    category: 'Market Sizing',
    difficulty: 'Beginner',
    question: 'Estimate the annual market size of the US pet food industry.',
    hint: 'Start with number of pet-owning households, then estimate spend per household.',
    timeLimit: 180,
  },
  {
    id: 'ms-002',
    category: 'Market Sizing',
    difficulty: 'Intermediate',
    question: 'How many Uber rides are completed in New York City on a typical weekday?',
    hint: 'Think about supply (drivers) or demand (potential riders) side — choose the easier approach.',
    timeLimit: 180,
  },
  {
    id: 'ms-003',
    category: 'Market Sizing',
    difficulty: 'Advanced',
    question: 'Estimate the global market size for corporate sustainability consulting by 2030.',
    hint: 'Think about the total addressable companies, what % need this service, and average spend.',
    timeLimit: 240,
  },
  // Brainstorming
  {
    id: 'brain-001',
    category: 'Brainstorming',
    difficulty: 'Beginner',
    question: 'A luxury hotel chain wants to increase revenue per guest. Generate as many ideas as possible, organized into logical buckets.',
    hint: 'Think across the guest journey: pre-arrival, during stay, checkout, post-stay.',
    timeLimit: 120,
  },
  {
    id: 'brain-002',
    category: 'Brainstorming',
    difficulty: 'Intermediate',
    question: 'An airline wants to improve the boarding experience to reduce average gate delay from 18 minutes to 10 minutes. What ideas would you explore?',
    hint: 'Consider process changes, technology, incentives, and passenger behavior.',
    timeLimit: 150,
  },
];

export const DRILL_CATEGORIES = [
  'All',
  'Mental Math',
  'Chart Interpretation',
  'Framework Building',
  'Market Sizing',
  'Brainstorming',
] as const;

export function getDrillsByCategory(category: string): DrillQuestion[] {
  if (category === 'All') return DRILL_QUESTIONS;
  return DRILL_QUESTIONS.filter(d => d.category === category);
}

export function getRandomDrill(category?: string): DrillQuestion {
  const pool = category && category !== 'All' ? getDrillsByCategory(category) : DRILL_QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)];
}
