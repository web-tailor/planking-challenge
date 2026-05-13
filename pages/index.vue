<script setup lang="ts">
import { TOTAL_DAYS, usePlankData } from '~/composables/usePlankData'

const { athletes, completedDays, podiumOrder, alltimeOrder, stats } = usePlankData()
</script>

<template>
  <div class="container">
    <header>
      <div class="week-label">🏋️ 30-Day Planking Challenge · Week 1</div>
      <h1>BREAK YOUR<br><span>RECORD</span></h1>
      <div class="subtitle">
        Day {{ completedDays }} of {{ TOTAL_DAYS }} · 5 Athletes · Break Your Own Record
      </div>
    </header>

    <div class="legend">
      <div class="legend-item">
        <div class="legend-pip" style="background:var(--pr-color);box-shadow:0 0 6px rgba(255,107,53,0.5)"></div>
        Personal record ★
      </div>
      <div class="legend-item">
        <div class="legend-pip" style="background:#2a3a50"></div>
        Completed
      </div>
      <div class="legend-item">
        <div class="legend-pip" style="background:#1e1e28;border:1px solid var(--border)"></div>
        Missed
      </div>
      <div class="legend-item">
        <div class="legend-pip" style="border:1px dashed var(--border)"></div>
        Upcoming
      </div>
    </div>

    <PlankPodium :podium-order="podiumOrder" :athletes="athletes" />
    <PlankAlltimePodium :alltime-order="alltimeOrder" />
    <PlankLeaderboard :athletes="athletes" :completed-days="completedDays" />
    <PlankHeatmap :athletes="athletes" />
    <PlankDailyCards :athletes="athletes" :completed-days="completedDays" />
    <PlankStats :stats="stats" />
  </div>
</template>
