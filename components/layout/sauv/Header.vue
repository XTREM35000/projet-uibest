<template>
  <nav class="bg-blue-600 p-4">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-white text-2xl font-bold">
          Gogo Express 2.0
        </NuxtLink>
        
        <div class="hidden md:flex space-x-6">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-white hover:text-blue-200 transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="hidden md:flex space-x-4">
          <UIButton
            v-if="!user"
            variant="secondary"
            @click="navigateTo('/login')"
          >
            Connexion
          </UIButton>
          <UIButton
            v-if="!user"
            @click="navigateTo('/register')"
          >
            Inscription
          </UIButton>
          <UIButton
            v-else
            variant="secondary"
            @click="handleLogout"
          >
            Déconnexion
          </UIButton>
        </div>

        <button 
          class="md:hidden text-white"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16m-16 6h16"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden mt-4"
      >
        <div class="flex flex-col space-y-3">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-white hover:text-blue-200 transition-colors"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink 
            v-if="!user"
            to="/login"
            class="text-white hover:text-blue-200 transition-colors"
            @click="isMenuOpen = false"
          >
            Connexion
          </NuxtLink>
          <NuxtLink 
            v-if="!user"
            to="/register"
            class="text-white hover:text-blue-200 transition-colors"
            @click="isMenuOpen = false"
          >
            Inscription
          </NuxtLink>
          <button
            v-else
            class="text-white hover:text-blue-200 transition-colors text-left"
            @click="handleLogout"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { user, logout } = useAuth();
const isMenuOpen = ref(false);

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Tarifs', path: '/tarifs' },
  { name: 'Contact', path: '/contact' }
];

const handleLogout = async () => {
  await logout();
  navigateTo('/');
  isMenuOpen.value = false;
};
</script>