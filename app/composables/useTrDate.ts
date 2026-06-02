// Turkish date + relative-time formatting. From design/index.html.
const TR_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
]

export function trDate(d: Date = new Date()): string {
  return `${d.getDate()} ${TR_MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function relTime(ts: number): string {
  const diff = Date.now() - ts
  const m = 60_000, h = 3_600_000, day = 86_400_000
  if (diff < m) return 'az önce'
  if (diff < h) return `${Math.floor(diff / m)} dk önce`
  if (diff < day) return `${Math.floor(diff / h)} saat önce`
  if (diff < 7 * day) return `${Math.floor(diff / day)} gün önce`
  return trDate(new Date(ts))
}

export function useTrDate() {
  return { trDate, relTime, TR_MONTHS }
}
