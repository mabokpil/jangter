'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link
          href="/markets"
          className="text-2xl font-black text-[#FF6B35] tracking-tight"
        >
          JANGTER
        </Link>

        {/* 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/markets"
            className="text-sm text-gray-600 hover:text-[#FF6B35] transition"
          >
            전국 시장
          </Link>
          <Link
            href="/markets?type=상설"
            className="text-sm text-gray-600 hover:text-[#FF6B35] transition"
          >
            상설시장
          </Link>
          <Link
            href="/markets?type=정기"
            className="text-sm text-gray-600 hover:text-[#FF6B35] transition"
          >
            정기시장
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span
            className={`block w-6 h-px bg-gray-800 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-gray-800 transition-all ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-gray-800 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="md:hidden border-t border-gray-100 px-6 py-6 flex flex-col gap-4 bg-white">
          <Link
            href="/markets"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600"
          >
            전국 시장
          </Link>
          <Link
            href="/markets?type=상설"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600"
          >
            상설시장
          </Link>
          <Link
            href="/markets?type=정기"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600"
          >
            정기시장
          </Link>
        </div>
      )}
    </nav>
  )
}
