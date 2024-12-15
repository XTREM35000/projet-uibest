<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img 
              :src="brandStore.logo || '/default-logo.png'" 
              class="h-8 w-auto" 
              :alt="brandStore.companyName"
            />
            <span class="ml-2 text-xl font-bold">{{ brandStore.companyName || 'Gogo Express 2.0' }}</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink 
              v-for="item in navigationItems" 
              :key="item.path"
              :to="item.path"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                $route.path === item.path
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useBrandStore } from '~/stores/brand';
const brandStore = useBrandStore()

const navigationItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  // { name: 'Tarifs', path: '/'+tarifs },
  { name: 'Tarifs', path: '/ tarifs' },
  { name: 'Contact', path: '/contact' }
]
</script>