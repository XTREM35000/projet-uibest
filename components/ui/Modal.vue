<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')" />
      
      <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium">{{ title }}</h3>
        </div>
        
        <div class="px-6 py-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
</script>