<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <template v-if="type === 'textarea'">
      <textarea
        v-model="modelValue"
        :required="required"
        :rows="rows"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
    <template v-else>
      <input
        v-model="modelValue"
        :type="type"
        :required="required"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['update:modelValue'])
</script>