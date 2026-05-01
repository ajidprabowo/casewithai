import { NextRequest, NextResponse } from 'next/server';
import { generateChatReply } from '@/lib/gemini';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'userMessage is required' }, { status: 400 });
    }

    const reply = await generateChatReply(
      messages || [],
      systemPrompt || 'You are a consulting interview coach.',
      userMessage
    );

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[/api/chat]', err);
    return NextResponse.json(
      { error: 'Failed to generate response. Check your GEMINI_API_KEY.' },
      { status: 500 }
    );
  }
}
