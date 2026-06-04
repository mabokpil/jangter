'use client'

import Link from 'next/link'
import { useMarketStore } from '@/store/useMarketStore'

interface Market {
  id: number
  name: string
  address: string
  type: string
  hasParking: boolean
  hasToilet: boolean
  storeCount: number
}

interface Props {
  markets: Market[]
}

export default function MarketList({ markets }: Props) {
  const { search, type, region } = useMarketStore()

  const filtered = markets.filter(m => {
    const matchSearch = m.name.includes(search) || m.address.includes(search)
    const matchType = !type || m.type.includes(type)
    const matchRegion = !region || m.address.includes(region)
    return matchSearch && matchType && matchRegion
  })

  return (
    <section className="px-8 py-8">
      <p className="text-sm text-gray-400 mb-6">{filtered.length}개 시장</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(market => (
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
  )
}
