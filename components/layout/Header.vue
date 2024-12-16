<template>
  <header class="bg-[#0070BA] shadow-md">
    <div class="min-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <img
            v-if="!isAuthenticated"
            src="/default-logo.png"
            alt="Gogo Express 2.0"
            class="w-12 h-12"
          />
          <NuxtLink to="/" class="text-xl font-bold text-white ml-2" prefetch>
            Gogo Express 2.0
          </NuxtLink>
        </div>

        <!-- Hamburger Button (pour les petits écrans) -->
        <button
          @click="toggleMenu"
          class="sm:hidden text-white focus:outline-none"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Navigation Desktop -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <NuxtLink
            v-for="item in links"
            :key="item.to"
            :to="item.to"
            class="text-white hover:text-blue-200 transition-colors"
            :class="{ 'nav-link-active': isCurrentPath(item.to) }"
            prefetch
          >
            <i :class="item.icon" class="mr-2"></i>{{ item.label }}
          </NuxtLink>
        </div>

        <!-- Menu Auth ou Utilisateur -->
        <div class="hidden sm:flex items-center space-x-2">
          <template v-if="!isAuthenticated">
            <button
              @click="navigateTo('/auth/login')"
              class="auth-button text-white"
            >
              Se connecter
            </button>
          </template>
          <template v-else>
            <UDropdown
              :items="[[ 
                { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
                { label: 'Profile', icon: 'i-heroicons-user-circle', to: '/profile' },
                { label: 'Déconnexion', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }
              ]]"
              :popper="{ placement: 'bottom-end' }"
            >
              <UAvatar
                :src="user?.avatar || ''"
                :alt="user?.email || 'Utilisateur'"
                class="cursor-pointer"
              />
            </UDropdown>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="sm:hidden bg-[#0070BA] px-4 py-4">
      <div class="space-y-4">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          @click="closeMenu"
          class="block text-white"
          :class="{ 'nav-link-active': isCurrentPath(item.to) }"
          prefetch
        >
          <i :class="item.icon" class="mr-2"></i>{{ item.label }}
        </NuxtLink>

        <!-- Ajouter les liens Se connecter et S'inscrire après les autres items -->
        <template v-if="!isAuthenticated">
          <button
            @click="navigateTo('/auth/login')"
            class="block text-white auth-button"
          >
            Se connecter
          </button>
          <button
            @click="navigateTo('/auth/register')"
            class="block text-white auth-button"
          >
            S'inscrire
          </button>
        </template>
      </div>
    </div>
  </header>

  <!-- Menu Horizontal visible uniquement si connecté -->
  <UHorizontalNavigation v-if="isAuthenticated" :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = storeToRefs(useAuthStore());
const auth = useAuthStore();
const user = computed(() => auth.user);

// Liste des liens de navigation
const links = [
  { label: "Accueil", icon: "i-heroicons-home", to: "/" },
  { label: "Services", icon: "i-heroicons-briefcase", to: "/services" },
  { label: "Tarifs", icon: "i-heroicons-currency-dollar", to: "/pricing" },
  { label: "Contact", icon: "i-heroicons-mail", to: "/contact" }
];

const route = useRoute();
const router = useRouter();

// Mobile menu state
const isMenuOpen = ref(false);

// Fonctions
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const isCurrentPath = (path: string) => route.path === path;

const handleLogout = () => {
  // logout();
  router.push("/auth/login");
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
/* Style pour le bouton "Se connecter" et "S'inscrire" */
.auth-button {
  background-color: #415393;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
}

.auth-button:hover {
  background-color: #07233c;
}

.nav-link-active {
  font-weight: bold;
}
</style>
