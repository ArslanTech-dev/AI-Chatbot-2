import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Demo mode if no API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        role: 'assistant',
        content:
          "ARSLAN TECH'S AI is running in demo mode. Please add your OPENAI_API_KEY to enable real AI responses.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            "You are ARSLAN TECH'S AI assistant, knowledgeable about technology, programming, and ARSLAN TECH'S services.",
        },
        ...messages,
      ],
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't process that.";

    return NextResponse.json({ role: 'assistant', content: reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { role: 'assistant', content: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}