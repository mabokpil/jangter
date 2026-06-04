import { readFileSync, writeFileSync } from 'fs'
import iconv from 'iconv-lite'

const file = readFileSync('./data/markets.csv')
const decoded = iconv.decode(file, 'euc-kr')
writeFileSync('./data/markets-utf8.csv', decoded, 'utf8')
console.log('변환 완료!')
