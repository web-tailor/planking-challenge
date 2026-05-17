<template>
  <NuxtPage />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=DM+Mono:wght@400;500&family=Bebas+Neue&display=swap');

:root {
  --bg: #0a0a0f;
  --surface: #12121a;
  --surface2: #1a1a26;
  --border: #2a2a3a;
  --accent: #e8ff47;
  --accent2: #ff6b35;
  --accent3: #47c4ff;
  --text: #f0f0f8;
  --muted: #5a5a7a;
  --gold: #ffd700;
  --silver: #c0c0d0;
  --bronze: #cd7f32;
  --pr-color: #ff6b35;
  --streak-color: #47c4ff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Mono', monospace;
  min-height: 100vh;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(232,255,71,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(232,255,71,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  position: relative;
  z-index: 1;
}

/* ── HEADER ── */
header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeDown 0.6s ease both;
}

.week-label {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 8px;
  opacity: 0.8;
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 10vw, 100px);
  letter-spacing: 6px;
  line-height: 0.9;
  color: var(--text);
  text-shadow: 0 0 60px rgba(232,255,71,0.15);
}

h1 span { color: var(--accent); }

.subtitle {
  margin-top: 14px;
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--muted);
  text-transform: uppercase;
}

/* ── SECTION TITLES ── */
.section-title {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ── PODIUM ── */
.podium-section {
  margin-bottom: 60px;
  animation: fadeUp 0.7s ease 0.2s both;
}

.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  height: 240px;
}

.podium-item {
  flex: 1;
  max-width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: riseUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.podium-item:nth-child(1) { animation-delay: 0.5s; }
.podium-item:nth-child(2) { animation-delay: 0.3s; }
.podium-item:nth-child(3) { animation-delay: 0.6s; }

.podium-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 4px;
  text-align: center;
}

.podium-prs {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 3px;
  letter-spacing: 1px;
}
.podium-prs strong { color: var(--pr-color); font-size: 13px; }

.podium-pb {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 10px;
}

.podium-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}
.podium-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
}

.podium-item.first  .podium-bar { height: 150px; background: linear-gradient(180deg,#e8c200,#a67c00); color:#0a0a0f; }
.podium-item.second .podium-bar { height: 110px; background: linear-gradient(180deg,#a0a0b8,#606070); color:#0a0a0f; }
.podium-item.third  .podium-bar { height:  80px; background: linear-gradient(180deg,#cd7f32,#8b5120); color:#f0f0f8; }

.podium-item.first  .podium-name { color: var(--gold); }
.podium-item.second .podium-name { color: var(--silver); }
.podium-item.third  .podium-name { color: var(--bronze); }

.medal { font-size: 22px; margin-bottom: 4px; }

/* ── ALL-TIME RECORDS ── */
.alltime-section {
  margin-bottom: 60px;
  animation: fadeUp 0.7s ease 0.28s both;
}

.alltime-podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  height: 200px;
}

.alltime-item {
  flex: 1;
  max-width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: riseUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.alltime-item:nth-child(1) { animation-delay: 0.55s; }
.alltime-item:nth-child(2) { animation-delay: 0.38s; }
.alltime-item:nth-child(3) { animation-delay: 0.68s; }

.alltime-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 3px;
  text-align: center;
  color: var(--muted);
}

.alltime-day {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.alltime-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  gap: 2px;
}
.alltime-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
}

.alltime-bar-time {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
}
.alltime-bar-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  opacity: 0.8;
}

.alltime-item.at-first  .alltime-bar { height: 120px; background: linear-gradient(180deg, rgba(232,255,71,0.3), rgba(232,255,71,0.08)); border: 1px solid rgba(232,255,71,0.3); color: var(--accent); }
.alltime-item.at-second .alltime-bar { height:  88px; background: linear-gradient(180deg, rgba(71,196,255,0.2), rgba(71,196,255,0.05)); border: 1px solid rgba(71,196,255,0.25); color: var(--accent3); }
.alltime-item.at-third  .alltime-bar { height:  64px; background: linear-gradient(180deg, rgba(255,107,53,0.2), rgba(255,107,53,0.05)); border: 1px solid rgba(255,107,53,0.25); color: var(--pr-color); }

.alltime-rank {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.alltime-item.at-first  .alltime-rank { color: var(--accent); }
.alltime-item.at-second .alltime-rank { color: var(--accent3); }
.alltime-item.at-third  .alltime-rank { color: var(--pr-color); }

/* ── LEADERBOARD ── */
.leaderboard-section {
  margin-bottom: 60px;
  animation: fadeUp 0.7s ease 0.35s both;
}

.leaderboard {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.lb-header {
  display: grid;
  grid-template-columns: 1fr 90px 90px 80px 100px 110px;
  padding: 12px 20px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  gap: 8px;
}

.lb-row {
  display: grid;
  grid-template-columns: 1fr 90px 90px 80px 100px 110px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  align-items: center;
  gap: 8px;
  transition: background 0.15s;
  animation: slideIn 0.5s ease both;
}
.lb-row:last-child { border-bottom: none; }
.lb-row:hover { background: var(--surface2); }

.lb-rank {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: var(--muted);
  text-align: center;
}
.lb-row.rank-1 .lb-rank { color: var(--gold); }
.lb-row.rank-2 .lb-rank { color: var(--silver); }
.lb-row.rank-3 .lb-rank { color: var(--bronze); }

.lb-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
}

.lb-prs {
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  color: var(--text);
  letter-spacing: 1px;
}

.lb-streak {
  text-align: center;
  font-size: 11px;
  color: var(--text);
  letter-spacing: 1px;
}

.lb-attendance {
  text-align: center;
  font-size: 11px;
  color: var(--text);
  letter-spacing: 1px;
}

.lb-total {
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  color: var(--text);
  letter-spacing: 1px;
}

.lb-pb {
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  color: var(--text);
  letter-spacing: 1px;
}

.lb-best { color: var(--pr-color) !important; }
.lb-pb sub {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  color: var(--muted);
  vertical-align: baseline;
  margin-left: 3px;
}

.lb-progress-wrap { display: flex; flex-direction: column; gap: 4px; }
.lb-progress-track { height: 5px; background: var(--border); border-radius: 3px; overflow: hidden; }
.lb-progress-fill  { height: 100%; border-radius: 3px; background: var(--accent); }
.lb-progress-label { font-size: 9px; color: var(--muted); letter-spacing: 1px; text-align: right; }

/* ── HEATMAP CARDS ── */
.heatmap-section {
  margin-bottom: 60px;
  animation: fadeUp 0.7s ease 0.45s both;
}

.athlete-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 14px;
}

.athlete-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  animation: fadeUp 0.5s ease both;
}

.athlete-card-top {
  padding: 16px 18px 12px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.athlete-card-name {
  font-family: 'Black Ops One', sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
}

.athlete-pb-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: var(--accent);
  letter-spacing: 1px;
  line-height: 1;
  text-align: right;
}
.athlete-pb-label {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  text-align: right;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
  padding: 14px 18px;
}

.pip {
  aspect-ratio: 1;
  border-radius: 3px;
  position: relative;
  cursor: default;
  transition: transform 0.1s;
}
.pip:hover { transform: scale(1.4); z-index: 10; }

.pip.pr     { background: var(--pr-color); box-shadow: 0 0 8px rgba(255,107,53,0.5); }
.pip.ok     { background: var(--streak-color); }
.pip.miss   { background: #1e1e28; border: 1px solid var(--border); }
.pip.future    { background: transparent; border: 1px dashed #2a2a3a; }
.pip.pre-join  { background: transparent; border: 1px dashed #1a1a26; opacity: 0.25; }

.pip[data-tip]:hover::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 30;
}

.athlete-card-stats {
  padding: 10px 18px 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  border-top: 1px solid var(--border);
}

.mini-stat-label {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 3px;
}

.mini-stat-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 1;
}
.mini-stat-val.orange { color: var(--pr-color); }
.mini-stat-val.blue   { color: var(--streak-color); }
.mini-stat-val.yellow { color: var(--accent); }

/* ── DAILY CARDS ── */
.daily-section {
  margin-bottom: 60px;
  animation: fadeUp 0.7s ease 0.55s both;
}

.day-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.day-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 18px 16px;
  animation: fadeUp 0.5s ease both;
}

.day-label {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
}
.day-winner {
  font-family: 'Black Ops One', sans-serif;
  font-size: 16px;
  color: var(--accent);
  letter-spacing: 1px;
  margin-bottom: 1px;
}
.day-winner-time {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 14px;
}

.day-bar-list  { display: flex; flex-direction: column; gap: 6px; }
.day-bar-row   { display: flex; flex-direction: column; gap: 3px; }

.day-bar-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--muted);
}
.day-bar-meta .dname { color: var(--text); opacity: 0.7; }

.day-bar-track { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.day-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--accent3);
  transition: width 1s cubic-bezier(0.22,1,0.36,1);
}
.day-bar-fill.winner-fill { background: var(--accent); }
.day-bar-fill.pr-fill     { background: var(--pr-color); }
.day-bar-fill.zero-fill   { background: var(--border); width: 0% !important; }

.pr-star { font-size: 8px; color: var(--pr-color); margin-left: 2px; }

/* ── STATS ── */
.stats-section { animation: fadeUp 0.7s ease 0.65s both; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 18px;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  animation: lineReveal 0.5s ease 1.1s both;
}

.stat-label {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
}
.stat-value {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  letter-spacing: 2px;
  color: var(--accent);
  line-height: 1;
}
.stat-sub { font-size: 11px; color: var(--muted); margin-top: 5px; }

/* ── LEGEND ── */
.legend {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  animation: fadeUp 0.5s ease 0.1s both;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 1px;
}
.legend-pip { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }

/* ── ROADMAP LINK ── */
.roadmap-link {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid rgba(232,255,71,0.3);
  padding: 12px 28px;
  border-radius: 4px;
  transition: background 0.15s, border-color 0.15s;
}
.roadmap-link:hover {
  background: rgba(232,255,71,0.08);
  border-color: rgba(232,255,71,0.6);
}

/* ── ANIMATIONS ── */
@keyframes fadeDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeUp    { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
@keyframes riseUp    { from{opacity:0;transform:translateY(40px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes slideIn   { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
@keyframes lineReveal{ to{transform:scaleX(1)} }

@media(max-width:900px){
  .leaderboard{ overflow-x: auto; }
  .lb-inner{ min-width: 680px; }
  .heatmap-grid{ grid-template-columns:repeat(6,1fr); }
}
</style>
