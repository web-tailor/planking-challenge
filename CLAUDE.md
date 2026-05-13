# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run generate   # static site generation
npm run preview    # preview production build
```

No linter or test suite is configured.

## Architecture

Single-page Nuxt 3 app (static, no backend). All data lives in one file.

**Data layer — `composables/usePlankData.ts`**

- `RAW` is the single source of truth: a record of athlete names → `"M:SS"` time strings (one per day). `"0:00"` marks a missed day.
- To log a new day, append a time string to each athlete's array in `RAW`.
- `usePlankData()` derives everything from `RAW`: per-day PR detection, streaks, attendance, podium order, all-time records, and aggregate stats. Nothing is stored elsewhere.
- `TOTAL_DAYS = 30` controls the challenge length and the "upcoming" pip count in the heatmap.

**Rendering — `pages/index.vue` + components**

The single page at `pages/index.vue` calls `usePlankData()` and passes slices to six display-only components:

| Component | Shows |
|---|---|
| `PlankPodium` | Top-3 podium ranked by PR count |
| `PlankAlltimePodium` | Top-3 by personal best (PB) time |
| `PlankLeaderboard` | Full athlete table with all stats |
| `PlankHeatmap` | Per-athlete pip grid (PR / completed / missed / upcoming) |
| `PlankDailyCards` | Per-day winner + bar chart breakdown |
| `PlankStats` | Aggregate stat cards |

All styles live in `app.vue` (global) using CSS custom properties defined in `:root`. Components do not have scoped styles — they rely on the shared classes in `app.vue`.

**Design system (CSS variables in `app.vue`)**

| Variable | Role |
|---|---|
| `--accent` (`#e8ff47`) | Primary yellow — winners, values |
| `--pr-color` (`#ff6b35`) | Personal records, orange highlights |
| `--streak-color` (`#47c4ff`) | Completed days, blue |
| `--gold/--silver/--bronze` | Medal colours |
| `--bg / --surface / --surface2` | Background layers |

Fonts: `Bebas Neue` (big numbers/headings), `Black Ops One` (names), `DM Mono` (body/labels).

## Adding a new day

When the user provides times for a new day (in any format), append them to the `RAW` object in `composables/usePlankData.ts` — one time string per athlete, in the same order as existing entries. Use `"0:00"` for any missed athlete. Commit with a short message like `"added day 15"`.

To figure out which day number to add next, count the entries in any athlete's array in `RAW` and add 1.
