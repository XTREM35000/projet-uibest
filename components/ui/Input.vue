<template>
  <div>
    <label 
      v-if="label"
      :for="id" 
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <div 
        v-if="error" 
        class="text-red-500 text-sm mt-1"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>