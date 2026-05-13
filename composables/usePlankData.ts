export type DayEntry = {
  day: number
  sec: number
  missed: boolean
  isPR: boolean
}

export type Athlete = {
  name: string
  days: DayEntry[]
  pb: number
  pbDay: number
  prCount: number
  prStreak: number
  attendanceStreak: number
  daysLogged: number
  daysPlayed: number
  totalTime: number
}

// ── ADD NEW WEEKS HERE ── append times to each array. "0:00" = missed day.
const RAW: Record<string, string[]> = {
  Stijn:  ['3:34', '0:00', '4:15', '5:02', '3:30', '6:00', '6:02'],
  André:  ['4:00', '4:02', '2:45', '4:30', '4:49', '4:20', '5:10'],
  Pierre: ['3:00', '3:30', '3:40', '3:50', '4:00', '4:15', '4:23'],
  Paul:   ['1:49', '3:30', '3:40', '4:00', '5:02', '5:30', '6:03'],
  Brian:  ['3:05', '3:15', '3:26', '0:00', '4:06', '0:00', '2:11'],
}

export const TOTAL_DAYS = 30

export function toSec(t: string): number {
  const [m, s] = t.split(':').map(Number)
  return m * 60 + s
}

export function fmt(s: number): string {
  if (!s) return '—'
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function usePlankData() {
  const names = Object.keys(RAW)

  const athletes: Athlete[] = names.map(name => {
    let pb = 0
    const days: DayEntry[] = RAW[name].map((t, i) => {
      const sec = toSec(t)
      const missed = sec === 0
      let isPR = false
      if (!missed && sec > pb) { isPR = true; pb = sec }
      return { day: i + 1, sec, missed, isPR }
    })
    const pbDay = days.find(d => d.sec === pb)?.day ?? 0
    const prCount = days.filter(d => d.isPR).length
    const played = days.filter(d => !d.missed)
    let prStreak = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].isPR) prStreak++
      else break
    }
    let attendanceStreak = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (!days[i].missed) attendanceStreak++
      else break
    }
    const daysLogged = played.length
    const totalTime = played.reduce((s, d) => s + d.sec, 0)
    return { name, days, pb, pbDay, prCount, prStreak, attendanceStreak, daysLogged, daysPlayed: RAW[name].length, totalTime }
  })

  athletes.sort((a, b) => b.prCount - a.prCount || b.pb - a.pb)

  const completedDays = athletes[0].daysPlayed

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [athletes[1], athletes[0], athletes[2]]

  // All-time top 3 by PB
  const top3ByPB = [...athletes].sort((a, b) => b.pb - a.pb).slice(0, 3)
  const alltimeOrder = [top3ByPB[1], top3ByPB[0], top3ByPB[2]]

  // Stats
  const allSecs = athletes.flatMap(a => a.days.map(d => d.sec)).filter(s => s > 0)
  const totalPRs = athletes.reduce((s, a) => s + a.prCount, 0)
  const best = Math.max(...allSecs)
  const bestAth = athletes.find(a => a.days.some(d => d.sec === best))
  const bestDay = bestAth?.days.find(d => d.sec === best)?.day
  const missed = athletes.flatMap(a => a.days).filter(d => d.missed).length
  const avg = Math.round(allSecs.reduce((a, b) => a + b, 0) / allSecs.length)
  const totalTime = allSecs.reduce((a, b) => a + b, 0)

  const stats = [
    { label: 'Total PRs Broken', value: String(totalPRs), sub: 'across all athletes' },
    { label: 'Best Single Plank', value: fmt(best), sub: `${bestAth?.name} · Day ${bestDay}` },
    { label: 'Avg Per Session', value: fmt(avg), sub: `across ${allSecs.length} sessions` },
    { label: 'Missed Sessions', value: String(missed), sub: `out of ${completedDays * 5} possible` },
    { label: 'Total Group Time', value: fmt(totalTime), sub: 'combined planking time' },
  ]

  return { athletes, completedDays, podiumOrder, alltimeOrder, top3ByPB, stats }
}
