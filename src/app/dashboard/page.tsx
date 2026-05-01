'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart2, Target, BookOpen, TrendingUp, ArrowRight, Clock, Star } from 'lucide-react';
import { CASE_SCENARIOS } from '@/data/cases';
import { cn } from '@/lib/utils';

// Mock session history for demo
const MOCK_SESSIONS = [
  {
    id: 's1',
    caseTitle: 'RetailCo Revenue Decline',
    firm: 'McKinsey',
    date: '2 days ago',
    scores: { structure: 82, analysis: 75, communication: 90, math: 68, overall: 79 },
  },
  {
    id: 's2',
    caseTitle: 'Coffee Shops in NYC',
    firm: 'General',
    date: '4 days ago',
    scores: { structure: 70, analysis: 65, communication: 78, math: 85, overall: 75 },
  },
  {
    id: 's3',
    caseTitle: 'Hospital Operational Efficiency',
    firm: 'Oliver Wyman',
    date: '1 week ago',
    scores: { structure: 60, analysis: 55, communication: 72, math: 58, overall: 61 },
  },
];

const SCORE_DIMS = ['structure', 'analysis', 'communication', 'math'] as const;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  const avgOverall = Math.round(MOCK_SESSIONS.reduce((sum, s) => sum + s.scores.overall, 0) / MOCK_SESSIONS.length);
  const avgByDim = SCORE_DIMS.map(dim => ({
    dim,
    avg: Math.round(MOCK_SESSIONS.reduce((sum, s) => sum + s.scores[dim], 0) / MOCK_SESSIONS.length),
  }));
  const weakest = [...avgByDim].sort((a, b) => a.avg - b.avg)[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Your Progress</div>
          <h1 className="font-display text-3xl text-gray-900">Dashboard</h1>
        </div>
        <Link
          href="/cases"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
        >
          New Practice <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Avg Score', value: `${avgOverall}`, icon: <Star size={16} />, color: 'text-accent' },
          { label: 'Cases Done', value: `${MOCK_SESSIONS.length}`, icon: <Target size={16} />, color: 'text-gray-700' },
          { label: 'Drills', value: '8', icon: <BarChart2 size={16} />, color: 'text-gray-700' },
          { label: 'Hours Prepped', value: '3.2', icon: <Clock size={16} />, color: 'text-gray-700' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className={cn('mb-2', stat.color)}>{stat.icon}</div>
            <div className={cn('font-display text-3xl font-bold', stat.color)}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
        {(['overview', 'history'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize',
              activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-5">
          {/* Score breakdown */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} className="text-accent" />
              <span className="font-semibold text-gray-900">Average Scores</span>
            </div>
            <div className="space-y-4">
              {avgByDim.map(({ dim, avg }) => (
                <div key={dim}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 capitalize">{dim}</span>
                    <span className={cn(
                      'text-sm font-bold',
                      avg >= 80 ? 'text-green-600' : avg >= 65 ? 'text-yellow-600' : 'text-red-500'
                    )}>
                      {avg}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        avg >= 80 ? 'bg-green-500' : avg >= 65 ? 'bg-yellow-400' : 'bg-red-400'
                      )}
                      style={{ width: `${avg}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Focus Area</div>
              <p className="text-sm text-gray-700 font-medium mb-1 capitalize">
                Your weakest dimension: <span className="text-orange-600">{weakest.dim}</span> ({weakest.avg}/100)
              </p>
              <p className="text-xs text-gray-500 mb-3">Targeted drills in this area will give you the fastest improvement.</p>
              <Link href="/drill" className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:gap-2 transition-all">
                Practice {weakest.dim} drills <ArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-accent" />
                <span className="font-semibold text-sm text-gray-900">Suggested Next Steps</span>
              </div>
              <ul className="space-y-2">
                {[
                  { text: 'Try an Advanced BCG case', href: '/cases', label: 'Case' },
                  { text: 'Do 3 mental math drills', href: '/drill', label: 'Drill' },
                  { text: 'Complete Module 4: Market Entry', href: '/course', label: 'Course' },
                ].map(item => (
                  <li key={item.text}>
                    <Link href={item.href} className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-xs bg-accent-light text-accent font-semibold px-2 py-0.5 rounded-md">{item.label}</span>
                        {item.text}
                      </div>
                      <ArrowRight size={13} className="text-gray-300 group-hover:text-accent transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next recommended case */}
            <div className="bg-accent-light border border-accent/20 rounded-2xl p-5">
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Recommended Next Case</div>
              <p className="font-semibold text-sm text-gray-900 mb-1">{CASE_SCENARIOS[1].title}</p>
              <p className="text-xs text-gray-500 mb-3">{CASE_SCENARIOS[1].firm} · {CASE_SCENARIOS[1].difficulty} · ~{CASE_SCENARIOS[1].estimatedMinutes} min</p>
              <Link
                href={`/cases/${CASE_SCENARIOS[1].id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all"
              >
                Start case <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {MOCK_SESSIONS.map(session => (
            <div key={session.id} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{session.caseTitle}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-accent-light text-accent font-semibold px-2.5 py-0.5 rounded-full">{session.firm}</span>
                    <span className="text-xs text-gray-400">{session.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    'font-bold text-2xl',
                    session.scores.overall >= 75 ? 'text-green-600' : session.scores.overall >= 60 ? 'text-yellow-600' : 'text-red-500'
                  )}>
                    {session.scores.overall}
                  </div>
                  <div className="text-xs text-gray-400">overall</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {SCORE_DIMS.map(dim => (
                  <div key={dim} className="text-center">
                    <div className={cn(
                      'font-semibold text-sm',
                      session.scores[dim] >= 80 ? 'text-green-600' : session.scores[dim] >= 65 ? 'text-yellow-600' : 'text-red-500'
                    )}>
                      {session.scores[dim]}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{dim}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center py-6">
            <Link href="/cases" className="text-sm font-semibold text-accent hover:underline">
              + Start a new case session
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
