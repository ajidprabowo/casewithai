'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

const FIRMS = ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC', 'L.E.K.', 'Oliver Wyman', 'Kearney', 'Roland Berger', 'A.T. Kearney'];

const TESTIMONIALS = [
  {
    quote: '"CasewithAI fixed the biggest gap in case prep — honest, unbiased feedback that actually helped me level up."',
    body: 'I used the feedback to target my prep, and secured an offer to McKinsey. Practicing with case partners was like the blind leading the blind. This was completely different.',
    name: 'Oliver L.',
    role: 'McKinsey Associate',
    school: 'PhD, Harvard University',
    initials: 'OL',
  },
  {
    quote: '"Quality, efficiency, and honestly — a sanity-saver during the most intense period of my life."',
    body: 'After weeks of grinding, I secured an offer from Oliver Wyman. The rating scale is clear and consistent — tracking progress in granular detail made all the difference.',
    name: 'Josh C.',
    role: 'Oliver Wyman Consultant',
    school: '',
    initials: 'JC',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Diagnose',
    sub: 'Know exactly where you stand',
    desc: 'Start with a free case assessment that maps your real strengths and blind spots — no guesswork, no wasted prep time.',
  },
  {
    num: '02',
    title: 'Build',
    sub: 'Close your gaps with targeted practice',
    desc: 'Work through focused drills and structured courses designed around the specific skills top firms test — frameworks, math, charts, market sizing.',
  },
  {
    num: '03',
    title: 'Perform',
    sub: 'Walk into your interview ready',
    desc: 'Practice full AI mock interviews that mirror how McKinsey, BCG, and Bain actually run cases. Get consistent feedback. Track your progress. Land the offer.',
  },
];

export default function HomePage() {
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => {
    fadeRefs.current[i] = el;
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 bg-accent-light text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
          AI-Powered Case Interview Prep
        </div>

        <h1 className="font-display text-5xl md:text-7xl leading-[1.06] tracking-tight text-gray-900 max-w-4xl mx-auto mb-6">
          The <em className="text-accent not-italic">smarter</em> way to ace your consulting interview
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Getting good at cases requires honest feedback and structured practice — two things that are hard to find. CaseWithAI combines AI mock interviews, targeted drills, and courses built around how top firms actually assess candidates.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Link
            href="/assessment"
            className="flex items-center gap-2 text-base font-semibold text-white bg-gray-900 px-7 py-3.5 rounded-lg hover:bg-gray-700 transition-all hover:-translate-y-0.5"
          >
            Try a Free Case <ArrowRight size={16} />
          </Link>
          <Link
            href="#process"
            className="text-base font-medium text-gray-700 px-7 py-3.5 rounded-lg border border-gray-200 hover:border-gray-400 transition-all hover:-translate-y-0.5"
          >
            See how it works
          </Link>
        </div>
        <p className="text-xs text-gray-400">No credit card required · Instant AI feedback</p>

        {/* Mock UI */}
        <div className="mt-16 w-full max-w-3xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl shadow-gray-100">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 font-mono">casewithai.com — Live Mock Interview</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-6">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">McKinsey Style · Profitability</div>
              <p className="text-sm font-semibold text-gray-900 leading-snug mb-4">
                Your client is a global retailer. Revenue has declined 15% YoY. How would you approach this?
              </p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex gap-2"><span className="font-semibold text-gray-700 w-10">AI</span><span>Let's begin. Please clarify your structure before diving in.</span></div>
                <div className="flex gap-2"><span className="font-semibold text-gray-700 w-10">You</span><span>I'd look at revenue and cost drivers separately, starting with revenue...</span></div>
                <div className="flex gap-2"><span className="font-semibold text-gray-700 w-10">AI</span><span>Good structure. Can you be more specific on the revenue breakdown?</span></div>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Instant AI Feedback</div>
              <div className="space-y-3">
                {[
                  { label: 'Structure', score: 82 },
                  { label: 'Analysis', score: 75 },
                  { label: 'Communication', score: 90 },
                  { label: 'Math', score: 68 },
                ].map(({ label, score }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">{label}</span>
                      <span className="text-xs font-bold text-accent">{score}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Strong opening structure. Consider quantifying your hypotheses earlier to signal analytical depth.
              </p>
            </div>
          </div>
        </div>

        {/* Firm logos */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-40">
          {FIRMS.slice(0, 7).map(f => (
            <span key={f} className="text-xs font-bold tracking-widest uppercase text-gray-700">{f}</span>
          ))}
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────────── */}
      <div className="border-y border-gray-200 py-3 overflow-hidden bg-white">
        <div className="ticker-track">
          {[...FIRMS, ...FIRMS].map((f, i) => (
            <span key={i} className="text-xs font-bold tracking-widest uppercase text-gray-400 flex-shrink-0">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section
        id="process"
        ref={(el) => addRef(el, 0)}
        className="fade-up bg-gray-900 text-white py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">The Process</div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-2">From uncertain to offer-ready</h2>
          <p className="text-gray-400 mb-12 text-lg">Three stages. One clear path.</p>

          <div className="grid md:grid-cols-3 gap-px bg-gray-800 rounded-2xl overflow-hidden">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-gray-900 p-8">
                <div className="font-display text-5xl text-gray-800 italic mb-5">{step.num}</div>
                <div className="text-white font-semibold mb-1">{step.title} — {step.sub}</div>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-6 py-3 rounded-lg transition-colors"
            >
              Start your free assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOOLKIT ───────────────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 1)}
        className="fade-up py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">The Toolkit</div>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-12">Everything you need to prepare</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Cases — featured */}
            <div className="border-2 border-accent rounded-2xl p-8 bg-gradient-to-br from-accent-light to-white">
              <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-2xl mb-6">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Case Simulations</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Practice full cases with an AI interviewer that matches the style of your target firm — interviewer-led, interviewee-led, or progressive coaching mode.
              </p>
              <ul className="space-y-2 mb-6">
                {['McKinsey interviewer-led format', 'BCG & Bain interviewee-led format', 'Progressive coaching for beginners', 'Full case library: every industry & type', 'Instant AI feedback after every answer'].map(f => (
                  <li key={f} className="text-sm text-gray-600 flex gap-2">
                    <ArrowRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/cases" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
                Explore Cases <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {/* Drills */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Targeted Drills</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Sharpen specific skills with focused exercises. Mental math, chart interpretation, framework building — each drill targets one dimension.
                </p>
                <Link href="/drill" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
                  View Drills <ArrowRight size={14} />
                </Link>
              </div>

              {/* Course */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl mb-4">📚</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Structured Courses</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Learn the fundamentals with guided lessons. Go from zero to interview-ready with a clear curriculum built by ex-McKinsey consultants.
                </p>
                <Link href="/course" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
                  Browse Courses <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 2)}
        className="fade-up bg-stone-50 py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Real Outcomes</div>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-12">Candidates who prepared here landed there</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <blockquote className="font-display text-xl text-gray-900 leading-snug mb-4 italic">
                  {t.quote}
                </blockquote>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{t.body}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}{t.school && ` · ${t.school}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ───────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 3)}
        className="fade-up py-24 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Pricing</div>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">Simple pricing, no surprises</h2>
          <p className="text-gray-500 mb-10">Plans for every stage of your prep. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="text-left bg-white border border-gray-200 rounded-2xl p-6 w-full sm:w-64">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Flex</div>
              <div className="font-display text-4xl text-gray-900 mb-1">$1</div>
              <div className="text-xs text-gray-400 mb-4">per credit</div>
              <ul className="space-y-1.5 mb-5">
                {['Case = 4 credits', 'Drill = 0.5 credits', 'Credits never expire'].map(f => (
                  <li key={f} className="text-xs text-gray-600 flex gap-1.5"><CheckCircle size={12} className="text-green-500 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Link href="/pricing" className="block text-center text-sm font-semibold text-gray-700 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Buy Credits
              </Link>
            </div>

            <div className="text-left bg-gray-900 border-2 border-gray-900 rounded-2xl p-6 w-full sm:w-64 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Unlimited</div>
              <div className="font-display text-4xl text-white mb-1">$50</div>
              <div className="text-xs text-gray-400 mb-4">per month</div>
              <ul className="space-y-1.5 mb-5">
                {['Unlimited cases & drills', 'All 14 course modules', '7-day money back'].map(f => (
                  <li key={f} className="text-xs text-gray-300 flex gap-1.5"><CheckCircle size={12} className="text-blue-400 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Link href="/pricing" className="block text-center text-sm font-semibold text-gray-900 bg-white py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-1 mt-8 text-sm font-semibold text-accent hover:gap-2 transition-all">
            See full pricing <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-center py-28 px-4">
        <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Ready to land your offer?</h2>
        <p className="text-gray-400 mb-10 text-lg">Join thousands of candidates who prepared smarter.</p>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 bg-white px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Start Free Assessment <ArrowRight size={16} />
        </Link>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 border-t border-gray-800 px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-white">Case<span className="text-blue-400">WithAI</span></div>
          <div className="flex flex-wrap gap-5">
            {['Privacy Policy', 'LinkedIn', 'Instagram', 'TikTok', 'contact@casewithai.com'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-xs text-gray-600">© 2026 CaseWithAI</div>
        </div>
      </footer>
    </div>
  );
}
