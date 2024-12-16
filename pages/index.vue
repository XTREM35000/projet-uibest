<template>
  <div>
    <!-- Section de bannière avec NuxtImg -->
    <section
  class="section1 relative h-[225px] md:h-[400px] text-white flex items-center justify-center bg-cover bg-center"
  style="background-image: url('/section1.png')">
  <div class="relative z-10 text-center">
    <h1 class="text-white text-3xl md:text-4xl font-bold mb-6">Expédition internationale simplifiée</h1>
    <p class="text-white text-xl mb-8">
      Envoyez vos colis partout dans le monde en toute confiance avec Gogo Express 2.0
    </p>
    <div class="flex justify-center gap-4">
      <UButton
        to="/"
        size="lg"
        color="white"
        variant="solid"
        class="bg-[#0087e0] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#006bb3] transition">
        <Icon name="i-heroicons-truck" class="w-5 h-5 mr-2" />
        Expédier maintenant
      </UButton>
      <UButton
        to="/"
        size="lg"
        color="white"
        variant="outline"
        class="border-[#ffffff] text-[#ffffff] font-semibold px-6 py-3 rounded-lg hover:bg-[#0087e0] hover:text-white transition">
        <Icon name="i-heroicons-magnifying-glass" class="w-5 h-5 mr-2" /> 
        Suivre un colis
      </UButton>
    </div>
  </div>
  <div class="absolute inset-0 bg-black/40 z-0"></div>
</section>

    <!-- Section Pourquoi nous choisir -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-blue-600 mb-12">
          Pourquoi choisir Gogo Express ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Couverture mondiale -->
          <div class="text-center p-6 bg-gray-100 shadow-lg rounded-lg hover:scale-105 transform transition-all">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-globe-alt" class="w-12 h-12 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-blue-700 mb-2">Couverture mondiale</h3>
            <p class="text-gray-600">
              Expédiez vers plus de 220 pays et territoires dans le monde
            </p>
          </div>

          <!-- Suivi en temps réel -->
          <div class="text-center p-6 bg-gray-100 shadow-lg rounded-lg hover:scale-105 transform transition-all">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-clock" class="w-12 h-12 text-red-600" />
            </div>
            <h3 class="text-md font-semibold text-red-600 mb-2">Suivi en temps réel</h3>
            <p class="text-gray-600">
              Suivez vos expéditions 24h/24 et 7j/7 avec des mises à jour détaillées
            </p>
          </div>

          <!-- Expédition sécurisée -->
          <div class="text-center p-6 bg-gray-100 shadow-lg rounded-lg hover:scale-105 transform transition-all">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-shield-check" class="w-12 h-12 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-green-600 mb-2">Expédition sécurisée</h3>
            <p class="text-gray-600">
              Vos colis sont entièrement assurés et manipulés avec soin
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Graphique de démonstration -->
    <section class="section2 relative h-auto py-16 bg-gray-50 bg-cover bg-center bg-no-repeat background-size: cover"
  style="background-image: url('/section2.png')"
>
  <!-- Contenu superposé -->
  <div class="container mx-auto px-4 relative z-10">
    <h2 class="text-3xl font-bold text-center text-white mb-12">
      Suivi de vos envois en temps réel
    </h2>
    <div class="flex justify-center">
      <div class="w-full md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 class="text-2xl text-blue-600 font-semibold text-center mb-4">
          Statistiques d'expédition périodique
        </h3>
        <div class="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          <p>Graphique de démonstration</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay sombre pour contraste -->
  <div class="absolute inset-0 bg-black/30 z-5"></div>
</section>



    <!-- Section des slogans et promotions -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-12">
          Nos Offres et Promotions
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold mb-4">Offre spéciale</h3>
            <p class="mb-4">Profitez d'une réduction de 20% sur votre premier envoi avec le code: GOGO20</p>
            <UButton to="/shipping" size="md" color="white" variant="solid">
              Expédier maintenant
            </UButton>
          </div>
          <div class="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold mb-4">Offre partenaire</h3>
            <p class="mb-4">Devenez partenaire de Gogo Express et profitez de tarifs préférentiels.</p>
            <UButton to="/partners" size="md" color="white" variant="solid">
              Devenir partenaire
            </UButton>
          </div>
          <div class="bg-yellow-600 text-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold mb-4">Livraison Express</h3>
            <p class="mb-4">Expédiez vos colis en 48 heures à travers le monde avec notre service Express.</p>
            <UButton to="/shipping" size="md" color="white" variant="solid">
              Expédier maintenant
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const img = useImage() // Utilisation de l'API du module image pour construire des URLs optimisées

// Définition des variables pour contrôler l'état du bouton
const isLoading = ref(false);
const isDisabled = ref(false);

// Méthode de gestion du clic
const handleClick = (event: Event) => {
  console.log('Bouton cliqué!', event);
  isLoading.value = true;

  // Simuler un processus de chargement
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>

<style scoped>
 /* Section 1 (bannière) */
.section1 {
  background-size: cover;
  background-position: center;
  width: 100%;
  position: relative; /* Assurez-vous que le contenu est bien positionné */
  z-index: 1; /* La section 1 reste derrière le contenu */
}

/* Section 2 (graphique de démonstration) */
.section2 {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  z-index: 0; /* Moins élevé pour éviter la superposition avec la section1 */
  margin-top: -50px; /* Ajustez cette valeur pour éviter que la section se chevauche */
}

/* Overlay (couche sombre) */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0; /* Sous le contenu */
}

/* Pour la gestion de l'overflow, surtout sur les appareils mobiles */
body {
  overflow-x: hidden; /* Empêche le débordement horizontal */
}

</style>
 