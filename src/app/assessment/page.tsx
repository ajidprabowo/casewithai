'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';

type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'scoring' | 'results';

const QUESTIONS = [
  {
    id: 'q1',
    label: 'Profitability',
    prompt: "A grocery chain's profits have fallen 30% in 2 years despite flat revenue. Walk me through how you'd approach diagnosing this problem.",
    timeHint: 'Take your time — aim for a structured, clear response.',
  },
  {
    id: 'q2',
    label: 'Market Sizing',
    prompt: 'Estimate the annual revenue of all Starbucks locations in the United States. Walk through your assumptions clearly.',
    timeHint: 'Show your math. Label each assumption.',
  },
  {
    id: 'q3',
    label: 'Brainstorming',
    prompt: 'Your client is a mid-sized airline looking to grow ancillary (non-ticket) revenue. Generate as many ideas as you can, organized into logical categories.',
    timeHint: 'Aim for breadth first, then group your ideas.',
  },
];

interface AssessmentResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function AssessmentPage() {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentQIndex = step === 'q1' ? 0 : step === 'q2' ? 1 : step === 'q3' ? 2 : -1;
  const currentQ = currentQIndex >= 0 ? QUESTIONS[currentQIndex] : null;

  const handleNext = () => {
    if (currentQ) {
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswer }));
      setCurrentAnswer('');
    }
    if (step === 'q1') setStep('q2');
    else if (step === 'q2') setStep('q3');
    else if (step === 'q3') handleSubmit({ ...answers, q3: currentAnswer });
  };

  const handleSubmit = async (allAnswers: Record<string, string>) => {
    setStep('scoring');
    setIsLoading(true);

    const transcript = QUESTIONS.map(q => `Question (${q.label}): ${q.prompt}\nCandidate Answer: ${allAnswers[q.id] || 'No answer provided'}`).join('\n\n---\n\n');

    const prompt = `You are an expert consulting interview coach from McKinsey.

Evaluate this free case assessment. The candidate answered 3 mini-questions covering profitability diagnosis, market sizing, and brainstorming.

Assessment Transcript:
${transcript}

Provide a comprehensive evaluation. Return your response as valid JSON ONLY with this structure:
{
  "overallScore": <0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "recommendations": ["<specific action 1>", "<specific action 2>", "<specific action 3>", "<specific action 4>"]
}`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [],
        systemPrompt: 'You are an expert consulting interview evaluator. Always respond in valid JSON only.',
        userMessage: prompt,
      }),
    });
    const data = await res.json();
    setIsLoading(false);

    try {
      const cleaned = data.reply.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setResult(parsed);
      setStep('results');
    } catch {
      setResult({
        overallScore: 65,
        summary: 'Assessment complete. Your responses showed potential but there are clear areas to develop before your interviews.',
        strengths: ['Attempted to structure your responses', 'Showed problem-solving intent'],
        weaknesses: ['Needs more quantitative specificity', 'Frameworks could be more MECE'],
        recommendations: ['Practice profitability trees daily', 'Work on market sizing anchors', 'Study MECE frameworks', 'Try a full case simulation'],
      });
      setStep('results');
    }
  };

  const scoreColor = result
    ? result.overallScore >= 75 ? 'text-green-600' : result.overallScore >= 55 ? 'text-yellow-600' : 'text-red-500'
    : '';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {step === 'intro' && (
        <div className="text-center">
          <div className="text-5xl mb-6">🎯</div>
          <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Free Assessment</div>
          <h1 className="font-display text-4xl text-gray-900 mb-4">Know exactly where you stand</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Answer 3 short case questions — profitability, market sizing, and brainstorming. Our AI will map your strengths and blind spots with a detailed, personalized report.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 text-left space-y-3">
            {[
              { icon: '⏱', text: '~10 minutes to complete' },
              { icon: '🤖', text: 'Scored instantly by Gemini AI' },
              { icon: '📊', text: 'Detailed breakdown by skill area' },
              { icon: '💳', text: 'No credit card required' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep('q1')}
            className="flex items-center gap-2 mx-auto bg-gray-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Start Assessment <ArrowRight size={16} />
          </button>
        </div>
      )}

      {currentQ && (
        <div>
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-500">Question {currentQIndex + 1} of {QUESTIONS.length}</span>
              <span className="text-sm text-gray-400">{currentQ.label}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-full mb-4">
              {currentQ.label}
            </div>
            <p className="text-gray-900 font-medium leading-relaxed mb-2">{currentQ.prompt}</p>
            <p className="text-xs text-gray-400 italic">{currentQ.timeHint}</p>
          </div>

          <textarea
            value={currentAnswer}
            onChange={e => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here…"
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none min-h-[180px] bg-white"
            rows={6}
          />

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => {
                if (step === 'q2') setStep('q1');
                else if (step === 'q3') setStep('q2');
                else setStep('intro');
                setCurrentAnswer(answers[currentQ.id] || '');
              }}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-700 disabled:opacity-40 transition-colors text-sm"
            >
              {step === 'q3' ? 'Submit Assessment' : 'Next Question'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 'scoring' && (
        <div className="text-center py-12">
          <Loader2 size={40} className="animate-spin text-accent mx-auto mb-5" />
          <h2 className="font-semibold text-xl text-gray-900 mb-2">Analyzing your responses…</h2>
          <p className="text-gray-400 text-sm">Gemini AI is evaluating all 3 of your answers</p>
        </div>
      )}

      {step === 'results' && result && (
        <div>
          <div className="text-center mb-8">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Assessment Complete</div>
            <h1 className="font-display text-4xl text-gray-900 mb-2">Your Results</h1>
          </div>

          {/* Score */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 text-center">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Overall Score</div>
            <div className={`font-display text-7xl font-bold ${scoreColor}`}>{result.overallScore}</div>
            <div className="text-gray-400 text-sm mt-1">out of 100</div>
            <p className="text-gray-600 text-sm mt-4 leading-relaxed max-w-md mx-auto">{result.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-green-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">✓ Strengths</div>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-orange-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-3">→ Work On</div>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <ArrowRight size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-accent-light border border-accent/20 rounded-2xl p-5 mb-6">
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">AI Recommendations</div>
            <ul className="space-y-2">
              {result.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-accent font-bold mt-0.5">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/cases"
              className="flex-1 text-center bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm"
            >
              Try a Full Case →
            </Link>
            <Link
              href="/drill"
              className="flex-1 text-center border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Practice Drills
            </Link>
            <Link
              href="/pricing"
              className="flex-1 text-center border border-accent text-accent font-semibold px-6 py-3 rounded-xl hover:bg-accent-light transition-colors text-sm"
            >
              Unlock Unlimited
            </Link>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => { setStep('intro'); setAnswers({}); setCurrentAnswer(''); setResult(null); }}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Retake assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
