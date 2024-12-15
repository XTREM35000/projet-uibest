<!-- components\form\password.vue -->
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import ProximaPassword from "proxima-vue/field/password";

// Définir la prop modelValue
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

// Définir les événements
const emit = defineEmits(["update:modelValue"]);

const password = ref(props.modelValue);

// Mise à jour de la valeur du mot de passe et émission de l'événement
const onPasswordChange = (value) => {
  password.value = value;
  emit("update:modelValue", value); // Émettre la mise à jour
};
</script>

<template>
  <div class="space-y-2">
    <ProximaPassword
      label="Mot de passe"
      placeholder="Entrez votre mot de passe"
      has-eye-button
      has-clear-button
      round="full"
      shadow="soft"
      v-model="password"
      @update:value="onPasswordChange"
    />
  </div>
</template>
