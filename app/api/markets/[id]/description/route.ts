import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name') || '전통시장'

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `한국 전통시장 "${name}"에 대해 소개해줘. 유명한 먹거리, 특색, 역사를 200자 내외로 간단하게 한국어로 설명해줘.`,
        },
      ],
      max_tokens: 512,
    })

    const text = completion.choices[0]?.message?.content || ''
    return NextResponse.json({ description: text })
  } catch (error) {
    console.error('Groq error:', error)
    return NextResponse.json(
      { description: '소개글을 불러올 수 없습니다.' },
      { status: 200 }
    )
  }
}
