'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONSULTING_COURSE } from '@/data/course';
import { ArrowLeft, PlayCircle, CheckCircle, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Hardcoded content for the free modules to make them feel complete and integrated.
const MODULE_CONTENT: Record<string, string> = {
  'mod-01': `
# What is a Case Interview?

A case interview is a unique interviewing format utilized primarily by management consulting firms (like McKinsey, BCG, and Bain) to assess a candidate's analytical skills, problem-solving ability, and communication style.

Instead of just asking about your past experiences ("Tell me about a time you led a team"), the interviewer presents you with a hypothetical or real-world business problem.

> **Example:** "Our client is a national grocery chain. Their profits have dropped 20% over the last two years while revenues remained flat. How would you help them diagnose the problem?"

---

### What Evaluators Actually Look For

Contrary to popular belief, the interviewer is **not** looking for the "correct" answer. In many real cases, the firm itself spent months trying to find the answer! They are looking for *how you think*.

Specifically, they evaluate you on four dimensions:

1. **Structuring & Logic (Frameworks)**
   Can you break a complex, ambiguous problem down into manageable, logical pieces? Do you use a Mutually Exclusive, Collectively Exhaustive (MECE) approach?
2. **Analytical & Quantitative Skills (Math)**
   Can you confidently perform mental math? Do you understand basic business formulas (Profit = Revenue - Cost)? Can you interpret charts and data?
3. **Business Acumen & Creativity**
   Do your ideas make real-world business sense? Can you brainstorm effectively when asked for creative solutions?
4. **Communication & Presence**
   Are you coachable? Do you think out loud? Do you structure your communication clearly (e.g., using the Pyramid Principle)?

---

### The Typical Flow of a Case

Most cases follow a predictable 20-30 minute structure:

1. **The Prompt (1-2 mins):** The interviewer reads the situation.
2. **Clarification (1-2 mins):** You ask 1-3 clarifying questions to ensure you understand the goal.
3. **Structuring (2-3 mins):** You ask for a moment, draw out a framework, and present it to the interviewer.
4. **Analysis & Deep Dive (10-15 mins):** You explore the branches of your framework, ask for data, perform math, and brainstorm.
5. **The Recommendation (1-2 mins):** You synthesize your findings and give a clear, confident, top-down recommendation.

---

### Common Myths Debunked

- **Myth:** You need an MBA or business background. 
  **Fact:** Top firms hire doctors, engineers, and humanities majors. You just need to learn the basic business concepts (like revenue and costs).
- **Myth:** You must memorize 50 different frameworks.
  **Fact:** Memorized frameworks often fail. You only need to master 3-4 core concepts (like Profitability and MECE) and learn to adapt them to any problem.

*In the next module, we will dive deep into the most important concept in all of case interviewing: The MECE Principle.*
`,
  'mod-02': `
# The MECE Principle

*Content for Module 2 will go here.*
`,
  'mod-03': `
# Profitability Frameworks

*Content for Module 3 will go here.*
`
};

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const moduleId = resolvedParams.id;
  
  const moduleIndex = CONSULTING_COURSE.modules.findIndex(m => m.id === moduleId);
  const courseModule = CONSULTING_COURSE.modules[moduleIndex];

  if (!courseModule) {
    notFound();
  }

  const prevModule = moduleIndex > 0 ? CONSULTING_COURSE.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < CONSULTING_COURSE.modules.length - 1 ? CONSULTING_COURSE.modules[moduleIndex + 1] : null;

  const content = MODULE_CONTENT[moduleId] || `
# ${courseModule.title}

*This is a premium module. Please upgrade your account to view the full content, videos, and exercises.*
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/course" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft size={16} /> Back to Course
          </Link>
          <div className="text-sm font-semibold text-gray-900 hidden sm:block">
            Module {courseModule.order}: {courseModule.title}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle size={14} /> Mark Complete
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Video Placeholder */}
        <div className="w-full bg-gray-900 rounded-2xl aspect-video flex flex-col items-center justify-center text-white mb-8 relative overflow-hidden shadow-lg">
          {courseModule.isPremium ? (
            <div className="text-center p-6">
              <Lock size={48} className="mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-bold mb-2">Premium Module</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">Upgrade to the Unlimited plan to unlock this video lesson and all premium content.</p>
              <Link href="/pricing" className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-accent-dark transition-colors inline-block text-sm">
                Unlock Access
              </Link>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              <PlayCircle size={64} className="text-accent hover:text-accent-light hover:scale-110 transition-all cursor-pointer relative z-10 drop-shadow-lg" />
              <div className="relative z-10 mt-4 text-sm font-medium text-gray-300">Play Video Lesson ({courseModule.duration})</div>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm mb-8">
          <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-a:text-accent hover:prose-a:text-accent-dark">
            <MarkdownRenderer content={content} />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-8 pb-12">
          {prevModule ? (
            <Link href={`/course/${prevModule.id}`} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-colors">
                <ChevronLeft size={16} />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-gray-400 font-medium">Previous</div>
                <div>{prevModule.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextModule ? (
            <Link href={`/course/${nextModule.id}`} className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-accent transition-colors group text-right">
              <div className="hidden sm:block">
                <div className="text-xs text-gray-400 font-medium">Next Module</div>
                <div>{nextModule.title}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center group-hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20">
                <ChevronRight size={16} />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
