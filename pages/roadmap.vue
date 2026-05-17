<script setup lang="ts">
import { usePlankData, fmt, TOTAL_DAYS } from '~/composables/usePlankData'

useHead({
  title: '30-Day Planking Challenge — The Road to Glory',
  meta: [
    { name: 'description', content: 'Can we plank for 10 or even 15 minutes? See the day-by-day roadmap showing exactly what each athlete needs to hit the big goals.' },
    { property: 'og:title', content: '30-Day Planking Challenge — The Road to Glory' },
    { property: 'og:description', content: 'Can we plank for 10 or even 15 minutes? See the day-by-day roadmap showing exactly what each athlete needs to hit the big goals.' },
    { property: 'og:url', content: 'https://planking.web-tailor.nl/roadmap' },
    { property: 'og:image', content: 'https://planking.web-tailor.nl/og-image.png' },
    { name: 'twitter:title', content: '30-Day Planking Challenge — The Road to Glory' },
    { name: 'twitter:description', content: 'Can we plank for 10 or even 15 minutes? See the day-by-day roadmap showing exactly what each athlete needs to hit the big goals.' },
    { name: 'twitter:image', content: 'https://planking.web-tailor.nl/og-image.png' },
  ],
})

const { athletes, completedDays } = usePlankData()

const GOAL_10 = 10 * 60       // 600s
const GOAL_15 = 15 * 60       // 900s
const daysLeft = TOTAL_DAYS - completedDays

// Build a per-day projection for one athlete toward a goal
function buildProjection(startSec: number, goalSec: number, days: number) {
  const gain = (goalSec - startSec) / days
  return Array.from({ length: days }, (_, i) => ({
    day: completedDays + i + 1,
    target: Math.round(startSec + gain * (i + 1)),
  }))
}

type AthletePlan = {
  name: string
  pb: number
  to10: ReturnType<typeof buildProjection>
  to15: ReturnType<typeof buildProjection>
}

const plans: AthletePlan[] = athletes.map(a => ({
  name: a.name,
  pb: a.pb,
  to10: buildProjection(a.pb, GOAL_10, daysLeft),
  to15: buildProjection(a.pb, GOAL_15, daysLeft),
}))

// For the chart — max value to normalise bar widths
const maxSec = GOAL_15
</script>

<template>
  <div class="container">
    <header>
      <div class="week-label">30-Day Planking Challenge</div>
      <h1>THE ROAD TO<br><span>GLORY</span></h1>
      <div class="subtitle">Day {{ completedDays }} of {{ TOTAL_DAYS }} · {{ daysLeft }} days remaining</div>
    </header>

    <NuxtLink to="/" class="back-link">← Back to leaderboard</NuxtLink>

    <!-- Goals legend -->
    <div class="goals-row">
      <div class="goal-badge goal-10">
        <div class="goal-time">10:00</div>
        <div class="goal-label">First milestone</div>
      </div>
      <div class="goal-divider"></div>
      <div class="goal-badge goal-15">
        <div class="goal-time">15:00</div>
        <div class="goal-label">Ultimate goal</div>
      </div>
    </div>

    <!-- Per-athlete roadmap -->
    <div v-for="plan in plans" :key="plan.name" class="athlete-roadmap">
      <div class="rm-header">
        <div class="rm-name">{{ plan.name }}</div>
        <div class="rm-current">
          Current PB <span>{{ fmt(plan.pb) }}</span>
        </div>
        <div class="rm-targets">
          <div class="rm-target t10">
            +{{ fmt(GOAL_10 - plan.pb) }} to reach 10:00
            <span class="rm-rate">(~{{ Math.ceil((GOAL_10 - plan.pb) / daysLeft) }}s/day)</span>
          </div>
          <div class="rm-target t15">
            +{{ fmt(GOAL_15 - plan.pb) }} to reach 15:00
            <span class="rm-rate">(~{{ Math.ceil((GOAL_15 - plan.pb) / daysLeft) }}s/day)</span>
          </div>
        </div>
      </div>

      <!-- Day-by-day projection table -->
      <div class="rm-table-wrap">
        <div class="rm-table">
          <div class="rm-table-head">
            <div>Day</div>
            <div>10:00 target</div>
            <div>15:00 target</div>
            <div class="rm-bar-col">Progress to 15:00</div>
          </div>
          <div
            v-for="(row, i) in plan.to10"
            :key="row.day"
            class="rm-table-row"
            :class="{ 'milestone-10': plan.to10[i].target >= GOAL_10, 'milestone-15': plan.to15[i].target >= GOAL_15 }"
          >
            <div class="rm-day">{{ row.day }}</div>
            <div
              class="rm-val t10"
              :class="{ 'reached': row.target >= GOAL_10 }"
            >{{ row.target >= GOAL_10 ? '10:00 ✓' : fmt(row.target) }}</div>
            <div
              class="rm-val t15"
              :class="{ 'reached': plan.to15[i].target >= GOAL_15 }"
            >{{ plan.to15[i].target >= GOAL_15 ? '15:00 ✓' : fmt(plan.to15[i].target) }}</div>
            <div class="rm-bar-col">
              <div class="rm-bar-track">
                <!-- current PB baseline -->
                <div
                  class="rm-bar-base"
                  :style="{ width: (plan.pb / maxSec * 100) + '%' }"
                ></div>
                <!-- 10-min fill -->
                <div
                  class="rm-bar-fill rm-bar-10"
                  :style="{ width: (Math.min(row.target, GOAL_10) / maxSec * 100) + '%' }"
                ></div>
                <!-- 15-min fill -->
                <div
                  class="rm-bar-fill rm-bar-15"
                  :style="{ width: (plan.to15[i].target / maxSec * 100) + '%' }"
                ></div>
                <!-- goal markers -->
                <div class="rm-marker rm-marker-10" :style="{ left: (GOAL_10 / maxSec * 100) + '%' }"></div>
                <div class="rm-marker rm-marker-15" :style="{ left: '100%' }"></div>
              </div>
              <div class="rm-bar-labels">
                <span class="rm-bar-label-start">{{ fmt(plan.pb) }}</span>
                <span class="rm-bar-label-10">10:00</span>
                <span class="rm-bar-label-15">15:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <NuxtLink to="/" class="back-link back-link-bottom">← Back to leaderboard</NuxtLink>
  </div>
</template>

<style>
/* ── BACK LINK ── */
.back-link {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 48px;
  transition: color 0.15s;
}
.back-link:hover { color: var(--accent); }
.back-link-bottom { margin-top: 60px; margin-bottom: 0; }

/* ── GOALS ROW ── */
.goals-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 56px;
  animation: fadeUp 0.6s ease 0.15s both;
}
.goal-divider {
  flex: 1;
  height: 1px;
  background: var(--border);
}
.goal-badge {
  text-align: center;
  padding: 16px 28px;
  border-radius: 8px;
  border: 1px solid;
}
.goal-badge.goal-10 {
  border-color: rgba(71,196,255,0.4);
  background: rgba(71,196,255,0.06);
}
.goal-badge.goal-15 {
  border-color: rgba(232,255,71,0.4);
  background: rgba(232,255,71,0.06);
}
.goal-time {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 40px;
  letter-spacing: 3px;
  line-height: 1;
}
.goal-badge.goal-10 .goal-time { color: var(--streak-color); }
.goal-badge.goal-15 .goal-time { color: var(--accent); }
.goal-label {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
}

/* ── ATHLETE ROADMAP ── */
.athlete-roadmap {
  margin-bottom: 56px;
  animation: fadeUp 0.6s ease 0.25s both;
}

.rm-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.rm-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 26px;
  letter-spacing: 2px;
  flex-shrink: 0;
}

.rm-current {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 1px;
}
.rm-current span {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  color: var(--pr-color);
  letter-spacing: 1px;
}

.rm-targets {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
}
.rm-target {
  font-size: 11px;
  letter-spacing: 1px;
}
.rm-target.t10 { color: var(--streak-color); }
.rm-target.t15 { color: var(--accent); }
.rm-rate {
  font-size: 9px;
  color: var(--muted);
  margin-left: 6px;
}

/* ── TABLE ── */
.rm-table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: auto;
}

.rm-table { min-width: 540px; }

.rm-table-head {
  display: grid;
  grid-template-columns: 60px 120px 120px 1fr;
  padding: 10px 20px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  gap: 8px;
}

.rm-table-row {
  display: grid;
  grid-template-columns: 60px 120px 120px 1fr;
  padding: 9px 20px;
  border-bottom: 1px solid var(--border);
  align-items: center;
  gap: 8px;
  transition: background 0.12s;
}
.rm-table-row:last-child { border-bottom: none; }
.rm-table-row:hover { background: var(--surface2); }

.rm-table-row.milestone-10 { background: rgba(71,196,255,0.04); }
.rm-table-row.milestone-15 { background: rgba(232,255,71,0.05); }

.rm-day {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  color: var(--muted);
  letter-spacing: 1px;
}

.rm-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
}
.rm-val.t10 { color: var(--streak-color); }
.rm-val.t15 { color: var(--accent); }
.rm-val.reached.t10 { color: var(--streak-color); opacity: 0.5; }
.rm-val.reached.t15 { color: var(--accent); opacity: 0.5; }

.rm-bar-col { position: relative; }

.rm-bar-track {
  position: relative;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.rm-bar-base {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: rgba(90,90,120,0.4);
  border-radius: 4px;
}

.rm-bar-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.rm-bar-10 {
  background: linear-gradient(90deg, rgba(71,196,255,0.6), rgba(71,196,255,0.9));
}
.rm-bar-15 {
  background: linear-gradient(90deg, rgba(232,255,71,0.4), rgba(232,255,71,0.7));
}

.rm-marker {
  position: absolute;
  top: -2px; bottom: -2px;
  width: 2px;
  transform: translateX(-1px);
}
.rm-marker-10 { background: var(--streak-color); }
.rm-marker-15 { background: var(--accent); }

.rm-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  color: var(--muted);
  letter-spacing: 1px;
  position: relative;
}
.rm-bar-label-start { position: absolute; left: 0; }
.rm-bar-label-10 {
  position: absolute;
  left: calc(600 / 900 * 100% - 14px);
  color: var(--streak-color);
  opacity: 0.7;
}
.rm-bar-label-15 { position: absolute; right: 0; color: var(--accent); opacity: 0.7; }

/* ── SUMMARY ── */
.summary-section {
  margin-top: 20px;
  animation: fadeUp 0.6s ease 0.4s both;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.summary-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 22px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.summary-icon { font-size: 28px; line-height: 1; }

.summary-label {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}
.summary-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: var(--accent);
  letter-spacing: 2px;
  line-height: 1;
}
.summary-sub {
  font-size: 10px;
  color: var(--muted);
  margin-top: 5px;
  letter-spacing: 1px;
}
</style>