<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt, TOTAL_DAYS } from '~/composables/usePlankData'

defineProps<{
  athletes: Athlete[]
}>()

function pipClass(a: Athlete, i: number) {
  const d = a.days[i]
  if (!d) return 'future'
  if (!d.joined) return 'pre-join'
  if (d.missed) return 'miss'
  if (d.isPR) return 'pr'
  return 'ok'
}

function pipTip(a: Athlete, i: number) {
  const d = a.days[i]
  if (!d) return `Day ${i + 1} — upcoming`
  if (!d.joined) return `Day ${i + 1} — joined later`
  if (d.missed) return `Day ${i + 1} — missed`
  if (d.isPR) return `Day ${i + 1} — ${fmt(d.sec)} ★ PR`
  return `Day ${i + 1} — ${fmt(d.sec)}`
}

function prRate(a: Athlete) {
  return a.daysPlayed > 0 ? Math.round(a.prCount / a.daysPlayed * 100) : 0
}

function attendanceLabel(a: Athlete) {
  if (a.daysLogged === a.daysPlayed && a.daysLogged > 0) return '🏅 Perfect'
  return `🔥 ${a.daysLogged} days`
}
</script>

<template>
  <section class="heatmap-section">
    <div class="section-title">30-Day Heatmap — hover any dot for details</div>
    <div class="athlete-cards">
      <div
        v-for="(a, ci) in athletes"
        :key="a.name"
        class="athlete-card"
        :style="`animation-delay:${0.5 + ci * 0.05}s`"
      >
        <div class="athlete-card-top">
          <div class="athlete-card-name">{{ a.name }}</div>
          <div>
            <div class="athlete-pb-val">{{ fmt(a.pb) }}</div>
            <div class="athlete-pb-label">Personal Best</div>
          </div>
        </div>
        <div class="heatmap-grid">
          <div
            v-for="i in TOTAL_DAYS"
            :key="i"
            class="pip"
            :class="pipClass(a, i - 1)"
            :data-tip="pipTip(a, i - 1)"
          ></div>
        </div>
        <div class="athlete-card-stats">
          <div>
            <div class="mini-stat-label">PRs</div>
            <div class="mini-stat-val orange">{{ a.prCount }}</div>
          </div>
          <div>
            <div class="mini-stat-label">PR Rate</div>
            <div class="mini-stat-val yellow">{{ prRate(a) }}%</div>
          </div>
          <div>
            <div class="mini-stat-label">PR Streak</div>
            <div class="mini-stat-val blue">🔥{{ a.prStreak }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
