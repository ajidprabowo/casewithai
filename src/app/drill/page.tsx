'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, ChevronRight, RefreshCw, Send, Loader2 } from 'lucide-react';
import { DRILL_QUESTIONS, DRILL_CATEGORIES, getDrillsByCategory } from '@/data/drills';
import { DrillQuestion } from '@/types';
import { formatDuration, cn } from '@/lib/utils';
import MarkdownRenderer from '@/components/MarkdownRenderer';

type DrillStatus = 'selecting' | 'active' | 'answered';

const CATEGORY_ICONS: Record<string, string> = {
  'Mental Math': '🔢',
  'Chart Interpretation': '📊',
  'Framework Building': '🏗️',
  'Market Sizing': '🌍',
  'Brainstorming': '💡',
};

export default function DrillPage() {
  const [category, setCategory] = useState('All');
  const [currentDrill, setCurrentDrill] = useState<DrillQuestion | null>(null);
  const [status, setStatus] = useState<DrillStatus>('selecting');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const drills = getDrillsByCategory(category);

  const startDrill = (drill: DrillQuestion) => {
    setCurrentDrill(drill);
    setStatus('active');
    setAnswer('');
    setFeedback('');
    setTimeLeft(drill.timeLimit);
    setTimeTaken(0);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
      setTimeTaken(prev => prev + 1);
    }, 1000);
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !currentDrill || isLoading) return;
    clearInterval(timerRef.current!);
    setStatus('answered');
    setIsLoading(true);

    const prompt = `You are an expert consulting interview coach.

A candidate was given this drill (${currentDrill.category} · ${currentDrill.difficulty}):
"${currentDrill.question}"

Their answer:
"${answer}"

Time taken: ${formatDuration(timeTaken)} (limit: ${formatDuration(currentDrill.timeLimit)})

Please provide:
1. A score out of 100
2. What they did well
3. What they missed or could improve
4. The ideal answer or approach

Be specific, direct, and constructive. Format your response clearly.`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [],
        systemPrompt: 'You are an expert consulting interview coach providing drill feedback.',
        userMessage: prompt,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    setFeedback(data.reply || 'Error generating feedback.');
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current!);
  }, []);

  const timeColor = timeLeft < 20 ? 'text-red-500' : timeLeft < 45 ? 'text-yellow-600' : 'text-gray-700';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Targeted Practice</div>
        <h1 className="font-display text-4xl text-gray-900 mb-2">Drills</h1>
        <p className="text-gray-500">Sharpen specific skills with focused exercises. Each drill targets one dimension.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: drill picker */}
        <div>
          {/* Category filter */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</div>
            <div className="flex flex-col gap-1">
              {DRILL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors',
                    category === cat
                      ? 'bg-accent-light text-accent'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <span>{cat !== 'All' ? CATEGORY_ICONS[cat] : '🎯'}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drill list */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {drills.length} drill{drills.length !== 1 ? 's' : ''}
            </div>
            {drills.map(drill => (
              <button
                key={drill.id}
                onClick={() => startDrill(drill)}
                className={cn(
                  'w-full text-left border rounded-xl p-3.5 transition-all hover:shadow-sm',
                  currentDrill?.id === drill.id
                    ? 'border-accent bg-accent-light'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-500">{drill.category}</span>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border',
                    drill.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                    drill.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  )}>
                    {drill.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{drill.question}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Timer size={11} /> {formatDuration(drill.timeLimit)} limit
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: active drill */}
        <div className="lg:col-span-2">
          {!currentDrill ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="font-semibold text-gray-700 mb-2">Select a drill to begin</h2>
              <p className="text-sm text-gray-400">Choose any drill from the left to start practicing</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Question card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs bg-accent-light text-accent font-semibold px-2.5 py-1 rounded-full">
                      {CATEGORY_ICONS[currentDrill.category]} {currentDrill.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {currentDrill.difficulty}
                    </span>
                  </div>
                  {status === 'active' && (
                    <div className={`font-mono text-lg font-bold ${timeColor}`}>
                      {formatDuration(timeLeft)}
                    </div>
                  )}
                  {status !== 'active' && (
                    <span className="text-xs text-gray-400">Time: {formatDuration(timeTaken)}</span>
                  )}
                </div>

                <p className="text-gray-900 font-medium leading-relaxed mb-4 whitespace-pre-wrap">
                  {currentDrill.question}
                </p>

                {currentDrill.hint && (
                  <details className="text-xs text-gray-500">
                    <summary className="cursor-pointer text-accent font-medium hover:underline">Show hint</summary>
                    <p className="mt-2 text-gray-500 bg-gray-50 rounded-lg px-3 py-2">{currentDrill.hint}</p>
                  </details>
                )}
              </div>

              {/* Answer input */}
              {status === 'active' && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Type your answer here… Structure it clearly."
                    className="w-full resize-none text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 min-h-[140px]"
                    rows={5}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => startDrill(currentDrill)}
                      className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw size={12} /> Reset
                    </button>
                    <button
                      onClick={submitAnswer}
                      disabled={!answer.trim() || isLoading}
                      className="flex items-center gap-2 text-sm font-semibold text-white bg-accent px-5 py-2.5 rounded-xl hover:bg-accent-dark disabled:opacity-40 transition-colors"
                    >
                      {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      {isLoading ? 'Evaluating...' : 'Submit Answer'}
                    </button>
                  </div>
                </div>
              )}

              {/* Answer display */}
              {status === 'answered' && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Answer</div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{answer}</p>
                </div>
              )}

              {/* Feedback */}
              {status === 'answered' && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">AI Feedback</div>
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Analyzing your answer…</span>
                    </div>
                  ) : (
                    <>
                      <MarkdownRenderer content={feedback} />
                      <div className="mt-5 flex gap-2">
                        <button
                          onClick={() => startDrill(currentDrill)}
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <RefreshCw size={13} /> Try again
                        </button>
                        <button
                          onClick={() => {
                            const next = drills.find(d => d.id !== currentDrill.id);
                            if (next) startDrill(next);
                          }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Next drill <ChevronRight size={13} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
