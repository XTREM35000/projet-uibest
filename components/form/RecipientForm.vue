<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Informations du destinataire</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Nom complet -->
      <UFormGroup label="Nom complet" required>
        <UInput
          v-model="recipient.name"
          placeholder="Entrez le nom complet du destinataire"
          :color="hasError('recipient.name') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.name')" />
      </UFormGroup>

      <!-- Email -->
      <UFormGroup label="Email">
        <UInput
          v-model="recipient.email"
          type="email"
          placeholder="Entrez l'email du destinataire"
          :color="hasError('recipient.email') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.email')" />
      </UFormGroup>

      <!-- Numéro de téléphone -->
      <UFormGroup label="Numéro de téléphone" required>
        <UInput
          v-model="recipient.phone"
          placeholder="Entrez le numéro de téléphone du destinataire"
          :color="hasError('recipient.phone') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.phone')" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useFormValidation } from "#build/imports";
import { recipientSchema } from "@/utils/validation";
import type { Recipient } from "@/utils/validation";
import { watch } from "vue";

const props = defineProps<{
  modelValue: Recipient;
  errors?: Record<string, string>;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Recipient];
}>();

const recipient = ref({ ...props.modelValue });

const { getError, hasError } = useFormValidation(recipientSchema);

const emitUpdate = () => {
  emit("update:modelValue", recipient.value);
};

watch(
  () => props.modelValue,
  (newValue: any) => {
    recipient.value = { ...newValue };
  },
  { deep: true }
);
</script>
