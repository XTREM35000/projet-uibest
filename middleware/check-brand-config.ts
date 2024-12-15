export default defineNuxtRouteMiddleware(async (to) => {
  const brandStore = useBrandStore()
  await brandStore.fetchBrandConfig()

  if (!brandStore.isConfigured && to.path !== '/admin/configuration') {
    return navigateTo('/admin/configuration')
  }
})