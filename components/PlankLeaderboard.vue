<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt } from '~/composables/usePlankData'

defineProps<{
  athletes: Athlete[]
}>()
</script>

<template>
  <section class="leaderboard-section">
    <div class="section-title">Full Standings</div>
    <div class="leaderboard">
      <div class="lb-header">
        <div></div>
        <div>Athlete</div>
        <div style="text-align:center">Best</div>
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
        <div class="lb-rank">{{ i + 1 }}</div>
        <div class="lb-name">{{ a.name }}</div>
        <div class="lb-pb">{{ fmt(a.pb) }}<sub>D{{ a.pbDay }}</sub></div>
        <div class="lb-prs">{{ a.prCount }}</div>
        <div class="lb-streak">🔥 {{ a.prStreak }}</div>
        <div class="lb-attendance">{{ a.daysLogged === a.daysPlayed && a.daysLogged > 0 ? '🏅 Perfect' : `🔥 ${a.daysLogged} days` }}</div>
      </div>
    </div>
  </section>
</template>
