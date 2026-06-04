'use client'

import { useMarketStore } from '@/store/useMarketStore'

const regions = [
  '전체',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
]

export default function MarketFilter() {
  const { search, type, region, setSearch, setType, setRegion } =
    useMarketStore()

  return (
    <div className="px-8 py-6 bg-white border-b sticky top-16 z-40">
      {/* 검색창 */}
      <input
        type="text"
        placeholder="🔍 시장 이름 검색..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-[#FF6B35]"
      />

      {/* 유형 필터 */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {['전체', '상설', '정기'].map(t => (
          <button
            key={t}
            onClick={() => setType(t === '전체' ? '' : t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              (t === '전체' && !type) || type === t
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 지역 필터 */}
      <div className="flex gap-2 flex-wrap">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r === '전체' ? '' : r)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              (r === '전체' && !region) || region === r
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}
