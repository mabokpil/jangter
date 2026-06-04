import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const Markets = await prisma.market.findMany()
  return NextResponse.json(Markets)
}

export async function POST(req: Request) {
  const body = await req.json()
  const market = await prisma.market.create({
    data: {
      name: body.name,
      type: body.type,
      address: body.address,
      openCycle: body.openCycle,
      storeCount: body.storeCount,
      hasToilet: body.hasToilet,
      hasParking: body.hasParking,
      establishedYear: body.established ?? null,
    },
  })
  return NextResponse.json(market)
}
