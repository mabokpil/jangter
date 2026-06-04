import prisma from '@/lib/prisma'
import Image from 'next/image'
import MarketFilter from '@/components/markets/MarketFilter'
import MarketList from '@/components/markets/MarketList'

export default async function MarketsPage() {
  const Markets = await prisma.market.findMany()

  return (
    <main className="min-h-screen bg-[#FAFAF8] pt-16">
      {/* 히어로 */}
      <div className="relative h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/images/hero-01.jpg"
          alt="광장시장 먹거리 부감샷"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <h1 className="text-7xl font-bold text-white">JANGTER</h1>
          <p className="text-white text-xl mt-4">로컬만 아는 그 시장</p>
          <p className="text-white/70 mt-2">전국 전통시장을 한눈에</p>
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-4 bg-white border-t">
        <div className="text-center py-6">
          <p className="text-3xl font-bold">{Markets.length}</p>
          <p className="text-sm text-gray-500 mt-1">전체 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-3xl font-bold">
            {Markets.filter(m => m.type === '상설').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">상설 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-3xl font-bold">
            {Markets.filter(m => m.type === '정기').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">정기 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-3xl font-bold">17</p>
          <p className="text-sm text-gray-500 mt-1">전국 광역시도</p>
        </div>
      </div>

      {/* 필터 */}
      <MarketFilter />

      {/* 목록 */}
      <MarketList markets={Markets} />
    </main>
  )
}
