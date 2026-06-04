import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const body = await req.json()
  const markets = await prisma.market.update({
    where: { id: Number(id) },
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
  return NextResponse.json(markets)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.market.delete({
    where: { id: Number(id) },
  })
  return NextResponse.json({ ok: true })
}
