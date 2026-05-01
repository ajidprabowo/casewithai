import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export function getGeminiModel() {
  const modelName = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
  return genAI.getGenerativeModel({ model: modelName });
}

export async function generateText(prompt: string): Promise<string> {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateChatReply(
  history: { role: 'user' | 'model'; parts: [{ text: string }] }[],
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const model = getGeminiModel();

  const chat = model.startChat({
    history,
    systemInstruction: systemPrompt,
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}

export async function scoreInterview(
  transcript: string,
  caseTitle: string,
  caseType: string
): Promise<string> {
  const model = getGeminiModel();

  const prompt = `You are an expert consulting interview coach from McKinsey. 
Analyze this case interview transcript and provide a detailed score in valid JSON format.

Case: "${caseTitle}" (${caseType})

Transcript:
${transcript}

Return ONLY valid JSON with this exact structure:
{
  "structure": { "name": "Structure", "score": <0-100>, "feedback": "<specific feedback>" },
  "analysis": { "name": "Analysis", "score": <0-100>, "feedback": "<specific feedback>" },
  "communication": { "name": "Communication", "score": <0-100>, "feedback": "<specific feedback>" },
  "math": { "name": "Math & Quantitative", "score": <0-100>, "feedback": "<specific feedback>" },
  "overall": <0-100>,
  "summary": "<2-3 sentence overall summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<area 1>", "<area 2>", "<area 3>"]
}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
