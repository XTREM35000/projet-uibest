<script setup>
import { ref, watch } from "vue";
import ProximaPhone, { getRawPhone } from "proxima-vue/field/phone";

// Liste des codes pays disponibles
const countryCodes = [
  { code: "+225", name: "Côte d’Ivoire" },
  { code: "+33", name: "France" },
  { code: "+1", name: "États-Unis" },
  { code: "+44", name: "Royaume-Uni" },
  { code: "+237", name: "Cameroun" },
  { code: "+227", name: "Burkina Faso" },
  { code: "+226", name: "Bénin" },
];

// Définition des props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  selectedCountryCode: {
    type: String,
    default: "+225", // Par défaut, le pays est la Côte d’Ivoire (+225)
  },
});

// Émissions d'événements
const emit = defineEmits([
  "update:modelValue",
  "update:selectedCountryCode",
  "raw-phone",
]);

// État local
const phoneNumber = ref(props.modelValue || ""); // Utilisation du modèle si fourni
let selectedCountryCode = ref(props.selectedCountryCode);

// Met à jour le numéro complet brut
const updateRawPhone = () => {
  const rawPhone = getRawPhone(
    `${selectedCountryCode.value}${phoneNumber.value}`
  );
  emit("raw-phone", rawPhone); // Émet le numéro brut sans caractères supplémentaires
};

// Met à jour le countryCode
const onCountryCodeChange = (event) => {
  selectedCountryCode.value = event.target.value;
  emit("update:selectedCountryCode", selectedCountryCode.value); // Émet le changement du code pays
};

// Met à jour le numéro de téléphone
const onPhoneNumberChange = (value) => {
  phoneNumber.value = value;
  emit("update:modelValue", value); // Met à jour le modèle de téléphone
};

// Surveille les changements pour générer le numéro brut
watch(
  [() => phoneNumber.value, () => selectedCountryCode.value],
  updateRawPhone
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Sélecteur de pays -->
    <select
      v-model="selectedCountryCode"
      @change="onCountryCodeChange"
      class="p-3 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      <option
        v-for="country in countryCodes"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }} ({{ country.code }})
      </option>
    </select>

    <!-- Champ de téléphone -->
    <ProximaPhone
      v-model="phoneNumber"
      :countryCode="selectedCountryCode"
      :format="`${selectedCountryCode} ** ** ** ** **`"
      validity-status="both"
      mask-char=" "
      @input="onPhoneNumberChange"
      class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<style scoped>
/* Personnalisation du champ de téléphone */
select {
  transition: all 0.3s ease;
}

.proxima-phone-input {
  transition: all 0.3s ease;
}
</style>
