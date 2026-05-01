import { NextRequest, NextResponse } from 'next/server';
import { scoreInterview } from '@/lib/gemini';
import { SessionScore } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { transcript, caseTitle, caseType } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: 'transcript is required' }, { status: 400 });
    }

    const raw = await scoreInterview(transcript, caseTitle || 'Unknown Case', caseType || 'General');

    // Strip markdown code fences if present
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const score: SessionScore = JSON.parse(cleaned);

    return NextResponse.json({ score });
  } catch (err) {
    console.error('[/api/assessment]', err);
    return NextResponse.json(
      { error: 'Failed to score interview. Please try again.' },
      { status: 500 }
    );
  }
}
