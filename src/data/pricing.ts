import { PricingPlan } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'flex',
    name: 'Flex',
    tagline: 'For occasional practice',
    price: '$1',
    period: 'per credit · $5 minimum',
    features: [
      '1 case practice = 4 credits ($4.00)',
      '1 drill practice = 0.5 credit ($0.50)',
      '1 course module = 10 credits ($10)',
      'Credits never expire',
      'Full AI feedback included',
    ],
    ctaLabel: 'Buy Credits',
    ctaHref: '/pricing/credits',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    tagline: 'For active interview prep',
    price: '$50',
    period: 'per month',
    features: [
      'Unlimited case & drill practice',
      'Unlimited course access (all 14 modules)',
      'Full targeted feedback after every session',
      'Progress tracking dashboard',
      '7-day money-back guarantee',
      'Cancel anytime',
    ],
    isFeatured: true,
    ctaLabel: 'Start Free Trial',
    ctaHref: '/login',
  },
  {
    id: 'coaching',
    name: 'Personal Coaching',
    tagline: 'The traditional route',
    price: '$200+',
    period: 'per hour',
    features: [
      '1-on-1 sessions with a human coach',
      'Highly personalized feedback',
      'Scheduling constraints apply',
      'Limited session availability',
      'No objective scoring system',
    ],
    ctaLabel: 'Not Our Product',
    ctaHref: '#',
  },
];

export const CREDIT_PRICING = {
  minimumPurchase: 5,
  pricePerCredit: 1,
  items: [
    { label: 'Case practice', credits: 4, price: '$4.00' },
    { label: 'Drill practice', credits: 0.5, price: '$0.50' },
    { label: 'Course module', credits: 10, price: '$10.00' },
  ],
  packages: [
    { credits: 10, price: 10, label: 'Starter' },
    { credits: 25, price: 23, label: 'Popular', savings: '8%' },
    { credits: 50, price: 42, label: 'Best Value', savings: '16%' },
  ],
};
