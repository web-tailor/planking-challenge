<script setup lang="ts">
import type { Athlete } from '~/composables/usePlankData'
import { fmt } from '~/composables/usePlankData'

const props = defineProps<{
  athletes: Athlete[]
  completedDays: number
}>()

type DayRow = {
  name: string
  sec: number
  missed: boolean
  isPR: boolean
}

function getDayRows(dayIndex: number): DayRow[] {
  return props.athletes
    .filter(a => a.days[dayIndex]?.joined)
    .map(a => ({ ...a.days[dayIndex], name: a.name }))
    .sort((a, b) => b.sec - a.sec)
}

function maxSec(dayIndex: number): number {
  return Math.max(...props.athletes.map(a =>
    (a.days[dayIndex]?.joined ? a.days[dayIndex].sec : 0) ?? 0
  ))
}

function winner(dayIndex: number): DayRow {
  return getDayRows(dayIndex).reduce((a, b) => (b.sec > a.sec ? b : a))
}

function barPct(entry: DayRow, dayIndex: number): number {
  const m = maxSec(dayIndex)
  return m > 0 ? Math.round((entry.sec / m) * 100) : 0
}

function fillClass(entry: DayRow, dayIndex: number): string {
  if (entry.missed) return 'zero-fill'
  if (entry.isPR) return 'pr-fill'
  if (entry.sec === maxSec(dayIndex)) return 'winner-fill'
  return ''
}
</script>

<template>
  <section class="daily-section">
    <div class="section-title">Daily Breakdown — ★ personal record</div>
    <div class="day-grid">
      <div
        v-for="d in completedDays"
        :key="d"
        class="day-card"
      >
        <div class="day-label">Day {{ d }}</div>
        <template v-if="winner(d - 1).sec > 0">
          <div class="day-winner">{{ winner(d - 1).name }}</div>
          <div class="day-winner-time">{{ fmt(winner(d - 1).sec) }}</div>
        </template>
        <template v-else>
          <div class="day-winner">—</div>
          <div class="day-winner-time">rest day</div>
        </template>
        <div class="day-bar-list">
          <div
            v-for="entry in getDayRows(d - 1)"
            :key="entry.name"
            class="day-bar-row"
          >
            <div class="day-bar-meta">
              <span class="dname">
                {{ entry.name }}<span v-if="entry.isPR" class="pr-star">★</span>
              </span>
              <span>{{ entry.missed ? '—' : fmt(entry.sec) }}</span>
            </div>
            <div class="day-bar-track">
              <div
                class="day-bar-fill"
                :class="fillClass(entry, d - 1)"
                :style="`width:${barPct(entry, d - 1)}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
