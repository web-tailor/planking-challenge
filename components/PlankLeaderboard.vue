<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt, TOTAL_DAYS } from '~/composables/usePlankData'

defineProps<{
  athletes: Athlete[]
  completedDays: number
}>()
</script>

<template>
  <section class="leaderboard-section">
    <div class="section-title">Full Standings</div>
    <div class="leaderboard">
      <div class="lb-header">
        <div></div>
        <div>Athlete</div>
        <div style="text-align:center">PRs 🔥</div>
        <div style="text-align:center">PR Streak</div>
        <div style="text-align:center">Best</div>
        <div>30-Day</div>
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
        <div class="lb-prs">{{ a.prCount }}</div>
        <div class="lb-streak">🔥 {{ a.prStreak }} in a row</div>
        <div class="lb-pb">{{ fmt(a.pb) }}<sub>D{{ a.pbDay }}</sub></div>
        <div class="lb-progress-wrap">
          <div class="lb-progress-track">
            <div class="lb-progress-fill" :style="`width:${Math.round(completedDays / TOTAL_DAYS * 100)}%`"></div>
          </div>
          <div class="lb-progress-label">{{ completedDays }}/{{ TOTAL_DAYS }} days</div>
        </div>
      </div>
    </div>
  </section>
</template>
