<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt } from '~/composables/usePlankData'

defineProps<{
  alltimeOrder: Athlete[]
}>()

const atClass = ['at-second', 'at-first', 'at-third']
const atLabels = ['2nd', '1st', '3rd']
</script>

<template>
  <section class="alltime-section">
    <div class="section-title">All-Time Top 3 — Longest Single Planks</div>
    <div class="alltime-podium">
      <div
        v-for="(a, i) in alltimeOrder"
        :key="a.name"
        class="alltime-item"
        :class="atClass[i]"
      >
        <div class="alltime-rank">{{ atLabels[i] }}</div>
        <div class="alltime-bar">
          <div class="alltime-bar-time">{{ fmt(a.pb) }}</div>
          <div class="alltime-bar-name">{{ a.name }}</div>
        </div>
        <div class="alltime-meta">{{ a.name }} · Day {{ a.pbDay }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.alltime-meta {
  margin-top: 6px;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 1px;
}
</style>
