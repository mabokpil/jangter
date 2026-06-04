import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Map from '@/components/markets/Map'

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const market = await prisma.market.findUnique({
    where: { id: Number(id) },
  })

  if (!market) notFound()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/markets/${id}/description?name=${encodeURIComponent(market.name)}`,
    { cache: 'no-store' }
  )
  const { description } = await res.json()

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* 헤더 — 노션 스타일 배경 */}
      <div className="relative h-[45vh] overflow-hidden">
        <Image
          src="/images/hero-01.jpg"
          alt={market.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />

        {/* 뒤로가기 */}
        <Link
          href="/markets"
          className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition"
        >
          ← 목록으로
        </Link>

        {/* 시장명 */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="flex gap-2 mb-3">
            <span className="bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full font-medium">
              {market.type}
            </span>
            {market.hasParking && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                🅿️ 주차 가능
              </span>
            )}
            {market.hasToilet && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                🚻 화장실
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {market.name}
          </h1>
          <p className="text-white/70 mt-2 text-sm">{market.address}</p>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* AI 소개글 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <p className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-3">
            AI 소개
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
        </div>

        {/* 정보 카드 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6B35]">
              {market.storeCount}
            </p>
            <p className="text-xs text-gray-500 mt-1">점포 수</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6B35]">
              {market.establishedYear || '-'}
            </p>
            <p className="text-xs text-gray-500 mt-1">개설년도</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6B35]">
              {market.openCycle}
            </p>
            <p className="text-xs text-gray-500 mt-1">개설주기</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6B35]">{market.type}</p>
            <p className="text-xs text-gray-500 mt-1">시장 유형</p>
          </div>
        </div>

        {/* 카카오맵 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            위치
          </p>
          <Map name={market.name} address={market.address} />
        </div>

        {/* 지도 버튼 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            지도로 보기
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://map.kakao.com/?q=${encodeURIComponent(market.name + ' ' + market.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FFD700] text-black px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition"
            >
              📍 카카오맵
            </a>

            <a
              href={`https://map.naver.com/search/${encodeURIComponent(market.name + ' ' + market.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#03C75A] text-white px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition"
            >
              🗺️ 네이버지도
            </a>

            <a
              href={`https://map.kakao.com/?q=${encodeURIComponent(market.address + ' 주차장')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition"
            >
              🅿️ 근처 주차장
            </a>

            <a
              href={`https://map.kakao.com/?q=${encodeURIComponent(market.address + ' 화장실')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition"
            >
              🚻 근처 화장실
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
