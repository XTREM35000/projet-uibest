import { defineStore } from 'pinia'

interface BrandState {
  companyName: string
  logo: string
  primaryColor: string
  secondaryColor: string
  welcomeMessage: string
  isConfigured: boolean
}

export const useBrandStore = defineStore('brand', {
  state: (): BrandState => ({
    companyName: '',
    logo: '',
    primaryColor: '#4F46E5',
    secondaryColor: '#10B981',
    welcomeMessage: '',
    isConfigured: false
  }),

  actions: {
    async fetchBrandConfig() {
      try {
        // On récupère les données depuis l'API
        const { data } = await useFetch('/api/brand/config')
        
        // Si des données sont présentes, on les met à jour
        if (data.value) {
          this.$patch(data.value)
        }
      } catch (error) {
        // Gestion d'erreur si l'API échoue
        console.error('Error fetching brand config:', error)
      }
    },

    async saveBrandConfig(config: Partial<BrandState>) {
      try {
        // On envoie les données modifiées au serveur
        const { data } = await useFetch('/api/brand/config', {
          method: 'POST',
          body: config
        })
        
        // Si des données sont retournées, on met à jour le store
        if (data.value) {
          this.$patch(data.value)
        }
      } catch (error) {
        // Gestion d'erreur si l'API échoue
        console.error('Error saving brand config:', error)
      }
    }
  }
})
