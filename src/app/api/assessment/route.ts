import { NextRequest, NextResponse } from 'next/server';
import { scoreInterview } from '@/lib/gemini';
import { SessionScore } from '@/types';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { transcript, caseTitle, caseType } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: 'transcript is required' }, { status: 400 });
    }

    const raw = await scoreInterview(transcript, caseTitle || 'Unknown Case', caseType || 'General');

    // Extract JSON block robustly in case AI adds conversational text
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error('Invalid AI Response:', raw);
      throw new Error('No JSON object found in AI response');
    }
    
    const score: SessionScore = JSON.parse(match[0]);

    return NextResponse.json({ score });
  } catch (err) {
    console.error('[/api/assessment]', err);
    return NextResponse.json(
      { error: 'Failed to score interview. Please try again.' },
      { status: 500 }
    );
  }
}
