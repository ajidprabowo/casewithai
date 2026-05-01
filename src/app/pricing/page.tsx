'use client';

import { useState } from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '@/data/pricing';
import { cn } from '@/lib/utils';

const FAQ_ITEMS = [
  {
    q: 'How does CaseWithAI compare to ChatGPT or Claude?',
    a: 'General AI platforms are not built for case interviews. CaseWithAI is purpose-built with firm-specific formats, structured scoring rubrics, and a curated case library — delivering feedback that mirrors what actual McKinsey, BCG, and Bain interviewers look for.',
  },
  {
    q: 'Can it replace human practice partners?',
    a: "For most candidates, yes — especially early-stage prep where consistency matters most. Human partners introduce bias and inconsistency. CaseWithAI provides objective, repeatable feedback. We recommend combining both: use CaseWithAI for volume, and humans closer to interview day.",
  },
  {
    q: 'Is there a free option?',
    a: "Yes. You can take a complete free case assessment with no credit card required. The assessment maps your strengths and blind spots, and gives you a taste of the AI feedback experience before committing.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Absolutely. Unlimited plans can be cancelled at any time from your account settings. Credits purchased on the Flex plan never expire.",
  },
  {
    q: 'Is there a money-back guarantee?',
    a: "Yes — the Unlimited plan includes a 7-day money-back guarantee, no questions asked.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'sixmonth'>('monthly');

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Pricing</div>
        <h1 className="font-display text-5xl text-gray-900 mb-4">Simple pricing, no surprises</h1>
        <p className="text-gray-500 text-lg">Plans for every stage of your prep. Cancel anytime.</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-2 bg-gray-100 p-1 rounded-xl mt-6">
          <button
            onClick={() => setBilling('monthly')}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              billing === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('sixmonth')}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
              billing === 'sixmonth' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            6 Months
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-md">Save 50%</span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {PRICING_PLANS.map(plan => (
          <div
            key={plan.id}
            className={cn(
              'border rounded-2xl p-7 flex flex-col transition-all',
              plan.isFeatured
                ? 'border-gray-900 bg-gray-900 text-white shadow-xl shadow-gray-900/10 scale-105'
                : 'border-gray-200 bg-white hover:shadow-lg'
            )}
          >
            {plan.isFeatured && (
              <div className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                Most Popular
              </div>
            )}

            <div className={cn('text-xs font-semibold uppercase tracking-widest mb-2', plan.isFeatured ? 'text-gray-400' : 'text-gray-400')}>
              {plan.tagline}
            </div>
            <div className={cn('text-2xl font-bold mb-1', plan.isFeatured ? 'text-white' : 'text-gray-900')}>
              {plan.name}
            </div>

            <div className="my-4">
              <span className={cn('font-display text-5xl', plan.isFeatured ? 'text-white' : 'text-gray-900')}>
                {plan.id === 'unlimited' && billing === 'sixmonth' ? '$25' : plan.price}
              </span>
              <div className={cn('text-xs mt-1', plan.isFeatured ? 'text-gray-400' : 'text-gray-400')}>
                {plan.id === 'unlimited' && billing === 'sixmonth' ? 'per month · billed as $150' : plan.period}
              </div>
            </div>

            <ul className={cn('space-y-3 mb-8 flex-1', plan.id === 'coaching' ? 'opacity-60' : '')}>
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  {plan.id === 'coaching' ? (
                    <X size={14} className={cn('mt-0.5 flex-shrink-0', plan.isFeatured ? 'text-gray-500' : 'text-gray-300')} />
                  ) : (
                    <CheckCircle size={14} className={cn('mt-0.5 flex-shrink-0', plan.isFeatured ? 'text-blue-400' : 'text-accent')} />
                  )}
                  <span className={plan.isFeatured ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                </li>
              ))}
            </ul>

            {plan.id === 'coaching' ? (
              <div className={cn(
                'text-center text-sm font-semibold py-2.5 rounded-xl border',
                'border-gray-200 text-gray-400 cursor-not-allowed'
              )}>
                Not Our Product
              </div>
            ) : (
              <a
                href={plan.ctaHref}
                className={cn(
                  'block text-center text-sm font-semibold py-2.5 rounded-xl transition-all',
                  plan.isFeatured
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900'
                )}
              >
                {plan.ctaLabel} <ArrowRight size={13} className="inline ml-1" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="mb-20">
        <h2 className="font-display text-3xl text-gray-900 text-center mb-8">What's included</h2>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Feature</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Flex</th>
                <th className="px-6 py-4 font-semibold text-accent text-center">Unlimited</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Full AI case simulations', 'credits', '✓ Unlimited'],
                ['All case types & industries', '✓', '✓'],
                ['Targeted drills', 'credits', '✓ Unlimited'],
                ['Course modules (14 total)', '10 credits each', '✓ All included'],
                ['AI feedback after each session', '✓', '✓'],
                ['Progress tracking dashboard', '✗', '✓'],
                ['7-day money-back guarantee', '✗', '✓'],
              ].map(([feature, flex, unlimited]) => (
                <tr key={feature as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5 text-gray-700">{feature}</td>
                  <td className="px-6 py-3.5 text-center text-gray-400">{flex}</td>
                  <td className="px-6 py-3.5 text-center font-semibold text-accent">{unlimited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl text-gray-900 text-center mb-8">Common questions</h2>
        <div className="space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.q}
                <span className={cn(
                  'w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 ml-4 text-xs transition-all',
                  openFaq === i ? 'bg-accent text-white border-accent rotate-45' : 'text-gray-400'
                )}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-gray-900 rounded-2xl p-10 text-center">
        <h3 className="font-display text-3xl text-white mb-3">Still unsure? Start free.</h3>
        <p className="text-gray-400 mb-6">No credit card required. Take the free assessment and see the quality of feedback before committing.</p>
        <a
          href="/assessment"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
        >
          Take free assessment <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
