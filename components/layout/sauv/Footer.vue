<template>
  <footer class="bg-gray-100 border-t mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Gogo Express 2.0</h3>
          <p class="text-gray-600">
            Votre partenaire de confiance pour les solutions d'expédition internationale.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
          <ul class="space-y-2">
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-600">
            <li>
              <i class="fas fa-map-marker-alt mr-2"></i>
              01 BP 5341 Abidjan 01
            </li>
            <li>
              <i class="fas fa-phone mr-2"></i>
              <a href="tel:+2250758966156" class="hover:text-blue-600">
                0758966156
              </a>
            </li>
            <li>
              <i class="fas fa-envelope mr-2"></i>
              <a href="mailto:2024dibo@gmail.com" class="hover:text-blue-600">
                2024dibo@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t text-center text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} Gogo Express 2.0. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Tarifs', path: '/tarifs' },
  { name: 'Contact', path: '/contact' }
];
</script>