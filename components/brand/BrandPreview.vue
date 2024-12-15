<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Aperçu de la configuration</h2>
    
    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <img 
          :src="logo" 
          :alt="companyName"
          class="h-12 w-12 object-contain"
          @error="handleImageError"
        />
        <span class="text-lg font-medium">{{ companyName }}</span>
      </div>

      <div class="flex space-x-4">
        <div class="flex items-center space-x-2">
          <div 
            class="w-6 h-6 rounded-full" 
            :style="{ backgroundColor: primaryColor }"
          />
          <span class="text-sm">Couleur principale</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <div 
            class="w-6 h-6 rounded-full" 
            :style="{ backgroundColor: secondaryColor }"
          />
          <span class="text-sm">Couleur secondaire</span>
        </div>
      </div>

      <div class="p-4 bg-gray-50 rounded">
        <p class="text-sm italic">{{ welcomeMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  companyName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  primaryColor: {
    type: String,
    required: true
  },
  secondaryColor: {
    type: String,
    required: true
  },
  welcomeMessage: {
    type: String,
    required: true
  }
})

const defaultLogo = '/default-logo.png'
const logoSrc = ref(props.logo)

function handleImageError() {
  logoSrc.value = defaultLogo
}
</script>