<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt } from '~/composables/usePlankData'

const props = defineProps<{
  athletes: Athlete[]
}>()

const maxPb        = computed(() => Math.max(...props.athletes.map(a => a.pb)))
const maxTotalTime = computed(() => Math.max(...props.athletes.map(a => a.totalTime)))
const maxPrCount   = computed(() => Math.max(...props.athletes.map(a => a.prCount)))
const maxPrStreak  = computed(() => Math.max(...props.athletes.map(a => a.prStreak)))
const maxDaysLogged = computed(() => Math.max(...props.athletes.map(a => a.daysLogged)))
</script>

<template>
  <section class="leaderboard-section">
    <div class="section-title">Full Standings</div>
    <div class="leaderboard">
      <div class="lb-inner">
      <div class="lb-header">
        <div>Athlete</div>
        <div style="text-align:center">Best</div>
        <div style="text-align:center">Total Time</div>
        <div style="text-align:center">PRs 🔥</div>
        <div style="text-align:center">PR Streak</div>
        <div style="text-align:center">Attendance</div>
      </div>
      <div
        v-for="(a, i) in athletes"
        :key="a.name"
        class="lb-row"
        :class="`rank-${i + 1}`"
        :style="`animation-delay:${0.45 + i * 0.1}s`"
      >
        <div class="lb-name">{{ a.name }}</div>
        <div class="lb-pb" :class="{ 'lb-best': a.pb === maxPb }">{{ fmt(a.pb) }}<sub>D{{ a.pbDay }}</sub></div>
        <div class="lb-total" :class="{ 'lb-best': a.totalTime === maxTotalTime }">{{ fmt(a.totalTime) }}</div>
        <div class="lb-prs" :class="{ 'lb-best': a.prCount === maxPrCount }">{{ a.prCount }}</div>
        <div class="lb-streak" :class="{ 'lb-best': a.prStreak === maxPrStreak }">🔥 {{ a.prStreak }}</div>
        <div class="lb-attendance" :class="{ 'lb-best': a.daysLogged === maxDaysLogged }">{{ a.daysLogged === a.daysPlayed && a.daysLogged > 0 ? '🏅 Perfect' : `🔥 ${a.daysLogged} days` }}</div>
      </div>
      </div>
    </div>
  </section>
</template>
