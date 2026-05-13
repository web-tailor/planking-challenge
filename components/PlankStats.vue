<script setup lang="ts">
defineProps<{
  stats: { label: string; value: string; sub: string }[]
}>()
</script>

<template>
  <section class="stats-section">
    <div class="section-title">Challenge Stats</div>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value">{{ s.value }}</div>
        <div class="stat-sub">{{ s.sub }}</div>
      </div>
    </div>
  </section>
</template>
