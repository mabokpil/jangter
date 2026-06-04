import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const file = fs.readFileSync('./data/markets-utf8.csv', 'utf8')
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[]

  for (const row of records) {
    await prisma.market.create({
      data: {
        name: row['시장명'],
        type: row['시장유형'],
        address: row['소재지도로명주소'],
        openCycle: row['시장개설주기'] ?? '',
        storeCount: Number(row['점포수']) || 0,
        items: row['취급품목'] || null,
        hasToilet: row['공중화장실 보유여부'] === 'Y',
        hasParking: row['주차장 보유여부'] === 'Y',
        establishedYear: row['개설년도'] ? Number(row['개설년도']) : null,
      },
    })
  }
  console.log('완료!')
}

main().finally(() => prisma.$disconnect())
