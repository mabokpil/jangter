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
          content: `한국 전통시장 "${name}"을 성수동 핫플 소개하듯이 MZ 감성으로 소개해줘.

조건:
- 이모지 1~2개 포함
- 첫 줄은 강렬한 훅 문장
- 두 번째 줄은 대표 먹거리나 특색 콕 집어서
- 전체 100자 내외
- 한국어만, 친구한테 카톡 보내는 느낌으로`,
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
