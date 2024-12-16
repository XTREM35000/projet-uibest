export default defineNuxtConfig({
  app: {
    head: {
      title: 'Gogo Express 2.0',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    ['@nuxt/ui', { icons: ['heroicons'] }],
    '@nuxt/image-edge',
    '@nuxt/image'
  ],
  image: {
    dir: 'assets/images', // Répertoire des images
    formats: ['webp', 'jpg', 'png'],
    quality: 80,
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/css/main.css',
    'vue3-toastify/dist/index.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: ''
        }
      }
    }
  },
  compatibilityDate: '2024-12-14'
});