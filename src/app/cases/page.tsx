'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ChevronRight, Filter } from 'lucide-react';
import { CASE_SCENARIOS, FIRMS, CASE_TYPES, DIFFICULTIES } from '@/data/cases';
import { cn } from '@/lib/utils';

const FIRM_COLORS: Record<string, string> = {
  McKinsey: 'bg-blue-100 text-blue-700',
  BCG: 'bg-green-100 text-green-700',
  Bain: 'bg-red-100 text-red-700',
  Deloitte: 'bg-emerald-100 text-emerald-700',
  PwC: 'bg-orange-100 text-orange-700',
  LEK: 'bg-purple-100 text-purple-700',
  'Oliver Wyman': 'bg-teal-100 text-teal-700',
  General: 'bg-gray-100 text-gray-600',
};

const DIFF_COLORS: Record<string, string> = {
  Beginner: 'bg-green-50 text-green-700 border-green-200',
  Intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Advanced: 'bg-red-50 text-red-700 border-red-200',
};

export default function CasesPage() {
  const [firm, setFirm] = useState('All');
  const [type, setType] = useState('All');
  const [diff, setDiff] = useState('All');

  const filtered = CASE_SCENARIOS.filter(c => {
    if (firm !== 'All' && c.firm !== firm) return false;
    if (type !== 'All' && c.type !== type) return false;
    if (diff !== 'All' && c.difficulty !== diff) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Case Library</div>
        <h1 className="font-display text-4xl text-gray-900 mb-3">Practice Cases</h1>
        <p className="text-gray-500">Full-length AI mock interviews modeled on how top firms actually run cases.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter:</span>
        </div>
        <div>
          <span className="text-xs text-gray-400 mr-2">Firm</span>
          <select
            value={firm}
            onChange={e => setFirm(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {FIRMS.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <span className="text-xs text-gray-400 mr-2">Type</span>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {CASE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <span className="text-xs text-gray-400 mr-2">Difficulty</span>
          <select
            value={diff}
            onChange={e => setDiff(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} cases</span>
      </div>

      {/* Case Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-gray-400">
            No cases match your filters. Try adjusting them.
          </div>
        ) : filtered.map(c => (
          <Link
            key={c.id}
            href={`/cases/${c.id}`}
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-accent/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2 flex-wrap">
                <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', FIRM_COLORS[c.firm] || 'bg-gray-100 text-gray-600')}>
                  {c.firm}
                </span>
                <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border', DIFF_COLORS[c.difficulty])}>
                  {c.difficulty}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
            </div>

            <h2 className="font-semibold text-gray-900 mb-1.5 text-lg">{c.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{c.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{c.type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{c.industry}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>~{c.estimatedMinutes} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
