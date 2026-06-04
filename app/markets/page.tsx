import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function MarketsPage() {
  const Markets = await prisma.market.findMany()

  return (
    <main className="h-screen flex flex-col">
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
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

      <div className="grid grid-cols-4 bg-white border-t">
        <div className="text-center py-6">
          <p className="text-3xl font-bold">{Markets.length}</p>
          <p className="text-sm text-gray-500 mt-1">전체 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-4xl font-bold">
            {Markets.filter(m => m.type === '상설').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">상설 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-4xl font-bold">
            {Markets.filter(m => m.type === '정기').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">정기 시장</p>
        </div>
        <div className="text-center py-6">
          <p className="text-4xl font-bold">17</p>
          <p className="text-sm text-gray-500 mt-1">전국 광역시도</p>
        </div>
      </div>

      <section className="px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">전국 시장 둘러보기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Markets.map(market => (
            <Link key={market.id} href={`/markets/${market.id}`}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold">{market.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{market.address}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {market.type}
                  </span>
                  {market.hasParking && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      주차 가능
                    </span>
                  )}
                  {market.hasToilet && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      화장실
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  점포 {market.storeCount}개
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
