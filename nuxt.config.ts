// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: '30-Day Planking Challenge — Break Your Own Record',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        { name: 'description', content: 'Track your 30-day planking challenge progress, compete with friends, and smash your personal records. See the live leaderboard and daily stats.' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '30-Day Planking Challenge — Break Your Own Record' },
        { property: 'og:description', content: 'Track your 30-day planking challenge, compete with friends, and smash your personal records. See the live leaderboard and daily stats.' },
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: '30-Day Planking Challenge — Break Your Own Record' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '30-Day Planking Challenge — Break Your Own Record' },
        { name: 'twitter:description', content: 'Track your 30-day planking challenge, compete with friends, and smash your personal records.' },
        { name: 'twitter:image', content: '/og-image.svg' },
      ],
    },
  },
})
