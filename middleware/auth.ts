// middleware/auth.ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore(); // Pinia store pour l'authentification

  // Vérification pour les routes nécessitant une authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login'); // Redirige vers la page de connexion
  }

  // Vérification pour les routes réservées aux administrateurs
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return navigateTo('/'); // Redirige vers la page d'accueil
  }
});
