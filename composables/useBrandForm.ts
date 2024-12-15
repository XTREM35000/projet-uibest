import { useBrandStore } from '~/stores/brand'

export function useBrandForm() {
  const brandStore = useBrandStore()
  const { $toast } = useNuxtApp()
  const router = useRouter()

  const form = reactive({
    companyName: '',
    logo: '',
    primaryColor: '#4F46E5',
    secondaryColor: '#10B981',
    welcomeMessage: ''
  })

  async function initForm() {
    await brandStore.fetchBrandConfig()
    Object.assign(form, brandStore.$state)
  }

  async function submitForm() {
    try {
      await brandStore.saveBrandConfig({
        ...form,
        isConfigured: true
      })
      $toast.success('Configuration sauvegardée avec succès')
      router.push('/')
    } catch (error) {
      $toast.error('Erreur lors de la sauvegarde de la configuration')
    }
  }

  return {
    form,
    initForm,
    submitForm
  }
}