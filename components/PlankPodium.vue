<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt } from '~/composables/usePlankData'

defineProps<{
  podiumOrder: Athlete[]
  athletes: Athlete[]
}>()

const pClass = ['second', 'first', 'third']
const medals = ['🥈', '🥇', '🥉']
</script>

<template>
  <section class="podium-section">
    <div class="section-title">Top 3 — Most PRs Broken</div>
    <div class="podium">
      <div
        v-for="(a, i) in podiumOrder"
        :key="a.name"
        class="podium-item"
        :class="pClass[i]"
      >
        <div class="medal">{{ medals[i] }}</div>
        <div class="podium-name">{{ a.name }}</div>
        <div class="podium-prs"><strong>{{ a.prCount }}</strong> PRs broken</div>
        <div class="podium-pb">PB {{ fmt(a.pb) }}</div>
        <div class="podium-bar">{{ athletes.indexOf(a) + 1 }}</div>
      </div>
    </div>
  </section>
</template>
