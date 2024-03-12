// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiKey: 'Api-Key CQiC2Mek.CrljswyvRy8Tl8vn9oq4PtTp0OPIWvld',
      apiUrlAccesLibre: 'https://acceslibre.beta.gouv.fr/api',
      test: process.env.TEST
    }
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    'nuxt3-leaflet',
    '@pinia/nuxt'
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      prefix: 'Prime',
      include: ['Button', 'Toolbar', 'Autocomplete', 'Card', 'Badge', 'Menubar', 'InputText', 'Avatar', 'DataView', 'Chip', 'ProgressSpinner', 'Panel']
    }
  },
  css: [
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css',
    '~/assets/css/tailwind.css'
  ],
})