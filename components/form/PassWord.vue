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
  <div class="space-y-4">
    <ProximaPassword
      label="Mot de passe"
      placeholder="Entrez votre mot de passe"
      has-eye-button
      has-clear-button
      round="full"
      shadow="soft"
      v-model="password"
      @update:value="onPasswordChange"
      class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
</template>

<style scoped>
/* Améliorer l’apparence du champ de mot de passe */
.proxima-password-input {
  transition: all 0.3s ease;
}
</style>
