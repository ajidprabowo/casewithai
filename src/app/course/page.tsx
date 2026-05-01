'use client';

import { useState } from 'react';
import { Clock, Lock, PlayCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CONSULTING_COURSE } from '@/data/course';
import { cn } from '@/lib/utils';

export default function CoursePage() {
  const [expandedModule, setExpandedModule] = useState<string | null>('mod-01');
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const toggleModule = (id: string) => {
    setExpandedModule(prev => (prev === id ? null : id));
  };

  const markComplete = (id: string) => {
    setCompletedModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const course = CONSULTING_COURSE;
  const freeModules = course.modules.filter(m => !m.isPremium);
  const premiumModules = course.modules.filter(m => m.isPremium);
  const progress = Math.round((completedModules.size / course.totalModules) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Structured Learning</div>
        <h1 className="font-display text-4xl text-gray-900 mb-3">{course.title}</h1>
        <p className="text-gray-500 mb-6 max-w-2xl">{course.description}</p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-accent" />
            <span>{course.totalDuration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PlayCircle size={16} className="text-accent" />
            <span>{course.totalModules} modules</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} className="text-green-500" />
            <span>{completedModules.size} completed</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Your Progress</span>
          <span className="text-sm font-bold text-accent">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {completedModules.size} of {course.totalModules} modules completed
        </p>
      </div>

      {/* Free modules */}
      <div className="mb-3">
        <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Free Modules ({freeModules.length})
        </div>
        <div className="space-y-2">
          {freeModules.map(mod => (
            <ModuleAccordion
              key={mod.id}
              mod={mod}
              isExpanded={expandedModule === mod.id}
              isCompleted={completedModules.has(mod.id)}
              onToggle={() => toggleModule(mod.id)}
              onMarkComplete={() => markComplete(mod.id)}
            />
          ))}
        </div>
      </div>

      {/* Premium modules */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-accent uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Premium Modules ({premiumModules.length})
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Unlimited plan required</span>
        </div>
        <div className="space-y-2">
          {premiumModules.map(mod => (
            <ModuleAccordion
              key={mod.id}
              mod={mod}
              isExpanded={expandedModule === mod.id}
              isCompleted={completedModules.has(mod.id)}
              onToggle={() => toggleModule(mod.id)}
              onMarkComplete={() => markComplete(mod.id)}
              locked
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 bg-gray-900 rounded-2xl p-8 text-center">
        <h3 className="font-display text-2xl text-white mb-2">Unlock all 14 modules</h3>
        <p className="text-gray-400 text-sm mb-5">Get unlimited access to every module, case, and drill for $50/month.</p>
        <a
          href="/pricing"
          className="inline-block bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm"
        >
          See Pricing →
        </a>
      </div>
    </div>
  );
}

function ModuleAccordion({
  mod,
  isExpanded,
  isCompleted,
  onToggle,
  onMarkComplete,
  locked = false,
}: {
  mod: typeof CONSULTING_COURSE.modules[0];
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onMarkComplete: () => void;
  locked?: boolean;
}) {
  return (
    <div className={cn(
      'border rounded-xl overflow-hidden transition-all',
      isExpanded ? 'border-accent/40 shadow-sm' : 'border-gray-200',
      locked ? 'opacity-70' : ''
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        {/* Module number */}
        <div className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
          isCompleted ? 'bg-green-100 text-green-700' : locked ? 'bg-gray-100 text-gray-400' : 'bg-accent-light text-accent'
        )}>
          {isCompleted ? <CheckCircle size={16} /> : locked ? <Lock size={14} /> : mod.order}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900">{mod.title}</div>
          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
            <Clock size={11} /> {mod.duration}
            {locked && <span className="text-accent font-semibold">· Premium</span>}
          </div>
        </div>

        {isExpanded ? (
          <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-500 leading-relaxed mt-3 mb-4">{mod.description}</p>

          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Topics covered</div>
            <ul className="space-y-1">
              {mod.topics.map(topic => (
                <li key={topic} className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {locked ? (
            <a
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors"
            >
              <Lock size={13} /> Unlock with Unlimited
            </a>
          ) : (
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors">
                <PlayCircle size={14} /> Start Module
              </button>
              <button
                onClick={onMarkComplete}
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border transition-colors',
                  isCompleted
                    ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                <CheckCircle size={14} />
                {isCompleted ? 'Completed ✓' : 'Mark complete'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
