import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log('id:', id)
  const market = await prisma.market.findUnique({
    where: { id: Number(id) },
  })

  if (!market) notFound()

  // AI 소개글 불러오기
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/markets/${id}/description?name=${encodeURIComponent(market.name)}`,
    { cache: 'force-cache' }
  )
  const { description } = await res.json()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* 시장명 */}
      <h1 className="text-4xl font-bold">{market.name}</h1>
      <p className="text-gray-500 mt-2">{market.address}</p>

      {/* AI 소개글 */}
      <p className="mt-6 text-gray-700 leading-relaxed">{description}</p>

      {/* 정보 */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div>유형: {market.type}</div>
        <div>개설주기: {market.openCycle}</div>
        <div>점포수: {market.storeCount}개</div>
        <div>개설년도: {market.establishedYear}</div>
        <div>주차: {market.hasParking ? '가능' : '불가'}</div>
        <div>화장실: {market.hasToilet ? '있음' : '없음'}</div>
      </div>

      {/* 지도 버튼 */}
      <div className="flex gap-4 mt-8">
        <a
          href={`https://map.kakao.com/?q=${market.name}`}
          target="_blank"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold"
        >
          카카오맵
        </a>

        <a
          href={`https://map.naver.com/search/${market.name}`}
          target="_blank"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
        >
          네이버지도
        </a>
      </div>
    </main>
  )
}
