export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  colorMode: { preference: 'dark', fallback: 'dark' },
  app: {
    head: {
      title: 'Sublevel — Underground artist booking',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'description', content: 'Booking for underground electronic acts. One inbox for promoters and venues.' }],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
    }
  },
  build: { transpile: ['three'] }
})
