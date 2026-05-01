'use client';

import { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Send, RotateCcw, CheckSquare, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCaseById } from '@/data/cases';
import { ChatMessage } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ScoreCard from '@/components/ScoreCard';
import { generateSessionId } from '@/lib/utils';

type SessionStatus = 'idle' | 'active' | 'scoring' | 'scored';

export default function CaseSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: caseId } = use(params);
  const scenario = getCaseById(caseId);

  const [status, setStatus] = useState<SessionStatus>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<any>(null);
  const sessionId = useRef(generateSessionId());
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!scenario) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Case not found.</p>
        <Link href="/cases" className="text-accent hover:underline">← Back to Cases</Link>
      </div>
    );
  }

  const startSession = async () => {
    setStatus('active');
    setIsLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [],
        systemPrompt: scenario.prompt,
        userMessage: 'Please introduce the case and ask me to begin.',
      }),
    });
    const data = await res.json();
    setIsLoading(false);

    if (data.reply) {
      setMessages([{ role: 'assistant', content: data.reply, timestamp: new Date() }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const history = newMessages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: m.content }],
    }));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history,
        systemPrompt: scenario.prompt,
        userMessage: input.trim(),
      }),
    });
    const data = await res.json();
    setIsLoading(false);

    if (data.reply) {
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: new Date() }]);
    }
  };

  const endAndScore = async () => {
    setStatus('scoring');
    const transcript = messages.map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`).join('\n\n');

    const res = await fetch('/api/assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transcript,
        caseTitle: scenario.title,
        caseType: scenario.type,
      }),
    });
    const data = await res.json();

    if (data.score) {
      setScore(data.score);
      setStatus('scored');
    } else {
      setStatus('active');
      alert('Scoring failed. Please try again.');
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link href="/cases" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-3 transition-colors">
            <ArrowLeft size={14} /> Back to Cases
          </Link>
          <h1 className="font-bold text-xl text-gray-900">{scenario.title}</h1>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-accent-light text-accent font-semibold px-2.5 py-1 rounded-full">{scenario.firm}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{scenario.type}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{scenario.difficulty}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">~{scenario.estimatedMinutes} min</span>
          </div>
        </div>
        {status === 'active' && messages.length > 3 && (
          <button
            onClick={endAndScore}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <CheckSquare size={15} /> End & Score
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Panel */}
        <div className="lg:col-span-2 flex flex-col">
          {status === 'idle' ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="font-bold text-xl text-gray-900 mb-2">Ready to begin?</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">{scenario.description}</p>
              <button
                onClick={startSession}
                className="bg-accent text-white font-semibold px-8 py-3 rounded-xl hover:bg-accent-dark transition-colors"
              >
                Start Interview
              </button>
            </div>
          ) : status === 'scoring' ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <Loader2 size={32} className="animate-spin text-accent mx-auto mb-4" />
              <p className="font-semibold text-gray-700">Scoring your performance...</p>
              <p className="text-sm text-gray-400 mt-1">Gemini AI is analyzing your transcript</p>
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col" style={{ height: '520px' }}>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 message-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold
                        ${m.role === 'assistant' ? 'bg-gray-900 text-white' : 'bg-accent text-white'}`}>
                        {m.role === 'assistant' ? 'AI' : 'You'}
                      </div>
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm
                        ${m.role === 'assistant' ? 'bg-gray-50 border border-gray-100' : 'bg-accent text-white'}`}>
                        {m.role === 'assistant'
                          ? <MarkdownRenderer content={m.content} />
                          : <p>{m.content}</p>
                        }
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white">AI</div>
                      <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {status === 'active' && (
                  <div className="border-t border-gray-100 p-4 flex gap-3">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Type your response… (Enter to send, Shift+Enter for new line)"
                      className="flex-1 resize-none text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/30 min-h-[44px] max-h-32"
                      rows={1}
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-dark disabled:opacity-40 transition-colors"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                )}
              </div>

              {status === 'active' && messages.length >= 2 && (
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-400">{messages.length} messages · Press "End & Score" when finished</p>
                  <button
                    onClick={endAndScore}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                  >
                    <CheckSquare size={13} /> End & get score
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {status === 'scored' && score ? (
            <ScoreCard score={score} />
          ) : (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Case Details</div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Industry</span><span className="font-medium">{scenario.industry}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Duration</span><span className="font-medium">~{scenario.estimatedMinutes} min</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Format</span><span className="font-medium">Interviewer-led</span></div>
                </div>
              </div>
              <div className="bg-accent-light border border-accent/20 rounded-2xl p-5">
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">💡 Tips</div>
                <ul className="space-y-1.5">
                  {[
                    'State your structure before diving in',
                    'Quantify your hypotheses',
                    'Summarize key insights proactively',
                    "It's OK to take 30 seconds to think",
                  ].map(t => (
                    <li key={t} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-accent">→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {status === 'scored' && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setStatus('idle'); setMessages([]); setScore(null); }}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={14} /> Retry this case
              </button>
              <Link
                href="/cases"
                className="text-center text-sm font-semibold text-white bg-gray-900 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
              >
                Try another case →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
