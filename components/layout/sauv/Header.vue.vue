<template>
  <header class="bg-[#0070BA] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo et nom de l'entreprise -->
        <div class="flex items-center flex-shrink-0">
          <img
            :src="brandStore.logo || '/default-logo.png'"
            :alt="brandStore.companyName || 'Gogo Express 2.0'"
            class="w-12 h-12 object-contain"
          />
          <NuxtLink to="/" class="text-xl font-bold text-white ml-2">
            {{ brandStore.companyName || 'Gogo Express 2.0' }}
          </NuxtLink>
        </div>

        <!-- Hamburger Menu Mobile -->
        <button
          @click="toggleMenu"
          class="sm:hidden text-white focus:outline-none"
        >
          <i class="fas fa-bars text-2xl"></i>
        </button>

        <!-- Navigation Desktop -->
        <nav class="hidden sm:flex sm:items-center sm:space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'bg-[#005ea2]': route.path === item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="hidden sm:flex items-center space-x-2">
          <template v-if="!authStore.isAuthenticated">
            <NuxtLink
              to="/auth/login"
              class="bg-[#ff9800] hover:bg-[#f57c00] text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Se connecter
            </NuxtLink>
          </template>
          <template v-else>
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-white"
              >
                <span>{{ authStore.user?.firstName || 'Utilisateur' }}</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <NuxtLink
                    v-if="authStore.isAdmin"
                    to="/admin/configuration"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Configuration
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-if="isMenuOpen" class="sm:hidden bg-[#0070BA] px-4 py-4">
      <div class="space-y-4">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          @click="closeMenu"
          class="block text-white hover:bg-[#005ea2] px-3 py-2 rounded-md text-base font-medium"
        >
          {{ item.name }}
        </NuxtLink>
        <template v-if="!authStore.isAuthenticated">
          <NuxtLink
            to="/auth/login"
            class="block text-white bg-[#ff9800] hover:bg-[#f57c00] px-3 py-2 rounded-md text-base font-medium"
          >
            Se connecter
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/composables/useAuth';
import { useBrandStore } from '~/stores/brand';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore()
const brandStore = useBrandStore()
const route = useRoute()
const router = useRouter()

const isMenuOpen = ref(false)
const showUserMenu = ref(false)

const navigationItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Tarifs', path: '/tarifs' },
  { name: 'Contact', path: '/contact' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
  router.push('/auth/login')
}

// Fermer le menu utilisateur quand on clique ailleurs
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>