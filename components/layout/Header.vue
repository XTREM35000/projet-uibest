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
            class="text-white hover:text-blue-200 transition-colors flex items-center"
            :class="{ 'nav-link-active': isCurrentPath(item.to) }"
            prefetch
          >
            <i :class="item.icon" class="mr-2"></i> {{ item.label }}
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
    <div v-if="isMenuOpen" class="sm:hidden bg-[#0070BA] px-4 py-4" ref="menu">
      <div class="space-y-4">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          @click="closeMenu"
          class="block text-white flex items-center"
          :class="{ 'nav-link-active': isCurrentPath(item.to) }"
          prefetch
        >
          <i :class="item.icon" class="mr-2"></i> {{ item.label }}
        </NuxtLink>

        <!-- Ajouter les liens Se connecter et S'inscrire après les autres items -->
        <template v-if="!isAuthenticated">
          <button
            @click="navigateTo('/auth/login')"
            class="block text-white auth-button"
          >
            Se connecter
          </button>
        </template>
      </div>
    </div>
  </header>

  <!-- Menu Horizontal visible uniquement si connecté -->
  <UHorizontalNavigation v-if="isAuthenticated" :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
 


<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = storeToRefs(useAuthStore());
const auth = useAuthStore();
const user = computed(() => auth.user);

// Liste des liens de navigation

const links = [
  { label: "Accueil", to: "/", icon: "fas fa-home" },
  { label: "Services", to: "/services", icon: "fas fa-cogs" },
  { label: "Tarifs", to: "/pricing", icon: "fas fa-envelope" },
  { label: "Contacts", to: "/contact", icon: "fas fa-info-circle" },
];

// const isAuthenticated = false; // Exemple, ajustez en fonction de l'état réel
const route = useRoute();
const router = useRouter();

// Mobile menu state
const isMenuOpen = ref(false);

// Référence pour le menu mobile
const menuRef = ref<HTMLElement | null>(null);

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

// Fermeture du menu burger si on clique en dehors
const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu();
  }
};

// Ajout et nettoyage de l'écouteur d'événements
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Style pour le bouton "Se connecter" et "S'inscrire" */
.auth-button {
  background-color: #989467;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
}

.auth-button:hover {
  background-color: #6d8889;
}

.nav-link-active {
  font-weight: bold;
}
</style>
